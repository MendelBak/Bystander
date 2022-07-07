import { makeAutoObservable } from 'mobx';
import EmergencyStore from './emergency.store';
import UserStore from './user.store';

class RootStore {
  emergencyStore: EmergencyStore;
  userStore: UserStore;

  constructor() {
    this.emergencyStore = new EmergencyStore();
    this.userStore = new UserStore();
    makeAutoObservable(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
