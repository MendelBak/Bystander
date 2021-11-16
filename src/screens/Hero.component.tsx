import * as React from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Vibration,
  SafeAreaView,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as FontistoIcon } from 'react-native-vector-icons/Fontisto';
import { default as FontAwesome5Icon } from 'react-native-vector-icons/FontAwesome5';
import rootStore from '../stores/root.store';
import { Layout, useTheme, Text, Divider, Button } from '@ui-kitten/components';
import { iconTypes, SYMPTOMS } from '../common/consts';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
import Map from '../components/maps/Map.component';

const HeroScreen = observer(() => {
  const { emergencyStore } = rootStore;
  const theme = useTheme();
  const {
    getEmergencyLocation,
    getIsEmergency,
    getSymptoms,
    getHeroes,
    streetAddress,
  } = emergencyStore;

  const symptomsAreNotReported = () => {
    const symptomsArr: any = [];
    Object.keys(getSymptoms).forEach(symptom => {
      if (getSymptoms[symptom] === true) {
        symptomsArr.push(symptom);
      }
    });

    if (
      symptomsArr.length === 0 ||
      (symptomsArr.length === 1 && symptomsArr[0] === SYMPTOMS.OTHER)
    ) {
      return true;
    } else {
      return false;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      heartAnimationRef?.play();
      return;
    }, []),
  );

  let heartAnimationRef: LottieView | null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        {getIsEmergency ? (
          <>
            <Layout style={styles.info_banner}>
              <Layout style={styles.symptoms_icons}>
                {getSymptoms.cardiacArrest ? (
                  <Icon
                    color={theme['color-primary-500']}
                    size={30}
                    name={iconTypes.cardiacArrest.name}></Icon>
                ) : null}
                {getSymptoms.bluntTrauma ? (
                  <FontAwesome5Icon
                    size={30}
                    color={theme['color-primary-500']}
                    name={iconTypes.bluntTrauma.name}></FontAwesome5Icon>
                ) : null}
                {getSymptoms.choking ? (
                  <FontistoIcon
                    color={theme['color-primary-500']}
                    size={30}
                    name={iconTypes.choking.name}></FontistoIcon>
                ) : null}
                {getSymptoms.drowning ? (
                  <Icon
                    color={theme['color-primary-500']}
                    size={30}
                    name={iconTypes.drowning.name}
                  />
                ) : null}
                {getSymptoms.hemmoraging ? (
                  <FontistoIcon
                    color={theme['color-primary-500']}
                    size={30}
                    name={iconTypes.hemmoraging.name}></FontistoIcon>
                ) : null}
                {getSymptoms.other || symptomsAreNotReported() ? (
                  <Icon
                    color={theme['color-primary-500']}
                    size={30}
                    name={iconTypes.other.name}></Icon>
                ) : null}
              </Layout>
            </Layout>
            <Divider
              style={{
                backgroundColor: theme['color-primary-500'],
                width: '100%',
              }}
            />

            <Layout style={styles.center_section}>
              {/* <Pressable>
                <Text>Location of Emergency (Data Is For Testing)</Text>

                <Text style={{ fontSize: 15, color: 'white' }}>
                  Nearest Intersection:
                  {streetAddress?.intersection?.street1} -
                  {streetAddress?.intersection?.street2}
                </Text>
                <Text>
                  Emergency Distance from Intersection:
                  {streetAddress?.intersection?.distance}
                </Text>
              </Pressable> */}
              <Map />
            </Layout>

            <Layout style={styles.action_buttons}>
              <Button
                onPress={() => Vibration.vibrate(200)}
                style={{
                  backgroundColor: theme['color-danger-700'],
                  borderWidth: 0,
                }}>
                <Text>I Can't Help</Text>
              </Button>
              <Button
                style={{
                  backgroundColor: theme['color-success-500'],
                  borderWidth: 0,
                }}
                onPress={() => (
                  // TODO : Add real user ID here.
                  emergencyStore.addHero('123'),
                  Vibration.vibrate(200),
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=${getEmergencyLocation.latitude}+${getEmergencyLocation.longitude}`,
                  )
                )}>
                <Text>On My Way!</Text>
              </Button>
            </Layout>
          </>
        ) : (
          <Layout style={styles.no_emergency_notice_container}>
            <Pressable
              onPress={() => heartAnimationRef?.play()}
              style={styles.animation_wrapper}>
              <LottieView
                source={require('../../assets/animations/heart-beat-pop-up.json')}
                autoPlay
                loop={false}
                ref={animation => {
                  heartAnimationRef = animation;
                }}
              />
            </Pressable>

            <Layout style={styles.no_emergency_notice}>
              <Text category="h4">No emergencies in your area</Text>

              <Text category="h6">Enjoy your day!</Text>
            </Layout>
          </Layout>
        )}
      </Layout>
    </SafeAreaView>
  );
});

export default HeroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    height: '100%',
  },
  center_section: {
    height: '82%',
    width: '100%',
  },
  action_buttons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    justifyContent: 'space-evenly',
    backgroundColor: '#F0F0F3',
  },
  no_emergency_notice_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F3',
  },
  animation_wrapper: {
    width: '100%',
    height: '50%',
  },
  no_emergency_notice: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '30%',
    backgroundColor: '#F0F0F3',
  },
});
