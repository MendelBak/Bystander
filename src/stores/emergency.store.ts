// External
import { makeAutoObservable } from 'mobx';
import Geolocation from 'react-native-geolocation-service';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import * as RootNavigation from '../../RootNavigation';

// Internal
import EmergencyLocationModel from '../models/emergencyLocation.model';
import SymptomModel from '../models/symptom.model';
import EmergencyModel from '../models/emergency.model';
import { SYMPTOMS } from '../common/consts';
import { URI } from '../../URI';
import { mapboxKey } from '../common/keys';

export default class EmergencyStore {
  emergency: EmergencyModel = new EmergencyModel();
  // private location: EmergencyLocationModel = new EmergencyLocationModel();
  // private symptoms: SymptomsModel = new SymptomsModel();
  streetAddress: any = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  // HACK: This is kinda weird. GetCurrentPosition is not returning asyncronously and this is a hack. So I need to start to declare the emergency with the location request, and then initiate creation of an emergency.
  async initializeEmergency(): Promise<void> {
    await this.getCurrentPositionAndStartEmergency();
  }

  declareEmergency(position: any): void {
    //   declareEmergency(position: GeolocationPosition): void {
    this.emergency = new EmergencyModel({
      active: true,
      heroOnScene: false,
      heroes: [],
      emergencyLocation: new EmergencyLocationModel(position),
      symptom: new SymptomModel(),
      // TODO: Replace with real user ID.
      userId: '123',
    });

    axios
      .post(`${URI}/emergency/createEmergency`, this.emergency)
      .then(response => {
        console.log(`//declareEmergency ~ response`, response);
        this.setEmergency(response.data);
        this.getStreetAddress(position);
      })
      .catch(error => {
        console.error('There was an error creating an emergency event!', error);
      });
  }

  endEmergency(): void {
    if (!this.emergency.active) {
      return;
    }

    this.emergency.active = false;
    this.streetAddress = undefined;

    axios
      .put(`${URI}/emergency/endEmergency`, { id: this.emergency._id })
      .catch(error => {
        console.error('Error while ending an emergency event.', error);
      });
  }

  get getIsEmergency(): boolean {
    return this.emergency.active;
  }

  async getEmergencies() {
    axios
      .get(`${URI}/emergency`)
      .then(async response => {
        return response.data;
      })
      .catch(err => {
        console.log('Error getting emergencies', err);
      });
  }

  get getHeroes(): string[] {
    return this.emergency.heroes;
  }

  addHero(id: string): void {
    this.emergency.heroes.push(id);
  }

  removeHero(id: string): void {
    this.emergency.heroes.splice(
      this.emergency.heroes.findIndex(heroId => heroId === id),
      1,
    );
    // TODO: Need to update the emergency with the newly modified rescuers (after rescuers collection/model is built on the backend).
  }

  //#region location
  // This function does two things because the Geolocation.getCurrentPosition function is not returning its values asyncronously, so this is the best way I found to pass the data along, without having a race condition.
  async getCurrentPositionAndStartEmergency(): Promise<void> {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    Geolocation.getCurrentPosition(
      (position: any) => {
        //   (position: GeolocationPosition) => {
        this.declareEmergency(position);
      },
      async () => {
        Alert.alert(`GPS Error`, `You must allow GPS tracking`);
        RootNavigation.navigate('Home', { resetEmergencyAnimation: true });
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  }

  setEmergency(emergency: EmergencyModel): void {
    this.emergency._id = emergency._id;
  }

  setEmergencyLocation(position: any): void {
    //   setEmergencyLocation(position: GeolocationPosition): void {
    this.emergency.emergencyLocation = new EmergencyLocationModel(position);
  }

  get getEmergencyLocation(): EmergencyLocationModel {
    return this.emergency.emergencyLocation;
  }

  setStreetAddress(intersectionData: any): void {
    this.streetAddress = intersectionData;
  }

  // HACK: This function is probably unecessary, since I'm using, literally, the exact same function in the backend, in order to use the intersection in the push notification header, so why make two identical API calls?. Maybe I can pass through the address with the notification as data payload?
  // I'm keeping this API call here, for now, because the backend may change, also, it seems weird to get the data from the notification.
  // Worth looking into.
  getStreetAddress = (locationData: any) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationData?.coords?.longitude},${locationData?.coords?.latitude}.json?types=country,address,postcode&access_token=${mapboxKey}`,
      )
      .then(response => {
        this.setStreetAddress(
          `${response?.data?.['features']?.[0]?.['address']} ${response?.data?.['features']?.[0]?.['text']}`,
        );
      })
      .catch(error => {
        console.error('There was an error performing reverse geocoding', error);
      });
  };
  //#endregion location

  // TODO: Should probably be in its own Symptoms store.
  //#region symptoms
  updateSymptom(symptom: SYMPTOMS): void {
    this.emergency.symptom[symptom] = !this.emergency.symptom[symptom];
  }

  updateSymptoms(): void {
    axios
      .put(`${URI}/emergency/updateSymptoms`, this.emergency)
      .catch(error => {
        console.error('Error while updating emergency symptoms.', error);
      });
  }

  get getSymptoms(): SymptomModel {
    return this.emergency.symptom;
  }
  //#endregion symptoms
}
