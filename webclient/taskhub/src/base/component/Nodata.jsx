import { Stack, Typography, useTheme } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useTranslation } from 'react-i18next';

const Nodata = ({ langKey = 'th_key_nodata', height = 300 }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Stack
      sx={{
        height: height,
        border: '1px solid',
        borderRadius: 1,
        borderColor:
          theme.palette.mode === 'dark' ? theme.palette.divider : '#e6ebf1',
        boxShadow: theme.customShadows.z1,
        ':hover': {
          boxShadow: theme.customShadows.z1,
        },
      }}
      alignItems={'center'}
      justifyContent={'center'}
      direction={'column'}
      spacing={2}
    >
      <InsertDriveFileOutlinedIcon sx={{ fontSize: '50px' }} />
      <Typography>{t(langKey)}</Typography>
    </Stack>
  );
};

export default Nodata;
