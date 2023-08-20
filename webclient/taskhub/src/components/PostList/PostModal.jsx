import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

const getInitialValues = (customer) => {
  const newCustomer = {
    name: '',
    email: '',
    location: '',
    orderStatus: '',
  };

  if (customer) {
    newCustomer.name = customer.fatherName;
    newCustomer.location = customer.address;
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

const PostModal = ({ type, value, open, onClose }) => {
  const theme = useTheme();
  const isCreating = !value;

  const CustomerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    orderStatus: Yup.string().required('Name is required'),
    email: Yup.string()
      .max(255)
      .required('Email is required')
      .email('Must be a valid email'),
    location: Yup.string().max(500),
  });

  const deleteHandler = () => {
    // onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(value),
    validationSchema: CustomerSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (value) {
        } else {
        }

        setSubmitting(false);
        // onCancel();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
  } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogTitle>{value ? 'Edit Customer' : 'New Customer'}</DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2.5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">Name</InputLabel>
                    <TextField
                      fullWidth
                      id="customer-name"
                      placeholder="Enter Customer Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-email">Email</InputLabel>
                    <TextField
                      fullWidth
                      id="customer-email"
                      placeholder="Enter Customer Email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-location">
                      Location
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="customer-location"
                      multiline
                      rows={2}
                      placeholder="Enter Location"
                      {...getFieldProps('location')}
                      error={Boolean(touched.location && errors.location)}
                      helperText={touched.location && errors.location}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1">
                        Make Contact Info Public
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Means that anyone viewing your profile will be able to
                        see your contacts details
                      </Typography>
                    </Stack>
                    <FormControlLabel
                      control={<Switch defaultChecked sx={{ mt: 0 }} />}
                      label=""
                      labelPlacement="start"
                    />
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1">
                        Available to hire
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Toggling this will let your teammates know that you are
                        available for acquiring new projects
                      </Typography>
                    </Stack>
                    <FormControlLabel
                      control={<Switch sx={{ mt: 0 }} />}
                      label=""
                      labelPlacement="start"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="flex-end" alignItems="center">
            {/* <Grid item>
            {!isCreating && (
              <Tooltip title="Delete Customer" placement="top">
                <IconButton onClick={deleteHandler} size="large" color="error">
                  <DeleteFilled />
                </IconButton>
              </Tooltip>
            )}
          </Grid> */}
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button color="error" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {value ? 'Edit' : 'Add'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
};

export default PostModal;
