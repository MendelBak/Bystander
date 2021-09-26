// External
import {makeAutoObservable} from 'mobx';
import {FCM_CHANNEL_ID} from '../common/enums';

// Internal
import UserModel from '../models/user.model';
import notificationSubscriptionService from '../notifications/notificationSubscription.service';

export default class UserStore {
  user: UserModel = new UserModel();

  constructor() {
    makeAutoObservable(this);
  }

  toggleHeroStatus(): void {
    console.log(this.user.isHero);
    if (this.user.isHero === true) {
      this.user.isHero = false;
      notificationSubscriptionService.deleteChannel(FCM_CHANNEL_ID.HERO);
      // notificationSubscriptionService.deleteChannel(FCM_CHANNEL_ID.DEFAULT);
      // notificationSubscriptionService.unsubscribeFromTopic(
      //   FCM_CHANNEL_ID.EMERGENCY,
      // );
    } else {
      this.user.isHero = true;
      notificationSubscriptionService.subscribeToTopic(
        FCM_CHANNEL_ID.EMERGENCY,
      );
      notificationSubscriptionService.createChannel(
        FCM_CHANNEL_ID.HERO,
        'Hero Alerts',
        'A channel to notify Heroes of emergency events and updates',
        5,
      );
    }
  }
}
