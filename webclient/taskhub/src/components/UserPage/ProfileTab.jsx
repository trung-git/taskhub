import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../base/component/ConfirmDialog';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogin from '../../hooks/useLogin';

function getPathIndex(pathname) {
  let selectedTab = 0;
  switch (pathname) {
    case '/profile/emailverify':
      selectedTab = 1;
      break;
    case '/profile/password':
      selectedTab = 2;
      break;
    case '/profile/settings':
      selectedTab = 3;
      break;
    case '/profile/personal':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileTab = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logOut } = useLogin();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleOnClickLogout = () => {
    setOpenLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setOpenLogoutDialog(false);
    logOut();
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        '& .MuiListItemIcon-root': {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => handleListItemClick(0, '/profile/personal')}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={t('th_key_person_information')} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleListItemClick(1, '/profile/emailverify')}
      >
        <ListItemIcon>
          <VerifiedUserIcon />
        </ListItemIcon>
        <ListItemText primary={t('th_key_person_verification')} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() => handleListItemClick(2, '/profile/password')}
      >
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary={t('th_key_change_password')} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={() => handleListItemClick(3, '/profile/settings')}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={t('th_key_setting')} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={() => handleOnClickLogout()}
      >
        <ListItemIcon>
          <LogoutIcon color="error" />
        </ListItemIcon>
        <ListItemText
          sx={{ color: theme.palette.error.main }}
          primary={t('th_key_logout')}
        />
      </ListItemButton>
      {openLogoutDialog && (
        <ConfirmDialog
          isOpenDialog={openLogoutDialog}
          onClose={() => setOpenLogoutDialog(false)}
          onAgree={() => handleConfirmLogout()}
          title="th_key_logout"
          content="th_key_setting_logout_message_affirm"
        />
      )}
    </List>
  );
};

export default ProfileTab;
