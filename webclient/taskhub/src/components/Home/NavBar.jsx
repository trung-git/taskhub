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
import { TaskHubLogo } from '../../base/component/TaskHubLogo';
import { navBarHeight } from '../../base/config';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AccountCircle } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from '@mui/icons-material/Message';
import LanguageSwitch from '../../base/component/LanguageSwitch';
import useLogin from '../../hooks/useLogin';
import { LoginContext } from '../../provider/LoginContext';
import { useContext } from 'react';
import ThemeModeSwitch from '../../base/component/ThemeModeSwitch';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar({ isLogin = true }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElSetting, setAnchorElSetting] = React.useState(null);
  const { logOut } = useLogin();
  const logincontext = useContext(LoginContext);

  const pages = [
    {
      languageKey: 'th_key_navbar_home_page',
      onClick: () => {
        navigate('/');
      },
      auth: false,
    },
    {
      languageKey: 'th_key_navbar_home_page',
      onClick: () => {
        navigate('/');
      },
      auth: true,
    },
    {
      languageKey: 'th_key_navbar_task_feed',
      onClick: () => {
        navigate('/post');
      },
      auth: true,
    },
    {
      languageKey: 'th_key_navbar_services',
      onClick: () => {
        navigate('/tasklist');
      },
      auth: true,
    },
    {
      languageKey: 'th_key_navbar_signup_login',
      onClick: () => {
        navigate('/login');
      },
      auth: false,
    },
  ];
  const pagesSmall = [
    {
      languageKey: 'th_key_navbar_home_page',
      onClick: () => {
        navigate('/');
      },
      auth: false,
    },
    {
      languageKey: 'th_key_navbar_home_page',
      onClick: () => {
        navigate('/');
      },
      auth: true,
    },
    {
      languageKey: 'th_key_navbar_task_feed',
      onClick: () => {
        navigate('/post');
      },
      auth: true,
    },
    {
      languageKey: 'th_key_navbar_services',
      onClick: () => {
        navigate('/tasklist');
      },
      auth: true,
    },
    {
      languageKey: 'th_key_navbar_signup_login',
      onClick: () => {
        navigate('/login');
      },
      auth: false,
    },
    // {
    //   languageKey: 'th_key_navbar_becometasker',
    //   onClick: () => {
    //     navigate('/becometasker');
    //   },
    //   auth: false,
    // },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSettingMenu = (event) => {
    setAnchorElSetting(event.currentTarget);
  };
  const handleCloseSettingMenu = () => {
    setAnchorElSetting(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logincontext.setIsLogin(false);
    logOut();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        height: navBarHeight,
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%' }}>
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
              // color="inherit"
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
              {pagesSmall
                .filter((item) => item?.auth === isLogin)
                .map((page, index) => (
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
              <MenuItem>
                <LanguageSwitch />
              </MenuItem>
              <MenuItem sx={{ justifyContent: 'center' }}>
                <ThemeModeSwitch />
              </MenuItem>

              {/* {isLogin &&
                pagesSmall.map((page, index) => (
                  <MenuItem key={index} onClick={page.onClick}>
                    <Typography
                      color={'green'}
                      textAlign="center"
                      textTransform={'none'}
                    >
                      {t(page.languageKey)}
                    </Typography>
                  </MenuItem>
                ))} */}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {pages
              .filter((item) => item?.auth === isLogin)
              .map((page, index) =>
                isLogin &&
                page.languageKey === 'th_key_navbar_signup_login' ? null : (
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
                )
              )}
          </Box>
          {/* {!isLogin && (
            <Button sx={{ display: { xs: 'none', md: 'block' } }}>
              {t('th_key_navbar_becometasker')}
            </Button>
          )} */}
          {isLogin && (
            <div>
              <Button
                variant="text"
                color="secondary"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => navigate('/profile/personal')}
                endIcon={
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={logincontext?.currentUser?.image}
                  />
                }
              >
                {' '}
                Xin chào {logincontext?.currentUser?.firstName}{' '}
                {logincontext?.currentUser?.lastName} !
              </Button>
            </div>
          )}
          <IconButton
            variant="outlined"
            color="secondary"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenSettingMenu}
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <SettingsOutlinedIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElSetting}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElSetting)}
            onClose={handleCloseSettingMenu}
          >
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              <Typography sx={{ mr: 1 }}>
                {t('th_key_navbar_language')}
              </Typography>
              <LanguageSwitch />
            </MenuItem>
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              <Typography sx={{ mr: 1 }}>
                {t('th_key_navbar_theme_mode')}
              </Typography>
              <ThemeModeSwitch />
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
