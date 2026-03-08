import { useForgotPasswordMutation } from 'entities/User';
import { useState } from 'react';
import type { ForgotPasswordFormValues } from '../model/types';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema } from '../lib/constants';
import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { getErrorMessage } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { paths } from 'app/providers/router';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (values) => {
    setServerErrorMessage('');

    try {
      const response = await forgotPassword(values).unwrap();
      setSuccessMessage(
        response.message ||
          'Если такой email существует, мы уже отправили ссылку для восстановления пароля.',
      );
    } catch (error: unknown) {
      setSuccessMessage('');
      setServerErrorMessage(getErrorMessage(error));
    }
  };

  const handleSendAgain = () => {
    setSuccessMessage('');
    setServerErrorMessage('');
    reset({
      email: '',
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Забыли пароль
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Введите email, и мы отправим ссылку для восстановления пароля.
            </Typography>
          </Box>

          {successMessage ? (
            <Stack spacing={2}>
              <Alert severity="success">{successMessage}</Alert>

              <Button variant="contained" size="large" onClick={() => navigate(paths.login())}>
                Вернуться ко входу
              </Button>

              <Button variant="text" size="large" onClick={handleSendAgain}>
                Отправить ещё раз
              </Button>
            </Stack>
          ) : (
            <>
              {serverErrorMessage ? <Alert severity="error">{serverErrorMessage}</Alert> : null}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        fullWidth
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                      />
                    )}
                  />

                  <Button type="submit" variant="contained" size="large" disabled={isLoading}>
                    Отправить ссылку
                  </Button>

                  <Button
                    type="button"
                    variant="text"
                    size="large"
                    onClick={() => navigate(paths.login())}
                  >
                    Вернуться ко входу
                  </Button>
                </Stack>
              </form>
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export { ForgotPasswordForm };
