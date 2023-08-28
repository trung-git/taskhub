import React, { useState } from 'react';
import {
  View,
  Modal,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import TaskListPage from './TaskListPage';
import ContractDetail from './ContractDetail';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  // See: https://github.com/react-navigation/react-navigation/issues/7839
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

const TaskManage = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'invitation', title: 'Lời mời' },
    { key: 'discuss', title: 'Trao đổi' },
    { key: 'official', title: 'Hiện tại' },
    { key: 'finish', title: 'Kết thúc' },
  ]);

  const [taskOpen, setTaskOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openChat = (user) => {
    setSelectedUser(user);
    setTaskOpen(true);
  };

  const closeChat = () => {
    setTaskOpen(false);
  };

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  );

  // {!taskOpen && <TaskListPage onOpenChat={openChat} />}

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'invitation':
        return <TaskListPage status={route.key} onOpenChat={openChat} />;
      case 'discuss':
        return <TaskListPage status={route.key} onOpenChat={openChat} />;
      case 'official':
        return <TaskListPage status={route.key} onOpenChat={openChat} />;
      case 'finish':
        return <TaskListPage status={route.key} onOpenChat={openChat} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      labelStyle={{ fontWeight: 600 }}
      style={{ backgroundColor: 'green' }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <Modal visible={taskOpen} animationType="none" transparent={false}>
        <SafeAreaView style={styles.safeContainer}>
          <ContractDetail taskData={selectedUser} onClose={closeChat} />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default TaskManage;
