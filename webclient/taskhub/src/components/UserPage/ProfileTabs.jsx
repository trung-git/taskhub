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
} from '@mui/material';

// project import
// import Avatar from 'components/@extended/Avatar';
import ProfileTab from './ProfileTab';
// import { facebookColor, linkedInColor, twitterColor } from 'config';

// assets
// import {
//   FacebookFilled,
//   LinkedinFilled,
//   MoreOutlined,
//   TwitterSquareFilled,
//   CameraOutlined,
// } from '@ant-design/icons';

// import IconButton from 'components/@extended/IconButton';
import MainCard from '../../base/component/MainCard';
import { LoginContext } from '../../provider/LoginContext';

// const avatarImage = require.context('assets/images/users', true);

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = ({ focusInput }) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const { currentUser } = useContext(LoginContext);

  const [userData, setUserData] = useState();

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  console.log('userDataProfileTabs', userData);

  //   const [anchorEl, setAnchorEl] =
  //     (useState < Element) | ((element) => Element) | null | (undefined > null);
  //   const open = Boolean(anchorEl);

  //   const handleClick = (event) => {
  //     setAnchorEl(event?.currentTarget);
  //   };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/* <Stack direction="row" justifyContent="flex-end">
            <IconButton
              variant="light"
              color="green"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                component={Link}
                to="/apps/profiles/user/personal"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    focusInput();
                  });
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disabled>
                Delete
              </MenuItem>
            </Menu>
          </Stack> */}
          <Stack spacing={2.5} alignItems="center">
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
                  {/* <CameraOutlined
                    style={{
                      color: theme.palette.green.lighter,
                      fontSize: '2rem',
                    }}
                  /> */}
                  <Typography sx={{ color: 'green.lighter' }}>
                    Upload
                  </Typography>
                </Stack>
              </Box>
            </FormLabel>
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
              <Typography color="green">Full Stack Developer</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              sx={{ '& svg': { fontSize: '1.15rem', cursor: 'pointer' } }}
            >
              {/* <TwitterSquareFilled style={{ color: 'blue' }} />
              <FacebookFilled style={{ color: 'blue' }} />
              <LinkedinFilled style={{ color: 'blue' }} /> */}
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
              <Typography variant="h5">86</Typography>
              <Typography color="green">Bài đăng</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">40</Typography>
              <Typography color="green">Công việc</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">60</Typography>
              <Typography color="green">Taskoin</Typography>
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
