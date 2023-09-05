import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState, useEffect, useCallback } from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/vi';
import { useTranslation } from 'react-i18next';
import formatVietnameseCurrency from '../../utils/formatVietnameseCurrency';
dayjs.extend(customParseFormat);

const VietnameseDateComponent = (date) => {
  console.log('VietnameseDateComponent', date);
  const vietnameseDate = dayjs(date.date, {
    customParseFormat: 'YYYY-MM-DD',
  });
  dayjs.locale('vi');
  const formattedDate = vietnameseDate.format('dddd, DD [tháng] MM');
  return (
    <Typography sx={{ textTransform: 'capitalize' }}>
      {formattedDate}
    </Typography>
  );
};

const time2RoundedTime = () => {
  const currentTime = dayjs();
  const minutes = currentTime.minute();

  let roundedTime;

  if (minutes < 30) {
    roundedTime = currentTime.set('minute', 0).add(1, 'hour');
  } else {
    roundedTime = currentTime.set('minute', 30).add(1, 'hour');
  }
  return roundedTime.format('HH:mm');
};

function parseStrTimeToDate(value = '') {
  return new Date(`${new Date().toISOString().slice(0, 10)} ${value}`);
}

const DateBookingModal = ({
  isOpen,
  handleCloseBookingForm,
  userData,
  onInvation,
}) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(
    dayjs(parseStrTimeToDate(time2RoundedTime()))
  );
  // const [selectedTimeTo, setSelectedTimeTo] = useState(
  //   dayjs(parseStrTimeToDate(time2RoundedTime())).add(1, 'hour')
  // );
  console.log(
    'time2RoundedTime',
    dayjs(parseStrTimeToDate(time2RoundedTime()))
  );
  const [isValidTime, setIsValidTime] = useState(true);
  const [unavailableList, setUnavailableList] = useState([]);

  const vietnameseDayOfWeekFormatter = (day, options) => {
    switch (day) {
      case 'CN':
        return 'T7';
      case 'T2':
        return 'CN';
      case 'T3':
        return 'T2';
      case 'T4':
        return 'T3';
      case 'T5':
        return 'T4';
      case 'T6':
        return 'T5';
      case 'T7':
        return 'T6';
      default:
        return '';
    }
  };

  console.log('userData', userData);

  useEffect(() => {
    if (userData && userData?.unavailableTime?.length > 0) {
      let unavailableTimeList = userData?.unavailableTime?.map((_item) => {
        return {
          from: new Date(
            `${_item?.date.slice(0, 10)} ${_item?.time?.from}`
          ).getTime(),
          to: new Date(
            `${_item?.date.slice(0, 10)} ${_item?.time?.to}`
          ).getTime(),
        };
      });
      setUnavailableList(unavailableTimeList);
    }
  }, [userData]);

  console.log('unavailableList', unavailableList);

  const today = new Date();
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setHours(0, 0, 0, 0);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay()); // Assuming Sunday is the first day of the week

  const maxDate = new Date(startOfCurrentWeek);
  maxDate.setDate(startOfCurrentWeek.getDate() + 20);

  const [estimateTime, setEstimateTime] = useState(1);

  const handleOnInvation = useCallback(() => {
    const bookingData = {
      date: selectedDate,
      from: selectedTimeFrom.format('HH:mm'),
      to: selectedTimeFrom.add(estimateTime, 'hours').format('HH:mm'),
    };
    console.log('bookingDataOnInvat', bookingData);
    onInvation && onInvation(bookingData);
  }, [userData, selectedDate, selectedTimeFrom, estimateTime]);

  const handleEstimateChange = (event) => {
    setEstimateTime(event.target.value);
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
          border: '1px solid #f0f0f0',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack direction={'column'} alignItems={'center'}>
          <Typography variant="h6">
            {t('Chọn ngày và giờ thực hiện công việc này')}
          </Typography>
          <Grid container>
            <Grid item xs={7} sx={{ mt: 3 }}>
              <Stack direction={'column'} spacing={1}>
                <StaticDatePicker
                  disablePast={true}
                  openTo="day"
                  value={selectedDate}
                  showDaysOutsideCurrentMonth={true}
                  slotProps={{
                    toolbar: { toolbarFormat: 'ddd DD MMMM', hidden: true },
                  }}
                  dayOfWeekFormatter={vietnameseDayOfWeekFormatter}
                  disableHighlightToday
                  minDate={dayjs(startOfCurrentWeek)}
                  maxDate={dayjs(maxDate)}
                  toolbar={<></>}
                  sx={{
                    '& .MuiPickersCalendarHeader-root': {
                      display: 'none',
                    },
                    '& .MuiDialogActions-root': {
                      display: 'none',
                    },
                  }}
                  onChange={(date) => {
                    console.log('dateOnchange', date.toDate(), date.day());
                    setSelectedDate(date);
                  }}
                  firstDayOfWeek={0}
                  fixedWeekNumber={3}
                />
                <Typography>Thời gian bắt đầu:</Typography>
                <TimePicker
                  value={selectedTimeFrom}
                  disablePast={selectedDate.isSame(dayjs(), 'day')}
                  minTime={
                    selectedDate.isSame(dayjs(), 'day')
                      ? dayjs(parseStrTimeToDate(time2RoundedTime()))
                      : undefined
                  }
                  onChange={(time) => {
                    console.log(
                      'timeOnchange',
                      time.format('HH:mm'),
                      time.day()
                    );
                    setSelectedTimeFrom(time);
                    setIsValidTime(true);
                  }}
                  ampm={false}
                  timeSteps={{ hours: 1, minutes: 30 }}
                  onError={() => setIsValidTime(false)}
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      padding: '8px 16px',
                    },
                  }}
                  shouldDisableTime={(time) => {
                    console.log('timeshouldDisableTime', time);
                    for (const range of unavailableList) {
                      console.log(
                        'checktimeInFor',
                        time.valueOf(),
                        range.from,
                        range.to
                      );
                      if (
                        time.valueOf() >= range.from &&
                        time.valueOf() <= range.to
                      ) {
                        return true; // Disable times within the range
                      }
                    }
                    return false;
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={5} sx={{ mt: 3 }}>
              <Stack direction={'column'} spacing={0.5} height={'100%'}>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  sx={{ width: '100%' }}
                >
                  <Avatar
                    alt={userData?.username}
                    src={userData?.image}
                    sx={{ width: 50, height: 50 }}
                  />
                  <Stack
                    direction={'column'}
                    alignItems={'flex-start'}
                    sx={{ flex: 1, ml: 2 }}
                  >
                    <Stack
                      direction={'column'}
                      justifyContent={'space-between'}
                      sx={{ width: '100%' }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{ color: '#4a4a4a' }}
                      >{`${userData?.firstName} ${userData?.lastName}`}</Typography>
                      <Typography variant="h6">{`${formatVietnameseCurrency(
                        userData?.taskInfo?.price
                      )}/${t('th_key_hr')}`}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Typography fontWeight={'bold'}>
                  Bạn đang yêu cầu cho:
                </Typography>
                <Stack direction={'row'} spacing={1}>
                  <VietnameseDateComponent
                    date={selectedDate.format('YYYY-MM-DD')}
                  />
                  <Typography>{`Lúc: ${selectedTimeFrom.format(
                    'HH:mm'
                  )}`}</Typography>
                </Stack>
                <Typography fontWeight={'bold'}>
                  Dự kiến thực hiện công việc trong:
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={estimateTime}
                  onChange={handleEstimateChange}
                  size="small"
                >
                  <MenuItem value={1}>1 Giờ</MenuItem>
                  <MenuItem value={2}>2 Giờ</MenuItem>
                  <MenuItem value={3}>3 Giờ</MenuItem>
                  <MenuItem value={4}>4 Giờ</MenuItem>
                  <MenuItem value={5}>5 Giờ</MenuItem>
                  <MenuItem value={6}>6 Giờ</MenuItem>
                  <MenuItem value={7}>7 Giờ</MenuItem>
                  <MenuItem value={8}>8 Giờ</MenuItem>
                </Select>
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                    px: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    // color="success"
                    disabled={!isValidTime}
                    onClick={() => handleOnInvation()}
                  >
                    {t('th_key_btn_select_continue')}
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DateBookingModal;
