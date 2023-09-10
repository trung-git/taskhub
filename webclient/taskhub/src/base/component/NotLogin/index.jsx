import { Box, Button, Container, Typography } from '@mui/material';
import NavBar from '../../../components/Home/NavBar';
import { useContext } from 'react';
import { LoginContext } from '../../../provider/LoginContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotLogin = ({ children }) => {
  const { isLogin } = useContext(LoginContext);
  const { t } = useTranslation();

  if (!isLogin) {
    return (
      <Box sx={{ width: '100%' }}>
        <NavBar isLogin={false} />
        <Container maxWidth="sm" sx={{ height: '100%' }}>
          <Typography>Bạn chưa đăng nhập</Typography>
          <Typography>Đăng nhập để sử dụng tính năng này</Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button component={Link} to={'/'} variant="contained">
              {t('th_key_back_to_home')}
            </Button>
            <Button component={Link} to={'/login'} variant="contained">
              {t('th_key_navbar_signup_login')}
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return children;
};

export default NotLogin;
