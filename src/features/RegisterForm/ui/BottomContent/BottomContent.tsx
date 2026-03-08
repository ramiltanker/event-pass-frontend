import { Button, Link, Stack, Typography } from '@mui/material';
import type { RegisterFormValues } from '../../model/types';
import { useFormContext } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useRegisterByInviteMutation } from 'entities/User';

const BottomContent = () => {
  const [_, { isLoading }] = useRegisterByInviteMutation({ fixedCacheKey: 'userRegister' });

  const {
    formState: { isSubmitting, isValid },
  } = useFormContext<RegisterFormValues>();

  return (
    <Stack spacing={1.5} sx={{ mt: 2 }}>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={isSubmitting || isLoading || !isValid}
        loading={isLoading}
        sx={{
          height: 48,
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        Зарегистрироваться
      </Button>

      <Typography variant="body2" align="center">
        Есть аккаунт?&nbsp;
        <Link component={RouterLink} to="/login" underline="hover">
          Войти
        </Link>
      </Typography>
    </Stack>
  );
};

export { BottomContent };
