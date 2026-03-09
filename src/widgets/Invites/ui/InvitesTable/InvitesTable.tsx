import { ContentCopy } from '@mui/icons-material';
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  getInvitesStatusColor,
  invitesStatusLabelMap,
  useGetInvitesQuery,
  useRevokeInviteMutation,
  type Invite,
} from 'entities/User';
import { useState } from 'react';

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString('ru-RU');
};

const InviteRow = ({ invite }: { invite: Invite }) => {
  const [revokeInvite, { isLoading }] = useRevokeInviteMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copySuccessOpen, setCopySuccessOpen] = useState(false);

  const canRevoke = invite.status === 'active';
  const canCopy = Boolean(invite.inviteUrl);

  const handleRevoke = async () => {
    setErrorMessage(null);

    try {
      await revokeInvite(invite.id).unwrap();
    } catch {
      setErrorMessage('Не удалось отозвать приглашение');
    }
  };

  const handleCopy = async () => {
    if (!invite.inviteUrl) return;

    try {
      await navigator.clipboard.writeText(invite.inviteUrl);
      setCopySuccessOpen(true);
    } catch {
      setErrorMessage('Не удалось скопировать ссылку');
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>{invite.email}</TableCell>
        <TableCell>
          <Chip
            label={invitesStatusLabelMap[invite.status]}
            color={getInvitesStatusColor(invite.status)}
            size="small"
          />
        </TableCell>
        <TableCell>{formatDateTime(invite.createdAt)}</TableCell>
        <TableCell>{formatDateTime(invite.expiresAt)}</TableCell>
        <TableCell>{invite.usedAt ? formatDateTime(invite.usedAt) : '—'}</TableCell>

        <TableCell align="right">
          <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
            <Tooltip title={canCopy ? 'Скопировать ссылку' : 'Ссылка недоступна'}>
              <span>
                <IconButton onClick={handleCopy} disabled={!canCopy} size="small">
                  <ContentCopy fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            {canRevoke ? (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleRevoke}
                disabled={isLoading}
              >
                Отозвать
              </Button>
            ) : (
              <Typography variant="body2" color="text.secondary">
                —
              </Typography>
            )}
          </Stack>
        </TableCell>
      </TableRow>

      {errorMessage && (
        <TableRow>
          <TableCell colSpan={6}>
            <Alert severity="error">{errorMessage}</Alert>
          </TableCell>
        </TableRow>
      )}

      <Snackbar
        open={copySuccessOpen}
        autoHideDuration={2000}
        onClose={() => setCopySuccessOpen(false)}
        message="Ссылка скопирована"
      />
    </>
  );
};

const InvitesTable = () => {
  const { data, isLoading, isError } = useGetInvitesQuery('all');

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Не удалось загрузить приглашения</Alert>;
  }

  if (!data?.length) {
    return <Alert severity="info">Приглашений пока нет</Alert>;
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">Email</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Статус</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Создано</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Истекает</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Использовано</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">Действия</Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((invite) => (
            <InviteRow key={invite.id} invite={invite} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { InvitesTable };
