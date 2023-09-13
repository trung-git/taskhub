// material-ui
import { Typography, Stack, CardMedia } from '@mui/material';

// assets
import UploadCover from '../../../assets/svg/upload.svg';
import { useTranslation } from 'react-i18next';

export default function PlaceholderContent() {
  const { t } = useTranslation();
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      <CardMedia component="img" image={UploadCover} sx={{ width: 80 }} />
      <Stack sx={{ p: 3 }} spacing={1}>
        <Typography variant="h5">{t('th_key_post_drag')}</Typography>

        <Typography color="secondary">
          {t('th_key_post_drop')}&nbsp;
          <Typography
            component="span"
            color="primary"
            sx={{ textDecoration: 'underline' }}
          >
            {t('th_key_post_browse')}
          </Typography>
          &nbsp;{t('th_key_post_thorough')}
        </Typography>
      </Stack>
    </Stack>
  );
}
