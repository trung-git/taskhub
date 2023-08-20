import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import MainCard from '../../base/component/MainCard';
import { useState } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

const TaskCard = ({ task }) => {
  const {
    tasker,
    address,
    workLocation,
    workTime,
    taskTag,
    description,
    createdAt,
    price,
    _id: id,
    expireAt,
  } = task;
  const { t } = useTranslation();
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    // setOpen(true);
    navigate(`/tasklist/${id}`);
  };

  console.log('taskTaskCard', task);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard
      sx={{
        height: 1,
        '& .MuiCardContent-root': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Grid container spacing={2.25}>
        <Grid item xs={12}>
          <List sx={{ width: 1, p: 0 }}>
            <ListItem disablePadding>
              <ListItemAvatar>
                <Avatar
                  sx={{ width: 50, height: 50 }}
                  alt={tasker?.firstName}
                  src={tasker?.image}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {`${tasker?.firstName} ${tasker?.lastName}`}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="secondary">
                    {t(taskTag?.langKey || '')}
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              textAlign: 'start',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              //   whiteSpace: 'nowrap',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <List
                sx={{
                  p: 0,
                  overflow: 'hidden',
                  '& .MuiListItem-root': { px: 0, py: 0.5 },
                }}
              >
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyOutlinedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={price.toString()} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarMonthOutlinedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${dayjs(workTime?.from).format('DD-MM-YYYY')}`}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <List
                sx={{
                  p: 0,
                  overflow: 'hidden',
                  '& .MuiListItem-root': { px: 0, py: 0.5 },
                }}
              >
                <ListItem>
                  <ListItemIcon>
                    <RoomOutlinedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${t(workLocation?.prefix)} ${workLocation?.name}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessAlarmOutlinedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${dayjs(workTime?.from).format(
                      'HH:mm'
                    )} - ${dayjs(workTime?.to).format('HH:mm')}`}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        justifyContent="space-between"
        sx={{ mt: 'auto', mb: 0, pt: 2.25 }}
      >
        <Stack direction={'column'} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="caption" color="secondary">
            Ngày tạo {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
          </Typography>
          {expireAt && (
            <Typography variant="caption" color="secondary">
              {`${t('Thời hạn phản hồi')} : ${dayjs(expireAt).format(
                'DD/MM/YYYY HH:mm'
              )}`}
            </Typography>
          )}
        </Stack>
        <Button variant="outlined" size="small" onClick={handleClickOpen}>
          {t('th_key_tasklist_btn_view_detail')}
        </Button>
      </Stack>
    </MainCard>
  );
};

export default TaskCard;
