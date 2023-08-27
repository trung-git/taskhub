import { useState } from 'react';

// material-ui
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';

// project import
import MainCard from '../../base/component/MainCard';

import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import TranslateIcon from '@mui/icons-material/Translate';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import useConfig from '../../hooks/useConfig';
import LanguageSwitch from '../../base/component/LanguageSwitch';
import ConfirmDialog from '../../base/component/ConfirmDialog';

// ==============================|| TAB - SETTINGS ||============================== //

const TabSettings = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();

  const [darkMode, setDarkMode] = useState(mode === 'dark' ? true : false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);

  const handleChangeMode = () => {
    if (darkMode) {
      setDarkMode(false);
      onChangeMode('light');
    } else {
      setDarkMode(true);
      onChangeMode('dark');
    }
  };

  const handleOnClickDeleteAcc = () => {
    setOpenConfirmDeleteDialog(true);
  };

  const handleDeleteAccount = () => {
    setOpenConfirmDeleteDialog(false);
  };

  return (
    <MainCard title={t('th_key_setting')}>
      <List sx={{ '& .MuiListItem-root': { p: 2 } }}>
        <ListItem>
          <ListItemIcon
            sx={{
              color: 'primary.main',
              mr: 2,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Brightness4OutlinedIcon style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-lc"
            primary={
              <Typography variant="h5">
                {t('th_key_setting_dark_mode')}
              </Typography>
            }
            secondary={t('th_key_setting_sub_mode')}
          />
          <Switch
            edge="end"
            onChange={handleChangeMode}
            checked={mode === 'dark' ? true : false}
            inputProps={{
              'aria-labelledby': 'switch-list-label-lc',
            }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon
            sx={{
              color: 'primary.main',
              mr: 2,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <TranslateIcon style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-lc"
            primary={
              <Typography variant="h5">{t('th_key_setting_lang')}</Typography>
            }
            secondary={t('th_key_setting_sub_lang')}
          />
          {/* <Switch
            onChange={handleChange}
            sx={{ m: 1 }}
            checked={i18n.language === 'vi'}
          /> */}
          <LanguageSwitch />
        </ListItem>

        <ListItem>
          <ListItemIcon
            sx={{
              color: 'primary.main',
              mr: 2,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <PersonOffIcon style={{ fontSize: '1.5rem' }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-lc"
            primary={
              <Typography variant="h5">
                {t('th_key_setting_remove_account')}
              </Typography>
            }
            secondary={t('th_key_setting_sub_remove_account')}
          />
          {/* <Button
           
          >
            Delete Account
          </Button> */}
          <IconButton
            variant="outlined"
            color="error"
            onClick={handleOnClickDeleteAcc}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </ListItem>
      </List>
      {openConfirmDeleteDialog && (
        <ConfirmDialog
          isOpenDialog={openConfirmDeleteDialog}
          onClose={() => setOpenConfirmDeleteDialog(false)}
          onAgree={() => handleDeleteAccount()}
          onDisAgree={() => setOpenConfirmDeleteDialog(false)}
          title="th_key_setting_remove_account"
          content="th_key_setting_delete_message_affirm"
        />
      )}
    </MainCard>
  );
};

export default TabSettings;
