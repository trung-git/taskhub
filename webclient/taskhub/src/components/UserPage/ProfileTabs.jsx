import { useEffect, useState, ChangeEvent, useContext } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Divider,
  FormLabel,
  Grid,
  TextField,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
} from '@mui/material';

// project import
// import Avatar from 'components/@extended/Avatar';
import ProfileTab from './ProfileTab';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

import MainCard from '../../base/component/MainCard';
import { LoginContext } from '../../provider/LoginContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useLogin from '../../hooks/useLogin';
import useToastify from '../../hooks/useToastify';

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = () => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState('');
  const { t } = useTranslation();
  const {
    setUserData: setLocalUserData,
    getUserToken,
    getUserData,
  } = useLogin();
  const { toastError, toastSuccess } = useToastify();
  const { setCurrentUser } = useContext(LoginContext);
  const [isUploadImage, setIsUploadImage] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      // setAvatar(URL.createObjectURL(selectedImage));
      setIsUploadImage(true);
      const formData = new FormData();
      formData.append('image', selectedImage);
      console.log('formData', formData);
      const token = getUserToken();

      axios
        .post(
          'https://taskhub-mhm7.onrender.com/api/v1/user/update-profile',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Đảm bảo đặt đúng header 'Content-Type' cho form data
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log('signUpsuccess', response);
          console.log('Upload successful:', response?.data.data?.updatedUser);
          setLocalUserData(response?.data.data?.updatedUser);
          setCurrentUser(response?.data.data?.updatedUser);
          setAvatar(response?.data.data?.updatedUser?.image);
          toastSuccess('Update success');
          setIsUploadImage(false);
        })
        .catch((error) => {
          console.error(error);
          console.error('Error:', Object.keys(error), error.message);
          console.error(error?.config);
          console.error(error?.request);
          console.error(error?.response);
          toastError(`Update error, ${error.message}`);
          setIsUploadImage(false);
        });
    }
  }, [selectedImage]);

  // const { currentUser } = useContext(LoginContext);

  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(getUserData());
    setAvatar(getUserData().image);
  }, []);

  console.log('userDataProfileTabs', userData);

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack spacing={2.5} alignItems="center">
            {isUploadImage ? (
              <Stack
                sx={{
                  width: 124,
                  height: 124,
                  border: '1px dashed',
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  '&:hover .MuiBox-root': { opacity: 1 },
                  cursor: 'pointer',
                }}
                alignItems={'center'}
                justifyContent={'center'}
                direction={'row'}
              >
                <CircularProgress color="primary" />
              </Stack>
            ) : (
              <FormLabel
                htmlFor="change-avtar"
                sx={{
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  '&:hover .MuiBox-root': { opacity: 1 },
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  alt="Avatar 1"
                  src={avatar}
                  sx={{ width: 124, height: 124, border: '1px dashed' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, .75)'
                        : 'rgba(0,0,0,.65)',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Stack spacing={0.5} alignItems="center">
                    <CameraAltOutlinedIcon
                      style={{
                        color: theme.palette.primary,
                        fontSize: '2rem',
                      }}
                    />
                    <Typography sx={{ color: 'green' }}>Upload</Typography>
                  </Stack>
                </Box>
              </FormLabel>
            )}

            <TextField
              type="file"
              id="change-avtar"
              label="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={(e) => setSelectedImage(e.target.files?.[0])}
            />
            <Stack spacing={0.5} alignItems="center">
              <Stack direction={'row'} alignItems="center" spacing={0.5}>
                <Typography variant="h5">{userData?.firstName}</Typography>
                <Typography variant="h5">{userData?.lastName}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        <Grid item xs={12} sm={6} md={12}>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">
                {userData?.contractCount || '0'}
              </Typography>
              <Typography color="green">{t('th_key_task')}</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{userData?.postCount || '0'}</Typography>
              <Typography color="green">{t('th_key_post')}</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">
                {userData?.wallet?.amount || '0'}
              </Typography>
              <Typography color="green">VND</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProfileTabs;
