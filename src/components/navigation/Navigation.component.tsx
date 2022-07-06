import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home.component';
import SymptomsScreen from '../../screens/Symptoms.component';
import HeroScreen from '../../screens/Hero.component';
// import LocationDetailsScreen from './screens/LocationDetails.component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as Ionicon } from 'react-native-vector-icons/Ionicons';
import SettingsScreen from '../../screens/Settings.component';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeNavigator = () => (
  <Navigator
    screenOptions={{
      tabBarActiveTintColor: '#FF4C00',
      tabBarActiveBackgroundColor: '#F3F3F0',
      tabBarItemStyle: { borderRadius: 15 },
      headerShown: false,
    }}>
    <Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: () => {
          return <Icon size={25} name="home-outline" />;
        },
      }}
    />
    <Screen
      name="Symptoms"
      component={SymptomsScreen}
      options={{
        tabBarIcon: () => {
          return <Icon size={25} name="format-list-bulleted" />;
        },
      }}
    />
    {/* <Screen
      name="LocationDetails"
      component={LocationDetailsScreen}
      options={{
        tabBarIcon: () => {
          return <Icon size={25} name="map-marker-radius-outline" />;
        },
      }}
    /> */}
    <Screen
      name="Hero"
      component={HeroScreen}
      options={{
        tabBarIcon: () => {
          return <Icon size={25} name="trophy-outline" />;
        },
      }}
    />
    <Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: () => {
          return <Ionicon size={25} name="settings-outline" />;
        },
      }}
    />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
