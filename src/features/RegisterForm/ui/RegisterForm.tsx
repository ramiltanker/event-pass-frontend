import { inviteActions, selectInviteEmail, selectInviteToken } from 'entities/Invite';
import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import type { RegisterFormValues } from '../model/types';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { FirstNameInput } from './FirstNameInput';
import { LastNameInput } from './LastNameInput';
import { MiddleNameInput } from './MiddleNameInput';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { ConfirmPasswordInput } from './ConfirmPasswordInput';
import { BottomContent } from './BottomContent';
import { saveAuthDataToStorage, userActions, useRegisterByInviteMutation } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'app/providers/router';

const RegisterForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const inviteEmail = useAppSelector(selectInviteEmail);
  const inviteToken = useAppSelector(selectInviteToken);

  const [register] = useRegisterByInviteMutation({ fixedCacheKey: 'userRegister' });

  const defaultValues = useMemo<RegisterFormValues>(
    () => ({
      firstName: '',
      lastName: '',
      middleName: '',
      email: inviteEmail ?? '',
      password: '',
      confirmPassword: '',
    }),
    [inviteEmail],
  );

  const form = useForm<RegisterFormValues>({
    mode: 'onBlur',
    defaultValues,
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    const { firstName, lastName, middleName, password } = values;

    if (!inviteToken) {
      return;
    }

    const response = await register({
      token: inviteToken,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      middleName: middleName.trim() || undefined,
      password: password,
    }).unwrap();

    saveAuthDataToStorage(response);
    dispatch(userActions.setAuthData(response));
    dispatch(inviteActions.clearInviteData());

    navigate(Routes.ROOT, { replace: true });
  };

  return (
    <FormProvider {...form}>
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h3"
          sx={{
            mb: 5,
            fontWeight: 700,
          }}
        >
          Регистрация
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FirstNameInput />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <LastNameInput />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <MiddleNameInput />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <EmailInput />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <PasswordInput />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ConfirmPasswordInput />
            </Grid>
            <Grid size={12}>
              <BottomContent />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </FormProvider>
  );
};

export { RegisterForm };
