import { Button, Card, Layout, Modal, useTheme } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Pressable,
  Vibration,
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
} from 'react-native';
import rootStore from '../stores/root.store';
import LottieView from 'lottie-react-native';

const HomeScreen = observer(
  ({ route, navigation }: { route: any; navigation: any }, props) => {
    const { emergencyStore } = rootStore;
    const theme = useTheme();

    let loadingAnimationRef: LottieView | null;

    const buttonStatus = {
      cancel: 'CANCEL EMERGENCY',
      getHelp: 'GET HELP',
      pending: 'REQUESTING...',
      cancelling: 'CANCELLING...',
      inProgress: 'EMERGENCY IN PROGRESS',
    };

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showCancelAlert, setShowCancelAlert] = useState(false);
    const [emergencyButtonText, setEmergencyButtonText] = useState(
      emergencyStore.getIsEmergency
        ? buttonStatus.cancel
        : buttonStatus.getHelp,
    );

    const beginEmergency = async () => {
      loadingAnimationRef?.play();
      setEmergencyButtonText(buttonStatus.pending);

      try {
        const isEmergencyDeclared = await emergencyStore.declareEmergency();

        if (isEmergencyDeclared) {
          setEmergencyButtonText(buttonStatus.inProgress);
          setShowSuccessAlert(true);
        } else if (!isEmergencyDeclared) {
          setEmergencyButtonText(buttonStatus.getHelp);
        }
      } catch (error) {
        Alert.alert('There was an error with your emergency help request');
      }
    };

    const endEmergency = async () => {
      setEmergencyButtonText(buttonStatus.cancelling);

      if (emergencyStore.getIsEmergency) {
        setEmergencyButtonText(buttonStatus.cancelling);
        const isEmergencyEnded = await emergencyStore.endEmergency();
        if (isEmergencyEnded === true) {
          setEmergencyButtonText(buttonStatus.getHelp);
          setShowCancelAlert(true);
        } else {
          setEmergencyButtonText(buttonStatus.cancel);
        }
      }
    };

    const successModal = () => {
      return (
        <View>
          <Modal
            visible={showSuccessAlert}
            backdropStyle={styles.successAlertBackdrop}
            onBackdropPress={() => setShowSuccessAlert(false)}>
            <View
              style={{
                height: 140,
                marginTop: -240,
                marginBottom: 100,
              }}>
              <LottieView
                source={require('../../assets/animations/message-sent.json')}
                loop={false}
                speed={0.5}
                autoPlay
              />
            </View>
            <Card disabled={true}>
              <Text style={styles.successAlertMainText}>
                Your call for help was successful!
              </Text>
              <View style={styles.successAlertButtonView}>
                <Button onPress={() => setShowSuccessAlert(false)}>
                  Close Menu
                </Button>
                <Button
                  style={{
                    backgroundColor: theme['color-success-500'],
                    borderColor: 'white',
                  }}
                  onPress={() => {
                    setShowSuccessAlert(false);
                    navigation.navigate('Symptoms');
                  }}>
                  Add Information
                </Button>
              </View>
            </Card>
          </Modal>
        </View>
      );
    };

    const cancelModal = () => {
      return (
        <View>
          <Modal
            visible={showCancelAlert}
            backdropStyle={styles.successAlertBackdrop}
            onBackdropPress={() => setShowCancelAlert(false)}>
            <View
              style={{
                height: 140,
                marginTop: -240,
                marginBottom: 100,
              }}>
              <LottieView
                source={require('../../assets/animations/cancelled.json')}
                loop={true}
                speed={0.5}
                autoPlay
              />
            </View>
            <Card disabled={true}>
              <Text style={styles.successAlertMainText}>
                Your emergency has been cancelled
              </Text>
              <View style={styles.successCancelButtonView}>
                <Button onPress={() => setShowCancelAlert(false)}>
                  Close Menu
                </Button>
              </View>
            </Card>
          </Modal>
        </View>
      );
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.container}>
          <View style={styles.alertButtonGroup}>
            <View style={styles.loadingWrapper}>
              <LottieView
                source={require('../../assets/animations/loading-spinner.json')}
                loop={false}
                ref={animation => {
                  loadingAnimationRef = animation;
                }}
              />
            </View>
            <Pressable
              disabled={emergencyStore.getIsEmergency}
              android_ripple={{
                color: '#ff4C00',
                borderless: true,
              }}
              onLongPress={() => {
                emergencyStore.getIsEmergency ? null : beginEmergency();

                Vibration.vibrate(200);
              }}
              style={styles.alertButton}>
              <Layout style={styles.alertButton}>
                <Text style={styles.alertButton__text}>
                  {emergencyButtonText}
                </Text>
              </Layout>
            </Pressable>
          </View>
          <View
            style={{
              ...styles.cancelButtonGroup,
              opacity: emergencyStore.getIsEmergency ? 1 : 0,
            }}>
            <Pressable
              disabled={!emergencyStore.getIsEmergency}
              onLongPress={() => {
                emergencyStore.getIsEmergency ? endEmergency() : null;
                Vibration.vibrate(200);
              }}
              android_ripple={{
                color: 'crimson',
                borderless: true,
              }}
              style={styles.cancelButton}>
              <Layout style={styles.cancelButton}>
                <Text style={styles.cancelButton__text}>
                  {buttonStatus.cancel}
                </Text>
              </Layout>
            </Pressable>
          </View>

          {successModal()}
          {cancelModal()}
        </Layout>
      </SafeAreaView>
    );
  },
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F0F0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertButtonGroup: {
    marginBottom: 100,
  },
  alertButton: {
    backgroundColor: '#F0F0F3',
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
    borderRadius: 120,
    elevation: 50,
  },
  alertButton__text: {
    fontSize: 35,
    color: '#FF4C00',
    fontFamily: 'bebas',
    textAlign: 'center',
  },
  cancelButtonGroup: {},
  cancelButton: {
    backgroundColor: '#F0F0F3',
    padding: 10,
    borderRadius: 20,
    elevation: 25,
  },
  cancelButton__text: {
    fontSize: 35,
    color: 'darkred',
    fontFamily: 'bebas',
    textAlign: 'center',
  },
  successAlertMainText: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
  },
  successAlertButtonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successAlertBackdrop: {
    backgroundColor: 'black',
  },
  loadingWrapper: {
    width: 600,
    position: 'absolute',
    height: 600,
    marginLeft: -187,
    marginTop: -190,
  },
  successCancelButtonView: {
    justifyContent: 'center',
  },
});
