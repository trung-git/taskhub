import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Modal,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useTranslation } from 'react-i18next';
import { green } from '@mui/material/colors';
import ImagesSlider from '../../base/component/ImagesSlider';

const TaskerCard = ({ taskerData, onSelect }) => {
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  const handleOpenUserModal = () => setIsOpenUserModal(true);
  const handleCloseUserModal = () => setIsOpenUserModal(false);

  const vehicleOptions = [
    {
      label: 'th_key_vhc_bike',
      value: 'Bike',
    },
    {
      label: 'th_key_vhc_truck',
      value: 'Truck',
    },
    {
      label: 'th_key_vhc_car',
      value: 'Car',
    },
  ];

  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          width: '100%',
          p: 2,
          border: '1px solid #b3b3b3',
          borderRadius: 2,
        }}
      >
        <Grid item xs={4}>
          <Stack
            direction={'column'}
            alignItems={'center'}
            sx={{ height: '100%', justifyContent: 'space-evenly' }}
          >
            <Avatar
              alt={taskerData?.username}
              src={taskerData?.image}
              sx={{ width: 200, height: 200 }}
            />
            <Button
              variant="text"
              color="success"
              onClick={handleOpenUserModal}
              sx={{ textTransform: 'unset', fontSize: 16 }}
            >
              {t('th_key_btn_view_profile_review')}
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ textTransform: 'unset', fontSize: 18 }}
              onClick={() => {
                onSelect && onSelect(taskerData);
              }}
            >
              {t('th_key_btn_select_continue')}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Stack direction={'column'} alignItems={'flex-start'} sx={{}}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              sx={{ width: '100%' }}
            >
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{ color: '#4a4a4a' }}
              >{`${taskerData?.firstName} ${taskerData?.lastName}`}</Typography>
              <Typography variant="h5">{`$${taskerData?.taskInfo?.price}/${t(
                'th_key_hr'
              )}`}</Typography>
            </Stack>
            <Stack direction={'row'} marginTop={1}>
              {/* <Typography sx={{ mr: 0.5 }}>
                {taskerData?.averageRating}
              </Typography> */}
              <Rating
                name="tasker-rating"
                value={taskerData?.averageRating}
                readOnly
                precision={0.1}
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: 'green',
                  },
                }}
              />
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
              <LocalShippingIcon />
              <Typography marginLeft={0.5}>{t('th_key_vhc')}:</Typography>
              <Typography marginLeft={0.5}>
                {t(
                  vehicleOptions?.find(
                    (ele) => ele.value === taskerData?.vehicle
                  )?.label || ''
                )}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 1,
                alignItems: 'flex-start',
                p: 3,
                backgroundColor: green[100],
                borderRadius: 2,
              }}
            >
              <Typography fontSize={18} fontWeight={600}>
                {t('th_key_how_i_can_help')}:
              </Typography>
              <Typography
                fontSize={14}
                textAlign={'justify'}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '6',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {taskerData?.skillAndExperience}
              </Typography>
              <Button
                variant="text"
                color="success"
                sx={{ p: '0px !important' }}
                onClick={handleOpenUserModal}
              >
                {t('th_key_btn_read_more')}
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Modal
        open={isOpenUserModal}
        onClose={handleCloseUserModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 740,
            bgcolor: 'background.paper',
            border: '2px solid #f0f0f0',
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack direction={'row'}>
            <Avatar
              alt={taskerData?.username}
              src={taskerData?.image}
              sx={{ width: 80, height: 80 }}
            />
            <Stack
              direction={'column'}
              alignItems={'flex-start'}
              sx={{ flex: 1, ml: 2 }}
            >
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                sx={{ width: '100%' }}
              >
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{ color: '#4a4a4a' }}
                >{`${taskerData?.firstName} ${taskerData?.lastName}`}</Typography>
                <Typography variant="h5">{`$${taskerData?.taskInfo?.price}/${t(
                  'th_key_hr'
                )}`}</Typography>
              </Stack>
              <Stack direction={'row'} marginTop={1}>
                <Typography
                  sx={{ mr: 0.5 }}
                >{`(${taskerData?.averageRating})`}</Typography>
                <Rating
                  name="tasker-rating"
                  value={taskerData?.averageRating}
                  readOnly
                  precision={0.1}
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: 'green',
                    },
                  }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 1,
              alignItems: 'flex-start',
            }}
          >
            <Typography fontSize={18} fontWeight={600}>
              {t('th_key_about_me')}:
            </Typography>
            <Typography fontSize={14} textAlign={'justify'}>
              {taskerData?.aboutMe}
            </Typography>

            <Typography fontSize={18} fontWeight={600} mt={1}>
              {t('th_key_how_i_can_help')}:
            </Typography>
            <Typography fontSize={14} textAlign={'justify'}>
              {taskerData?.skillAndExperience}
            </Typography>
          </Box>
          {taskerData?.photos?.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 1,
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <Typography fontSize={18} fontWeight={600}>
                {t('Work photos')}:
              </Typography>
              {/* <ImagesSlider images={taskerData?.photos} /> */}
            </Box>
          )}
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ width: '100%', mt: 1 }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ textTransform: 'unset', fontSize: 14 }}
              onClick={() => {
                onSelect && onSelect(taskerData);
                handleCloseUserModal();
              }}
            >
              {t('th_key_btn_select_continue')}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default TaskerCard;
