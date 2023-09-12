import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import MainCard from '../../base/component/MainCard';
import { useTheme } from '@emotion/react';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import formatVietnameseCurrency from '../../utils/formatVietnameseCurrency';
import { LoadingButton } from '@mui/lab';
import { loadScript } from '@paypal/paypal-js';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_URL } from '../../base/config';
import useLogin from '../../hooks/useLogin';
import useToastify from '../../hooks/useToastify';

const validationSchema = yup.object({
  address: yup.string().required('Address is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().moreThan(0).required('Price is required'),
});

function TaskViewDetail({
  task,
  onSubmit,
  isSubmitting,
  onRefresh,
  isLoading,
  setIsSubmitting,
}) {
  const {
    taskTag,
    workLocation,
    address,
    workTime,
    price,
    paymentPlan,
    description,
    paymentType,
    status,
    startTime,
    endTime,
    review,
    updatedAt,
    _id: taskId,
    isPaid,
  } = task;
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isDone = status === 'cancel' || status === 'finish';

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      taskTag: taskTag || '',
      workLocation: workLocation || '',
      address: address || '',
      workTimeFrom: workTime.from || '',
      workTimeTo: workTime.to || '',
      price: price || '',
      paymentPlan: paymentPlan || '',
      description: description || '',
      paymentType: paymentType || '',
    },
  });

  console.log('taskValue', task);

  useEffect(() => {
    if (task) {
      reset({
        taskTag: taskTag,
        workLocation: workLocation,
        address: address,
        workTimeFrom: workTime.from,
        workTimeTo: workTime.to,
        price: price,
        paymentPlan: paymentPlan,
        description: description,
        paymentType: paymentType,
      });
    }
  }, [
    task,
    taskTag,
    workLocation,
    address,
    workTime,
    price,
    paymentPlan,
    description,
    paymentType,
  ]);

  const RenderChipByStatus = (status) => {
    const configChipType = [
      {
        status: 'invitation',
        label: 'th_key_task_status_invitation',
        color: 'secondary',
      },
      {
        status: 'discuss',
        label: 'th_key_task_status_discuss',
        color: 'warning',
      },
      {
        status: 'official',
        label: 'th_key_task_status_official',
        color: 'info',
      },
      {
        status: 'cancel',
        label: 'th_key_task_status_cancel',
        color: 'error',
      },
      {
        status: 'finish',
        label: 'th_key_task_status_finish',
        color: 'primary',
      },
    ];
    return (
      <Chip
        label={t(
          configChipType?.find((type) => type?.status === status)?.label || ''
        )}
        color={configChipType?.find((type) => type?.status === status)?.color}
        sx={{ borderRadius: 32 }}
      />
    );
  };

  const workTimeFromValue = watch('workTimeFrom');
  const workTimeToValue = watch('workTimeTo');
  const priceValue = watch('price');
  const paymentPlanValue = watch('paymentPlan');
  const { toastError, toastSuccess } = useToastify();

  const [predictAmount, setPredictAmount] = useState(0);
  const [isRenderPaypalButton, setIsRenderPaypalButton] = useState(false);
  const { getUserToken } = useLogin();
  const token = getUserToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [anchorPayEl, setAnchorPayEl] = useState(null);
  const id = Boolean(anchorPayEl) ? 'simple-popover' : undefined;

  const handlePayment = (e) => {
    setAnchorPayEl(e.currentTarget);
    loadPayPalScript(predictAmount, setIsRenderPaypalButton);
  };

  useEffect(() => {
    const timeFrom = dayjs(workTimeFromValue);
    const timeTo = dayjs(workTimeToValue);
    const hoursDifference = timeTo.diff(timeFrom, 'minute');

    setPredictAmount(
      paymentPlanValue === 'per-hour'
        ? (hoursDifference * priceValue) / 60
        : priceValue
    );
  }, [workTimeFromValue, workTimeToValue, priceValue, paymentPlanValue]);

  const locToString = (location) => {
    return `${t(location?.city?.prefix)} ${location?.city?.name}, ${t(
      location?.prefix
    )} ${location?.name}`;
  };

  const onSubmitHandler = (data) => {
    onSubmit && onSubmit(data);
  };

  // Paypal
  const loadPayPalScript = (price) => {
    loadScript({
      'client-id':
        'AYcmJkmn67k3lN7Cb0b5gwp37bz_xxy6iMpQZKjaT_2xg8ALUvStP-_3c0gyePfwWWC7E3-0vayOSZQC',
    })
      .then((paypal) => {
        paypal
          .Buttons(
            renderPaypalBtn({
              description: 'Thanh toán hợp đồng',
              value: price,
            })
          )
          .render('#paypal-container-element');

        // setIsRenderBtn(true);
      })
      .catch((err) => {
        console.error('failed to load the PayPal JS SDK script', err);
      });
  };

  const handlePaid = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `${API_URL}api/v1/contract/${taskId}`,
        { isPaid: true },
        config
      );
      const responseData = response.data.data;
      console.log('Paying successfully!');
      // setTaskData(responseData);
      toastSuccess('Update task success');
      setIsSubmitting(false);
      onRefresh && onRefresh();
    } catch (error) {
      console.error('Error updating user:', error);
      toastError(`Update task error, ${error.message}`);
      window.dispatchEvent(new ErrorEvent('error', { error }));
      setIsSubmitting(false);
    }
  };

  const renderPaypalBtn = (item) => {
    const value = Math.round(item.value / 23);
    return {
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                description: 'Thanh toán hợp đồng',
                value: value,
              },
            },
          ],
        });
      },
      onCancel: onCancelHandler,
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (orderData) {
          console.log('orderData', orderData);
          var transaction = orderData.purchase_units[0].payments.captures[0];
          if (transaction.status === 'COMPLETED') {
            console.log('Thanh toán thành công');
            setAnchorPayEl(null);
            handlePaid();
          }
        });
      },
      onError: onErrorHandler,
    };
  };

  const onCancelHandler = function () {
    console.log('cancel');
  };

  const onErrorHandler = function (err) {
    console.log('error');
  };

  return (
    <MainCard
      content={false}
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
        pt: 2,
        pl: 2,
        borderRadius: '4px 0 0 4px',
        borderRight: '0px',
        height: '100%',
      }}
    >
      <Grid
        container
        sx={{
          height: '100%',
          overflow: 'scroll',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            pr: 0,
            pb: 2,
            mr: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            position: 'sticky',
            top: 0,
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.background.paper
                : 'grey.50',
            zIndex: 2,
          }}
        >
          <Grid container justifyContent="space-between" alignItems={'center'}>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ width: '100%' }}
                justifyContent={'space-between'}
              >
                <IconButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/tasklist')}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="subtitle1">
                  {t('th_key_task_information')}
                </Typography>
                {/* <IconButton
                  variant="outlined"
                  color="secondary"
                  onClick={onToggleChat}
                >
                  {viewChat ? <SpeakerNotesOffIcon /> : <ChatIcon />}
                </IconButton> */}
                {RenderChipByStatus(status)}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ height: '100%', pr: 2, pb: 3 }}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            style={{ height: '100%' }}
          >
            <Stack
              direction={'column'}
              justifyContent={'space-between'}
              sx={{ height: '100%' }}
            >
              <Grid container spacing={3} sx={{ mt: 0 }}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="taskTag" sx={{ textAlign: 'start' }}>
                      {t('th_key_task')}
                    </InputLabel>
                    {isLoading ? (
                      <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={41}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Controller
                        name="taskTag"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            InputProps={{
                              readOnly: true,
                            }}
                            fullWidth
                            id="taskTag"
                            {...field}
                            value={t(field.value.langKey)}
                          />
                        )}
                      />
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel
                      htmlFor="workLocation"
                      sx={{ textAlign: 'start' }}
                    >
                      {t('th_key_worklocation')}
                    </InputLabel>
                    {isLoading ? (
                      <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={41}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Controller
                        name="workLocation"
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextField
                              InputProps={{
                                readOnly: true,
                              }}
                              fullWidth
                              id="workLocation"
                              {...field}
                              value={locToString(field.value)}
                            />
                          );
                        }}
                      />
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="address" sx={{ textAlign: 'start' }}>
                      {t('th_key_address')}{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    {isLoading ? (
                      <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={41}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            id="address"
                            placeholder="Enter address"
                            {...field}
                            error={Boolean(errors.address)}
                            helperText={
                              errors.address && errors.address.message
                            }
                          />
                        )}
                      />
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="address" sx={{ textAlign: 'start' }}>
                      {t('th_key_workdatetime')}
                    </InputLabel>
                    {isLoading ? (
                      <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={41}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        value={dayjs(getValues('workTimeFrom')).format(
                          'DD-MM-YYYY'
                        )}
                      />
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel sx={{ textAlign: 'start' }}>
                      {t('th_key_worktime')}
                    </InputLabel>
                    {isLoading ? (
                      <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={36}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                      >
                        <Controller
                          name="workTimeFrom"
                          control={control}
                          render={({ field }) => (
                            <TimePicker
                              id="workTimeFrom"
                              name="workTimeFrom"
                              value={dayjs(field.value)}
                              disablePast={dayjs(new Date()).isSame(
                                dayjs(field.value),
                                'day'
                              )}
                              onChange={(val) => {
                                console.log(
                                  'valTimePickeChange',
                                  val.toISOString()
                                );
                                setValue('workTimeFrom', val.toISOString());
                              }}
                              ampm={false}
                              timeSteps={{ hours: 1, minutes: 30 }}
                              sx={{
                                '& .MuiOutlinedInput-input': {
                                  padding: '8px 16px',
                                },
                              }}
                            />
                          )}
                        />
                        <Box>-</Box>
                        <Controller
                          name="workTimeTo"
                          control={control}
                          render={({ field }) => (
                            <TimePicker
                              id="workTimeTo"
                              name="workTimeTo"
                              value={dayjs(new Date(field.value))}
                              minTime={dayjs(getValues('workTimeFrom')).add(
                                1,
                                'hour'
                              )}
                              maxTime={
                                dayjs(getValues('workTimeFrom')).hour() < 16
                                  ? dayjs(getValues('workTimeFrom')).add(
                                      8,
                                      'hour'
                                    )
                                  : undefined
                              }
                              disablePast={dayjs(new Date()).isSame(
                                dayjs(field.value),
                                'day'
                              )}
                              onChange={(val) => {
                                console.log(
                                  'valTimePickeChange',
                                  val.toISOString()
                                );
                                setValue('workTimeTo', val.toISOString());
                              }}
                              ampm={false}
                              timeSteps={{ hours: 1, minutes: 30 }}
                              sx={{
                                '& .MuiOutlinedInput-input': {
                                  padding: '8px 16px',
                                },
                              }}
                              error={false}
                            />
                          )}
                        />
                      </Stack>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                      {t('th_key_price')}{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    {isLoading ? (
                      <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={41}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Controller
                        name="price"
                        control={control}
                        //   defaultValue={field.value}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            id="price"
                            name="price"
                            type="number"
                            {...field}
                            InputProps={{ inputProps: { min: 1 } }}
                            error={Boolean(errors.price)}
                            helperText={errors.price && errors.price.message}
                          />
                        )}
                      />
                    )}
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
                    {isLoading ? (
                      <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={41}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Controller
                        name="paymentPlan"
                        control={control}
                        render={({ field }) => (
                          <Select
                            labelId="paymentPlan"
                            id="paymentPlan"
                            name="paymentPlan"
                            //   value={field.value}
                            //   onChange={(e) =>
                            //     setValue('paymentPlan', e.target.value)
                            //   }
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
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                      {t('th_key_paymentype')}
                    </InputLabel>
                    {isLoading ? (
                      <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={41}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Controller
                        name="paymentType"
                        control={control}
                        render={({ field }) => (
                          <Select
                            labelId="paymentType"
                            id="paymentType"
                            name="paymentType"
                            //   value={field.value}
                            //   onChange={(e) =>
                            //     setValue('paymentType', e.target.value)
                            //   }
                            {...field}
                          >
                            <MenuItem value={'by-cash'}>
                              {t('th_key_payment_type_cash')}
                            </MenuItem>
                            <MenuItem value={'by-wallet'}>
                              {t('th_key_payment_type_online')}
                            </MenuItem>
                          </Select>
                        )}
                      />
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{}}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                      {t('th_key_desc')}
                    </InputLabel>
                    {isLoading ? (
                      <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={126}
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            id="description"
                            name="description"
                            multiline
                            rows={4}
                            {...field}
                            InputProps={{ inputProps: { spellCheck: 'false' } }}
                            error={Boolean(errors.description)}
                            helperText={
                              errors.description && errors.description.message
                            }
                          />
                        )}
                      />
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sx={{ mb: 3 }}>
                  <Stack spacing={1}>
                    <Tooltip
                      title={t('th_key_tooltip_explain_pricing')}
                      placement="top"
                      arrow
                    >
                      <InputLabel sx={{ textAlign: 'start' }}>
                        {`(*)`} {t('th_key_predict_amount')}:{' '}
                        {formatVietnameseCurrency(predictAmount)}
                      </InputLabel>
                    </Tooltip>
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{ mb: 3 }}>
                  <Stack spacing={1}>
                    <InputLabel sx={{ textAlign: 'start' }}>
                      {`Trạng thái thanh toán: ${
                        isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'
                      }`}
                    </InputLabel>
                  </Stack>
                </Grid>
              </Grid>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                alignItems={'center'}
                sx={{
                  position: 'sticky',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.background.paper
                      : 'grey.50',
                  zIndex: 2,
                  height: 68,
                  borderTop: `1px solid ${theme.palette.divider}`,
                }}
              >
                <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                  <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                    <Typography>
                      {t('th_key_task_lasted_update_at')}:
                    </Typography>
                    <Typography>
                      {dayjs(updatedAt).format('HH:mm DD/MM/YYYY')}
                    </Typography>
                  </Stack>
                </InputLabel>
                <Stack spacing={3} direction={'row'}>
                  <IconButton
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      onRefresh && onRefresh();
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                  {!startTime &&
                    (status === 'invitation' || status === 'discuss') && (
                      <LoadingButton
                        loading={isSubmitting}
                        variant="contained"
                        type="submit"
                        disabled={!isDirty || !isValid || status === 'official'}
                      >
                        Save
                      </LoadingButton>
                    )}
                  {!review && status === 'finish' && (
                    <LoadingButton
                      loading={isSubmitting}
                      variant="contained"
                      disabled={!isDirty || !isValid || status === 'official'}
                    >
                      Đánh giá
                    </LoadingButton>
                  )}
                  {status === 'official' &&
                    paymentType === 'by-wallet' &&
                    !isPaid && (
                      <>
                        <Button
                          aria-describedby={id}
                          variant="contained"
                          onClick={(e) => handlePayment(e)}
                        >
                          {t('Thanh toán')}
                        </Button>
                        <Popover
                          id={id}
                          open={Boolean(anchorPayEl)}
                          anchorEl={anchorPayEl}
                          onClose={() => setAnchorPayEl(null)}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                        >
                          <Box sx={{ p: 2 }}>
                            <div id="paypal-container-element"></div>
                          </Box>
                        </Popover>
                      </>
                    )}
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default TaskViewDetail;
