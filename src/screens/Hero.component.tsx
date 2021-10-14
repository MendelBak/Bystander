import * as React from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Vibration,
  Button,
  SafeAreaView,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as FontistoIcon } from 'react-native-vector-icons/Fontisto';
import { default as FontAwesome5Icon } from 'react-native-vector-icons/FontAwesome5';
import rootStore from '../stores/root.store';
import { Layout, useTheme, Text, Divider } from '@ui-kitten/components';
import { iconTypes } from '../common/consts';

const HeroScreen = observer(() => {
  const { emergencyStore } = rootStore;
  const theme = useTheme();
  const {
    getEmergencyLocation,
    getIsEmergency,
    getSymptoms,
    getHeroes,
    nearestIntersection,
  } = emergencyStore;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        {getIsEmergency ? (
          <>
            <Layout style={styles.info_banner}>
              <Layout style={styles.symptoms_icons}>
                {getSymptoms.cardiacArrest ? (
                  <Icon size={30} name={iconTypes.cardiacArrest.name}></Icon>
                ) : null}
                {getSymptoms.bluntTrauma ? (
                  <FontAwesome5Icon
                    size={30}
                    name={iconTypes.bluntTrauma.name}></FontAwesome5Icon>
                ) : null}
                {getSymptoms.choking ? (
                  <FontistoIcon
                    size={30}
                    name={iconTypes.choking.name}></FontistoIcon>
                ) : null}
                {getSymptoms.drowning ? (
                  <Icon size={30} name={iconTypes.drowning.name} />
                ) : null}
                {getSymptoms.hemmoraging ? (
                  <FontistoIcon
                    size={30}
                    name={iconTypes.hemmoraging.name}></FontistoIcon>
                ) : null}
                {getSymptoms.other ? (
                  <Icon size={30} name={iconTypes.other.name}></Icon>
                ) : null}
              </Layout>
            </Layout>
            <Divider
              style={{
                backgroundColor: theme['color-info-100'],
                width: '100%',
              }}
            />

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
                getHeroes.includes('Mendel')
              }
              onPress={() => (
                emergencyStore.addHero('123'),
                Vibration.vibrate(200),
                Linking.openURL(
                  `https://www.google.com/maps/search/?api=1&query=${getEmergencyLocation.latitude}+${getEmergencyLocation.longitude}`,
                )
              )}
              style={styles.alertButton}>
              <Layout style={styles.alertButton}>
                <Text style={styles.alertButton__text}>I'M ON MY WAY!</Text>
              </Layout>
            </Pressable>

            <Layout
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
            </Layout>
          </>
        ) : (
          <Layout style={styles.no_emergency_notice}>
            <Icon
              size={100}
              name="hand-peace"
              style={{
                color: theme['color-primary-default'],
              }}></Icon>
            <Text category="h4">No emergencies in your area</Text>

            <Text category="h6">Enjoy your day!</Text>
          </Layout>
        )}

        {getIsEmergency && getHeroes.length > 0 ? (
          <Layout style={{ marginTop: 15 }}>
            <Button
              title="I Can't Help Anymore"
              // TODO: Need to replace this fake ID with real ID.
              onPress={() => (
                emergencyStore.removeHero('123'), Vibration.vibrate(50)
              )}
            />
          </Layout>
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
    // justifyContent: 'center',
    backgroundColor: '#F0F0F3',
  },
  info_banner: {
    width: '100%',
    height: '8%',
    backgroundColor: '#F3F3F0',
  },
  symptoms_icons: {
    backgroundColor: '#F3F3F0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  welcome: {
    // fontSize: 20,
    // textAlign: 'center',
    // margin: 10,
    // borderWidth: 2,
    // color: 'black',
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
  no_emergency_notice: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#F0F0F3',
  },
});
