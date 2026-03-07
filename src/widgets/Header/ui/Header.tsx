import { AppBar, Box, Button, Container, Link, Toolbar, Typography } from '@mui/material';
import { paths } from 'app/providers/router';

import { Link as RouterLink, NavLink } from 'react-router-dom';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const navLinkSx = {
  color: 'text.secondary',
  textDecoration: 'none',
  fontWeight: 500,
  lineHeight: 1.2,
  transition: 'color 0.2s ease',
  '&.active': {
    color: 'primary.main',
  },
  '&:hover': {
    color: 'primary.main',
  },
};

const Header = () => {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'common.white',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box
            component={RouterLink}
            to={paths.root()}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'primary.main',
              flexShrink: 0,
            }}
          >
            <SchoolOutlinedIcon />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              EventPass
            </Typography>
          </Box>

          <Box
            component="nav"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              flexGrow: 1,
            }}
          >
            <Link component={NavLink} to={paths.root()} underline="none" sx={navLinkSx}>
              Главная
            </Link>

            <Link component={NavLink} to={paths.consultations()} underline="none" sx={navLinkSx}>
              Список консультаций
            </Link>

            <Link component={NavLink} to={paths.about()} underline="none" sx={navLinkSx}>
              О нас
            </Link>
          </Box>

          <Button
            component={RouterLink}
            to={paths.login()}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 2.5,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            Вход для преподавателей
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Header };
