import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function AppProvider() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}
