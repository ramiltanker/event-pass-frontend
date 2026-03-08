import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { theme } from 'app/theme';
import { AuthInitializer } from './auth';

export function AppProvider() {
  return (
    <ThemeProvider theme={theme}>
      <AuthInitializer>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthInitializer>
    </ThemeProvider>
  );
}
