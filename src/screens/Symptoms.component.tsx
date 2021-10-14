import { Button, Card, Layout } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { StyleSheet, Vibration, Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as FontistoIcon } from 'react-native-vector-icons/Fontisto';
import { default as FontAwesome5Icon } from 'react-native-vector-icons/FontAwesome5';
import { SYMPTOMS } from '../common/enums';
import rootStore from '../stores/root.store';

const SymptomsScreen = observer(({ navigation }: { navigation: any }) => {
  const { emergencyStore } = rootStore;
  const { getSymptoms } = emergencyStore;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <Layout style={styles.card__container}>
          <Card
            status={getSymptoms.choking ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.CHOKING)
            )}
            style={styles.card}>
            <Layout style={styles.card_inner}>
              <Text>Choking</Text>
              <FontistoIcon size={50} name="open-mouth"></FontistoIcon>
            </Layout>
          </Card>
          <Card
            status={getSymptoms.drowning ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.DROWNING)
            )}
            style={styles.card}>
            <Layout style={styles.card_inner}>
              <Text>Drowning</Text>
              <Icon size={50} name="swim" />
            </Layout>
          </Card>
          <Card
            style={styles.card}
            status={getSymptoms.hemmoraging ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.HEMMORAGING)
            )}>
            <Layout style={styles.card_inner}>
              <Text>Heavy Bleeding</Text>
              <FontistoIcon size={50} name="blood-drop"></FontistoIcon>
            </Layout>
          </Card>
          <Card
            style={styles.card}
            status={getSymptoms.bluntTrauma ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.BLUNT_TRAUMA)
            )}>
            <Layout style={styles.card_inner}>
              <Text>Blunt Trauma</Text>
              <FontAwesome5Icon size={50} name="car-crash"></FontAwesome5Icon>
            </Layout>
          </Card>
          <Card
            style={styles.card}
            status={getSymptoms.cardiacArrest ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.CARDIAC_ARREST)
            )}>
            <Layout style={styles.card_inner}>
              <Text>Cardiac Arrest</Text>
              <Icon size={50} name="heart-pulse" />
            </Layout>
          </Card>
          <Card
            style={styles.card}
            status={getSymptoms.other ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.OTHER)
            )}>
            <Layout style={{ ...styles.card_inner }}>
              <Text>Other</Text>
              <Icon size={50} name="help-outline"></Icon>
            </Layout>
          </Card>
        </Layout>
        <Layout style={styles.next_button_container}>
          <Button
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptoms(),
              navigation.navigate('Hero')
            )}
            status="success"
            accessoryRight={
              <Icon size={20} name="check-underline" color="white" />
            }>
            Update
          </Button>
        </Layout>
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
    backgroundColor: '#F3F3F0',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '90%',
  },
  next_button_container: {
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    height: '10%',
  },
  card: {
    margin: 10,
    height: '20%',
    width: '40%',
    borderRadius: 15,
  },
  card_inner: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '100%',
    alignItems: 'center',
  },
  selected_card: {
    height: '20%',
    width: '40%',
    borderColor: 'green',
  },
});
