import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import TASK_MAIN_moving from '../../assets/img/TASK_MAIN_moving.png';
import TASK_MAIN_arranging from '../../assets/img/TASK_MAIN_arranging.png';
import TASK_MAIN_cleaning from '../../assets/img/TASK_MAIN_cleaning.png';
import TASK_MAIN_shopping from '../../assets/img/TASK_MAIN_shopping.png';
import TASK_MAIN_pairing from '../../assets/img/TASK_MAIN_pairing.png';

const PopularTask = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const taskTag = [
    {
      _id: '64a0163810f4179aa8f4c7b3',
      title: 'Errands',
      description:
        'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
      langKey: 'th_task_errands',
      avgPrice: [5, 30],
      defaultPrice: 6.12,
      photo: TASK_MAIN_arranging,
      __v: 0,
      createdAt: '2023-07-15T16:46:08.021Z',
      updatedAt: '2023-07-15T16:46:08.021Z',
    },
    {
      _id: '64a01990544c07c755c71904',
      title: 'Help Moving',
      description:
        'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
      langKey: 'th_task_helpmoving',
      avgPrice: [10, 60],
      defaultPrice: 20.87,
      photo: TASK_MAIN_moving,
      __v: 0,
      createdAt: '2023-07-15T16:46:08.022Z',
      updatedAt: '2023-07-15T16:46:08.022Z',
    },
    {
      _id: '64a01c237aa7438ccab0850b',
      title: 'Electrical Help',
      description:
        'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
      langKey: 'th_task_electricalhelp',
      avgPrice: [20, 100],
      defaultPrice: 40.77,
      photo: TASK_MAIN_pairing,
      __v: 0,
      createdAt: '2023-07-15T16:46:08.022Z',
      updatedAt: '2023-07-15T16:46:08.022Z',
    },
    {
      _id: '64a01c324227a31165bc4bfb',
      title: 'Cleaning',
      description:
        'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
      langKey: 'th_task_cleaning',
      avgPrice: [10, 100],
      defaultPrice: 30.11,
      photo: TASK_MAIN_cleaning,
      __v: 0,
      createdAt: '2023-07-15T16:46:08.023Z',
      updatedAt: '2023-07-15T16:46:08.023Z',
    },
    {
      _id: '64a01c50024571ad8ba9e11e',
      title: 'General Mounting',
      description:
        'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
      langKey: 'th_task_generalmounting',
      avgPrice: [50, 500],
      defaultPrice: 100,
      photo: TASK_MAIN_shopping,
      __v: 0,
      createdAt: '2023-07-15T16:46:08.023Z',
      updatedAt: '2023-07-15T16:46:08.023Z',
    },
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
            {t('th_key_home_popular_task')}
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {taskTag?.map((tag) => {
            return (
              <Grid item xs={12} md={6} lg={3} key={tag._id}>
                <Card>
                  <CardMedia
                    sx={{ height: 200, backgroundSize: 'contain' }}
                    image={tag?.photo}
                    title={tag?.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {tag?.title}
                    </Typography>
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      spacing={0.5}
                    >
                      <SellOutlinedIcon />
                      <Typography variant="body2" color="text.secondary">
                        {t('th_key_home_avg_price')}
                        {': '}
                        {(tag?.avgPrice[0] * 23000).toLocaleString('vi')}-
                        {(tag?.avgPrice[1] * 23000).toLocaleString('vi')} VND
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default PopularTask;
