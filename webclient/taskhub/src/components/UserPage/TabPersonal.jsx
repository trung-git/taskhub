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
import axios from 'axios';
import { API_URL } from '../../base/config';
import useToastify from '../../hooks/useToastify';
import useLogin from '../../hooks/useLogin';

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

  const { setUserData: setLocalUserData, getUserToken } = useLogin();
  const { toastError, toastSuccess } = useToastify();
  const { setCurrentUser } = useContext(LoginContext);

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
            phoneNumber:
              userData?.phoneNumber !== undefined ? userData?.phoneNumber : '',
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
            phoneNumber: Yup.string() // Sử dụng Yup.string() thay vì Yup.number() để cho phép giá trị null
              .nullable() // Cho phép giá trị null
              .test('phone-test', 'Invalid phone number.', function (value) {
                if (!value) {
                  return true; // Cho phép giá trị null
                }
                return /^\d{10}$/.test(value);
              }),
          })}
          onSubmit={(
            values,
            { setErrors, setStatus, setSubmitting, resetForm, setValues }
          ) => {
            try {
              console.log('valuesOnUpdate', values);
              const formData = {
                firstName: values?.firstName,
                lastName: values?.lastName,
                gender: values?.gender,
                dateOfBirth: values?.dateOfBirth,
                phoneNumber: values?.phoneNumber || '',
              };
              console.log('formData', formData);
              const token = getUserToken();

              axios
                .post(`${API_URL}api/v1/user/update-profile`, formData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((response) => {
                  console.log('signUpsuccess', response);
                  console.log(
                    'Upload successful:',
                    response?.data.data?.updatedUser
                  );
                  setLocalUserData(response?.data.data?.updatedUser);
                  setCurrentUser(response?.data.data?.updatedUser);
                  setValues(response?.data.data?.updatedUser);
                  resetForm({ values: response?.data.data?.updatedUser });
                  toastSuccess('Update success');
                })
                .catch((error) => {
                  console.error(error);
                  console.error('Error:', Object.keys(error), error.message);
                  console.error(error?.config);
                  console.error(error?.request);
                  console.error(error?.response);
                  toastError(`Update error, ${error.message}`);
                });
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
            dirty,
            resetForm,
          }) => {
            console.log('valuesFormik', values, dirty);
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
                          InputProps={{
                            readOnly: true,
                          }}
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
                    {dirty && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={isSubmitting}
                        onClick={() => resetForm()}
                      >
                        {t('th_key_btn_cancel')}
                      </Button>
                    )}
                    <Button
                      disabled={
                        isSubmitting ||
                        Object.keys(errors).length !== 0 ||
                        !dirty
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
