import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import TaskHubLogo from '../../base/component/TaskHubLogo';
import { navBarHeight } from '../../base/config';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    {
      languageKey: 'th_key_navbar_task_feed',
      onClick: () => {
        navigate('/signin');
      },
    },
    {
      languageKey: 'th_key_navbar_services',
      onClick: () => {
        navigate('/signin');
      },
    },
    {
      languageKey: 'th_key_navbar_signup_login',
      onClick: () => {
        navigate('/signin');
      },
    },
  ];
  const pagesSmall = [
    {
      languageKey: 'th_key_navbar_task_feed',
      onClick: () => {
        navigate('/signin');
      },
    },
    {
      languageKey: 'th_key_navbar_services',
      onClick: () => {
        navigate('/signin');
      },
    },
    {
      languageKey: 'th_key_navbar_signup_login',
      onClick: () => {
        navigate('/signin');
      },
    },
    {
      languageKey: 'th_key_navbar_becometasker',
      onClick: () => {
        navigate('/signin');
      },
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        height: navBarHeight,
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Toolbar disableGutters sx={{ height: '100%' }}>
          <TaskHubLogo />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pagesSmall.map((page, index) => (
                <MenuItem key={index} onClick={page.onClick}>
                  <Typography
                    color={'green'}
                    textAlign="center"
                    textTransform={'none'}
                  >
                    {t(page.languageKey)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={page.onClick}
                sx={{
                  my: 2,
                  color: 'green',
                  display: 'block',
                  textTransform: 'none',
                }}
              >
                {t(page.languageKey)}
              </Button>
            ))}
          </Box>
          <Button
            variant="contained"
            color="success"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {t('th_key_navbar_becometasker')}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
