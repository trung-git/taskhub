import { useState, ChangeEvent, SyntheticEvent } from 'react';
// import { useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// import NumberFormat from 'react-number-format';

// project import
// import { openSnackbar } from 'store/reducers/snackbar';
// import IconButton from 'components/@extended/IconButton';
import MainCard from '../../base/component/MainCard';
import { useTranslation } from 'react-i18next';

// assets

// ==============================|| TAB - PAYMENT ||============================== //

const TabPayment = () => {
  const { t } = useTranslation();
  return (
    <MainCard title={t('th_key_person_wallet')}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            spacing={1.25}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          ></Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default TabPayment;
