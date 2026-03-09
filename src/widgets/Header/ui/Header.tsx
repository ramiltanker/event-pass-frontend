import { useMemo, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Link as RouterLink, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { paths } from 'app/providers/router';
import {
  clearAuthStorage,
  selectIsAuthenticated,
  selectUser,
  userActions,
} from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
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

const loginButtonSx = {
  borderRadius: 2,
  px: 2.5,
  py: 1,
  textTransform: 'none',
  fontWeight: 600,
  flexShrink: 0,
};

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleToggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  const handleGoToDashboard = () => {
    handleCloseProfileMenu();
    navigate(paths.teacherDashboard());
  };

  const handleLogout = () => {
    clearAuthStorage();
    dispatch(userActions.clearAuthData());
    handleCloseProfileMenu();
    handleCloseMobileMenu();
    navigate(paths.root());
  };

  const initials = useMemo(() => {
    if (!user) return 'П';

    const first = user.firstName?.trim()?.[0] ?? '';
    const last = user.lastName?.trim()?.[0] ?? '';

    return `${first}${last}`.toUpperCase() || 'П';
  }, [user]);

  const lastName = user?.lastName?.trim() || 'Преподаватель';

  const shortName = useMemo(() => {
    if (!user) return 'П.П.';

    const first = user.firstName?.trim()?.[0] ?? '';
    const middle = user.middleName?.trim()?.[0] ?? '';

    const result = [first && `${first}.`, middle && `${middle}.`].filter(Boolean).join('');

    return result || initials;
  }, [initials, user]);

  const isDashboardPage = location.pathname === paths.teacherDashboard();

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

            {!isAuthenticated ? (
              <Button
                component={RouterLink}
                to={paths.login()}
                variant="contained"
                sx={{
                  ...loginButtonSx,
                  display: { xs: 'none', md: 'inline-flex' },
                }}
              >
                Вход для преподавателей
              </Button>
            ) : (
              <ClickAwayListener onClickAway={handleCloseProfileMenu}>
                <Box
                  sx={{
                    position: 'relative',
                    display: { xs: 'none', md: 'block' },
                    flexShrink: 0,
                  }}
                >
                  <Button
                    onClick={handleToggleProfileMenu}
                    sx={{
                      minWidth: 0,
                      p: 0.75,
                      pl: 1,
                      pr: 1,
                      borderRadius: '14px',
                      textTransform: 'none',
                      color: '#111827',
                      border: isDashboardPage ? '1px solid #D9A19A' : '1px solid #E5E7EB',
                      backgroundColor: isDashboardPage ? '#FFF5F3' : '#FFFFFF',
                      '&:hover': {
                        backgroundColor: isDashboardPage ? '#FFF1EE' : '#F9FAFB',
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          fontSize: '14px',
                          fontWeight: 700,
                          bgcolor: '#A61D0A',
                          color: '#FFFFFF',
                        }}
                      >
                        {initials}
                      </Avatar>

                      <Box sx={{ textAlign: 'left', maxWidth: 150 }}>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            color: '#111827',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {lastName}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: '12px',
                            lineHeight: 1.1,
                            color: '#6B7280',
                          }}
                        >
                          {shortName}
                        </Typography>
                      </Box>

                      <KeyboardArrowDownRoundedIcon
                        sx={{
                          color: '#6B7280',
                          transform: profileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    </Stack>
                  </Button>

                  {profileMenuOpen ? (
                    <Paper
                      elevation={0}
                      sx={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        right: 0,
                        minWidth: 220,
                        borderRadius: '14px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.10)',
                        overflow: 'hidden',
                        zIndex: 20,
                      }}
                    >
                      <Button
                        onClick={handleGoToDashboard}
                        fullWidth
                        sx={{
                          justifyContent: 'flex-start',
                          px: 2,
                          py: 1.5,
                          borderRadius: 0,
                          textTransform: 'none',
                          color: '#111827',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        Перейти в личный кабинет
                      </Button>

                      <Button
                        onClick={handleLogout}
                        fullWidth
                        sx={{
                          justifyContent: 'flex-start',
                          px: 2,
                          py: 1.5,
                          borderRadius: 0,
                          textTransform: 'none',
                          color: '#B42318',
                          fontSize: '14px',
                          fontWeight: 600,
                        }}
                      >
                        Выйти из аккаунта
                      </Button>
                    </Paper>
                  ) : null}
                </Box>
              </ClickAwayListener>
            )}

            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                gap: 1,
                flexShrink: 0,
              }}
            >
              {!isAuthenticated ? (
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
              ) : (
                <Button
                  onClick={handleGoToDashboard}
                  sx={{
                    minWidth: 'auto',
                    px: 1,
                    py: 0.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    color: '#111827',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: '13px',
                        fontWeight: 700,
                        bgcolor: '#A61D0A',
                        color: '#FFFFFF',
                      }}
                    >
                      {initials}
                    </Avatar>

                    <Box sx={{ textAlign: 'left' }}>
                      <Typography
                        sx={{
                          fontSize: '13px',
                          fontWeight: 700,
                          lineHeight: 1.1,
                          color: '#111827',
                        }}
                      >
                        {lastName}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: '11px',
                          lineHeight: 1.1,
                          color: '#6B7280',
                        }}
                      >
                        {shortName}
                      </Typography>
                    </Box>
                  </Stack>
                </Button>
              )}

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

          {isAuthenticated ? (
            <>
              <ListItemButton
                component={NavLink}
                to={paths.teacherDashboard()}
                onClick={handleCloseMobileMenu}
                sx={drawerLinkSx}
              >
                <ListItemText primary="Личный кабинет" />
              </ListItemButton>

              <ListItemButton
                onClick={handleLogout}
                sx={{
                  ...drawerLinkSx,
                  color: '#B42318',
                }}
              >
                <ListItemText primary="Выйти из аккаунта" />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton
              component={NavLink}
              to={paths.login()}
              onClick={handleCloseMobileMenu}
              sx={drawerLinkSx}
            >
              <ListItemText primary="Вход для преподавателей" />
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </>
  );
};

export { Header };