import { Box, Grid, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box component="main" sx={{ py: 0 }}>
      <Grid container sx={{ minHeight: 'calc(100vh - 72px - 88px)' }}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 3, md: 8 },
            py: 6,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 460 }}>
            <Outlet />
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: { xs: 'none', md: 'block' },
            p: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              height: '100%',
              minHeight: 520,
              borderRadius: 4,
              backgroundImage:
                'url(https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export { AuthLayout };
