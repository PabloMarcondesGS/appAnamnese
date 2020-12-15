import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Profile from '../Profile'
import Home from '../Home/Medic';

const Dashboard: React.FC = () => {
    const Drawer = createDrawerNavigator();

    return (
        // <View style={{ flex: 1, justifyContent: 'center'}}>
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
            component={Home} 
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
    );
};

export default Dashboard;
