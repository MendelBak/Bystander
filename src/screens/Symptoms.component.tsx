import { Button, Card, Layout } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { StyleSheet, Vibration, Text, View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SYMPTOMS } from '../common/enums';
import rootStore from '../stores/root.store';

const SymptomsScreen = observer(({ navigation }: { navigation: any }) => {
  const { emergencyStore } = rootStore;
  const { getSymptoms } = emergencyStore;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <View style={styles.card__container}>
          <Card
            status={getSymptoms.choking ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.CHOKING)
            )}
            style={styles.card}>
            <Text>Choking</Text>
          </Card>
          <Card
            status={getSymptoms.drowning ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.DROWNING)
            )}
            style={styles.card}>
            <Text>Drowning</Text>
            <Icon size={50} name="swim" />
          </Card>
          <Card
            style={styles.card}
            status={getSymptoms.hemmoraging ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.HEMMORAGING)
            )}>
            <Text>Hemmoraging</Text>
          </Card>
          <Card
            style={styles.card}
            status={getSymptoms.bluntTrauma ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.BLUNT_TRAUMA)
            )}>
            <Text>Blunt Trauma</Text>
          </Card>
          <Card
            style={styles.card}
            status={getSymptoms.cardiacArrest ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.CARDIAC_ARREST)
            )}>
            <Text>Cardiac Arrest</Text>
          </Card>
          <Card
            style={styles.card}
            status={getSymptoms.other ? 'success' : 'basic'}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.OTHER)
            )}>
            <Text>Other</Text>
          </Card>
        </View>
        <View style={styles.next_button_container}>
          <Button
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptoms(),
              navigation.navigate('Hero')
            )}
            status="success"
            accessoryRight={<Icon size={20} name="check-underline" />}>
            Update
          </Button>
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
    // backgroundColor: 'grey',
    height: '20%',
    width: '40%',
    borderRadius: 15,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // borderWidth: 2,
    // borderColor: 'red',
    // marginBottom: 100,
  },
  selected_card: {
    // margin: 2,
    height: '20%',
    width: '40%',
    borderColor: 'green',

    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
