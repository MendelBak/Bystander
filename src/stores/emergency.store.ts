import { makeAutoObservable } from 'mobx';
import Geolocation from 'react-native-geolocation-service';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import * as RootNavigation from '../../RootNavigation';

import EmergencyLocationModel from '../models/emergencyLocation.model';
import SymptomModel from '../models/symptom.model';
import EmergencyModel from '../models/emergency.model';
import { SYMPTOMS } from '../common/consts';
import { URI } from '../common/URI';

export default class EmergencyStore {
  emergency: EmergencyModel = new EmergencyModel();
  // private location: EmergencyLocationModel = new EmergencyLocationModel();
  // private symptoms: SymptomsModel = new SymptomsModel();
  streetAddress: any = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async declareEmergency(): Promise<boolean> {
    try {
      const currentPosition = await this.getCurrentPosition();
      await this.createNewEmergency(currentPosition);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCurrentPosition(): Promise<Geolocation.GeoPosition> {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    return new Promise<Geolocation.GeoPosition>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position: Geolocation.GeoPosition) => {
          resolve(position);
        },
        error => {
          Alert.alert(`GPS Error`, `You must allow GPS tracking`);
          RootNavigation.navigate('Home', { resetEmergencyAnimation: true });
          reject(error);
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
    });
  }

  async createNewEmergency(position: Geolocation.GeoPosition): Promise<void> {
    this.emergency = new EmergencyModel({
      active: true,
      heroOnScene: false,
      heroes: [],
      emergencyLocation: new EmergencyLocationModel(position),
      symptom: new SymptomModel(),
      // TODO: Replace with real user ID.
      userId: '123',
    });

    try {
      const emergencyObj = await axios.post(
        `${URI}/emergency/createEmergency`,
        this.emergency,
      );
      this.setEmergency(emergencyObj.data);
      return;
    } catch (error) {
      console.error('There was an error creating an emergency event!', error);
      throw new Error();
    }
  }

  async endEmergency(): Promise<boolean> {
    if (!this.emergency.active) {
      return true;
    }

    this.emergency.active = false;
    this.streetAddress = undefined;

    await axios
      .put(`${URI}/emergency/endEmergency`, { id: this.emergency._id })
      .catch(error => {
        console.error('Error while ending an emergency event.', error);
        return false;
      });

    return true;
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
        console.error('Error getting emergencies', err);
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
  // getStreetAddress = (locationData: any) => {
  //   axios
  //     .get(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationData?.coords?.longitude},${locationData?.coords?.latitude}.json?types=country,address,postcode&access_token=${mapboxKey}`,
  //     )
  //     .then(response => {
  //       this.setStreetAddress(
  //         `${response?.data?.['features']?.[0]?.['address']} ${response?.data?.['features']?.[0]?.['text']}`,
  //       );
  //     })
  //     .catch(error => {
  //       console.error('There was an error performing reverse geocoding', error);
  //     });
  // };
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
