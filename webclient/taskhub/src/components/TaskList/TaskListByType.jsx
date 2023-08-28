import {
  CircularProgress,
  Grid,
  Pagination,
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
import Nodata from '../../base/component/Nodata';

const TaskListByType = ({ type }) => {
  const [taskList, setTaskList] = useState([]);
  const { getUserToken } = useLogin();
  const token = getUserToken();

  const [isFetchingTaskList, setIsFetchingTaskList] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const theme = useTheme();
  const boxShadow = true;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTaskListData = async (status, pageNum) => {
    try {
      const response = await axios.get(
        `${API_URL}api/v1/contract/?status=${status}&pageNum=${pageNum}`,
        config
      );
      const responseData = response.data.data;
      setTaskList(responseData);
      setTotalPage(response.data.totalPage);
      setIsFetchingTaskList(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log('typeTaskListByType', taskList);

  useEffect(() => {
    if (type) {
      setIsFetchingTaskList(true);
      fetchTaskListData(type, pageNum);
    }
  }, [type, pageNum]);

  // useEffect(() => {
  //   if (pageNum) {
  //     setIsFetchingTaskList(true);
  //     fetchTaskListData(type, pageNum);
  //   }
  // }, [pageNum]);

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

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
    <Nodata langKey="Không có công việc nào" />
  ) : (
    <Grid container spacing={3}>
      {taskList?.map((task) => {
        return (
          <Grid item xs={12} md={6} lg={4} key={task?._id}>
            <TaskCard task={task} />
          </Grid>
        );
      })}
      <Grid item xs={12}>
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
  );
};

export default TaskListByType;
