import React, { useState, useEffect } from 'react';
import { SafeAreaView, Button, Text } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default DatePick = ({ value, onChange }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    onChange && onChange(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);

  return (
    <SafeAreaView>
      {/* <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )} */}
      <RNDateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'date'}
        is24Hour={true}
        onChange={onDateChange}
        display="spinner"
      />
    </SafeAreaView>
  );
};
