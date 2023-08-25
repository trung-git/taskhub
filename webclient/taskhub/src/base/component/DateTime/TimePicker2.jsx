import { useEffect, useState } from 'react';

// import { TimeStepOptions } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { isEqual } from 'lodash';

import { parseStrTimeToDate } from './utils';

const MuiTimePicker = (props) => {
  const {
    value,
    onChange,
    size = 'medium',
    label,
    fullWidth = true,
    isDisabled = false,
    timeSteps,
    minTime,
    maxTime,
  } = props;
  //state
  const [crrValue, setCrrValue] = useState(new Date());

  //init
  useEffect(() => {
    if (value) {
      if (!isEqual(value, crrValue)) {
        setCrrValue(value);
      }
    }
  }, [value]);
  console.log('~~~~ crrValue', crrValue);
  //value change
  const handleChangeTime = (_value) => {
    if (_value) {
      setCrrValue(_value);
      const newDate = new Date(_value);
      //callback
      // const newTimeData = `${newDate.getHours()}:${newDate.getMinutes()}`;
      onChange && onChange(newDate);
    }
  };
  console.log('crrVallue', crrValue);
  return (
    <TimePicker
      sx={{ width: fullWidth ? '100%' : 'auto' }}
      label={label}
      value={dayjs(crrValue)} //format: Date | null
      onChange={(date) => handleChangeTime(date ? date.toDate() : null)}
      disabled={isDisabled}
      ampm={false}
      timeSteps={timeSteps}
      minTime={minTime}
      maxTime={maxTime}
    />
  );
};

export default MuiTimePicker;
