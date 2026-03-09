import { ContentCopy } from '@mui/icons-material';
import { Alert, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { EmailInput } from './EmailInput';
import { defaultValues, inviteCreateSchema } from '../lib/constants';
import type { CreateInviteFormValues } from '../model/types';
import { useCreateInviteMutation, type CreateInviteResponseBody } from 'entities/User';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExpireDaysInput } from './ExpireDaysInput';

const InviteCreateForm = () => {
  const [createInvite, { isLoading }] = useCreateInviteMutation();

  const [createdInvite, setCreatedInvite] = useState<CreateInviteResponseBody | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<CreateInviteFormValues>({
    resolver: yupResolver(inviteCreateSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<CreateInviteFormValues> = async (values) => {
    setErrorMessage(null);

    try {
      const response = await createInvite({
        email: values.email.trim(),
        expiresInDays: values.expiresInDays,
      }).unwrap();

      setCreatedInvite(response);
      reset(defaultValues);
    } catch {
      setErrorMessage('Не удалось создать приглашение');
    }
  };

  const handleCopy = async () => {
    if (!createdInvite?.inviteUrl) return;

    await navigator.clipboard.writeText(createdInvite.inviteUrl);
  };

  return (
    <FormProvider {...form}>
      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <EmailInput />

          <ExpireDaysInput />

          <Button type="submit" variant="contained" disabled={isLoading} sx={{ minWidth: 180 }}>
            Создать приглашение
          </Button>
        </Stack>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        {createdInvite && (
          <Stack spacing={1}>
            <Alert severity="success">Приглашение создано</Alert>

            <TextField
              label="Ссылка приглашения"
              value={createdInvite.inviteUrl}
              fullWidth
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCopy} edge="end">
                      <ContentCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        )}
      </Stack>
    </FormProvider>
  );
};

export { InviteCreateForm };
