import { useFocusEffect } from '@react-navigation/native';
import { Button, Card, Layout, Modal, useTheme } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import {
  Text,
  Pressable,
  Vibration,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
  View,
} from 'react-native';
import { clockRunning } from 'react-native-reanimated';
import rootStore from '../stores/root.store';

const HomeScreen = observer(
  ({ route, navigation }: { route: any; navigation: any }, props) => {
    const { emergencyStore } = rootStore;
    const theme = useTheme();

    const [showSuccessAlert, setShowSuccessAlert] = useState(true);

    const animationValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(0);

    useFocusEffect(
      React.useCallback(() => {
        if (route?.params) {
          const { resetEmergencyAnimation = false } = route.params;
          if (resetEmergencyAnimation === true) animationValue.setValue(0);
        }
        if (!emergencyStore.getIsEmergency) {
          animationValue.setValue(0);
        }

        return;
      }, []),
    );

    const runAnimationAndBeginEmergency = () => {
      scaleValue.current = scaleValue.current === 0 ? 1 : 0;

      Animated.timing(animationValue, {
        toValue: 2,
        easing: Easing.bezier(0.785, 0.135, 0.15, 0.86),
        duration: 3000,
        useNativeDriver: true,
      }).start(({ finished }) => {
        emergencyStore.initializeEmergency().then(response => {
          if (response === true) {
            setShowSuccessAlert(true);
          }
        });
      });
    };

    const runResetAnimation = () => {
      scaleValue.current = scaleValue.current === 0 ? 1 : 0;

      Animated.timing(animationValue, {
        toValue: 0,
        easing: Easing.inOut(Easing.elastic(0.1)),
        duration: 2000,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (emergencyStore.getIsEmergency) {
          emergencyStore.endEmergency();
        }
      });
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.container}>
          <Animated.View
            style={{
              height: 200,
              width: 200,
              position: 'absolute',
              backgroundColor: '#FF4C00',
              borderRadius: 100,
              transform: [
                {
                  scale: animationValue.interpolate({
                    inputRange: [0, 3],
                    outputRange: [1, 7],
                  }),
                },
              ],
            }}
          />

          <Pressable
            onPress={() => {
              runResetAnimation();
            }}
            android_ripple={{ color: '#ff4C00', borderless: true }}
            onLongPress={async () => {
              runAnimationAndBeginEmergency();

              Vibration.vibrate(200);
            }}
            style={styles.alertButton}>
            <Layout style={styles.alertButton}>
              <Text style={styles.alertButton__text}>
                {emergencyStore.getIsEmergency ? 'CANCEL' : 'GET HELP'}
              </Text>
            </Layout>
          </Pressable>

          <View>
            <Modal
              visible={showSuccessAlert}
              backdropStyle={styles.successAlertBackdrop}
              onBackdropPress={() => setShowSuccessAlert(false)}>
              <Card disabled={true}>
                <Text style={styles.successAlertMainText}>
                  Your call for help was successful!
                </Text>
                <View style={styles.successAlertButtonView}>
                  <Button
                    // style={{ flex: 1 }}
                    onPress={() => setShowSuccessAlert(false)}>
                    Close Menu
                  </Button>
                  <Button
                    style={{
                      backgroundColor: theme['color-success-500'],
                      borderColor: 'white',
                    }}
                    onPress={() => {
                      setShowSuccessAlert(false),
                        navigation.navigate('Symptoms');
                    }}>
                    Add Information
                  </Button>
                </View>
              </Card>
            </Modal>
          </View>
        </Layout>
      </SafeAreaView>
    );
  },
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#F0F0F3',
  },
  alertButton: {
    backgroundColor: '#F0F0F3',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    elevation: 5,
  },
  alertButton__text: {
    fontSize: 35,
    color: '#FF4C00',
    fontFamily: 'bebas',
  },
  successAlertMainText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
  successAlertButtonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successAlertBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
