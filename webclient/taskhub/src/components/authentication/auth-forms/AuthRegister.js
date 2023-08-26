import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FirebaseSocial from './FirebaseSocial';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import CitySelect from '../../../base/component/CitySelect';
import AnimateButton from '../../../base/component/AnimateButton';
import axios from 'axios';
import { API_URL } from '../../../base/config';
import useToastify from '../../../hooks/useToastify';

const validationSchema = yup.object({
  firstname: yup.string().max(255).required('First Name is required'),
  username: yup.string().max(255).required('Username is required'),
  lastname: yup.string().max(255).required('Last Name is required'),
  city: yup.string().required('City is required'),
  email: yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must meet the requirements'
    ),
});

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toastError, toastSuccess } = useToastify();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      username: '',
      dateOfBirth: new Date('2000-01-01'),
      gender: 'Male',
      city: '',
    },
  });

  console.log('formDataSignUp', watch());

  const onSubmitHandler = (data) => {
    setIsSubmitting(true);
    const requestData = {
      username: data.username,
      firstName: data.firstname,
      lastName: data.lastname,
      dateOfBirth: dayjs(data.dateOfBirth).toISOString(),
      email: data.email,
      gender: data.gender,
      role: 'Finder',
      password: data.password,
      city: data.city,
    };
    axios
      .post(`${API_URL}api/v1/user/signup`, requestData)
      .then((response) => {
        console.log('userData', response);
        setIsSubmitting(false);
        toastSuccess('Sign up success');
        navigate('/login');
      })
      .catch((error) => {
        console.log('userDataerror', error);
        toastError(`Sign up error, ${error.message}`);
        setIsSubmitting(false);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid container spacing={3}>
        {/* First Name */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="firstname-signup">
              First Name <span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="firstname"
                  placeholder="Your first name"
                  {...field}
                  error={Boolean(errors.firstname)}
                  helperText={errors.firstname && errors.firstname.message}
                />
              )}
            />
          </Stack>
        </Grid>
        {/* Last Name */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="lastname"
                  placeholder="Your last name"
                  {...field}
                  error={Boolean(errors.lastname)}
                  helperText={errors.lastname && errors.lastname.message}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="firstname-signup">Gender*</InputLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select labelId="gender" id="gender" name="gender" {...field}>
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
        </Grid>
        {/*  DOB */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="lastname-signup">Date Of Birth*</InputLabel>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  name="dateOfBirth"
                  views={['year', 'month', 'day']}
                  value={dayjs(field.value)}
                  onChange={(newValue) =>
                    setValue('dateOfBirth', newValue.toISOString())
                  }
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="company-signup">City</InputLabel>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <CitySelect
                  id={'city'}
                  value={field?.value}
                  onChange={(value) => {
                    console.log('setDistrictSelected', value);
                    setValue('city', value._id);
                  }}
                  error={Boolean(errors.city)}
                  helperText={errors.city && errors.city.message}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="email">Email Address*</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="email"
                  placeholder="Nhập địa chỉ email"
                  {...field}
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="username">Username*</InputLabel>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="username"
                  placeholder="username"
                  {...field}
                  error={Boolean(errors.username)}
                  helperText={errors.username && errors.username.message}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1} alignItems={'flex-start'}>
            <InputLabel htmlFor="password-signup">Password*</InputLabel>
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
          <Typography variant="body2">
            By Signing up, you agree to our &nbsp;
            <Link variant="subtitle2" component={RouterLink} to="#">
              Terms of Service
            </Link>
            &nbsp; and &nbsp;
            <Link variant="subtitle2" component={RouterLink} to="#">
              Privacy Policy
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <LoadingButton
              type="submit"
              fullWidth
              loading={isSubmitting}
              disabled={!isValid}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              {t('th_key_signup')}
            </LoadingButton>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography variant="caption">Sign up with</Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <FirebaseSocial />
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUp;
