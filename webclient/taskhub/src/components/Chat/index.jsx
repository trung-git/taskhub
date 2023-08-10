import { useContext } from 'react';
import { LoginContext } from '../../provider/LoginContext';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Scrollbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import NavBar from '../Home/NavBar';
import { useTranslation } from 'react-i18next';
import { TaskHubLogo } from '../../base/component/TaskHubLogo';
import { navBarHeight } from '../../base/config';
import SearchHome from '../Home/SearchHome';
import PopularTask from '../Home/PopularTask';

const Chat = () => {
  //   const { isLogin } = useContext(LoginContext);
  const isLogin = true;
  const { t } = useTranslation();

  const chatList = [
    { id: 1, name: 'Người dùng 1', message: 'Xin chào!' },
    { id: 2, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 3, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 4, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 5, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 6, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 7, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 8, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 9, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 10, name: 'Người dùng 1', message: 'Xin chào!' },
    { id: 11, name: 'Người dùng 1', message: 'Xin chào!' },
    { id: 12, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 13, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 14, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 15, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 16, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 17, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 18, name: 'Người dùng 2', message: 'Chào bạn!' },
    { id: 19, name: 'Người dùng 2', message: 'Chào bạn!' },
  ];

  return !isLogin ? (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 600,
          height: 300,
          backgroundColor: '#fff',
          borderRadius: 3,
        }}
      >
        <Stack direction={'column'}>
          <TaskHubLogo />
          <Typography sx={{ fontSize: 32, fontWeight: 600, mt: 2 }}>
            {t('Đăng nhập để sử dụng tính năng này')}
          </Typography>
          <Stack direction={'row'} spacing={1} sx={{ px: 2 }}>
            <Button
              color="success"
              sx={{ width: 280 }}
              size="large"
              variant="contained"
            >
              {t('Quay về')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  ) : (
    <Box sx={{ width: '100%' }}>
      <NavBar isLogin={isLogin} />
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Box
          sx={{
            mt: 3,
            height: `calc(100vh - ${navBarHeight}px )`,
          }}
        >
          <Grid container spacing={3} height={'100%'}>
            <Grid item xs={3}>
              <Box
                sx={{
                  height: '100%',
                  overflowY: 'auto',
                  borderRight: '1px solid #f0f0f0',
                  borderTop: '1px solid #f0f0f0',
                }}
              >
                <List disablePadding>
                  {chatList.map((chat) => {
                    return (
                      <ListItem disablePadding key={chat.id} divider>
                        <ListItemButton>
                          <ListItemText
                            primaryTypographyProps={{ fontWeight: 600 }}
                            primary={chat.name}
                          />
                          <Typography>{chat.message}</Typography>
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Grid>
            <Grid item xs={9}></Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
    // <Box sx={{ width: '100%' }}>
    //   <NavBar isLogin={true} />
    //   <SearchHome />
    //   <PopularTask />
    // </Box>
  );
};

export default Chat;
