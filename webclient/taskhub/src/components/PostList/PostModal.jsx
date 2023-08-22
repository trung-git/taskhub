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
import { useTranslation } from 'react-i18next';
import MultiFileDrop from '../../base/component/MultiFileDrop';
import TasktagAutocomplete from '../../base/component/TasktagAutocomplete';
import TimeRangeUnit from '../../base/component/DateTime/TimeRangeUnit';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { isDayjs } from 'dayjs';
import CitySelect from '../../base/component/CitySelect';
import DistrictSelect from '../../base/component/DistrictSelect';
import axios from 'axios';
import useLogin from '../../hooks/useLogin';
import useToastify from '../../hooks/useToastify';

const getInitialValues = (post) => {
  const newPost = {
    taskTag: post?.taskTag?._id || '',
    cityId: '',
    districtId: '',
    text: '',
    address: '',
    workDate: new Date(),
    files: [],
    closeRegisterAt: new Date(),
  };
  return newPost;
};

const PostModal = ({ type, value = {}, open, onClose }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isCreating = !value;
  const { getUserToken } = useLogin();
  const token = getUserToken();
  const { toastError, toastSuccess } = useToastify();

  const CustomerSchema = Yup.object().shape({
    taskTag: Yup.object().required('Tag is required'),
    cityId: Yup.string().required('City is required'),
    districtId: Yup.string().required('Distric is required'),
    address: Yup.string().required('Address is required'),
  });

  const today = new Date();
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setHours(0, 0, 0, 0);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay()); // Assuming Sunday is the first day of the week

  const maxDate = new Date(startOfCurrentWeek);
  maxDate.setDate(startOfCurrentWeek.getDate() + 20);

  const deleteHandler = () => {
    // onCancel();
  };
  const reader = new FileReader();
  reader.onload = function (event) {
    const binaryData = new Uint8Array(event.target.result);
    // Now you can use the binary data as needed
    // For example, you can convert it to Base64, if required
    return binaryData;
  };

  const formik = useFormik({
    initialValues: getInitialValues(value),
    validationSchema: CustomerSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('valuessetSubmitting', values);
      try {
        if (values) {
          const formData = new FormData();
          formData.append('text', values?.text);
          // formData.append('photos', values?.files || []);
          formData.append('address', values?.address);
          formData.append('taskTag', values?.taskTag?.value);
          formData.append('workLocationId', values?.districtId);
          formData.append(
            'workTime',
            JSON.stringify({
              from: dayjs(new Date()).toISOString(),
              to: dayjs(new Date()).toISOString(),
            })
          );
          // formData.append('workTime.from', dayjs(new Date()).toISOString());
          // formData.append('workTime.to', dayjs(new Date()).toISOString());
          formData.append(
            'closeRegisterAt',
            dayjs(values?.closeRegisterAt).toISOString()
          );
          console.log('formDataOnsubmit', formData);

          axios
            .post('https://taskhub-mhm7.onrender.com/api/v1/post', formData, {
              headers: {
                'Content-Type': 'multipart/form-data', // Đảm bảo đặt đúng header 'Content-Type' cho form data
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log('postValueSucces', response);
              toastSuccess('Create new post success');
            })
            .catch((error) => {
              console.error(error);
              console.error('Error:', Object.keys(error), error.message);
              console.error(error?.config);
              console.error(error?.request);
              console.error(error?.response);
              toastError(`Update error, ${error.message}`);
            });
        } else {
          setSubmitting(false);
        }
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
        <DialogTitle>
          {value ? t('th_post_edit_post') : t('th_post_add_new_post')}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 2.5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">Công việc</InputLabel>
                    <TasktagAutocomplete
                      id={'taskTag'}
                      value={getFieldProps('taskTag').value}
                      onChange={(tagId) => setFieldValue('taskTag', tagId)}
                      error={Boolean(touched.taskTag && errors.taskTag)}
                      helperText={touched.taskTag && errors.taskTag}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">Thành phố</InputLabel>
                    {/* <TextField
                      fullWidth
                      id="customer-email"
                      placeholder="Enter Customer Email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    /> */}
                    <CitySelect
                      id={'cityId'}
                      value={getFieldProps('cityId').value}
                      onChange={(value) => {
                        console.log('setDistrictSelected', value);
                        setFieldValue('cityId', value?._id);
                      }}
                      // {...getFieldProps('cityId')}
                      error={Boolean(touched.cityId && errors.cityId)}
                      helperText={touched.cityId && errors.cityId}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">Quận, Huyện</InputLabel>
                    {/* <TextField
                      fullWidth
                      id="customer-email"
                      placeholder="Enter Customer Email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    /> */}
                    <DistrictSelect
                      id={'districtId'}
                      cityId={getFieldProps('cityId').value}
                      value={getFieldProps('districtId').value}
                      onChange={(value) => {
                        console.log('districtId', value);
                        setFieldValue('districtId', value?._id);
                      }}
                      error={Boolean(touched.districtId && errors.districtId)}
                      helperText={touched.districtId && errors.districtId}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">
                      Địa chỉ cụ thể
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="address"
                      placeholder="Nhập địa chỉ cụ thể"
                      {...getFieldProps('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">
                      Ngày làm việc
                    </InputLabel>
                    <DatePicker
                      value={dayjs(getFieldProps('workDate').value)}
                      onChange={(date) => console.log('date', date)}
                      disableHighlightToday
                      minDate={dayjs(startOfCurrentWeek)}
                      maxDate={dayjs(maxDate)}
                      disablePast
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">Thời gian</InputLabel>
                    <TimeRangeUnit
                    // id="customer-email"
                    // placeholder="Enter Customer Email"
                    // {...getFieldProps('email')}
                    // error={Boolean(touched.email && errors.email)}
                    // helperText={touched.email && errors.email}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="text">
                      Mô tả công việc cụ thể
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="text"
                      multiline
                      rows={2}
                      placeholder="Mô tả các yêu cầu của công việc..."
                      {...getFieldProps('text')}
                      error={Boolean(touched.text && errors.text)}
                      helperText={touched.text && errors.text}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-location">
                      Hình ảnh mô tả
                    </InputLabel>
                    <MultiFileDrop
                      showList={true}
                      {...getFieldProps('files')}
                      setFieldValue={(val) => {
                        setFieldValue('files', val);
                      }}
                      files={getFieldProps('files').value}
                      error={Boolean(touched.files && !!errors.files)}
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
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button color="error" onClick={onClose}>
                  {t('th_key_btn_cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {value ? t('th_key_btn_update') : t('th_key_btn_post')}
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
