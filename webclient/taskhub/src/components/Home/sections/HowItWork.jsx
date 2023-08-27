import {
  Avatar,
  Box,
  Container,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HandymanIcon from '@mui/icons-material/Handyman';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

import PostAddIcon from '@mui/icons-material/PostAdd';
import GradingIcon from '@mui/icons-material/Grading';

import Profiling_pana from '../../../assets/img/Profiling_pana.png';
import OnlineReviewcuate from '../../../assets/img/OnlineReviewcuate.png';

import MK_cooperation from '../../../assets/img/MK_cooperation.png';
import Businessdealpana from '../../../assets/img/Businessdealpana.png';
import TASK_MAIN_moving from '../../../assets/img/TASK_MAIN_moving.png';

import Discussioncuate from '../../../assets/img/Discussioncuate.png';
import Invitecuate from '../../../assets/img/Invitecuate.png';
import TASK_MAIN_pairing from '../../../assets/img/TASK_MAIN_pairing.png';

import Collectioncuate from '../../../assets/img/Collectioncuate.png';
import Tradecuate from '../../../assets/img/Tradecuate.png';

import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.dark,
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <TravelExploreIcon />,
    2: <QuestionAnswerIcon />,
    3: <HandymanIcon />,
    4: <PriceCheckIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function ColorlibStepIconPost(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PostAddIcon />,
    2: <GradingIcon />,
    3: <HandymanIcon />,
    4: <PriceCheckIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const HowItWork = () => {
  const { t } = useTranslation();
  const steps = [
    'Tìm kiếm và chọn người làm việc',
    'Gởi lời mời và trao đổi công việc',
    'Thực hiện công việc',
    'Hoàn thành và thanh toán',
  ];

  const postSteps = [
    'Đăng bài tìm kiếm',
    'Chọn ứng viên và Trao đổi công việc',
    'Thực hiện công việc',
    'Hoàn thành và thanh toán',
  ];

  return (
    <Box sx={{ my: 6 }}>
      <Container maxWidth="lg">
        <Stack
          justifyContent={'flex-start'}
          alignItems={'center'}
          sx={{ width: '100%' }}
          direction={'row'}
        >
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ fontWeight: 600, mb: 2 }}
          >
            {t('Cách TaskHUB hoạt động')}
          </Typography>
        </Stack>
        <Stack sx={{ width: '100%', mt: 3, mb: 6 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 600, mb: 4 }}
          >
            {t('Quy trình làm việc với công cụ tìm kiếm')}
          </Typography>
          <Stepper
            alternativeLabel
            activeStep={3}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography variant="h5">{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        <Grid container spacing={3}>
          <Grid xs={3}>
            <Avatar
              sx={{ width: '100%', height: 'auto' }}
              src={OnlineReviewcuate}
              variant="square"
            />
          </Grid>
          <Grid xs={3}>
            <Avatar
              sx={{ width: '100%', height: 'auto' }}
              src={Discussioncuate}
              variant="square"
            />
          </Grid>
          <Grid xs={3}>
            <Avatar
              sx={{ width: '100%', height: 'auto' }}
              src={Collectioncuate}
              variant="square"
            />
          </Grid>
          <Grid xs={3}>
            <Avatar
              sx={{ width: '100%', height: 'auto' }}
              src={Tradecuate}
              variant="square"
            />
          </Grid>
        </Grid>

        <Stack sx={{ width: '100%', mt: 3, mb: 6 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 600, mb: 4 }}
          >
            {t('Quy trình làm việc với bài đăng')}
          </Typography>
          <Stepper
            alternativeLabel
            activeStep={3}
            connector={<ColorlibConnector />}
          >
            {postSteps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIconPost}>
                  <Typography variant="h5">{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        <Grid container spacing={3}>
          <Grid xs={3}>
            <Avatar
              sx={{ width: '100%', height: 'auto' }}
              src={Profiling_pana}
              variant="square"
            />
          </Grid>
          <Grid xs={3}>
            <Avatar
              sx={{ width: '100%', height: 'auto' }}
              src={Invitecuate}
              variant="square"
            />
          </Grid>
          <Grid xs={3}>
            <Avatar
              sx={{ width: '100%', height: 'auto' }}
              src={TASK_MAIN_pairing}
              variant="square"
            />
          </Grid>
          <Grid xs={3}>
            <Avatar
              sx={{ width: '100%', height: 'auto' }}
              src={Businessdealpana}
              variant="square"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWork;
