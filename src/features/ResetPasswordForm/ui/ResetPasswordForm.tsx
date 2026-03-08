import { useResetPasswordMutation } from 'entities/User';
import { useState, type FC } from 'react';
import type { ResetPasswordFormValues } from '../model/types';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { resetPasswordSchema } from '../lib/constants';
import { useNavigate } from 'react-router-dom';
import { paths } from 'app/providers/router';
import { getErrorMessage, isExpiredTokenError } from '../lib/utils';

interface Props {
  token: string | undefined;
}

const ResetPasswordForm: FC<Props> = ({ token }) => {
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (values) => {
    if (!token) {
      setIsTokenExpired(true);
      setServerErrorMessage('Ссылка для сброса пароля некорректна или неполная.');
      return;
    }

    setServerErrorMessage('');
    setIsTokenExpired(false);

    try {
      const response = await resetPassword({
        token,
        newPassword: values.newPassword,
      }).unwrap();

      setSuccessMessage(response.message);
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      setServerErrorMessage(
        isExpiredTokenError(error)
          ? 'Ссылка для сброса пароля недействительна или уже истекла. Запросите новую ссылку.'
          : message,
      );
      setIsTokenExpired(isExpiredTokenError(error));
      setSuccessMessage('');
    }
  };

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Stack spacing={3}>
            <Alert severity="error">Ссылка для сброса пароля некорректна или неполная.</Alert>

            <Button variant="contained" onClick={() => navigate(paths.forgotPassword())}>
              Запросить новую ссылку
            </Button>

            <Button variant="text" onClick={() => navigate(paths.login())}>
              Вернуться ко входу
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Новый пароль
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Введите новый пароль для вашего аккаунта.
            </Typography>
          </Box>

          {successMessage ? (
            <Stack spacing={2}>
              <Alert severity="success">{successMessage}</Alert>

              <Button variant="contained" size="large" onClick={() => navigate(paths.login())}>
                Перейти ко входу
              </Button>
            </Stack>
          ) : (
            <>
              {serverErrorMessage ? <Alert severity="error">{serverErrorMessage}</Alert> : null}

              {isTokenExpired ? (
                <Stack spacing={2}>
                  <Button variant="contained" onClick={() => navigate(paths.forgotPassword())}>
                    Запросить новую ссылку
                  </Button>

                  <Button variant="text" onClick={() => navigate(paths.login())}>
                    Вернуться ко входу
                  </Button>
                </Stack>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Stack spacing={2}>
                    <Controller
                      name="newPassword"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Новый пароль"
                          type="password"
                          fullWidth
                          error={Boolean(errors.newPassword)}
                          helperText={errors.newPassword?.message}
                        />
                      )}
                    />

                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Подтвердите пароль"
                          type="password"
                          fullWidth
                          error={Boolean(errors.confirmPassword)}
                          helperText={errors.confirmPassword?.message}
                        />
                      )}
                    />

                    <Button type="submit" variant="contained" size="large" disabled={isLoading}>
                      Сохранить новый пароль
                    </Button>
                  </Stack>
                </form>
              )}
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export { ResetPasswordForm };
