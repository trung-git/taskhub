import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
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
  useTheme,
} from '@mui/material';
import MainCard from '../../base/component/MainCard';
import { useContext, useState } from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
// import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import TaskIcon from '@mui/icons-material/Task';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { MoreOutlined } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CandidateModal from './CandidateModal';
import ImagesList from '../../base/component/ImagesList';
import PostModal from './PostModal';
import useToastify from '../../hooks/useToastify';
import axios from 'axios';
import { API_URL } from '../../base/config';
import useLogin from '../../hooks/useLogin';
import { SocketContext } from '../../provider/SocketContext';
import ConfirmDialog from '../../base/component/ConfirmDialog';

const PostCard = ({ post, onSelect, onRefresh }) => {
  const { emitFinderSendInvitation } = useContext(SocketContext);
  const {
    user,
    address,
    workLocation,
    workTime,
    taskTag,
    text,
    createdAt,
    _id: id,
    updatedAt,
    candidate,
    photos,
    cityInfo,
    candidateInfo,
    closeRegisterAt,
  } = post;
  const { t } = useTranslation();
  const theme = useTheme();
  const [openCandidateModal, setOpenCandidateModal] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const navigate = useNavigate();
  const { toastError, toastSuccess } = useToastify();
  const { getUserToken } = useLogin();
  const token = getUserToken();
  const [isSendInvitation, setIsSendInvitation] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenCandidateModal(true);
  };

  const handleClickEdit = () => {
    setOpenPostModal(true);
  };

  console.log('postCard', candidate);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onSubmitHandler = (candidateId) => {
    if (candidateId) {
      setIsSendInvitation(true);

      const contractParams = {
        postId: id,
        candidateId: candidateId,
        expireAt: dayjs(new Date()).add(1, 'hour').toISOString(),
      };
      console.log('formDataOnsubmit', contractParams);

      axios
        .post(
          `${API_URL}api/v1/contract/create-contract-by-post`,
          contractParams,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          emitFinderSendInvitation(
            response.data.data.tasker._id,
            response.data.data
          );
          console.log('postValueSucces', response);
          toastSuccess('Send invitation success');
          //TODO reset close append new posr
          // resetForm();
          setTimeout(() => {
            navigate(`/tasklist/${response?.data?.data?._id}`);
          }, 2000);
          setIsSendInvitation(false);
        })
        .catch((error) => {
          window.dispatchEvent(new ErrorEvent('error', { error }));
          setIsSendInvitation(false);
        });
    } else {
      setIsSendInvitation(false);
    }
  };

  const deletePost = async () => {
    try {
      const response = await axios.delete(`${API_URL}api/v1/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data.data;
      onRefresh && onRefresh();
      toastSuccess('Delete post success');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeletePost = () => {};

  return (
    <div>
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
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    color="secondary"
                    onClick={handleMenuClick}
                  >
                    <MoreVertIcon style={{ fontSize: '1.15rem' }} />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    alt={user?.firstName}
                    src={user?.image}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {`${user?.firstName} ${user?.lastName}`}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="secondary">
                      {dayjs(createdAt).format('HH:mm DD/MM/YYYY')}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
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
                onClick={handleClickEdit}
                sx={{ color: theme.palette.primary.main }}
              >
                <ListItemIcon>
                  <EditIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpenDeleteDialog(true);
                  handleMenuClose();
                }}
                sx={{ color: theme.palette.error.main }}
              >
                <ListItemIcon>
                  <DeleteOutlineOutlinedIcon
                    sx={{ color: theme.palette.error.main }}
                  />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                textAlign: 'start',
                // overflow: 'hidden',
                // textOverflow: 'ellipsis',
                // display: '-webkit-box',
                // WebkitLineClamp: '2',
                // WebkitBoxOrient: 'vertical',
              }}
            >
              {text}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <List
                  sx={{
                    p: 0,
                    overflow: 'hidden',
                    '& .MuiListItem-root': { px: 0, py: 0.5 },
                  }}
                >
                  <ListItem>
                    <ListItemIcon>
                      <TaskIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={t(taskTag?.langKey || '')} />
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
              <Grid item xs={8}>
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
                      primary={`${address?.toString()}, ${t(
                        workLocation?.prefix
                      )} ${workLocation?.name}, ${t(cityInfo?.prefix)} ${
                        cityInfo?.name
                      }`}
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
            <ImagesList imagesList={photos} />
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
              {t('th_key_task_lasted_update_at')}:{' '}
              {dayjs(updatedAt).format('DD/MM/YYYY HH:mm')}
            </Typography>
            {closeRegisterAt && (
              <Typography variant="caption" color="secondary">
                {`${t('th_key_response_deadline')} : ${dayjs(
                  closeRegisterAt
                ).format('DD/MM/YYYY HH:mm')}`}
              </Typography>
            )}
          </Stack>
          <Button
            variant="outlined"
            size="small"
            disabled={candidate?.length === 0}
            onClick={handleClickOpen}
          >
            {candidate?.length === 0
              ? t('th_post_btn_view_candidate')
              : `${t('th_post_btn_view_candidate')} (${candidate?.length})`}
          </Button>
        </Stack>
      </MainCard>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={() => setOpenCandidateModal(false)}
        open={openCandidateModal}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        {openCandidateModal && (
          <CandidateModal
            candidateList={candidate}
            candidateInfo={candidateInfo}
            onClose={() => setOpenCandidateModal(false)}
            onSendInvitation={(id) => onSubmitHandler(id)}
            isSendInvitation={isSendInvitation}
            isCanInvitation={new Date(closeRegisterAt) > new Date()}
          />
        )}
      </Dialog>
      {/* <Dialog
        maxWidth="sm"
        fullWidth
        onClose={() => {
          setOpenPostModal(false);
          handleMenuClose();
        }}
        open={openPostModal}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        {openPostModal && (
          <PostModal
            type={'edit'}
            value={post}
            onClose={() => {
              setOpenPostModal(false);
              handleMenuClose();
            }}
          />
        )} */}
      {openPostModal && (
        <PostModal
          open={openPostModal}
          value={post}
          onClose={() => {
            setOpenPostModal(false);
            handleMenuClose();
          }}
        />
      )}
      {openDeleteDialog && (
        <ConfirmDialog
          isOpenDialog={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onAgree={() => deletePost()}
          title="th_post_delete_post"
          content="th_post_delete_post_confirm"
        />
      )}
    </div>
  );
};

export default PostCard;
