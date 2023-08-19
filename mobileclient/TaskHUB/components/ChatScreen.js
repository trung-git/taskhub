import React, { useState } from 'react';
import {
  View,
  Modal,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import ChatListPage from './ChatListPage';
import ChatPage from './ChatPage';
import ContractDetail from './ContractDetail';
import { TabView, SceneMap } from 'react-native-tab-view';

const ChatScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'invitation', title: 'Lời mời' },
    { key: 'disscuss', title: 'Đã chấp nhận' },
    { key: 'finish', title: 'Lời mời' },
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

  // {!taskOpen && <ChatListPage onOpenChat={openChat} />}

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'invitation':
        return <ChatListPage status={route.key} onOpenChat={openChat} />;
      case 'disscuss':
        return <ChatListPage status={route.key} onOpenChat={openChat} />;
      case 'finish':
        return <ChatListPage status={route.key} onOpenChat={openChat} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
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

export default ChatScreen;
