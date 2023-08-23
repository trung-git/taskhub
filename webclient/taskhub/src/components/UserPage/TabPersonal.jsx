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
import { useTranslation } from 'react-i18next';

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {
  const { t } = useTranslation();
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
      title={t('th_key_person_information')}
      sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}
    >
      {userData && (
        <Formik
          initialValues={{
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email,
            dateOfBirth: dayjs(userData?.dateOfBirth),
            phoneNumber: userData?.phoneNumber,
            city: userData?.city,
            gender: userData?.gender,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .max(255)
              .required('First Name is required.'),
            lastName: Yup.string().max(255).required('Last Name is required.'),
            email: Yup.string()
              .email('Invalid email address.')
              .max(255)
              .required('Email is required.'),
            dateOfBirth: Yup.date()
              .max(maxDate, 'Age should be 18+ years.')
              .required('Date of birth is requird.'),
            phoneNumber: Yup.number(),
          })}
          onSubmit={(
            values,
            { setErrors, setStatus, setSubmitting, resetForm }
          ) => {
            try {
              console.log('valuesOnUpdate', values);
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
              setStatus({ success: true });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
              resetForm();
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
                          {t('th_key_firstname')}
                        </InputLabel>
                        <TextField
                          fullWidth
                          id="firstName"
                          value={values.firstName}
                          name="firstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={t('th_key_firstname')}
                          // autoFocus
                          // inputRef={inputRef}
                        />
                        {touched.firstName && errors.firstName && (
                          <FormHelperText error id="personal-first-name-helper">
                            {errors.firstName}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel
                          sx={{ textAlign: 'start' }}
                          htmlFor="lastName"
                        >
                          {t('th_key_lastname')}
                        </InputLabel>
                        <TextField
                          fullWidth
                          id="lastName"
                          value={values.lastName}
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={t('th_key_lastname')}
                        />
                        {touched.lastName && errors.lastName && (
                          <FormHelperText error id="lastName-helper">
                            {errors.lastName}
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
                          {t('th_key_email')}
                        </InputLabel>
                        <TextField
                          type="email"
                          fullWidth
                          value={values?.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="personal-email"
                          placeholder={t('th_key_email')}
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
                          htmlFor="dateOfBirth"
                        >
                          {t('th_key_dateofbirth')}
                        </InputLabel>
                        <DatePicker
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={values?.dateOfBirth}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel
                          sx={{ textAlign: 'start' }}
                          htmlFor="phoneNumber"
                        >
                          {t('th_key_phonenumber')}
                        </InputLabel>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <TextField
                            fullWidth
                            id="phoneNumber"
                            value={values?.phoneNumber}
                            name="phoneNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder={t('th_key_phonenumber')}
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
                          htmlFor="gender"
                        >
                          {t('th_key_gender')}
                        </InputLabel>
                        <Select
                          id="gender"
                          name="gender"
                          value={values?.gender}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <MenuItem value={'Male'}>
                            {t('th_key_gender_male')}
                          </MenuItem>
                          <MenuItem value={'Female'}>
                            {t('th_key_gender_female')}
                          </MenuItem>
                        </Select>
                        {/* {touched.gender && errors.gender && (
                          <FormHelperText
                            error
                            id="personal-designation-helper"
                          >
                            {errors.gender}
                          </FormHelperText>
                        )} */}
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
                    <Button
                      variant="outlined"
                      color="secondary"
                      disabled={isSubmitting}
                    >
                      {t('th_key_btn_cancel')}
                    </Button>
                    <Button
                      disabled={
                        isSubmitting || Object.keys(errors).length !== 0
                      }
                      type="submit"
                      variant="contained"
                    >
                      {t('th_key_btn_save')}
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
