import React, { useContext, useEffect } from 'react';
import './App.css';
import Scrolltop from './components/Scrolltop';
import { Box, CssBaseline } from '@mui/material';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Routes from './routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'dayjs/locale/en';
import { LoginContext } from './provider/LoginContext';
import useLogin from './hooks/useLogin';
import { viVN } from '@mui/x-date-pickers/locales';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E33E7F',
    },
    secondary: {
      main: '#ff0000', // very red
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    // Các màu sắc tối phổ biến
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  return (
    <LocalizationProvider
      localeText={
        viVN.components.MuiLocalizationProvider.defaultProps.localeText
      }
      dateAdapter={AdapterDayjs}
    >
      <MuiThemeProvider theme={darkTheme}>
        <I18nextProvider i18n={i18n}>
          <CssBaseline />
          <Box className="App">
            <Scrolltop>
              <Routes />
            </Scrolltop>
            <div id="toast"></div>
          </Box>
        </I18nextProvider>
      </MuiThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
