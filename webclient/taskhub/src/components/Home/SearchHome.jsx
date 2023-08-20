import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TasktagAutocomplete from '../../base/component/TasktagAutocomplete';

const SearchHome = () => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState(null);
  const navigate = useNavigate();

  return (
    <Box
      className="custom-box"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: 600,
          height: 300,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
        }}
        component={Paper}
      >
        <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
          <Typography sx={{ fontSize: 32, fontWeight: 600 }}>
            {t('th_key_home_help_search_title')}
          </Typography>
          <Stack direction={'row'} spacing={1} sx={{ px: 2 }}>
            <TasktagAutocomplete
              value={selectedValue}
              onChange={(selectedTag) => setSelectedValue(selectedTag)}
            />
            <Button
              sx={{ width: 280 }}
              size="large"
              variant="contained"
              onClick={() =>
                selectedValue
                  ? navigate(`/find/${selectedValue?.value}`)
                  : undefined
              }
            >
              {t('th_key_home_finding_now')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchHome;
