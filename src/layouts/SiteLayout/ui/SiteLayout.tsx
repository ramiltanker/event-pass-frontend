import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const SiteLayout = () => {
  return (
    <Box component="main" sx={{ padding: '24px' }}>
      <Outlet />
    </Box>
  );
};

export { SiteLayout };
