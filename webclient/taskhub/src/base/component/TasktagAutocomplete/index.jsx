import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_URL } from '../../config';

const TasktagAutocomplete = ({ value, onChange, helperText, error }) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const fetchData = async () => {
    try {
      // Gọi API để lấy danh sách các mục
      const response = await axios.get(`${API_URL}api/v1/task-tag/`);
      const responseData = response.data.data;
      console.log('responseData', responseData);
      setData(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleValueChange = (event, selected, reason) => {
    let newItem = selected;
    setSelectedValue(newItem);
    //callback
    onChange && onChange(newItem);
  };

  return (
    <Autocomplete
      fullWidth
      loading={loading}
      disablePortal
      id="combo-box-demo"
      options={data?.map((task) => {
        return {
          label: t(task?.langKey),
          value: task?._id,
        };
      })}
      value={selectedValue}
      sx={{
        ...(error && {
          color: 'error.main',
          borderColor: 'error.light',
          // bgcolor: 'error.lighter',
        }),
      }}
      color={error ? 'error' : 'primary'}
      renderInput={(params) => (
        <TextField
          placeholder={t('th_key_home_help_search_place_holder')}
          {...params}
          error={error}
          helperText={error ? helperText : undefined}
        />
      )}
      // color="success"
      onChange={handleValueChange}
    />
  );
};

export default TasktagAutocomplete;
