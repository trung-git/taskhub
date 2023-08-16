// material-ui
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import MainCard from '../../base/component/MainCard';
import { useTheme } from '@emotion/react';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const TaskViewDetail = ({ task }) => {
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      //   dispatch(
      //     openSnackbar({
      //       open: true,
      //       message: 'Submit Success',
      //       variant: 'alert',
      //       alert: {
      //         color: 'success'
      //       },
      //       close: false
      //     })
      //   );
    },
  });

  return (
    <MainCard
      content={false}
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
        pt: 2,
        pl: 2,
        borderRadius: '4px 0 0 4px',
        borderRight: '0px',
        height: '100%',
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          height: '100%',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: theme.palette.background.paper,
            pr: 2,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Grid container justifyContent="space-between" alignItems={'center'}>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography variant="subtitle1">
                    Thông tin công việc
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ height: '100%', pr: 2, pb: 3 }}>
          <form onSubmit={formik.handleSubmit} style={{ height: '100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                    Task
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                    Work Location
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                    Address
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                    Working time
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                    Price
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                    Description
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                    Lasted update at: 23:20 17/08/2023
                  </InputLabel>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{}}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button variant="outlined" color="secondary">
                    Làm mới
                  </Button>
                  <Button variant="contained" type="submit">
                    Cập nhật
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default TaskViewDetail;
