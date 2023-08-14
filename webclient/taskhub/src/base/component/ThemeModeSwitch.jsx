import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useConfig from '../../hooks/useConfig';
import { useEffect, useState } from 'react';

const ThemeModeSwitch = () => {
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();

  const [darkMode, setDarkMode] = useState(mode === 'dark' ? true : false);

  const handleChangeMode = () => {
    if (darkMode) {
      setDarkMode(false);
      onChangeMode('light');
    } else {
      setDarkMode(true);
      onChangeMode('dark');
    }
  };

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() => handleChangeMode()}
      color="inherit"
    >
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ThemeModeSwitch;
