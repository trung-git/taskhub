import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../provider/LoginContext';
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const SearchHome = () => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     if (value) {
  //       setSelectedValue(value)
  //     }
  //   }, [value])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Bắt đầu tải dữ liệu
      setLoading(true);

      // Gọi API để lấy danh sách các mục
      const response = await axios.get(
        'https://taskhub-mhm7.onrender.com/api/v1/task-tag/'
      );
      const responseData = response.data.data;
      console.log('responseData', responseData);
      setData(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
          backgroundColor: '#fff',
          borderRadius: 3,
        }}
      >
        <Stack direction={'column'}>
          <Typography sx={{ fontSize: 32, fontWeight: 600, mt: 2 }}>
            {t('Bạn cần giúp đỡ gì ?')}
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
              sx={{}}
              renderInput={(params) => (
                <TextField
                  placeholder="Chọn công việc bạn cần giúp đỡ"
                  {...params}
                />
              )}
            />
            <Button
              color="success"
              sx={{ width: 280 }}
              size="large"
              variant="contained"
            >
              {t('Tìm giúp đỡ ngay')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchHome;
