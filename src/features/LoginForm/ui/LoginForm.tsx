import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { userActions, useLoginMutation, saveAccessTokenToStorage } from 'entities/User';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { paths, Routes } from 'app/providers/router';
import { useAppDispatch } from 'shared/lib/hooks';
import type { LoginFormValues } from '../model/types';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { loginSchema } from '../lib/constants';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, setError } = form;

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await login({
        email: values.email.trim(),
        password: values.password,
      }).unwrap();

      saveAccessTokenToStorage(response.accessToken);
      dispatch(userActions.setAuthData(response));

      navigate(Routes.ROOT, { replace: true });
    } catch (error) {
      setError('root', {
        type: 'server',
        message: 'Не удалось войти. Проверьте почту и пароль.',
      });
    }
  };

  const rootError = form.formState.errors.root?.message;

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
          Вход для преподавателей
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
          <Stack spacing={3}>
            <EmailInput />
            <PasswordInput />

            <Box sx={{ textAlign: 'right', mt: -1 }}>
              <Link
                component={RouterLink}
                to={paths.forgotPassword()}
                underline="hover"
                sx={{
                  fontSize: 14,
                }}
              >
                Забыли пароль?
              </Link>
            </Box>

            {rootError ? (
              <Typography color="error" variant="body2">
                {rootError}
              </Typography>
            ) : null}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              loading={isLoading}
              sx={{
                height: 48,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Войти
            </Button>

            <Typography variant="body2" align="center">
              Нет аккаунта?&nbsp;
              <Link component={RouterLink} to={Routes.REGISTER} underline="hover">
                Зарегистрироваться
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </FormProvider>
  );
};

export { LoginForm };
