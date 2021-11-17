import { Layout, Toggle } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { StyleSheet, Vibration } from 'react-native';
import rootStore from '../stores/root.store';

const SettingsScreen = observer(
  ({ route, navigation }: { route: any; navigation: any }) => {
    const { userStore } = rootStore;
    const { user } = userStore;

    const toggleHeroStatus = () => {
      userStore.toggleHeroNotifications();
      setShowNotifications(!showNotifications);
    };

    const [showNotifications, setShowNotifications] = useState<boolean>(
      user.isHero,
    );

    return (
      <Layout style={styles.container}>
        <Toggle
          status={showNotifications ? 'success' : 'danger'}
          checked={showNotifications === true}
          onChange={() => {
            toggleHeroStatus(), Vibration.vibrate(50);
          }}>
          On Duty - Allow Emergency Notifications
        </Toggle>
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
    backgroundColor: '#F0F0F3',
  },
});
