// material-ui
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import MainCard from '../../base/component/MainCard';
import { useTheme } from '@emotion/react';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatIcon from '@mui/icons-material/Chat';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';

const validationSchema = yup.object({
  price: yup.number().moreThan(0).required('Price is required'),
  address: yup.string().required('Address is required'),
});

const TaskViewDetail = ({ task, onSubmit, viewChat, onToggleChat }) => {
  const {
    taskTag,
    workLocation,
    address,
    workTime,
    price,
    paymentPlan,
    description,
  } = task;
  const { t } = useTranslation();
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      taskTag: taskTag,
      workLocation: workLocation,
      address: address,
      workTimeFrom: workTime.from,
      workTimeTo: workTime.to,
      price: price,
      paymentPlan: paymentPlan,
      description: description,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('valueOnUpdate', values);
      onSubmit && onSubmit(values);
    },
  });

  console.log('TaskViewDetailpaymentPlan', task);

  const locToString = (location) => {
    return `${t(location?.city?.prefix)} ${location?.city?.name}, ${t(
      location?.prefix
    )} ${location?.name}`;
  };

  return (
    <MainCard
      content={false}
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
        pt: 2,
        pl: 2,
        borderRadius: '4px 0 0 4px',
        borderRight: viewChat ? '0px' : undefined,
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
            // bgcolor:
            //   theme.palette.mode === 'dark'
            //     ? theme.palette.background.paper
            //     : undefined,
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
                <IconButton variant="outlined" color="secondary">
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="subtitle1">Thông tin công việc</Typography>
                <IconButton
                  variant="outlined"
                  color="secondary"
                  onClick={onToggleChat}
                >
                  {viewChat ? <SpeakerNotesOffIcon /> : <ChatIcon />}
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ height: '100%', pr: 2, pb: 3 }}>
          <form onSubmit={formik.handleSubmit} style={{ height: '100%' }}>
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
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      id="taskTag"
                      name="taskTag"
                      value={t(formik.values.taskTag.langKey)}
                    />
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
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      id="workLocation"
                      name="workLocation"
                      value={locToString(formik.values.workLocation)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="address" sx={{ textAlign: 'start' }}>
                      {t('th_key_address')}{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      placeholder="Enter address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="address" sx={{ textAlign: 'start' }}>
                      {t('th_key_workdatetime')}
                    </InputLabel>
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      value={dayjs(formik.values.workTimeFrom).format(
                        'DD-MM-YYYY'
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel sx={{ textAlign: 'start' }}>
                      {t('th_key_worktime')}
                    </InputLabel>
                    {/* <TextField
                      fullWidth
                      id="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    /> */}
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <TimePicker
                        id="workTimeFrom"
                        name="workTimeFrom"
                        value={dayjs(formik.values.workTimeFrom)}
                        disablePast={dayjs(new Date()).isSame(dayjs(), 'day')}
                        // minTime={
                        //   dayjs(new Date()).isSame(dayjs(), 'day')
                        //     ? dayjs(parseStrTimeToDate(time2RoundedTime()))
                        //     : undefined
                        // }
                        // onChange={(val) => {
                        //   console.log('valTimePickeChange', val);
                        //   formik.handleChange(val.getTime());
                        // }}
                        onChange={(val) => {
                          // formik.handleChange(val.getTime())
                          console.log('valTimePickeChange', val.toISOString());
                          formik.setFieldValue(
                            'workTimeFrom',
                            val.toISOString()
                          );
                        }}
                        ampm={false}
                        timeSteps={{ hours: 1, minutes: 30 }}
                        sx={{
                          '& .MuiOutlinedInput-input': {
                            padding: '8px 16px',
                          },
                        }}
                        // shouldDisableTime={(time) => {
                        //   console.log('timeshouldDisableTime', time);
                        //   for (const range of unavailableList) {
                        //     console.log(
                        //       'checktimeInFor',
                        //       time.valueOf(),
                        //       range.from,
                        //       range.to
                        //     );
                        //     if (
                        //       time.valueOf() >= range.from &&
                        //       time.valueOf() <= range.to
                        //     ) {
                        //       return true;
                        //     }
                        //   }
                        //   return false;
                        // }}
                      />
                      <Box>-</Box>
                      <TimePicker
                        id="workTimeTo"
                        name="workTimeTo"
                        value={dayjs(formik.values.workTimeTo)}
                        disablePast={dayjs(new Date()).isSame(dayjs(), 'day')}
                        // minTime={
                        //   dayjs(new Date()).isSame(dayjs(), 'day')
                        //     ? dayjs(parseStrTimeToDate(time2RoundedTime()))
                        //     : undefined
                        // }
                        onChange={(val) => {
                          // formik.handleChange(val.getTime())
                          console.log('valTimePickeChange', val.toISOString());
                          formik.setFieldValue('workTimeTo', val.toISOString());
                        }}
                        ampm={false}
                        timeSteps={{ hours: 1, minutes: 30 }}
                        sx={{
                          '& .MuiOutlinedInput-input': {
                            padding: '8px 16px',
                          },
                        }}
                        // shouldDisableTime={(time) => {
                        //   console.log('timeshouldDisableTime', time);
                        //   for (const range of unavailableList) {
                        //     console.log(
                        //       'checktimeInFor',
                        //       time.valueOf(),
                        //       range.from,
                        //       range.to
                        //     );
                        //     if (
                        //       time.valueOf() >= range.from &&
                        //       time.valueOf() <= range.to
                        //     ) {
                        //       return true;
                        //     }
                        //   }
                        //   return false;
                        // }}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                      {t('th_key_price')}{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="price"
                      name="price"
                      type="number"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      InputProps={{ inputProps: { min: 1 } }}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                      {t('th_key_paymentmethod')}
                    </InputLabel>
                    <Select
                      labelId="paymentPlan"
                      id="paymentPlan"
                      name="paymentPlan"
                      value={formik.values?.paymentPlan}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value={'per-hour'}>
                        {t('th_key_payment_perhour')}
                      </MenuItem>
                      <MenuItem value={'one-time'}>
                        {t('th_key_payment_onetime')}
                      </MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{ pb: 8 }}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                      {t('th_key_desc')}
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      multiline
                      rows={4}
                      placeholder="Enter email address"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      // error={
                      //   formik.touched.email && Boolean(formik.errors.email)
                      // }
                      // helperText={formik.touched.email && formik.errors.email}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                alignItems={'center'}
                sx={{
                  position: 'absolute',
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
                  Lasted update at: 23:20 17/08/2023
                </InputLabel>
                <Stack spacing={3} direction={'row'}>
                  <IconButton variant="outlined" color="secondary">
                    <RefreshIcon />
                  </IconButton>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default TaskViewDetail;
