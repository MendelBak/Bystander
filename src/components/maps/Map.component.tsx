import * as React from 'react';
import { Alert, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Layout } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import MapboxGL, { Logger } from '@react-native-mapbox-gl/maps';
import { mapboxKey } from '../../common/keys';
import rootStore from '../../stores/root.store';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

MapboxGL.setAccessToken(mapboxKey);

const Map = observer(() => {
  const { emergencyStore } = rootStore;
  const { getEmergencyLocation } = emergencyStore;
  const [endCoordinates, setEndCoordinates] = useState([
    getEmergencyLocation.longitude || 0,
    getEmergencyLocation.latitude || 0,
  ]);
  const [userCoordinates, setUserCoordinates] = useState<any>([0.0, 0.0]);

  useEffect(() => {
    updateCurrentUserLocation();
  }, []);

  const updateCurrentUserLocation = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    Geolocation.getCurrentPosition(
      (position: any) => {
        setUserCoordinates([
          position?.['coords']?.['longitude'],
          // TODO Comment this out after testing
          31.7732433,
          // position?.['coords']?.['latitude'] ,
        ]);
      },
      () => {
        Alert.alert(`GPS Error`, `You must allow GPS tracking`);
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
  };

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  // Hide expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  Logger.setLogCallback(log => {
    const { message } = log;

    if (
      message.match('Request failed due to a permanent error: Canceled') ||
      message.match('Request failed due to a permanent error: Socket Closed')
    ) {
      return true;
    }
    return false;
  });

  return (
    <Layout>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
        compassEnabled>
        <MapboxGL.Camera
          bounds={{
            ne: userCoordinates || [0.0, 0.0],
            sw: endCoordinates || [0.0, 0.0],
            paddingBottom: 50,
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 100,
          }}
          // zoomLevel={16}
          animationMode="flyTo"
          // followUserLocation
          // centerCoordinate={userCoordinates}
        />
        <MapboxGL.UserLocation showsUserHeadingIndicator />
        <MapboxGL.PointAnnotation
          coordinate={endCoordinates}
          id="emergency_location">
          <Icon color="red" name="location-pin" size={50} />
        </MapboxGL.PointAnnotation>
        <MapboxGL.PointAnnotation
          coordinate={userCoordinates}
          id="user_location">
          <Icon color="blue" name="location-on" size={35} />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </Layout>
  );
});

export default Map;

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});
