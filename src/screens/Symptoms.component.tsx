import { Layout } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  Vibration,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import { SYMPTOMS } from '../common/enums';

import rootStore from '../stores/root.store';

const SymptomsScreen = observer(({ navigation }: { navigation: any }) => {
  const { emergencyStore } = rootStore;
  const { getSymptoms } = emergencyStore;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <View style={styles.card__container}>
          <Pressable
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.CHOKING)
            )}
            style={getSymptoms.choking ? styles.selected_card : styles.card}>
            <Text>CHOKING</Text>
          </Pressable>

          <Pressable
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.DROWNING)
            )}
            style={getSymptoms.drowning ? styles.selected_card : styles.card}>
            <Text>DROWING</Text>
          </Pressable>

          <Pressable
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.HEMMORAGING)
            )}
            style={
              getSymptoms.hemmoraging ? styles.selected_card : styles.card
            }>
            <Text>BLEEDING</Text>
          </Pressable>

          <Pressable
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.BLUNT_TRAUMA)
            )}
            style={
              getSymptoms.bluntTrauma ? styles.selected_card : styles.card
            }>
            <Text>HIT BY HEAVY OBJECT</Text>
          </Pressable>

          <Pressable
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.OTHER)
            )}
            style={getSymptoms.other ? styles.selected_card : styles.card}>
            <Text>OTHER</Text>
          </Pressable>

          <Pressable
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptoms(),
              navigation.navigate('First Responder')
            )}
            style={styles.card}>
            <Text>CONTINUE</Text>
          </Pressable>
        </View>
      </Layout>
    </SafeAreaView>
  );
});

export default SymptomsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  card__container: {
    backgroundColor: 'white',
    alignItems: 'center',
    // alignContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: 'grey',
    height: '20%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
    marginBottom: 100,
  },
  selected_card: {
    backgroundColor: 'green',
    height: '20%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
    marginBottom: 100,
  },
});
