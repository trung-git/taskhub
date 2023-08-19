import { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  SafeAreaView,
  Button,
  Platform,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import notification from '../assets/sound/notification.mp3';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotiModal = ({ isModalOpen, closeModal }) => {
  const toggleModal = () => {
    closeModal && closeModal();
  };

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <Modal visible={isModalOpen} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Notifications</Text>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={toggleModal}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>

          {/* <Text>Your expo push token: {expoPushToken}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>
              Title: {notification && notification.request.content.title}{' '}
            </Text>
            <Text>
              Body: {notification && notification.request.content.body}
            </Text>
            <Text>
              Data:{' '}
              {notification &&
                JSON.stringify(notification.request.content.data)}
            </Text>
          </View> */}

          <Button
            title="Press to schedule a notification"
            onPress={async () => {
              await schedulePushNotification();
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tin nhắn từ Luong Le',
      sound: notification,
      body: 'Lẹ về làm socket.io nè 😘😘😘',
      data: { data: 'goes here' },
    },
    // trigger: { seconds: 1 },
    trigger: null,
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

const styles = StyleSheet.create({
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

export default NotiModal;
