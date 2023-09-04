import { MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SortBy = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(1);

  const { t } = useTranslation();

  const data = [
    {
      label: 'th_key_task_sort_by_recommended',
      value: 1,
    },
    {
      label: 'th_key_task_sort_by_price_low_high',
      value: 2,
    },
    {
      label: 'th_key_task_sort_by_price_high_low',
      value: 3,
    },
    {
      label: 'th_key_task_sort_by_high_rating',
      value: 4,
    },
    {
      label: 'th_key_task_sort_by_task_complete',
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
