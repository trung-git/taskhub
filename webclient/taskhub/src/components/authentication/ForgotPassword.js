import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

import AuthWrapper from './AuthWrapper';
import AuthForgotPassword from './auth-forms/AuthForgotPassword';

// ================================|| FORGOT PASSWORD ||================================ //

const ForgotPassword = () => {
  console.log('Gotoforgot');
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
            <Typography variant="h3">Forgot Password</Typography>
            <Typography
              component={Link}
              to={'/login'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Back to Login
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
