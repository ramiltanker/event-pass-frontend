import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Alert, Button, Stack, Typography } from '@mui/material';

export default function RootRouteError() {
  const err = useRouteError();

  // Ошибки вида: throw new Response(...), loader/action
  if (isRouteErrorResponse(err)) {
    return (
      <Stack spacing={2}>
        <Typography variant="h5">Ошибка {err.status}</Typography>
        <Alert severity="error">{err.statusText}</Alert>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </Stack>
    );
  }

  // Обычные runtime-ошибки
  const message = err instanceof Error ? err.message : 'Unknown error';
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Что-то пошло не так</Typography>
      <Alert severity="error">{message}</Alert>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </Stack>
  );
}
