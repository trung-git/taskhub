// material-ui
import {
  Button,
  Grid,
  IconButton,
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
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatIcon from '@mui/icons-material/Chat';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';

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

const TaskViewDetail = ({ task, onSubmit, viewChat, onToggleChat }) => {
  const { taskTag, workLocation, address, workTime, price } = task;
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      address: '',
      password: '',
    },
    // validationSchema,
    onSubmit: (values) => {
      onSubmit && onSubmit(values);
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
        sx={{
          height: '100%',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.background.paper
                : undefined,
            pr: 0,
            pb: 2,
            mr: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Grid container justifyContent="space-between" alignItems={'center'}>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ width: '100%' }}
                justifyContent={'space-between'}
              >
                <IconButton variant="outlined" color="secondary">
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="subtitle1">Thông tin công việc</Typography>
                <IconButton
                  variant="outlined"
                  color="secondary"
                  onClick={onToggleChat}
                >
                  {viewChat ? <SpeakerNotesOffIcon /> : <ChatIcon />}
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ height: '100%', pr: 2, pb: 3 }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ height: '100%', pb: 4 }}
          >
            <Stack
              direction={'column'}
              justifyContent={'space-between'}
              sx={{ height: '100%', pb: 6 }}
            >
              <Grid container spacing={3} sx={{ mt: 0 }}>
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                        formik.touched.password &&
                        Boolean(formik.errors.password)
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                alignItems={'center'}
              >
                <InputLabel htmlFor="email" sx={{ textAlign: 'start' }}>
                  Lasted update at: 23:20 17/08/2023
                </InputLabel>
                <Stack spacing={3} direction={'row'}>
                  <IconButton variant="outlined" color="secondary">
                    <RefreshIcon />
                  </IconButton>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default TaskViewDetail;
