import React from 'react';
import HomeNavigator from './HomeNaviagte';
import FavoriteNavigator from './AuthNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const NavigationBar = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Favorite" component={FavoriteNavigator} />
    </Drawer.Navigator>
  );
};

export default NavigationBar;
