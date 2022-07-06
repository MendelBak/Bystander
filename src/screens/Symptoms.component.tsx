import { Button, Card, Layout, useTheme } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { StyleSheet, Vibration, Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as FontistoIcon } from 'react-native-vector-icons/Fontisto';
import { default as FontAwesome5Icon } from 'react-native-vector-icons/FontAwesome5';
import { SYMPTOMS, iconTypes } from '../common/consts';
import rootStore from '../stores/root.store';

const SymptomsScreen = observer(({ navigation }: { navigation: any }) => {
  const { emergencyStore } = rootStore;
  const { getSymptoms } = emergencyStore;
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <Layout style={styles.card__container}>
          <Card
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.CHOKING)
            )}
            style={getSymptoms.choking ? styles.selected_card : styles.card}>
            <Layout style={styles.card_inner}>
              <Text>Choking</Text>
              <FontistoIcon
                size={50}
                name={iconTypes.choking.name}></FontistoIcon>
            </Layout>
          </Card>
          <Card
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.DROWNING)
            )}
            style={getSymptoms.drowning ? styles.selected_card : styles.card}>
            <Layout style={styles.card_inner}>
              <Text>Drowning</Text>
              <Icon size={50} name={iconTypes.drowning.name} />
            </Layout>
          </Card>
          <Card
            style={getSymptoms.hemmoraging ? styles.selected_card : styles.card}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.HEMMORAGING)
            )}>
            <Layout style={styles.card_inner}>
              <Text>Heavy Bleeding</Text>
              <FontistoIcon
                size={50}
                name={iconTypes.hemmoraging.name}></FontistoIcon>
            </Layout>
          </Card>
          <Card
            style={getSymptoms.bluntTrauma ? styles.selected_card : styles.card}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.BLUNT_TRAUMA)
            )}>
            <Layout style={styles.card_inner}>
              <Text>Blunt Trauma</Text>
              <FontAwesome5Icon
                size={50}
                name={iconTypes.bluntTrauma.name}></FontAwesome5Icon>
            </Layout>
          </Card>
          <Card
            style={
              getSymptoms.cardiacArrest ? styles.selected_card : styles.card
            }
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.CARDIAC_ARREST)
            )}>
            <Layout style={styles.card_inner}>
              <Text>Cardiac Arrest</Text>
              <Icon size={50} name={iconTypes.cardiacArrest.name} />
            </Layout>
          </Card>
          <Card
            style={getSymptoms.other ? styles.selected_card : styles.card}
            onPress={() => (
              Vibration.vibrate(50),
              emergencyStore.updateSymptom(SYMPTOMS.OTHER)
            )}>
            <Layout style={{ ...styles.card_inner }}>
              <Text>Other</Text>
              <Icon size={50} name={iconTypes.other.name}></Icon>
            </Layout>
          </Card>
        </Layout>

        {/* TODO: Defer update to button press? Currently updating on card press, so button is redundant */}
        <Layout style={styles.next_button_container}>
          <Button
            style={{ backgroundColor: theme['color-primary-500'] }}
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
  selected_card: {
    margin: 10,
    height: '20%',
    width: '40%',
    borderRadius: 15,
    borderWidth: 10,
    borderColor: '#FF4C00',
  },
  card_inner: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
  },
});
