import * as React from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Vibration,
  Text,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import { observer } from 'mobx-react-lite';

import rootStore from '../stores/root.store';
import { Layout } from '@ui-kitten/components';

const HeroScreen = observer(() => {
  const { emergencyStore } = rootStore;
  const {
    getEmergencyLocation,
    getIsEmergency,
    getSymptoms,
    getFirstResponders,
    nearestIntersection,
  } = emergencyStore;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <View style={styles.emergencyStatus}>
          <Text>
            {getIsEmergency ? 'EMERGENCY IN PROGRESS' : 'NO EMERGENCY'}
          </Text>
          <Text>
            {getFirstResponders ? `FIRST RESPONDER: ${getFirstResponders}` : ''}
          </Text>
        </View>

        {getIsEmergency ? (
          <>
            <Pressable style={styles.welcome}>
              <Text>Location of Emergency (Data Is For Testing)</Text>

              <Text style={{ fontSize: 15, color: 'white' }}>
                Nearest Intersection:
                {nearestIntersection?.intersection?.street1} -
                {nearestIntersection?.intersection?.street2}
              </Text>
              <Text>
                Emergency Distance from Intersection:
                {nearestIntersection?.intersection?.distance}
              </Text>
              <Text>Latitude: {getEmergencyLocation.latitude}</Text>
              <Text>Longitude: {getEmergencyLocation.longitude}</Text>
            </Pressable>

            <Pressable
              disabled={
                !getIsEmergency ||
                !getEmergencyLocation.latitude ||
                !getEmergencyLocation.longitude ||
                // TODO: Replace this with the ID of the current user instead of this fake userID.
                getFirstResponders.includes('Mendel')
              }
              onPress={() => (
                emergencyStore.addFirstResponder('123'),
                Vibration.vibrate(200),
                Linking.openURL(
                  `https://www.google.com/maps/search/?api=1&query=${getEmergencyLocation.latitude}+${getEmergencyLocation.longitude}`,
                )
              )}
              style={styles.alertButton}>
              <View style={styles.alertButton}>
                <Text style={styles.alertButton__text}>I'M ON MY WAY!</Text>
              </View>
            </Pressable>

            <View
              style={{
                backgroundColor: 'grey',
                width: 'auto',
                height: 'auto',
                padding: 10,
              }}>
              <Text style={{ color: 'white' }}>
                -- Choking: {getSymptoms.choking.toString()}
              </Text>
              <Text>-- Drowning: {getSymptoms.drowning.toString()}</Text>
              <Text>-- Hemmoraging: {getSymptoms.hemmoraging.toString()}</Text>
              <Text>-- Blunt Trauma: {getSymptoms.bluntTrauma.toString()}</Text>
              <Text>-- Other: {getSymptoms.other.toString()}</Text>
            </View>
          </>
        ) : null}

        {getIsEmergency && getFirstResponders.length > 0 ? (
          <View style={{ marginTop: 15 }}>
            <Button
              title="I Can't Help Anymore"
              // TODO: Need to replace this fake ID with real ID.
              onPress={() => (
                emergencyStore.removeFirstResponder('123'),
                Vibration.vibrate(50)
              )}
            />
          </View>
        ) : null}
      </Layout>
    </SafeAreaView>
  );
});

export default HeroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F3',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    borderWidth: 2,
    color: 'black',
    backgroundColor: 'grey',
  },
  alertButton: {
    backgroundColor: '#ABCBA9',
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  alertButton__text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  emergencyStatus: {
    height: 50,
    width: '50%',
    alignItems: 'center',
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: 'red',
    marginBottom: 100,
    color: 'grey',
  },
  cancelButton: {
    backgroundColor: 'green',
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    marginTop: 20,
  },
  cancelButton__text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});
