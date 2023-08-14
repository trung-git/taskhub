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

import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';

function getPathIndex(pathname) {
  let selectedTab = 0;
  switch (pathname) {
    case '/profile/payment':
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
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

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
        onClick={() => handleListItemClick(0, '/apps/profiles/user/personal')}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Personal Information" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleListItemClick(1, '/apps/profiles/user/payment')}
      >
        <ListItemIcon>
          <PaymentsIcon />
        </ListItemIcon>
        <ListItemText primary="Payment" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() => handleListItemClick(2, '/apps/profiles/user/password')}
      >
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={() => handleListItemClick(3, '/apps/profiles/user/settings')}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
