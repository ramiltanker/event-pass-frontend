import { Alert, CircularProgress, Container } from '@mui/material';
import { useGetInvitesQuery } from 'entities/User';
import { memo } from 'react';

const Invites = memo(() => {
  const { data, isLoading, isError } = useGetInvitesQuery('all');

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Не удалось загрузить приглашения</Alert>
      </Container>
    );
  }

  return data?.length ? (
    data.map((invite) => (
      <Alert key={invite.id} severity="info">
        {invite.email} — {invite.status}
      </Alert>
    ))
  ) : (
    <Alert severity="info">Приглашений пока нет</Alert>
  );
});

export { Invites };
