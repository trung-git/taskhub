import { useContext, useMemo, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Tab, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import NavBar from '../Home/NavBar';
import { LoginContext } from '../../provider/LoginContext';
import TaskListByType from './TaskListByType';
import MainCard from '../../base/component/MainCard';

const TaskList = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [value, setValue] = useState('official');
  const { isLogin } = useContext(LoginContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabMemo = useMemo(() => {
    return <TaskListByType type={value} />;
  }, [value]);

  return (
    <Box sx={{ width: '100%' }}>
      <NavBar isLogin={isLogin} />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <MainCard
          title={t('th_key_tasklist_manage')}
          headerSXProps={{
            '& .MuiTypography-root': {
              textAlign: 'start',
            },
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="task-hub-tasklist-tab"
                sx={{
                  '& .Mui-selected': {
                    fontWeight: 'bold',
                  },
                }}
              >
                <Tab
                  label={t('th_key_tasklist_tab_invation')}
                  value="invitation"
                />
                <Tab label={t('th_key_tasklist_tab_discuss')} value="discuss" />
                <Tab
                  label={t('th_key_tasklist_tab_current')}
                  value="official"
                />

                <Tab label={t('th_key_tasklist_tab_finish')} value="finish" />
                <Tab label={t('th_key_tasklist_tab_cancel')} value="cancel" />
              </TabList>
            </Box>
            <TabPanel value="invitation">{renderTabMemo}</TabPanel>
            <TabPanel value="discuss">{renderTabMemo}</TabPanel>
            <TabPanel value="official">{renderTabMemo}</TabPanel>
            <TabPanel value="finish">{renderTabMemo}</TabPanel>
            <TabPanel value="cancel">{renderTabMemo}</TabPanel>
          </TabContext>
        </MainCard>
      </Container>
    </Box>
  );
};

export default TaskList;
