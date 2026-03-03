import { Button, Container, Stack, Typography } from '@mui/material';
import { paths } from 'app/providers/router';
import { Link as RouterLink } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h1" fontWeight={700}>
          404
        </Typography>

        <Typography variant="h5">Страница не найдена</Typography>

        <Typography variant="body1" color="text.secondary">
          Возможно, страница была удалена или вы перешли по неверной ссылке.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" component={RouterLink} to={paths.root()}>
            На главную
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default NotFoundPage;
