import { Autocomplete, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../config';

const DistrictSelect = ({ cityId, onChange, value }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState([]);
  const { t } = useTranslation();

  console.log('DistrictSelectvalue', value);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    } else {
      setSelectedValue('');
    }
  }, [value]);

  useEffect(() => {
    console.log('cityIdChange', cityId);
    if (cityId && cityId != '') {
      setLoading(true);
      fetchDistricData(cityId);
    }
  }, [cityId]);

  const fetchDistricData = (cityId) => {
    // console.log('cityIdChangefetchDistricData', cityId);

    axios
      .get(`${API_URL}api/v1/area/districts-by-city/${cityId}`)
      .then((response) => {
        const responseData = response.data.data;
        setDistrict(responseData);
        // setSelectedValue(responseData[0]);
        setLoading(false);
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập
        console.error('Error:', Object.keys(error), error.message);
        setLoading(false);
      });
  };

  // const handleValueChange = (itemValue) => {
  //   setSelectedValue(itemValue);
  //   onChange && onChange(itemValue);
  // };

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
      disabled={loading}
    >
      {district?.length > 0 &&
        district?.map((item) => {
          return (
            <MenuItem key={item._id} value={item._id}>
              {t(item?.prefix)} {item?.name}
            </MenuItem>
          );
        })}
    </Select>
  );
};

export default DistrictSelect;
