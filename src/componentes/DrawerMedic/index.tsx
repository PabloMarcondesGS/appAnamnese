import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Profile from '../../pages/Profile'
import HomeMedic from '../../pages/Home/Medic'

const DrawerMedic: React.FC  = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator 
        initialRouteName="App"
        drawerStyle={{
          backgroundColor: "#313131",
          paddingVertical: 20
        }}
        drawerContentOptions={{
          activeBackgroundColor: "#fff",
          inactiveTintColor: "#fff"
        }}>
        <Drawer.Screen 
          name="App" 
          component={HomeMedic} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Home</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="home" />)
            }
          } 
        />
        <Drawer.Screen 
          name="Profile" 
          component={Profile} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Meu perfil</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="user" />)
            }
          }
        />
      </Drawer.Navigator>
  )
}

export default DrawerMedic;