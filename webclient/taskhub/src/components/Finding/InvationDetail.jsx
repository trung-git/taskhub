import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/vi';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useToastify from '../../hooks/useToastify';
import axios from 'axios';
import { API_URL } from '../../base/config';
import useLogin from '../../hooks/useLogin';
import ResponseTime from '../../base/component/ResponseTime';
import { DateTimePicker } from '@mui/x-date-pickers';
import vietnameseDayOfWeekFormatter from '../../utils/vietnameseDayOfWeekFormatter';
dayjs.extend(customParseFormat);

const validationSchema = yup.object({
  address: yup.string().required('Address is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .typeError('Price is number required')
    .moreThan(0)
    .required('Price is required'),
});

const renderVietnamdate = (date) => {
  console.log('VietnameseDateComponent', date);
  const vietnameseDate = dayjs(date, {
    customParseFormat: 'YYYY-MM-DD',
  });
  dayjs.locale('vi');
  const formattedDate = vietnameseDate.format(
    'dddd, DD [tháng] MM, [năm] YYYY'
  );
  return formattedDate;
};

const InvationDetail = ({ bookingData, isOpen, handleCloseBookingForm }) => {
  const { t } = useTranslation();
  const { toastError, toastSuccess } = useToastify();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getUserToken } = useLogin();
  const token = getUserToken();

  console.log(
    'bookingData',
    bookingData,
    renderVietnamdate(bookingData?.workTime?.date.format('YYYY-MM-DD'))
  );

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      taskTag: bookingData.taskData,
      workLocation: bookingData.district,
      address: '',
      workDate: bookingData.workTime.date,
      workTimeFrom: bookingData.workTime.from,
      workTimeTo: bookingData.workTime.to,
      price: bookingData.tasker.taskInfo.price,
      paymentPlan: 'per-hour',
      description: '',
      paymentType: 'by-wallet',
      expireAt: dayjs(new Date()).add(1, 'hour'),
    },
  });

  console.log('formData', watch());

  const onSubmitHandler = (data) => {
    if (data) {
      const from = dayjs(
        `${dayjs(bookingData.workTime.date).format('YYYY-MM-DD')} ${
          bookingData?.workTime?.from
        }`
      ).unix();
      const to = dayjs(
        `${dayjs(bookingData.workTime.date).format('YYYY-MM-DD')} ${
          bookingData?.workTime?.to
        }`
      ).unix();

      const contractParams = {
        taskerId: bookingData.tasker?._id,
        taskTagId: bookingData.taskData?._id,
        address: data?.address,
        workLocationId: bookingData.district?._id,
        description: data?.description,
        workTime: {
          from: dayjs(new Date(from * 1000)).toISOString(),
          to: dayjs(new Date(to * 1000)).toISOString(),
        },
        expireAt: data?.expireAt.toISOString(),
        paymentType: data?.paymentType,
        paymentPlan: data?.paymentPlan,
        price: data?.price,
      };
      console.log('formDataOnsubmit', contractParams);

      axios
        .post(`${API_URL}api/v1/contract`, contractParams, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('postValueSucces', response);
          toastSuccess('Send invitation success');
          //TODO reset close append new posr
          // resetForm();
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
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseBookingForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 750,
          bgcolor: 'background.paper',
          border: '2px solid #f0f0f0',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          style={{ height: '100%' }}
        >
          <Stack direction={'column'} alignItems={'center'}>
            <Typography variant="h5">
              {t('Mô tả chi tiết về công việc này')}
            </Typography>
            <Stack
              direction={'row'}
              alignItems={'center'}
              sx={{ width: '100%' }}
            >
              <Avatar
                alt={bookingData?.tasker?.username}
                src={bookingData?.tasker?.image}
                sx={{ width: 50, height: 50 }}
              />
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: '#4a4a4a', ml: 2 }}
              >{`${bookingData?.tasker?.firstName} ${bookingData?.tasker?.lastName}`}</Typography>
            </Stack>
            <Stack
              direction={'column'}
              spacing={1}
              sx={{ mt: 3, width: '100%' }}
            >
              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Typography fontWeight={'bold'}>Công việc:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    value={t(bookingData?.taskData?.langKey)}
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Typography fontWeight={'bold'}>Ngày làm việc :</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    value={renderVietnamdate(
                      bookingData?.workTime?.date.format('YYYY-MM-DD')
                    )}
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Grid>
              </Grid>

              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Typography fontWeight={'bold'}>
                    Thời gian làm việc :
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    value={`Từ: ${bookingData?.workTime?.from} - Đến: ${bookingData?.workTime?.to}`}
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Typography fontWeight={'bold'}>Khu vực:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    value={`Tp. Hồ Chí Minh, Quận 1`}
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Typography fontWeight={'bold'}>
                    Địa chỉ cụ thể :<span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="address"
                        name="address"
                        variant="standard"
                        fullWidth
                        {...field}
                        InputProps={{ inputProps: { spellCheck: 'false' } }}
                        error={Boolean(errors.address)}
                        helperText={errors.address && errors.address.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Typography fontWeight={'bold'}>
                    Mô tả công việc :<span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="description"
                        name="description"
                        variant="standard"
                        fullWidth
                        {...field}
                        InputProps={{ inputProps: { spellCheck: 'false' } }}
                        error={Boolean(errors.description)}
                        helperText={
                          errors.description && errors.description.message
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Tooltip
                    title={t('th_key_tooltip_explain_pricing')}
                    placement="top"
                    arrow
                  >
                    <Typography fontWeight={'bold'}>
                      Hình thức trã lương :
                      <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="paymentPlan"
                    control={control}
                    render={({ field }) => (
                      <FormControl variant="standard" fullWidth>
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
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Typography fontWeight={'bold'}>
                    Phương thức thanh toán :
                    <span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="paymentType"
                    control={control}
                    render={({ field }) => (
                      <FormControl variant="standard" fullWidth>
                        <Select
                          labelId="paymentType"
                          id="paymentType"
                          name="paymentType"
                          {...field}
                        >
                          <MenuItem value={'by-cash'}>
                            {t('th_key_payment_type_cash')}
                          </MenuItem>
                          <MenuItem value={'by-wallet'}>
                            {t('th_key_payment_type_online')}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Tooltip
                    title={t('th_key_tooltip_explain_pricing')}
                    placement="top"
                    arrow
                  >
                    <Typography fontWeight={'bold'}>
                      Giá đề xuất (VND) :<span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        id="price"
                        name="price"
                        variant="standard"
                        type="number"
                        {...field}
                        InputProps={{ inputProps: { min: 1 } }}
                        error={Boolean(errors.price)}
                        helperText={errors.price && errors.price.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container fullWidth alignItems={'center'}>
                <Grid item xs={4}>
                  <Typography fontWeight={'bold'}>
                    Thời hạn phản hồi :<span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="expireAt"
                    control={control}
                    render={({ field }) => (
                      // <ResponseTime
                      // value={field.value}
                      //   maxDate={dayjs(bookingData.workTime.date)}
                      //   minTime={dayjs(new Date()).add(1, 'hour')}
                      //   onChange={(val) => setValue('expireAt', val)}
                      // />
                      <FormControl fullWidth variant="standard">
                        <DateTimePicker
                          {...field}
                          dayOfWeekFormatter={vietnameseDayOfWeekFormatter}
                          disablePast
                          // value={field.value}
                          onChange={(newValue) =>
                            setValue('expireAt', newValue)
                          }
                          ampm={false}
                          timeSteps={{ hours: 1, minutes: 1 }}
                          firstDayOfWeek={0}
                          maxDate={dayjs(bookingData.workTime.date)}
                          minTime={dayjs(new Date()).add(50, 'minute')}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: '100%' }}
                              {...params}
                              error={Boolean(errors.expireAt)}
                              helperText={
                                errors.expireAt && errors.expireAt.message
                              }
                            />
                          )}
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                mt: 3,
              }}
            >
              <Typography color={'grey'}>
                Bạn có thể trao đổi với người nhận việc về các chi tiết của công
                việc và cập nhật lại sau
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                px: 2,
                mt: 3,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: 'unset' }}
                disabled={!isValid}
              >
                {t('th_key_btn_send_invitation')}
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default InvationDetail;
