import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import SignInSide from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Scrolltop from './components/Scrolltop';
import { Box, CssBaseline } from '@mui/material';
import { LoginContext } from './provider/LoginContext';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Chat from './components/Chat';
import NavBar from './components/Home/NavBar';
import Finding from './components/Finding';

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
  const { isLogin } = useContext(LoginContext);
  return (
    <MuiThemeProvider theme={darkTheme}>
      <I18nextProvider i18n={i18n}>
        <CssBaseline />
        <Box className="App">
          {/* <Navbar/> */}
          {/* <NavBar isLogin={isLogin} /> */}

          <Scrolltop>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signin" element={<SignInSide />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/chat" element={<Chat />} />
              <Route exact path="/find/:id" element={<Finding />} />
            </Routes>
          </Scrolltop>

          {/* <Footer /> */}
          <div id="toast"></div>
        </Box>
      </I18nextProvider>
    </MuiThemeProvider>
  );
}

export default App;
