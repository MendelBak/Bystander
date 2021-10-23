import * as React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Layout } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import MapboxGL, { Logger } from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWVuZGVsYmFrIiwiYSI6ImNrdjBza3E4YTBhMncydW92eWFlMTNvcGYifQ.UpHPPYd3PhSJtiis7RFOHg',
);

const Map = observer(() => {
  const [coordinates, setCoordinates] = useState([
    35.23447631127978, 31.776887613261948,
  ]);
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
          zoomLevel={16}
          animationMode="flyTo"
          followUserLocation
          // followUserMode="course"
          centerCoordinate={coordinates}
        />
        <MapboxGL.PointAnnotation coordinate={coordinates} id="Test" />
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
