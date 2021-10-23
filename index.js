/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('Push Notification Token registered :', token);
  },
  onNotification: function (notification) {
    if (notification.foreground) {
      // Alert.alert(JSON.stringify(notification.message));
    }
    console.log('NOTIFICATION:', notification);
    // notification.finish();
  },
  onRegistrationError: function (err) {
    console.error('error registring Push Notification', err.message, err);
  },
  senderID: '256040146856',
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
