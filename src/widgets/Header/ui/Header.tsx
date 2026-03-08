import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { paths } from 'app/providers/router';

import { Link as RouterLink, NavLink } from 'react-router-dom';
import headerLogo from 'shared/assets/images/logo/header-logo.png';

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

const drawerLinkSx = {
  borderRadius: '12px',
  px: 1.5,
  py: 1.25,
  color: '#111827',
  '& .MuiListItemText-primary': {
    fontSize: '16px',
    fontWeight: 500,
  },
  '&.active': {
    backgroundColor: '#FCE8E6',
    color: '#941B0C',
    '& .MuiListItemText-primary': {
      fontWeight: 700,
    },
  },
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
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
              gap: 2,
            }}
          >
            <Box
              component={RouterLink}
              to={paths.root()}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={headerLogo}
                alt="EventPass"
                sx={{
                  display: 'block',
                  height: { xs: 40, md: 44 },
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>

            <Box
              component="nav"
              sx={{
                display: { xs: 'none', md: 'flex' },
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
                display: { xs: 'none', md: 'inline-flex' },
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

            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                gap: 1,
                flexShrink: 0,
              }}
            >
              <Button
                component={RouterLink}
                to={paths.login()}
                variant="contained"
                sx={{
                  minWidth: 'auto',
                  borderRadius: 2,
                  px: { xs: 1.5, sm: 2.5 },
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: { xs: '14px', sm: '15px' },
                  whiteSpace: 'nowrap',
                }}
              >
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Вход
                </Box>
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Вход для преподавателей
                </Box>
              </Button>

              <IconButton
                onClick={handleOpenMobileMenu}
                aria-label="Открыть меню"
                sx={{
                  color: '#111827',
                }}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleCloseMobileMenu}
        PaperProps={{
          sx: {
            width: 300,
            px: 2,
            py: 3,
          },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Box
            component={RouterLink}
            to={paths.root()}
            onClick={handleCloseMobileMenu}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={headerLogo}
              alt="EventPass"
              sx={{
                display: 'block',
                height: 40,
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>

        <List sx={{ p: 0 }}>
          <ListItemButton
            component={NavLink}
            to={paths.root()}
            onClick={handleCloseMobileMenu}
            sx={drawerLinkSx}
          >
            <ListItemText primary="Главная" />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to={paths.consultations()}
            onClick={handleCloseMobileMenu}
            sx={drawerLinkSx}
          >
            <ListItemText primary="Список консультаций" />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to={paths.about()}
            onClick={handleCloseMobileMenu}
            sx={drawerLinkSx}
          >
            <ListItemText primary="О нас" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export { Header };