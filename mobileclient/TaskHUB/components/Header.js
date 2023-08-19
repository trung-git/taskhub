import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import NotiModal from './NotiModal';
import SideBar from './SideBar';

const Stack = createStackNavigator();

const Header = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isSideBarVisible, setSideBarVisible] = React.useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeSideBar = () => {
    setSideBarVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setSideBarVisible(true)}>
        <Ionicons name="menu-outline" size={24} style={styles.iconSideBar} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.logo}>TaskHUB</Text>
        <TouchableOpacity>
          <Feather
            name="check-circle"
            size={24}
            color="green"
            style={styles.logoIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons
          name="notifications-outline"
          size={24}
          style={styles.iconNoti}
        />
      </TouchableOpacity>

      <NotiModal closeModal={closeModal} isModalOpen={isModalVisible} />
      <SideBar closeSideBar={closeSideBar} isSideBarOpen={isSideBarVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  // headerContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingHorizontal: 16,
  //   height: 60,
  //   backgroundColor: 'lightblue',
  // },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    height: 100,
    paddingHorizontal: 24,
  },
  iconSideBar: {
    color: 'green',
    marginLeft: 16,
  },
  iconNoti: {
    color: 'green',
    marginRight: 16,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  logoIcon: {
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'green',
  },
  modalCloseButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Header;
