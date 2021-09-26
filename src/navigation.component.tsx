import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/Home.component';
import {DetailsScreen} from './screens/Details.component';
import SymptomsScreen from './screens/Symptoms.component';
import HeroScreen from './screens/Hero.component';
import LocationDetailsScreen from './screens/LocationDetails.component';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  // <Navigator headerMode="none">
  <Navigator
    screenOptions={{
      headerMode: 'screen',
    }}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Details" component={DetailsScreen} />
    <Screen name="Symptoms" component={SymptomsScreen} />
    <Screen name="Hero" component={HeroScreen} />
    <Screen name="LocationDetails" component={LocationDetailsScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
