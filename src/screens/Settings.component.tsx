import { Layout, Toggle } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import rootStore from '../stores/root.store';

const SettingsScreen = observer(
  ({ route, navigation }: { route: any; navigation: any }) => {
    const { userStore } = rootStore;
    const { user } = userStore;

    const toggleHeroStatus = () => {
      userStore.toggleHeroNotifications();
      setShowNotifications(!showNotifications);
    };

    const [showNotifications, setShowNotifications] = useState(user.isHero);
    // const useToggleState = (initialState = false) => {

    //   const onCheckedChange = isChecked => {
    //     setChecked(isChecked);
    //   };

    //   return { checked, onChange: onCheckedChange };
    // };

    // const heroNotificationToggleState = useToggleState();

    return (
      <Layout style={styles.container}>
        <Toggle
          // style={styles.toggle}
          status={showNotifications ? 'success' : 'danger'}
          checked={showNotifications}
          // {...heroNotificationToggleState}
          onChange={toggleHeroStatus}>
          Allow Emergency Notifications
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
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: '#F0F0F3',
  },
});
