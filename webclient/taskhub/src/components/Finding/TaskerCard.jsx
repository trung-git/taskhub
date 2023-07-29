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

const TaskerCard = ({ taskerData }) => {
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

  // const taskerData = {
  //   _id: '64b253f56dc6525e4693f475',
  //   workLocation: ['64a129fd40878eb40868ebd0'],
  //   workTime: [
  //     {
  //       date: '',
  //       start: '08:00',
  //       end: '17:00',
  //       _id: '64bea1f6b2e715f49d051fd4',
  //     },
  //     {
  //       date: '',
  //       start: '08:00',
  //       end: '17:00',
  //       _id: '64bea1f6b2e715f49d051fd5',
  //     },
  //     {
  //       date: '',
  //       start: '08:00',
  //       end: '17:00',
  //       _id: '64bea1f6b2e715f49d051fd6',
  //     },
  //     {
  //       date: '',
  //       start: '08:00',
  //       end: '17:00',
  //       _id: '64bea1f6b2e715f49d051fd7',
  //     },
  //     {
  //       date: '',
  //       start: '08:00',
  //       end: '17:00',
  //       _id: '64bea1f6b2e715f49d051fd8',
  //     },
  //     {
  //       date: '',
  //       start: '08:00',
  //       end: '17:00',
  //       _id: '64bea1f6b2e715f49d051fd9',
  //     },
  //     {
  //       date: '',
  //       start: '08:00',
  //       end: '17:00',
  //       _id: '64bea1f6b2e715f49d051fda',
  //     },
  //   ],
  //   aboutMe:
  //     'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
  //   skillAndExperience:
  //     'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
  //   photos: [],
  //   vehicle: 'Bike',
  //   contracts: [],
  //   averageRating: 4.5,
  //   username: 'trunghuynh',
  //   firstName: 'Trung',
  //   lastName: 'Huynh',
  //   dateOfBirth: '1993-02-11T00:00:00.000Z',
  //   email: 'trunght1810@gmail.com',
  //   phoneNumber: '0123456789',
  //   gender: 'Male',
  //   image:
  //     'http://res.cloudinary.com/dxohnl1zt/image/upload/v1690478159/userAvatar/tfpbidvzdyryxi3domxi.jpg',
  //   taskInfo: {
  //     _id: '64a0163810f4179aa8f4c7b3',
  //     title: 'Errands',
  //     description:
  //       'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
  //     langKey: 'th_task_errands',
  //     avgPrice: [5, 30],
  //     defaultPrice: 6.12,
  //     photo: '',
  //     price: 7,
  //   },
  // };

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
              <ImagesSlider images={taskerData?.photos} />
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
