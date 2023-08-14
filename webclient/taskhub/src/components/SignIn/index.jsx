import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginbackground from '../../assets/img/loginbackground.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../provider/LoginContext';
import { useContext } from 'react';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import TaskHubLogo from '../../base/component/TaskHubLogo';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../base/config';

const defaultTheme = createTheme();

export default function SignInSide() {
  // state
  const [isFetchLogin, setIsFetchLogin] = useState(false);
  const [isLoggedError, setIsLoggedError] = useState(false);
  const [errorText, setErrorText] = useState('');

  // context
  const logincontext = useContext(LoginContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (username, password) => {
    const requestData = {
      username: username,
      password: password,
      role: 'Finder',
    };
    console.log('requestData', requestData);
    axios
      .post(`${API_URL}api/v1/user/login`, requestData)
      .then((response) => {
        // Handle successful login
        console.log('userData', response);
        setIsFetchLogin(false);
        logincontext.setIsLogin(true);
        navigate('/');
      })
      .catch((error) => {
        // Handle error
        console.log('userDataerror', error);
        if (error?.response?.data?.message) {
          setErrorText(error?.response?.data?.message);
        }
        setIsFetchLogin(false);
        setIsLoggedError(true);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    if (username !== '' && password !== '') {
      setIsFetchLogin(true);
      handleLogin(username, password);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginbackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <TaskHubLogo />
            {/* <Typography component="h1" variant="h5">
              Welcome to TaskHUB!
            </Typography> */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: '100%' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                // color="success"
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              /> */}
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  // color="success"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                />
              </FormControl>
              {isLoggedError && <Typography>{t(errorText)}</Typography>}
              {/* <Stack justifyContent={'flex-start'}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Stack> */}
              <LoadingButton
                type="submit"
                fullWidth
                loading={isFetchLogin}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // color="success"
              >
                {t('th_key_signin')}
              </LoadingButton>
              <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item xs sx={{ display: 'flex' }}>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
