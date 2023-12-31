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
  Backdrop,
  CircularProgress,
  Skeleton,
  Avatar,
  Rating,
  Modal,
  Link,
} from '@mui/material';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import CitySelect from '../../base/component/CitySelect';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import DistrictSelect from '../../base/component/DistrictSelect';
import TaskerCard from './TaskerCard';
import SortBy from '../../base/component/SortBy';
import DistrictSelectMulti from '../../base/component/DistrictSelect/DistrictSelectMulti';
import PriceSlider from '../../base/component/PriceSlider';
import { API_URL } from '../../base/config';
import { LoginContext } from '../../provider/LoginContext';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import DateBookingModal from './DateBookingModal';
import InvationDetail from './InvationDetail';
import { LoadingButton } from '@mui/lab';
import Nodata from '../../base/component/Nodata';
import formatVietnameseCurrency from '../../utils/formatVietnameseCurrency';

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
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sortOption, setSortOption] = useState(1);
  const [price, setPrice] = useState([20000, 200000]);
  const [loading, setLoading] = useState(false);
  const [loadingTasker, setLoadingTasker] = useState(false);

  const { isLogin } = useContext(LoginContext);

  const [showDateBook, setshowDateBook] = useState(false); // hiện form chọn ngày và giờ
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showInvationDetail, setShowInvationDetail] = useState(false); // hiện form điền chi tiết
  const [selectedTasker, setSelectedTasker] = useState();

  // const [isfetchTaskerData, setIsfetchTaskerData] = useState(false);

  const paramsQuery = {
    taskTagId: id,
    districtIds:
      districtsSelected.length > 0
        ? districtsSelected.join(',')
        : districtsSelected[0],
    pageNum: pageNum,
    price: price.join(','),
    sortOption: sortOption,
  };

  console.log('idFinding', id);
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`${API_URL}api/v1/task-tag/${id}`);
      const responseData = response.data.data;
      setTaskData(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTaskerData = async (params) => {
    setLoadingTasker(true);
    try {
      const response = await axios.get(`${API_URL}api/v1/user/tasker`, {
        params,
      });
      const responseData = response.data.data;
      setTotalPage(response.data.totalPage);
      setTaskerData(responseData);
      setActiveStep(1);
      setLoadingTasker(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [enableSearch, setEnableSearch] = useState(false);

  useEffect(() => {
    const paramsQuery = {
      taskTagId: id,
      districtIds:
        districtsSelected.length > 0
          ? districtsSelected.map((_item) => _item?._id).join(',')
          : districtsSelected[0]?._id,
      pageNum: pageNum,
      price: price.join(','),
      sortOption: sortOption,
    };
    enableSearch && fetchTaskerData(paramsQuery);
    // fetchTaskerData(paramsQuery);
  }, [
    districtsSelected,
    pageNum,
    price,
    sortOption,
    id,
    // activeStep,
    enableSearch,
  ]);

  console.log('activeStep', taskerData);

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleCloseBookingForm = () => {
    setshowDateBook(false);
    setShowInvationDetail(false);
    setActiveStep(1);
  };

  const handleOnSelect = useCallback(
    (taskerData) => {
      console.log('handleOnSelect', isLogin, taskerData);
      if (!isLogin) {
        setShowLoginForm(true);
      } else {
        setSelectedTasker(taskerData);
        setshowDateBook(true);
        setActiveStep(2);
      }
    },
    [isLogin, taskerData]
  );

  const [bookingData, setBookingData] = useState(null);

  const handleOnShowInvation = (bookingDataForm) => {
    if (bookingDataForm) {
      const inVationData = {
        tasker: selectedTasker,
        taskData: taskData,
        city: citySelected,
        district: districtSelected,
        workTime: bookingDataForm,
      };
      setBookingData(inVationData);
    }
    setshowDateBook(false);
    setShowInvationDetail(true);
    setActiveStep(3);
  };

  return (
    <React.Fragment>
      <Box sx={{ width: '100%' }}>
        <NavBarStepper curStep={activeStep} />
        {loading ? (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="success" />
          </Backdrop>
        ) : (
          <Container maxWidth="lg" sx={{ height: '100%' }}>
            {taskData && activeStep === 0 && (
              <Stack direction={'column'}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-start', my: 2 }}
                >
                  <Typography variant="h5">{t(taskData?.langKey)}</Typography>
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
                  <Typography variant="h6">
                    {t('th_key_select_city')}
                  </Typography>
                  <CitySelect
                    value={citySelected?._id}
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
                    cityId={citySelected?._id}
                    value={districtSelected?._id}
                    onChange={(value) => {
                      setDistrictSelected(value);
                      setDistrictsSelected([value]);
                    }}
                  />
                  <LoadingButton
                    loading={loadingTasker}
                    // loadingPosition="start"
                    // color="success"
                    sx={{ width: 280, mt: 2, alignSelf: 'center' }}
                    size="large"
                    variant="contained"
                    disabled={!citySelected || !districtSelected}
                    onClick={() => setEnableSearch(true)}
                  >
                    {t('th_key_home_finding_now')}
                  </LoadingButton>
                </Box>
              </Stack>
            )}
            {taskData && activeStep >= 1 && (
              <Grid
                container
                spacing={2}
                sx={{ mt: 10, height: 'calc(100vh - 148px)' }}
              >
                <Grid item xs={12} md={4} lg={4}>
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
                      {t('th_key_task_sort_by')}:
                    </Typography>
                    <SortBy value={sortOption} onChange={setSortOption} />
                    <Typography sx={{ fontWeight: 600, my: 0.5 }}>
                      {t('th_key_price')}: {formatVietnameseCurrency(price[0])}{' '}
                      - {formatVietnameseCurrency(price[1])}
                    </Typography>
                    <Box sx={{ width: '100%', mt: 2, px: 1 }}>
                      <PriceSlider value={price} onChange={setPrice} />
                    </Box>
                    {/* <Typography sx={{ fontWeight: 600, my: 0.5 }}>
                      District:
                    </Typography>
                    <DistrictSelectMulti
                      cityId={citySelected}
                      value={districtsSelected}
                      onChange={(val) => setDistrictsSelected(val)}
                    /> */}
                  </Box>
                </Grid>
                {taskerData?.length > 0 ? (
                  <Grid
                    item
                    xs={12}
                    md={8}
                    lg={8}
                    sx={{ height: '100%', overflowY: 'scroll', pb: 10 }}
                  >
                    {loadingTasker ? (
                      <Stack
                        sx={{ height: 300 }}
                        alignItems={'center'}
                        justifyContent={'center'}
                        direction={'row'}
                      >
                        <CircularProgress color="success" />
                      </Stack>
                    ) : (
                      <Stack spacing={2}>
                        {taskerData?.length > 0 &&
                          taskerData?.map((tasker) => {
                            return (
                              <TaskerCard
                                taskerData={tasker}
                                key={tasker?._id}
                                onSelect={(tasker) => handleOnSelect(tasker)}
                              />
                            );
                          })}
                      </Stack>
                    )}
                    {/* <Stack
                      direction={'row'}
                      sx={{ mt: 2, width: '100%' }}
                      justifyContent={'center'}
                    >
                      <Pagination
                        count={totalPage}
                        page={pageNum}
                        onChange={handlePageChange}
                        // color="success"
                        size="large"
                      />
                    </Stack> */}
                    <Stack
                      direction={'row'}
                      sx={{ mt: 2, width: '100%' }}
                      justifyContent={'center'}
                    >
                      <Pagination
                        count={totalPage}
                        page={pageNum}
                        onChange={handlePageChange}
                        // color="success"
                        size="large"
                        color="primary"
                        variant="combined"
                      />
                    </Stack>
                  </Grid>
                ) : (
                  <Grid item xs={8}>
                    <Grid
                      container
                      sx={{
                        width: '100%',
                        p: 2,
                        border: '1px solid #b3b3b3',
                        borderRadius: 2,
                        height: 'auto',
                      }}
                    >
                      {/* <Typography>{t('Không tìm thấy người dùng')}</Typography> */}
                      <Grid item xs={12}>
                        <Nodata />
                      </Grid>
                      <Stack
                        direction={'row'}
                        sx={{ mt: 2, width: '100%' }}
                        justifyContent={'center'}
                      >
                        <Pagination
                          count={totalPage}
                          page={pageNum}
                          onChange={handlePageChange}
                          // color="success"
                          size="large"
                          color="primary"
                          variant="combined"
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            )}
          </Container>
        )}
      </Box>

      {showDateBook && (
        <DateBookingModal
          isOpen={showDateBook}
          userData={selectedTasker}
          handleCloseBookingForm={handleCloseBookingForm}
          onInvation={(bookingData) => handleOnShowInvation(bookingData)}
        />
      )}
      {showInvationDetail && (
        <InvationDetail
          isOpen={showInvationDetail}
          bookingData={bookingData}
          handleCloseBookingForm={handleCloseBookingForm}
        />
      )}
      {showLoginForm && (
        <Modal
          open={showLoginForm}
          onClose={handleCloseLoginForm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: 'background.paper',
              border: '2px solid #f0f0f0',
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                >
                  <Typography variant="h5">{t('th_key_signin')}</Typography>
                  <Typography
                    component={Link}
                    to="/register"
                    variant="body1"
                    sx={{ textDecoration: 'none' }}
                    color="primary"
                  >
                    Don&apos;t have an account?
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin
                  onSuccess={() => {
                    setShowLoginForm(false);
                    // setSelectedTasker(taskerData);
                    setshowDateBook(false);
                    setActiveStep(1);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Finding;
