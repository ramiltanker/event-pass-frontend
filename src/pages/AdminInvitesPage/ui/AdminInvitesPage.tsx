import { Container, Stack, Typography } from '@mui/material';
import { Invites } from 'widgets/Invites';

const AdminInvitesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Приглашения</Typography>
        <Invites />
      </Stack>
    </Container>
  );
};

export { AdminInvitesPage };
