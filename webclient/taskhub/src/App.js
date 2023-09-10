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
import ThemeCustomization from './themes';
import { viVN } from '@mui/x-date-pickers/locales';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route } from 'react-router';
import ErrorBoundary from './base/component/ErrorBoundary';
import NotLogin from './base/component/NotLogin';

function App() {
  return (
    <ThemeCustomization>
      <LocalizationProvider
        localeText={
          viVN.components.MuiLocalizationProvider.defaultProps.localeText
        }
        dateAdapter={AdapterDayjs}
      >
        <I18nextProvider i18n={i18n}>
          <CssBaseline />
          <Box className="App">
            <Scrolltop>
              <ErrorBoundary>
                <Routes />
              </ErrorBoundary>
            </Scrolltop>
          </Box>
          <ToastContainer />
        </I18nextProvider>
      </LocalizationProvider>
    </ThemeCustomization>
  );
}

export default App;
