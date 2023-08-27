import React, { useEffect, useState } from 'react';

//third-party
import { Box, Stack, useTheme } from '@mui/material';

import { parseStrTimeAndDateToDate, parseStrTimeToDate } from './utils';
import TimePicker2 from './TimePicker2';
import dayjs from 'dayjs';

const TimeRangeUnit = (props) => {
  const { value, onChange, isDisabled = false, selectedDate } = props;
  const theme = useTheme();
  const [curValue, setCurValue] = useState({ from: '07:00', to: '08:00' });
  console.log('valuesetCurValue', value);

  useEffect(() => {
    if (value) {
      setCurValue(value);
    } else {
      setCurValue({ from: '00:00', to: '00:00' });
    }
  }, [value]);

  console.log('valuecurValue', value, curValue);

  //value change
  const handleValueChange = (keyName, keyValue) => {
    const newValue = { ...curValue };
    const newHour = new Date(keyValue)?.getHours();
    const newMinute = new Date(keyValue)?.getMinutes();
    const newTimeData = `${newHour.toString().padStart(2, '0')}:${newMinute
      .toString()
      .padStart(2, '0')}`;
    newValue[keyName] = newTimeData;
    setCurValue(newValue);
    //callback
    onChange && onChange(newValue);
    console.log('keyValue', newValue);
  };

  //console.log('time crrValue', crrValue);
  return (
    <Stack
      alignItems={'center'}
      sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '4px' }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={0.5}
        sx={{
          height: '100%',
          '& .MuiOutlinedInput-root': {
            fieldset: {
              border: 'none',
            },
            '&:hover fieldset': {
              borderColor: 'none',
            },
          },
        }}
      >
        <TimePicker2
          isDisabled={isDisabled}
          value={parseStrTimeToDate(curValue.from || '07:00')}
          onChange={(val) => handleValueChange('from', val)}
          isAmPm={false}
          ampm={false}
          timeSteps={{ hours: 1, minutes: 30 }}
          disablePast={selectedDate.isSame(dayjs(), 'day')}
        />
        <Box>-</Box>
        <TimePicker2
          isDisabled={isDisabled}
          value={parseStrTimeToDate(curValue.to || '08:00')}
          onChange={(val) => handleValueChange('to', val)}
          minTime={dayjs(parseStrTimeToDate(curValue.from || '07:00')).add(
            30,
            'minute'
          )}
          maxTime={
            dayjs(parseStrTimeToDate(curValue.from || '07:00')).hour() < 15
              ? dayjs(parseStrTimeToDate(curValue.from || '07:00')).add(
                  8,
                  'hour'
                )
              : undefined
          }
          isAmPm={false}
          timeSteps={{ hours: 1, minutes: 30 }}
        />
      </Stack>
    </Stack>
  );
};

export default TimeRangeUnit;
