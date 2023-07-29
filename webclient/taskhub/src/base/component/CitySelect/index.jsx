import { Autocomplete, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CitySelect = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const fetchData = async () => {
    try {
      // Bắt đầu tải dữ liệu
      setLoading(true);

      // Gọi API để lấy danh sách các mục
      const response = await axios.get(
        'https://taskhub-mhm7.onrender.com/api/v1/area/city'
      );
      const responseData = response.data.data;
      console.log('responseDataCity', responseData);

      // Lưu danh sách các mục vào trạng thái
      setData(responseData);
      // setSelectedValue(responseData[0])
      // onChange && onChange(responseData[0]._id);

      // Kết thúc tải dữ liệu
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
    console.log('handleValueChange', event.target.value);
    onChange && onChange(event.target.value);
  };

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={selectedValue}
      //   label="City"
      onChange={handleValueChange}
      fullWidth
    >
      {data?.length > 0 &&
        data?.map((city) => {
          return (
            <MenuItem key={city._id} value={city._id}>
              {t(city?.prefix)} {city?.name}
            </MenuItem>
          );
        })}
    </Select>
  );
};

export default CitySelect;
