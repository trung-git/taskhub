import * as Notifications from 'expo-notifications';
import notification from '../assets/sound/notification.mp3';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function schedulePushNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      sound: notification,
      body: body,
      data: { data: 'goes here' },
    },
    // trigger: { seconds: 1 },
    trigger: null,
  });
}
