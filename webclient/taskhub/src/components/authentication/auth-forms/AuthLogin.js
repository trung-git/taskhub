import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project import
import FirebaseSocial from './FirebaseSocial';
// import AnimateButton from 'components/@extended/AnimateButton';

// assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { API_URL } from '../../../base/config';
import { LoginContext } from '../../../provider/LoginContext';
import AnimateButton from '../../../base/component/AnimateButton';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);
  const logincontext = useContext(LoginContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleSubmitLogin(values, { setErrors, setStatus, setSubmitting }) {
    const requestData = {
      username: values.username,
      password: values.password,
      role: 'Finder',
    };
    axios
      .post(`${API_URL}api/v1/user/login`, requestData)
      .then((response) => {
        // Handle successful login
        console.log('userData', response);
        setSubmitting(false);
        setStatus({ success: true });
        logincontext.setIsLogin(true);
        navigate('/');
      })
      .catch((error) => {
        // Handle error
        console.log('userDataerror', error);
        if (error?.response?.data?.message) {
          // setErrors(error?.response?.data?.message);
          setErrors({ submit: error?.response?.data?.message });
        }
        setStatus({ success: false });
        setSubmitting(false);
      });
  }

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('User name is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={handleSubmitLogin}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1} alignItems={'flex-start'}>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <OutlinedInput
                    id="username"
                    type="username"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter username"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-username-login"
                    >
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1} alignItems={'flex-start'}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="h6">Keep me sign in</Typography>
                    }
                  /> */}
                  <Link
                    variant="subtitle1"
                    component={RouterLink}
                    to=""
                    color="text.primary"
                  >
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    loading={isSubmitting}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="success"
                  >
                    {t('th_key_signin')}
                  </LoadingButton>
                </AnimateButton>
                {/* <LoadingButton
                  type="submit"
                  fullWidth
                  loading={isSubmitting}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="success"
                >
                  {t('th_key_signin')}
                </LoadingButton> */}
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
