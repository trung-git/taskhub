import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/vi';
dayjs.extend(customParseFormat);

const renderVietnamdate = (date) => {
  console.log('VietnameseDateComponent', date);
  const vietnameseDate = dayjs(date.date, {
    customParseFormat: 'YYYY-MM-DD',
  });
  dayjs.locale('vi');
  const formattedDate = vietnameseDate.format(
    'dddd, DD [tháng] MM, [năm] YYYY'
  );
  return formattedDate;
};

const InvationDetail = ({ bookingData, isOpen, handleCloseBookingForm }) => {
  const { t } = useTranslation();

  console.log('bookingData', bookingData);

  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseBookingForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 750,
          bgcolor: 'background.paper',
          border: '2px solid #f0f0f0',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack direction={'column'} alignItems={'center'}>
          <Typography variant="h6">
            {t('Mô tả chi tiết về công việc này')}
          </Typography>
          <Stack direction={'row'} alignItems={'center'} sx={{ width: '100%' }}>
            <Avatar
              alt={bookingData?.tasker?.username}
              src={bookingData?.tasker?.image}
              sx={{ width: 50, height: 50 }}
            />
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ color: '#4a4a4a', ml: 2 }}
            >{`${bookingData?.tasker?.firstName} ${bookingData?.tasker?.lastName}`}</Typography>
          </Stack>
          <Stack direction={'column'} spacing={1} sx={{ mt: 3, width: '100%' }}>
            <Grid container sx={{ width: '100%' }}>
              <Grid item xs={4}>
                <Typography fontWeight={'bold'}>Công việc:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  value={bookingData?.taskData?.title}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container fullWidth>
              <Grid item xs={4}>
                <Typography fontWeight={'bold'}>Ngày làm việc :</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  value={renderVietnamdate(
                    bookingData?.workTime?.date.format('YYYY-MM-DD')
                  )}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Grid>
            </Grid>

            <Grid container fullWidth>
              <Grid item xs={4}>
                <Typography fontWeight={'bold'}>
                  Thời gian làm việc :
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  value={`Từ: ${bookingData?.workTime?.from} - Đến: ${bookingData?.workTime?.to}`}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid container fullWidth>
              <Grid item xs={4}>
                <Typography fontWeight={'bold'}>Khu vực:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  value={`Tp. Hồ Chí Minh, Quận 1`}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container fullWidth>
              <Grid item xs={4}>
                <Typography fontWeight={'bold'}>
                  Địa chỉ cụ thể :<span style={{ color: 'red' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  value={address}
                  variant="standard"
                  placeholder="Vui lòng nhập địa chỉ cụ thể"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              mt: 3,
            }}
          >
            <Typography color={'grey'}>
              Bạn có thể trao đổi với người nhận việc về các chi tiết của công
              việc và cập nhật lại sau
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'column',
              px: 2,
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              // color="success"
              // disabled={!isValidTime}
              // onClick={() => handleOnInvation()}
              sx={{ textTransform: 'unset' }}
            >
              {t('Đồng ý')}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default InvationDetail;
