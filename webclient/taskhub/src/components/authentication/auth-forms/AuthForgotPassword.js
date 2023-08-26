// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from '../../../base/component/AnimateButton';
import axios from 'axios';
import { API_URL } from '../../../base/config';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = () => {
  function handleForgot(values, { setErrors, setStatus, setSubmitting }) {
    const requestData = {
      email: values.email,
    };
    axios
      .post(`${API_URL}api/v1/user/forgot-password`, requestData)
      .then((response) => {
        // Handle successful login
        console.log('handleForgot', response);
        setSubmitting(false);
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
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
        })}
        onSubmit={handleForgot}
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
                  <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-forgot">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12} sx={{ mb: -2 }} alignItems={'flex-start'}>
                <Typography textAlign={'start'}>
                  Do not forgot to check SPAM box.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Send Password Reset Email
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForgotPassword;
