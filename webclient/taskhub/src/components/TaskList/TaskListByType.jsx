import {
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import axios from 'axios';
import { API_URL } from '../../base/config';
import { useCookies } from 'react-cookie';
import useLogin from '../../hooks/useLogin';
import FeedbackIcon from '@mui/icons-material/Feedback';

const TaskListByType = ({ type }) => {
  const [taskList, setTaskList] = useState([]);
  const { getUserToken } = useLogin();
  const token = getUserToken();

  const [isFetchingTaskList, setIsFetchingTaskList] = useState(false);
  const theme = useTheme();
  const boxShadow = true;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTaskListData = async (status) => {
    try {
      const response = await axios.get(
        `${API_URL}api/v1/contract/?status=${status}`,
        config
      );
      const responseData = response.data.data;
      setTaskList(responseData);
      setIsFetchingTaskList(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log('typeTaskListByType', taskList);

  useEffect(() => {
    if (type) {
      setIsFetchingTaskList(true);
      fetchTaskListData(type);
    }
  }, [type]);

  return isFetchingTaskList ? (
    <Stack
      sx={{ height: 300 }}
      alignItems={'center'}
      justifyContent={'center'}
      direction={'row'}
    >
      <CircularProgress color="success" />
    </Stack>
  ) : taskList?.length === 0 ? (
    <Stack
      sx={{
        height: 300,
        border: '1px solid',
        borderRadius: 1,
        borderColor:
          theme.palette.mode === 'dark' ? theme.palette.divider : '#e6ebf1',
        boxShadow: theme.customShadows.z1,
        ':hover': {
          boxShadow: theme.customShadows.z1,
        },
      }}
      alignItems={'center'}
      justifyContent={'center'}
      direction={'column'}
    >
      <FeedbackIcon sx={{ fontSize: '50px' }} />
      <Typography>Không có công việc nào</Typography>
    </Stack>
  ) : (
    <Grid container spacing={3}>
      {taskList?.map((task) => {
        return (
          <Grid item xs={4} key={task?._id}>
            <TaskCard task={task} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TaskListByType;