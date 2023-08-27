import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

// third-party
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import MultiFileDrop from '../../base/component/MultiFileDrop';
import TasktagAutocomplete from '../../base/component/TasktagAutocomplete';
import TimeRangeUnit from '../../base/component/DateTime/TimeRangeUnit';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { isDayjs } from 'dayjs';
import CitySelect from '../../base/component/CitySelect';
import DistrictSelect from '../../base/component/DistrictSelect';
import axios from 'axios';
import useLogin from '../../hooks/useLogin';
import useToastify from '../../hooks/useToastify';
import { API_URL } from '../../base/config';
import vietnameseDayOfWeekFormatter from '../../utils/vietnameseDayOfWeekFormatter';
import { LoadingButton } from '@mui/lab';

const PostModal = ({ type, value = {}, open, onClose, onCreateSuccess }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isCreating = !value;
  const { getUserToken } = useLogin();
  const token = getUserToken();
  const { toastError, toastSuccess } = useToastify();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const curHour = dayjs().hour();

  // const generateFromTo = (date) => {
  //   if (date.isSame(dayjs(), 'day')) {
  //     return ;
  //   } else {
  //     return {
  //       from: '07:00',
  //       to: '08:00',
  //     };
  //   }
  // };

  const getInitialValues = (post) => {
    const newPost = {
      taskTag: post?.taskTag
        ? {
            label: t(post?.taskTag?.langKey),
            value: post?.taskTag?._id,
          }
        : '',
      cityId: post?.cityInfo?._id || '',
      districtId: post?.workLocation?._id || '',
      text: post?.text || '',
      address: post?.address || '',
      workTime: post?.workTime
        ? {
            from: dayjs(post?.workTime?.from).format('HH:mm'),
            to: dayjs(post?.workTime?.to).format('HH:mm'),
          }
        : dayjs().hour() < 22
        ? {
            from: `0${dayjs().hour() + 1}:00`,
            to: `0${dayjs().hour() + 2}:00`,
          }
        : { from: '07:00', to: '08:00' },
      workDate: post?.workTime?.from
        ? dayjs(post?.workTime?.from)
        : dayjs().hour() < 22
        ? dayjs(new Date())
        : dayjs(new Date()).add(24, 'hour'),
      files: [],
      paymentPlan: post?.paymentPlan || 'per-hour',
      closeRegisterAt: post?.closeRegisterAt
        ? dayjs(post?.closeRegisterAt)
        : dayjs(new Date()).add(60, 'minute'),
    };
    return newPost;
  };

  const validationSchema = yup.object({
    taskTag: yup.object().typeError('Tag is required'),
    cityId: yup.string().required('City is required'),
    districtId: yup.string().required('Distric is required'),
    address: yup.string().required('Address is required'),
  });

  const today = new Date();
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setHours(0, 0, 0, 0);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay()); // Assuming Sunday is the first day of the week

  const maxDate = new Date(startOfCurrentWeek);
  maxDate.setDate(startOfCurrentWeek.getDate() + 20);

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: getInitialValues(value),
  });

  const cityIdValue = watch('cityId');

  console.log(
    'MaxTime',
    dayjs(
      `${watch('workDate').format('YYYY-MM-DD')} ${watch('workTime')?.from}`
    ).format('DD-MM-YYYY HH:mm'),
    'maxDate',
    watch('closeRegisterAt').format('DD-MM-YYYY HH:mm'),
    'minTime',
    dayjs(new Date()).add(50, 'minute').format('DD-MM-YYYY HH:mm')
  );

  const onSubmitHandler = (data) => {
    setIsSubmitting(true);
    if (data) {
      const from = dayjs(
        `${dayjs(data?.workDate).format('YYYY-MM-DD')} ${data?.workTime?.from}`
      ).unix();
      const to = dayjs(
        `${dayjs(data?.workDate).format('YYYY-MM-DD')} ${data?.workTime?.to}`
      ).unix();
      console.log('checkDateTime', from, to);
      const formData = new FormData();
      formData.append('text', data?.text);
      data?.files?.map((file) => {
        formData.append('photos', file);
      });
      formData.append('address', data?.address);
      formData.append('taskTag', data?.taskTag?.value);
      formData.append('workLocationId', data?.districtId);
      formData.append(
        'workTime',
        JSON.stringify({
          from: dayjs(new Date(from * 1000)).toISOString(),
          to: dayjs(new Date(to * 1000)).toISOString(),
        })
      );
      formData.append(
        'closeRegisterAt',
        dayjs(data?.closeRegisterAt).toISOString()
      );
      console.log('formDataOnsubmit', formData);

      axios
        .post(`${API_URL}api/v1/post`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Đảm bảo đặt đúng header 'Content-Type' cho form data
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('postValueSucces', response);
          toastSuccess('Create new post success');
          setIsSubmitting(false);
          onCreateSuccess && onCreateSuccess();
          onClose && onClose();
          // resetForm();
        })
        .catch((error) => {
          console.error(error);
          console.error('Error:', Object.keys(error), error.message);
          console.error(error?.config);
          console.error(error?.request);
          console.error(error?.response);
          toastError(`Update error, ${error.message}`);
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ '& .MuiDialog-paper': { p: 0 } }}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                    <Controller
                      name="taskTag"
                      control={control}
                      render={({ field }) => (
                        <TasktagAutocomplete
                          id={'taskTag'}
                          // value={getValues('taskTag')}
                          value={field?.value}
                          onChange={(tagId) => setValue('taskTag', tagId)}
                          error={Boolean(errors.taskTag)}
                          helperText={errors.taskTag && errors.taskTag.message}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">Thành phố</InputLabel>
                    <Controller
                      name="cityId"
                      control={control}
                      render={({ field }) => (
                        <CitySelect
                          id={'cityId'}
                          value={field?.value}
                          onChange={(value) => {
                            console.log('setDistrictSelected', value);
                            setValue('cityId', value?._id);
                          }}
                          error={Boolean(errors.cityId)}
                          helperText={errors.cityId && errors.cityId.message}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">Quận, Huyện</InputLabel>
                    <Controller
                      name="districtId"
                      control={control}
                      render={({ field }) => (
                        <DistrictSelect
                          id={'districtId'}
                          cityId={cityIdValue}
                          // value={getValues('districtId')}
                          value={field?.value}
                          onChange={(value) => {
                            console.log('districtId', value);
                            setValue('districtId', value?._id);
                          }}
                          error={Boolean(errors.districtId)}
                          helperText={
                            errors.districtId && errors.districtId.message
                          }
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">
                      Địa chỉ cụ thể
                    </InputLabel>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="address"
                          placeholder="Nhập địa chỉ cụ thể"
                          {...field}
                          error={Boolean(errors.address)}
                          helperText={errors.address && errors.address.message}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">
                      Ngày làm việc
                    </InputLabel>
                    <Controller
                      name="workDate"
                      control={control}
                      render={({ field }) => (
                        //     <TimeRangeUnit
                        // value={field.value}
                        // onChange={(val) => setValue('workTime', val)}
                        // />
                        <DatePicker
                          value={field.value}
                          // onChange={(date) => console.log('date', date)}
                          onChange={(date) => setValue('workDate', date)}
                          disableHighlightToday
                          minDate={
                            dayjs().hour() < 22
                              ? dayjs(new Date())
                              : dayjs(new Date()).add(24, 'hour')
                          }
                          maxDate={dayjs(maxDate)}
                          disablePast
                          dayOfWeekFormatter={vietnameseDayOfWeekFormatter}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">Thời gian</InputLabel>
                    <Controller
                      name="workTime"
                      control={control}
                      render={({ field }) => (
                        <TimeRangeUnit
                          value={field.value}
                          onChange={(val) => setValue('workTime', val)}
                          selectedDate={watch('workDate')}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="paymentPlan"
                      sx={{ textAlign: 'start' }}
                    >
                      {t('th_key_payrollmethod')}
                    </InputLabel>
                    <Controller
                      name="paymentPlan"
                      control={control}
                      render={({ field }) => (
                        <Select
                          labelId="paymentPlan"
                          id="paymentPlan"
                          name="paymentPlan"
                          {...field}
                        >
                          <MenuItem value={'per-hour'}>
                            {t('th_key_payment_perhour')}
                          </MenuItem>
                          <MenuItem value={'one-time'}>
                            {t('th_key_payment_onetime')}
                          </MenuItem>
                        </Select>
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="text">
                      Mô tả công việc cụ thể
                    </InputLabel>
                    <Controller
                      name="text"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="text"
                          multiline
                          // rows={4}
                          minRows={2}
                          maxRows={6}
                          // sx={{
                          //   textarea: {
                          //     resize: 'vertical',
                          //   },
                          // }}
                          placeholder="Mô tả các yêu cầu của công việc..."
                          {...field}
                          error={Boolean(errors.text)}
                          helperText={errors.text && errors.text.message}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-name">
                      Thời hạn phản hồi
                    </InputLabel>
                    <Controller
                      name="closeRegisterAt"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth variant="standard">
                          <DateTimePicker
                            {...field}
                            dayOfWeekFormatter={vietnameseDayOfWeekFormatter}
                            disablePast
                            onChange={(newValue) =>
                              setValue('closeRegisterAt', newValue)
                            }
                            ampm={false}
                            timeSteps={{ hours: 1, minutes: 1 }}
                            firstDayOfWeek={0}
                            disableHighlightToday
                            maxDate={watch('workDate').add(1, 'day')}
                            minTime={dayjs(new Date()).add(50, 'minute')}
                            maxTime={dayjs(
                              `${watch('workDate').format('YYYY-MM-DD')} ${
                                watch('workTime')?.from
                              }`
                            )}
                            renderInput={(params) => (
                              <TextField
                                sx={{ width: '100%' }}
                                {...params}
                                error={Boolean(errors.closeRegisterAt)}
                                helperText={
                                  errors.closeRegisterAt &&
                                  errors.closeRegisterAt.message
                                }
                              />
                            )}
                          />
                        </FormControl>
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="customer-location">
                      Hình ảnh mô tả
                    </InputLabel>
                    <Controller
                      name="files"
                      control={control}
                      render={({ field }) => (
                        <MultiFileDrop
                          showList={true}
                          setFieldValue={(val) => {
                            setValue('files', val);
                          }}
                          // files={getValues('files')}
                          files={field.value}
                          error={Boolean(errors.files)}
                        />
                      )}
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
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={!isDirty}
                >
                  {value ? t('th_key_btn_update') : t('th_key_btn_post')}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
    //   </Form>
    // </FormikProvider>
  );
};

export default PostModal;
