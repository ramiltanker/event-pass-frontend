import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'common.white',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          minHeight: 88,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          © 2026&nbsp;
          <Box component="span" sx={{ fontWeight: 700 }}>
            EventPass.
          </Box>
          &nbsp;все права защищены
        </Typography>
      </Container>
    </Box>
  );
};

export { Footer };
