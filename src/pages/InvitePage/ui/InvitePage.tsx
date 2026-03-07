import { useEffect } from 'react';
import { Alert, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from 'shared/lib/hooks';
import { inviteActions, useValidateInviteMutation } from 'entities/Invite';
import { paths } from 'app/providers/router';

const InvitePage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [validateInvite, { isLoading, isError }] = useValidateInviteMutation();

  useEffect(() => {
    if (!token) {
      return;
    }

    const runValidation = async () => {
      try {
        const response = await validateInvite({ token }).unwrap();

        if (response.valid) {
          dispatch(
            inviteActions.setInviteData({
              token,
              email: response.email,
            }),
          );

          navigate(paths.register(), { replace: true });
        }
      } catch {
        // Ошибка сети/сервера обработается ниже
      }
    };

    void runValidation();
  }, [dispatch, navigate, token, validateInvite]);

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Alert severity="error">Ссылка приглашения некорректна.</Alert>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Stack spacing={3} alignItems="center">
          <CircularProgress />
          <Typography variant="h6">Проверяем приглашение...</Typography>
        </Stack>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Alert severity="error">Не удалось проверить ссылку приглашения. Попробуйте позже.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Alert severity="error">Ссылка приглашения недействительна или уже истекла.</Alert>
    </Container>
  );
};

export { InvitePage };
