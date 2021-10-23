// External
import { makeAutoObservable } from 'mobx';
import { Importance } from 'react-native-push-notification';
import { FCM_CHANNEL_ID } from '../common/consts';

// Internal
import UserModel from '../models/user.model';
import notificationSubscriptionService from '../notifications/notificationSubscription.service';

export default class UserStore {
  user: UserModel = new UserModel();

  constructor() {
    makeAutoObservable(this);
  }

  toggleHeroNotifications(): void {
    if (this.user.isHero === true) {
      this.user.isHero = false;
      notificationSubscriptionService.deleteChannel(FCM_CHANNEL_ID.HERO);
      // notificationSubscriptionService.deleteChannel(FCM_CHANNEL_ID.DEFAULT);
      notificationSubscriptionService.unsubscribeFromTopic(
        FCM_CHANNEL_ID.EMERGENCY,
      );
    } else {
      this.user.isHero = true;
      notificationSubscriptionService.createChannel(
        FCM_CHANNEL_ID.HERO,
        'Hero Alerts',
        'A channel to notify Heroes of emergency events and updates',
        Importance.HIGH,
      );
      notificationSubscriptionService.subscribeToTopic(
        FCM_CHANNEL_ID.EMERGENCY,
      );
    }
  }
}
