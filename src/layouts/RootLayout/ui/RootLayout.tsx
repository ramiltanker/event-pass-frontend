import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer } from 'widgets/Footer';
import { Header } from 'widgets/Header';

const RootLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        backgroundColor: '#f5f5f7',
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export { RootLayout };
