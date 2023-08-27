import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../../provider/LoginContext';
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
  Avatar,
} from '@mui/material';
import NavBar from '../NavBar';
import SearchHome from '../SearchHome';
import { useTranslation } from 'react-i18next';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import TASK_MAIN_moving from '../../assets/img/TASK_MAIN_moving.png';
import TASK_MAIN_arranging from '../../assets/img/TASK_MAIN_arranging.png';
import TASK_MAIN_cleaning from '../../assets/img/TASK_MAIN_cleaning.png';
import TASK_MAIN_shopping from '../../assets/img/TASK_MAIN_shopping.png';
import TASK_MAIN_pairing from '../../assets/img/TASK_MAIN_pairing.png';

const MaketingRow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ my: 6 }}>
      <Container maxWidth="xl">
        <Stack></Stack>
      </Container>
    </Box>
  );
};

export default MaketingRow;
