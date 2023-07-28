import { useParams } from 'react-router';
import NavBarStepper from './NavBarStepper';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  Pagination,
  Slider,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import CitySelect from '../../base/component/CitySelect';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import DistrictSelect from '../../base/component/DistrictSelect';
import TaskerCard from './TaskerCard';
import SortBy from '../../base/component/SortBy';
import DistrictSelectMulti from '../../base/component/DistrictSelect/DistrictSelectMulti';
import PriceSlider from '../../base/component/PriceSlider';

const Finding = (props) => {
  const params = useParams();
  const id = params?.id;
  const [activeStep, setActiveStep] = useState(0);
  const [taskData, setTaskData] = useState(null);
  const [taskerData, setTaskerData] = useState(null);
  const { t } = useTranslation();

  const [citySelected, setCitySelected] = useState('');
  const [districtSelected, setDistrictSelected] = useState('');

  const [districtsSelected, setDistrictsSelected] = useState([]);
  const [pageNume, setPageNume] = useState(1);
  const [sortOption, setSortOption] = useState(1);
  const [price, setPrice] = useState([5, 100]);

  const [isfetchTaskerData, setIsfetchTaskerData] = useState(false);

  const paramsQuery = {
    taskTagId: id,
    districtIds:
      districtsSelected.length > 0
        ? districtsSelected.join(',')
        : districtsSelected[0],
    pageNume: pageNume,
    price: price.join(','),
    sortOption: sortOption,
  };

  console.log('idFinding', id);
  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `https://taskhub-mhm7.onrender.com/api/v1/task-tag/${id}`
      );
      const responseData = response.data.data;
      setTaskData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTaskerData = async (params) => {
    try {
      const response = await axios.get(
        'https://taskhub-mhm7.onrender.com/api/v1/user/tasker',
        { params }
      );
      const responseData = response.data.data;
      setTaskerData(responseData);
      setActiveStep(1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const paramsQuery = {
      taskTagId: id,
      districtIds:
        districtsSelected.length > 0
          ? districtsSelected.join(',')
          : districtsSelected[0],
      pageNume: pageNume,
      price: price.join(','),
      sortOption: sortOption,
    };
    fetchTaskerData(paramsQuery);
  }, [districtsSelected, pageNume, price, sortOption]);

  console.log('activeStep', taskerData);

  const handlePageChange = (event, value) => {
    setPageNume(value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <NavBarStepper curStep={activeStep} />
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        {taskData && activeStep === 0 && (
          <Stack direction={'column'}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 2 }}>
              <Typography variant="h5">{taskData?.title}</Typography>
            </Box>
            <Box
              sx={{
                border: '1px solid #a4a4a4',
                // width: '100%',
                p: 4,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="h6">{t('th_key_select_city')}</Typography>
              <CitySelect
                value={citySelected}
                onChange={(value) => {
                  // console.log('handleTaskDescripeChangeCity', value);
                  // handleTaskDescripeChange('city', value);
                  setCitySelected(value);
                  setDistrictSelected('');
                }}
              />
              <Typography variant="h6" mt={2}>
                {t('th_key_select_district')}
              </Typography>
              <DistrictSelect
                cityId={citySelected}
                value={districtSelected}
                onChange={(value) => {
                  setDistrictSelected(value);
                  setDistrictsSelected([value]);
                }}
              />
              <Button
                color="success"
                sx={{ width: 280, mt: 2, alignSelf: 'center' }}
                size="large"
                variant="contained"
                disabled={!citySelected || !districtSelected}
                onClick={() => fetchTaskerData(paramsQuery)}
              >
                {t('th_key_home_finding_now')}
              </Button>
            </Box>
          </Stack>
        )}
        {taskData && activeStep === 1 && (
          <Grid container spacing={2} sx={{ my: 10 }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  // height: 200,
                  width: '100%',
                  p: 2,
                  border: '1px solid #b3b3b3',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
                  Sort By:
                </Typography>
                <SortBy value={sortOption} onChange={setSortOption} />
                <Typography sx={{ fontWeight: 600, my: 0.5 }}>
                  Price:
                </Typography>
                <PriceSlider value={price} onChange={setPrice} />
                <Typography sx={{ fontWeight: 600, my: 0.5 }}>
                  District:
                </Typography>
                <DistrictSelectMulti
                  cityId={citySelected}
                  value={districtsSelected}
                  onChange={(val) => setDistrictsSelected(val)}
                />
              </Box>
            </Grid>
            {taskerData?.length > 0 && (
              <Grid item xs={8}>
                <Stack spacing={2}>
                  {taskerData?.length > 0 &&
                    taskerData?.map((tasker) => {
                      return (
                        <TaskerCard taskerData={tasker} key={tasker?._id} />
                      );
                    })}
                </Stack>
                <Stack
                  direction={'row'}
                  sx={{ mt: 2, width: '100%' }}
                  justifyContent={'center'}
                >
                  <Pagination
                    count={10}
                    page={pageNume}
                    onChange={handlePageChange}
                    color="success"
                    size="large"
                  />
                </Stack>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Finding;
