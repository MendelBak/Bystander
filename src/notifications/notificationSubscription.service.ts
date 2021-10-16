import PushNotification, { Importance } from 'react-native-push-notification';
import { FCM_CHANNEL_ID } from '../common/consts';

// ! TODO: I know there's some major problems here. I'm trying to implement a singleton for the notification service, but it looks like it's being re-generated every time the app is opened or a notification is received.
class NotificationSubscriptionService {
  constructor() {
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

    this.createChannel(
      FCM_CHANNEL_ID.DEFAULT,
      'Default Notification Channel',
      'Default Notification Channel for app communications',
      Importance.HIGH,
    );

    PushNotification.getChannels(channel_ids => {
      console.log('All channel IDs', channel_ids);
    });

    // End Constructor
  }

  subscribeToTopic(topic: string) {
    PushNotification.subscribeToTopic(topic);
  }

  unsubscribeFromTopic(topic: string) {
    PushNotification.unsubscribeFromTopic(topic);
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
        // vibrate: true,
      },
      created =>
        console.log(
          `Creating Notification Channel. Channel already existed -> ${!created}`,
        ), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  deleteChannel(channelId: string) {
    try {
      PushNotification.deleteChannel(channelId);
    } catch {
      console.log('Failed to delete FCM Channel');
    }
  }
}

const notificationSubscriptionService = new NotificationSubscriptionService();
export default notificationSubscriptionService;
