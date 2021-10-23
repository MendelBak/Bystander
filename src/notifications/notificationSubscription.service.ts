import PushNotification, { Importance } from 'react-native-push-notification';
import { FCM_CHANNEL_ID } from '../common/consts';

// ! TODO: I know there's some major problems here. I'm trying to implement a singleton for the notification service, but it looks like it's being re-generated every time the app is opened or a notification is received.
class NotificationSubscriptionService {
  constructor() {
    this.createDefaultChannels();

    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.getChannels(function (channels) {
      console.log('channels -> ', channels);
    });

    PushNotification.getChannels(channel_ids => {
      console.log('All channel IDs', channel_ids);
    });
  }

  createChannel(
    id: string,
    name: string,
    channelDescription: string,
    importance: number,
  ) {
    PushNotification.createChannel(
      {
        channelId: id, // (required)
        channelName: name, // (required)
        channelDescription: channelDescription,
        soundName: 'default',
        importance: importance,
        vibrate: true,
        playSound: true,
      },
      created =>
        console.log(
          `Creating Notification Channel. (False means it already existed) -> ${created}`,
        ),
    );
  }

  createDefaultChannels() {
    this.createChannel(
      FCM_CHANNEL_ID.DEFAULT, // (required)
      `Default channel`, // (required)
      "Default Notification Channel for Bystander app communications'",
      Importance.HIGH,
    );
    this.createChannel(
      FCM_CHANNEL_ID.BYSTANDER,
      'Bystander Alerts',
      'Channel to notify Bystanders of emergency events and updates',
      Importance.HIGH,
    );
    this.createChannel(
      FCM_CHANNEL_ID.HERO,
      'Hero Alerts',
      'Channel to notify Heroes of emergency events and updates',
      Importance.HIGH,
    );
  }

  deleteChannel(channelId: string) {
    try {
      PushNotification.deleteChannel(channelId);
    } catch {
      console.log('Failed to delete FCM Channel');
    }
  }

  subscribeToTopic(topic: string) {
    PushNotification.subscribeToTopic(topic);
    console.log('Subscribed to topic ->', topic);
  }

  unsubscribeFromTopic(topic: string) {
    PushNotification.unsubscribeFromTopic(topic);
  }

  popInitialNotification() {
    PushNotification.popInitialNotification(notification =>
      console.log('InitialNotication:', notification),
    );
  }

  checkPermission() {
    return PushNotification.checkPermissions(response =>
      console.log('check permissions -> ', response),
    );
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotif(id) {
    PushNotification.cancelLocalNotification(id);
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }

  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }

  getDeliveredNotifications(callback) {
    PushNotification.getDeliveredNotifications(callback);
  }
}
const notificationSubscriptionService = new NotificationSubscriptionService();
export default notificationSubscriptionService;
