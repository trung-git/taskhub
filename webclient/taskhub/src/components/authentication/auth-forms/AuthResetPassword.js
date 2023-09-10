import { useEffect, useState, SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

// third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AnimateButton from '../../../base/component/AnimateButton';
import axios from 'axios';
import { API_URL } from '../../../base/config';
import useToastify from '../../../hooks/useToastify';

const validationSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must meet the requirements'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const AuthResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const token = params?.token;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toastError, toastSuccess } = useToastify();

  console.log('tokenAuthResetPassword', params, token);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitHandler = (data) => {
    setIsSubmitting(true);
    const requestData = {
      password: data.password,
    };
    axios
      .patch(`${API_URL}api/v1/user/reset-password/${token}`, requestData)
      .then((response) => {
        console.log('userData', response);
        setIsSubmitting(false);
        toastSuccess('Reset password success');
        navigate('/login');
      })
      .catch((error) => {
        console.log('userDataerror', error);
        // toastError(`Reset password error, ${error.message}`);
        window.dispatchEvent(new ErrorEvent('error', { error }));
        setIsSubmitting(false);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="password-reset">Password</InputLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    {...field}
                    error={Boolean(errors.password)}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {errors.password && (
                    <FormHelperText error id="password-error">
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="confirm-password-reset">
              Confirm Password
            </InputLabel>
            {/* <OutlinedInput
              fullWidth
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              id="confirm-password-reset"
              type="password"
              value={values.confirmPassword}
              name="confirmPassword"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter confirm password"
            /> */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    {...field}
                    error={Boolean(errors.confirmPassword)}
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirmPassword visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {errors.confirmPassword && (
                    <FormHelperText error id="confirmPassword-error">
                      {errors.confirmPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              disabled={isSubmitting || !isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Reset Password
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthResetPassword;
