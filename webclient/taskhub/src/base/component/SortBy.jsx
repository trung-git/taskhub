import { MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SortBy = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(1);

  const { t } = useTranslation();

  const data = [
    {
      label: 'Recommended',
      value: 1,
    },
    {
      label: 'Price low to high',
      value: 2,
    },
    {
      label: 'Price high to low',
      value: 3,
    },
    {
      label: 'High rating',
      value: 4,
    },
    {
      label: 'Number of complete Task',
      value: 6,
    },
  ];

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
    console.log('handleValueChange', event.target.value);
    onChange && onChange(Number(event.target.value));
  };

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={selectedValue}
      onChange={handleValueChange}
      fullWidth
      size="small"
    >
      {data?.length > 0 &&
        data?.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>
              {t(item?.label)}
            </MenuItem>
          );
        })}
    </Select>
  );
};

export default SortBy;
