import { FormControl } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ResponseTime = ({ value, onChange, maxDate, minTime }) => {
  const { t } = useTranslation();
  const [responseValue, setResponseValue] = useState(
    dayjs(new Date()).add(1, 'hour')
  );

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

  return (
    <FormControl fullWidth variant="standard">
      <DateTimePicker
        dayOfWeekFormatter={vietnameseDayOfWeekFormatter}
        disablePast
        value={responseValue}
        onChange={(newValue) => setResponseValue(newValue)}
        ampm={false}
        timeSteps={{ hours: 1, minutes: 1 }}
        firstDayOfWeek={0}
        maxDate={maxDate}
        minTime={minTime}
      />
    </FormControl>
  );
};

export default ResponseTime;
