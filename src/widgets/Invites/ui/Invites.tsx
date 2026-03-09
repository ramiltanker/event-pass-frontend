import { Stack } from '@mui/material';
import { InviteCreateForm } from 'features/InviteCreateForm';
import { memo } from 'react';
import { InvitesTable } from './InvitesTable';

const Invites = memo(() => {
  return (
    <Stack spacing={3}>
      <InviteCreateForm />
      <InvitesTable />
    </Stack>
  );
});

export { Invites };
