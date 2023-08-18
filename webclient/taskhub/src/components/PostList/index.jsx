import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import NavBar from '../Home/NavBar';
import { LoginContext } from '../../provider/LoginContext';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLogin from '../../hooks/useLogin';
import { API_URL } from '../../base/config';
import axios from 'axios';
import PostCard from './PostCard';
import FeedbackIcon from '@mui/icons-material/Feedback';

const PostList = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [postList, setPostList] = useState([]);
  const { isLogin } = useContext(LoginContext);

  const { getUserToken } = useLogin();
  const token = getUserToken();

  const [isFetchingPostList, setIsFetchingPostList] = useState(false);
  const boxShadow = true;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchPostListData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}api/v1/post?pageNum=1`,
        config
      );
      const responseData = response.data.data;
      setPostList(responseData);
      setIsFetchingPostList(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPostListData();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar isLogin={isLogin} />
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        {isFetchingPostList ? (
          <Stack
            sx={{ height: 300 }}
            alignItems={'center'}
            justifyContent={'center'}
            direction={'row'}
          >
            <CircularProgress color="success" />
          </Stack>
        ) : postList?.length === 0 ? (
          <Stack
            sx={{
              height: 300,
              border: '1px solid',
              borderRadius: 1,
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.divider
                  : '#e6ebf1',
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
            {postList?.map((post) => {
              return (
                <Grid item xs={12} key={post?._id}>
                  <PostCard post={post} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default PostList;
