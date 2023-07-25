import { useParams } from 'react-router';
import NavBarStepper from './NavBarStepper';
import { Box, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import CitySelect from '../../base/component/CitySelect';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import DistrictSelect from '../../base/component/DistrictSelect';

const Finding = (props) => {
  const params = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [taskData, setTaskData] = useState(null);
  const { t } = useTranslation();
  const [taskDescripe, setTaskDescripe] = useState({
    city: '',
    district: '',
  });

  const handleTaskDescripeChange = (key, value) => {
    let newVal = taskDescripe;
    newVal[key] = value;
    setTaskDescripe(newVal);
  };

  console.log('taskDescripe', taskDescripe);

  const id = params?.id;
  console.log('idFinding', id);
  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      // Bắt đầu tải dữ liệu
      // setLoading(true);

      // Gọi API để lấy danh sách các mục
      const response = await axios.get(
        `https://taskhub-mhm7.onrender.com/api/v1/task-tag/${id}`
      );
      const responseData = response.data.data;
      console.log('responseData', responseData);
      setTaskData(responseData);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const DistrictMemo = useMemo(() => {
    return (
      taskDescripe?.city && (
        <React.Fragment>
          <Typography variant="h6">{t('th_key_select_district')}</Typography>
          <DistrictSelect
            cityId={taskDescripe?.city}
            value={taskDescripe?.district}
            onChange={(value) => handleTaskDescripeChange('district', value)}
          />
        </React.Fragment>
      )
    );
  }, [taskDescripe?.city]);

  return (
    <Box sx={{ width: '100%' }}>
      <NavBarStepper curStep={activeStep} />
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        {taskData && (
          <Stack direction={'column'}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 2 }}>
              <Typography variant="h5">{taskData?.title}</Typography>
            </Box>
            <Box
              sx={{
                border: '1px solid #a4a4a4',
                width: '100%',
                p: 4,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="h6">{t('th_key_select_city')}</Typography>
              <CitySelect
                value={taskDescripe?.city}
                onChange={(value) => {
                  console.log('handleTaskDescripeChangeCity', value);
                  handleTaskDescripeChange('city', value);
                }}
              />
              {DistrictMemo}
            </Box>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Finding;
