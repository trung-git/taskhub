import React, { useState, useEffect } from 'react';
import { View, Button, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import dayjs from 'dayjs';
dayjs.locale('vi');

const MyDatePicker = ({ onChange, value }) => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date('2000-01-01')).format('YYYY-MM-DD')
  );

  useEffect(() => {
    if (value) {
      setSelectedDate(dayjs(new Date(value)).format('YYYY-MM-DD'));
    }
  }, [value]);

  console.log('onChange', value, onChange);

  const currentDate = new Date();
  const minDate = dayjs(
    new Date(
      currentDate.getFullYear() - 55,
      currentDate.getMonth(),
      currentDate.getDate()
    )
  ).format('YYYY-MM-DD');
  const maxDate = dayjs(
    new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    )
  ).format('YYYY-MM-DD');

  console.log('minDatemaxDate', minDate, maxDate);

  const handleDateChange = (date) => {
    console.log('handleDateChangedate', date);
    setSelectedDate(date);
    onChange(date);
  };

  const handleConfirm = () => {
    console.log('handleConfirm', selectedDate);
  };

  return (
    <View>
      <DatePicker
        style={{ width: '100%', backgroundColor: 'white' }}
        date={selectedDate}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        display="spinner"
        minDate={minDate}
        maxDate={maxDate}
        confirmBtnText="Xác nhận"
        cancelBtnText="Hủy"
        modalOnResponderTerminationRequest={true}
        showIcon={false}
        customStyles={{
          dateInput: {
            marginLeft: 0,
            borderColor: 'grey',
            borderRadius: 8,
          },
          dateText: {
            color: 'green',
          },
          itemStyle: {
            color: 'green',
            opacity: 1,
          },
        }}
        onConfirm={handleConfirm}
        onDateChange={handleDateChange}
        blurComponentIOS={true}
      />
    </View>
  );
};

export default MyDatePicker;
