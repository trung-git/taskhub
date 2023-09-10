import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import { useTranslation } from 'react-i18next';

// ================================|| LOGIN ||================================ //

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h5">{t('th_key_signin')}</Typography>
            <Typography
              component={Link}
              to="/register"
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin onSuccess={() => navigate('/')} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
