/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import UploadPicture from '../../pages/UploadPicture';
import HomeUser from '../../pages/Home/User';
import Settings from '../../pages/Settings'
import { colors } from '../../styles'
import { useAuth } from '../../hooks/auth';
import DrawerMedic from '../../componentes/DrawerMedic';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { medic } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'UploadPicture') {
            iconName = focused ? 'camera' : 'camera';
          }else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: 'gray',
        showLabel: false,
        style: {
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={medic ?  DrawerMedic : HomeUser} />
      {!medic && (
        <Tab.Screen name="UploadPicture" component={UploadPicture} />
      )}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
