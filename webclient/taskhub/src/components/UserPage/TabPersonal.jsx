import { RefObject, useContext, useState, useEffect } from 'react';

// material-ui
import { useOutletContext } from 'react-router';

// import { useDispatch } from 'react-redux';

// material-ui
import {
  Autocomplete,
  Box,
  Button,
  CardHeader,
  Chip,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import MainCard from '../../base/component/MainCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoginContext } from '../../provider/LoginContext';

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const { currentUser } = useContext(LoginContext);

  const [userData, setUserData] = useState();

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  console.log('currentUser', userData);
  // const inputRef = useInputRef();

  // const initialValues = {
  //   firstname: userData?.firstName,
  //   lastname: userData?.lastName,
  //   email: userData?.email,
  //   dob: userData?.dateOfBirth,
  //   phoneNumber: userData?.phoneNumber,
  //   city: userData?.city,
  //   gender: userData?.gender,
  //   submit: null,
  // };

  return (
    <MainCard
      content={false}
      title="Personal Information"
      sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}
    >
      {userData && (
        <Formik
          initialValues={{
            firstname: userData?.firstName,
            lastname: userData?.lastName,
            email: userData?.email,
            dob: dayjs(userData?.dateOfBirth),
            phoneNumber: userData?.phoneNumber,
            city: userData?.city,
            gender: userData?.gender,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            firstname: Yup.string()
              .max(255)
              .required('First Name is required.'),
            lastname: Yup.string().max(255).required('Last Name is required.'),
            email: Yup.string()
              .email('Invalid email address.')
              .max(255)
              .required('Email is required.'),
            dob: Yup.date()
              .max(maxDate, 'Age should be 18+ years.')
              .required('Date of birth is requird.'),
            phoneNumber: Yup.number()
              .test(
                'len',
                'phoneNumber should be exactly 10 digit',
                (val) => val?.toString().length === 10
              )
              .required('Phone number is required'),
            designation: Yup.string().required('Designation is required'),
            address: Yup.string()
              .min(50, 'Address to short.')
              .required('Address is required'),
            country: Yup.string().required('Country is required'),
            state: Yup.string().required('State is required'),
            note: Yup.string().min(150, 'Not shoulde be more then 150 char.'),
          })}
          onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
            try {
              // dispatch(
              //   openSnackbar({
              //     open: true,
              //     message: 'Personal profile updated successfully.',
              //     variant: 'alert',
              //     alert: {
              //       color: 'success',
              //     },
              //     close: false,
              //   })
              // );
              setStatus({ success: false });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            touched,
            values,
          }) => {
            console.log('valuesFormik', values);
            return (
              <form noValidate onSubmit={handleSubmit}>
                <Box sx={{ p: 2.5 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel
                          sx={{ textAlign: 'start' }}
                          htmlFor="personal-first-name"
                        >
                          First Name
                        </InputLabel>
                        <TextField
                          fullWidth
                          id="personal-first-name"
                          value={values.firstname}
                          name="firstname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="First Name"
                          // autoFocus
                          // inputRef={inputRef}
                        />
                        {touched.firstname && errors.firstname && (
                          <FormHelperText error id="personal-first-name-helper">
                            {errors.firstname}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel
                          sx={{ textAlign: 'start' }}
                          htmlFor="personal-last-name"
                        >
                          Last Name
                        </InputLabel>
                        <TextField
                          fullWidth
                          id="personal-last-name"
                          value={values.lastname}
                          name="lastname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Last Name"
                        />
                        {touched.lastname && errors.lastname && (
                          <FormHelperText error id="personal-last-name-helper">
                            {errors.lastname}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel
                          sx={{ textAlign: 'start' }}
                          htmlFor="personal-email"
                        >
                          Email Address
                        </InputLabel>
                        <TextField
                          type="email"
                          fullWidth
                          value={values?.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="personal-email"
                          placeholder="Email Address"
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="personal-email-helper">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel
                          sx={{ textAlign: 'start' }}
                          htmlFor="personal-date"
                        >
                          Date of Birth
                        </InputLabel>
                        <DatePicker
                          value={values?.dob}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel
                          sx={{ textAlign: 'start' }}
                          htmlFor="personal-phone"
                        >
                          Phone Number
                        </InputLabel>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <TextField
                            fullWidth
                            id="personal-phoneNumber"
                            value={values?.phoneNumber}
                            name="phoneNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="phoneNumber Number"
                          />
                        </Stack>
                        {touched.phoneNumber && errors.phoneNumber && (
                          <FormHelperText
                            error
                            id="personal-phoneNumber-helper"
                          >
                            {errors.phoneNumber}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel
                          sx={{ textAlign: 'start' }}
                          htmlFor="personal-designation"
                        >
                          Gender
                        </InputLabel>
                        {/* <TextField
                          fullWidth
                          id="personal-designation"
                          value={values?.designation}
                          name="designation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Designation"
                        /> */}
                        <Select
                          id="personal-designation"
                          value={values?.gender}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                        </Select>
                        {touched.gender && errors.gender && (
                          <FormHelperText
                            error
                            id="personal-designation-helper"
                          >
                            {errors.gender}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box sx={{ p: 2.5 }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button variant="outlined" color="secondary">
                      Cancel
                    </Button>
                    <Button
                      disabled={
                        isSubmitting || Object.keys(errors).length !== 0
                      }
                      type="submit"
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Stack>
                </Box>
              </form>
            );
          }}
        </Formik>
      )}
    </MainCard>
  );
};

export default TabPersonal;