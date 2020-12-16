import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';



import UploadPicture from '../../pages/UploadPicture'
import Questions from '../../pages/Questions'
import Profile from '../../pages/Profile'
import HomeUser from '../../pages/Home/User'

const DrawerUser: React.FC  = () => {
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
            component={HomeUser} 
            options={
              {
                drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Home</Text>),
                drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="home" />)
              }
            } 
        />
        <Drawer.Screen 
          name="MeuApp" 
          component={Questions} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Meu App</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="list" />)
            }
          }
        />
        <Drawer.Screen 
          name="UploadPicture" 
          component={UploadPicture} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Enviar foto</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="camera" />)
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

export default DrawerUser;