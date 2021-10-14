import { Layout } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import rootStore from '../stores/root.store';

const SettingsScreen = observer(
  ({ route, navigation }: { route: any; navigation: any }) => {
    const { userStore } = rootStore;
    const { user } = userStore;

    const toggleHeroStatus = () => {
      userStore.toggleHeroStatus();
    };

    return (
      <Layout style={styles.container}>
        <Text>I WANT TO BE A HERO</Text>

        <Switch
          trackColor={{ false: '#767577', true: '#FF4C00' }}
          thumbColor={user.isHero ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleHeroStatus}
          value={user.isHero}
        />
        <Layout style={styles.heroSubtextView}>
          <Text style={styles.heroSubtext}>
            Opt me into receiving messages about emergencies in my area.
          </Text>

          <Text style={styles.heroSubtext}>
            By selecting this option, I affirm that I am a trained Hero.
          </Text>
        </Layout>
      </Layout>
    );
  },
);

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: '#F0F0F3',
  },
  heroSubtextView: {
    width: 200,
  },
  heroSubtext: {
    fontSize: 10,
  },
});
