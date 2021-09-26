export default class EmergencyLocationModel {
  altitudeAccuracy;
  altitude;
  accuracy;
  heading;
  longitude: number = 0;
  latitude: number = 0;
  speed;
  timestamp;

  constructor(emergencyLocation?: any) {
    //   constructor(emergencyLocation?: GeolocationPosition) {
    if (emergencyLocation) {
      this.altitudeAccuracy = emergencyLocation.coords.altitudeAccuracy;
      this.altitude = emergencyLocation.coords.altitude;
      this.accuracy = emergencyLocation.coords.accuracy;
      this.heading = emergencyLocation.coords.heading;
      this.longitude = emergencyLocation.coords.longitude;
      this.latitude = emergencyLocation.coords.latitude;
      this.speed = emergencyLocation.coords.speed;
      this.timestamp = emergencyLocation.timestamp;
    }
  }
}
