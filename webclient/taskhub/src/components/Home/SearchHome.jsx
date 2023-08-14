import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../provider/LoginContext';
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_URL } from '../../base/config';

const SearchHome = () => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Bắt đầu tải dữ liệu
      setLoading(true);

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

    console.log('newItem', newItem);

    setSelectedValue(newItem);

    //callback
    // onChange && onChange(newItem);
  };

  return (
    <Box
      className="custom-box"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: 600,
          height: 300,
          // backgroundColor: '#fff',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
        }}
        component={Paper}
      >
        <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
          <Typography sx={{ fontSize: 32, fontWeight: 600 }}>
            {t('th_key_home_help_search_title')}
          </Typography>
          <Stack direction={'row'} spacing={1} sx={{ px: 2 }}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={data?.map((task) => {
                return {
                  label: task?.title,
                  value: task?._id,
                };
              })}
              value={selectedValue}
              sx={{}}
              renderInput={(params) => (
                <TextField
                  placeholder={t('th_key_home_help_search_place_holder')}
                  {...params}
                />
              )}
              // color="success"
              onChange={handleValueChange}
            />
            <Button
              // color="success"
              sx={{ width: 280 }}
              size="large"
              variant="contained"
              onClick={() =>
                selectedValue
                  ? navigate(`/find/${selectedValue?.value}`)
                  : undefined
              }
            >
              {t('th_key_home_finding_now')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchHome;
