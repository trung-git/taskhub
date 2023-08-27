import { useState, ChangeEvent, SyntheticEvent } from 'react';
// import { useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MainCard from '../../base/component/MainCard';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LoginContext } from '../../provider/LoginContext';
import { useEffect } from 'react';
import useLogin from '../../hooks/useLogin';
import axios from 'axios';
import { API_URL } from '../../base/config';
import useToastify from '../../hooks/useToastify';
import AnimateButton from '../../base/component/AnimateButton';
import OtpInput from 'react-otp-input-rc-17';
import { LoadingButton } from '@mui/lab';

// assets

// ==============================|| TAB - PAYMENT ||============================== //

const TabEmailVerify = () => {
  const { t } = useTranslation();
  const { currentUser, setCurrentUser } = useContext(LoginContext);

  const [isVerified, setIsVerified] = useState(false);
  const [openOTPConfirm, setOpenOTPConfirm] = useState(false);
  const [isSendOTPConfirm, setIsSendOTPConfirm] = useState(false);
  const [isFetchSendOTPConfirm, setIsFetchSendOTPConfirm] = useState(false);
  const { getUserToken } = useLogin();
  const token = getUserToken();
  const { toastError, toastSuccess } = useToastify();

  const theme = useTheme();
  const [otp, setOtp] = useState();

  const borderColor =
    theme.palette.mode === 'dark'
      ? theme.palette.grey[200]
      : theme.palette.grey[300];

  useEffect(() => {
    if (currentUser) {
      console.log(
        'currentUser',
        currentUser,
        currentUser?.email.split('@')?.[0]?.substring(0, 5),
        currentUser?.email.split('@')?.[0]?.substring(0, 5)
      );
      setIsVerified(currentUser?.isVerified || false);
    }
  }, [currentUser]);

  const handleSendVerifyEmail = (isReSend) => {
    axios
      .post(
        `${API_URL}api/v1/user/generate-verify-email-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('postValueSucces', response);
        toastSuccess('Send email verify success');
        setOpenOTPConfirm(isReSend ? true : false);
        isReSend && setOtp('');
      })
      .catch((error) => {
        console.error(error);
        console.error('Error:', Object.keys(error), error.message);
        console.error(error?.config);
        console.error(error?.request);
        console.error(error?.response);
        // setOpenOTPConfirm(false);
        setOtp('');
        toastError(`Verify error, ${error.message}`);
      });
  };

  const handleConFirmOTPVerifyEmail = (codeInput) => {
    const codeParams = {
      code: codeInput,
    };
    setIsFetchSendOTPConfirm(true);

    axios
      .post(`${API_URL}api/v1/user/verify-email/`, codeParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('postValueSucces', response);
        toastSuccess('Verify success');
        setIsSendOTPConfirm(true);
        setOpenOTPConfirm(false);
        setIsFetchSendOTPConfirm(false);
        setCurrentUser((prev) => {
          return {
            ...prev,
            isVerified: true,
          };
        });
      })
      .catch((error) => {
        console.error(error);
        console.error('Error:', Object.keys(error), error.message);
        console.error(error?.config);
        console.error(error?.request);
        console.error(error?.response);
        toastError(`Verify error, ${error.message}`);
        setOtp('');
        setIsFetchSendOTPConfirm(false);
      });
  };

  return (
    <MainCard title={t('th_key_person_verification')}>
      {/* {isVerified ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              spacing={1.25}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            ></Stack>
          </Grid>
        </Grid>
      ) : ( */}
      <List sx={{ '& .MuiListItem-root': { p: 2 } }}>
        <ListItem>
          <ListItemIcon
            sx={{
              color: 'primary.main',
              mr: 2,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {isVerified ? (
              <MarkEmailReadIcon style={{ fontSize: '1.5rem' }} />
            ) : (
              <ForwardToInboxIcon style={{ fontSize: '1.5rem' }} />
            )}
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-lc"
            primary={
              <Typography variant="h5">{t('Xác thực email')}</Typography>
            }
            secondary={
              isVerified
                ? t('Email đã được xác thực')
                : t(
                    'Chúng tôi sẽ gởi một email gồm 6 số đến tài khoản email mà bạn đã đăng ký để xác thực'
                  )
            }
          />
          {!isVerified && (
            <Button
              variant="outlined"
              disabled={isSendOTPConfirm}
              onClick={handleSendVerifyEmail}
            >
              {t('Gởi email xác thực')}
            </Button>
          )}
        </ListItem>
      </List>
      {/* )} */}
      {openOTPConfirm && (
        <Dialog
          open={openOTPConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Grid container spacing={3} sx={{ p: 3, maxWidth: 500 }}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography variant="h3">Enter Verification Code</Typography>
                <Typography color="secondary">We send you on mail.</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {`We've send you code on ${currentUser?.email
                  .split('@')?.[0]
                  ?.substring(0, 5)}****@${currentUser?.email.split('@')?.[1]}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <OtpInput
                    value={otp}
                    onChange={(otp) => setOtp(otp)}
                    numInputs={6}
                    containerStyle={{ justifyContent: 'space-between' }}
                    inputStyle={{
                      width: '100%',
                      margin: '8px',
                      padding: '10px',
                      border: `1px solid ${borderColor}`,
                      borderRadius: 4,
                      ':hover': {
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                    focusStyle={{
                      outline: 'none',
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AnimateButton>
                    <LoadingButton
                      loading={isFetchSendOTPConfirm}
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={() => handleConFirmOTPVerifyEmail(otp)}
                    >
                      Continue
                    </LoadingButton>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="baseline"
                  >
                    <Typography>
                      Did not receive the email? Check your spam filter, or
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => handleSendVerifyEmail(true)}
                    >
                      Resend code
                    </Button>
                    {/* <Typography
                      variant="body1"
                      sx={{
                        minWidth: 85,
                        ml: 2,
                        textDecoration: 'none',
                        cursor: 'pointer',
                      }}
                      color="primary"
                    >
                    </Typography> */}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      )}
    </MainCard>
  );
};

export default TabEmailVerify;
