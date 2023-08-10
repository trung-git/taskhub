import {
  Box,
  Grid,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const DateBookingModal = ({ isOpen, handleCloseBookingForm, userData }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  const vietnameseDayOfWeekFormatter = (day, options) => {
    switch (day) {
      case 'Su':
        return 'CN';
      case 'Mo':
        return 'T2';
      case 'Tu':
        return 'T3';
      case 'We':
        return 'T4';
      case 'Th':
        return 'T5';
      case 'Fr':
        return 'T6';
      case 'Sa':
        return 'T7';
      default:
        return '';
    }
  };

  const today = new Date();
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setHours(0, 0, 0, 0);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay()); // Assuming Sunday is the first day of the week

  const maxDate = new Date(startOfCurrentWeek);
  maxDate.setDate(startOfCurrentWeek.getDate() + 20);

  const generateTimeOptions = () => {
    const options = [];

    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const time = `${formattedHour}:${formattedMinute}`;
        options.push(time);
      }
    }

    return options;
  };

  const timeOptions = generateTimeOptions();

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
        <Stack direction={'column'}>
          <Typography variant="h6">
            Choose your task date and start time
          </Typography>
          <Grid container>
            <Grid item xs={7}>
              <Stack direction={'column'} spacing={1}>
                <StaticDatePicker
                  disablePast={true}
                  openTo="day"
                  value={selectedDate}
                  showDaysOutsideCurrentMonth={false}
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
                  }}
                  onChange={(date) => {
                    console.log('dateOnchange', date.toDate());
                    setSelectedDate(date);
                  }}
                />

                <Select labelId="time-select-label" id="time-select">
                  {timeOptions.map((time, index) => (
                    <MenuItem key={index} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>
            <Grid item xs={5}></Grid>
          </Grid>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DateBookingModal;
