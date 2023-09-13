import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  Pagination,
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
import Nodata from '../../base/component/Nodata';
import PostModal from './PostModal';
import socket from '../../base/socket';

const PostList = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [postList, setPostList] = useState([]);
  const { isLogin } = useContext(LoginContext);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [triggerFetchData, setTriggerFetchData] = useState(false);

  const { getUserToken } = useLogin();
  const token = getUserToken();

  const [isFetchingPostList, setIsFetchingPostList] = useState(false);
  const boxShadow = true;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchPostListData = async (page, isLoading = true) => {
    isLoading && setIsFetchingPostList(true);
    try {
      const response = await axios.get(
        `${API_URL}api/v1/post?pageNum=${page}`,
        config
      );
      const responseData = response.data.data;
      setPostList(responseData);
      isLoading && setIsFetchingPostList(false);
      setTotalPage(response.data.totalPage);
    } catch (error) {
      // console.error('Error fetching data:', error);
      window.dispatchEvent(new ErrorEvent('error', { error }));
    }
  };

  console.log('totalPage', totalPage);

  useEffect(() => {
    fetchPostListData(1);
  }, []);

  const onCreateSuccess = () => {
    fetchPostListData(1);
  };

  useEffect(() => {
    if (pageNum) {
      fetchPostListData(pageNum, false);
    }
  }, [pageNum, triggerFetchData]);
  useEffect(() => {
    socket.on('server-emit-reload-post', () => {
      setTriggerFetchData((prev) => !prev);
    });
  }, []);
  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar isLogin={isLogin} />
      <Container maxWidth="sm" sx={{ my: 3 }}>
        <Stack
          direction={'row'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          sx={{ mb: 3 }}
        >
          <Button
            variant="contained"
            size="medium"
            onClick={() => setOpenPostModal(true)}
          >
            {t('th_key_btn_post')}
          </Button>
        </Stack>
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
          <Nodata langKey="Không có bài đăng tìm nào" />
        ) : (
          <Grid container spacing={3}>
            {postList?.map((post) => {
              return (
                <Grid item xs={12} key={post?._id}>
                  <PostCard
                    post={post}
                    onSelect={(post) => setSelectedPost(post)}
                    onRefresh={() => fetchPostListData(1)}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
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
      </Container>
      {/* <Dialog
        maxWidth="sm"
        fullWidth
        onClose={() => setOpenPostModal(false)}
        
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        
      </Dialog> */}
      {openPostModal && (
        <PostModal
          open={openPostModal}
          value={selectedPost}
          onClose={() => setOpenPostModal(false)}
          onCreateSuccess={() => onCreateSuccess()}
        />
      )}
    </Box>
  );
};

export default PostList;
