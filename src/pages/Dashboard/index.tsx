import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


import UploadPicture from '../UploadPicture'
import Questions from '../Questions'
import Profile from '../Profile'
import Header from '../../componentes/Header';

const Dashboard: React.FC = () => {
    const Drawer = createDrawerNavigator();
  
    function App(props: any) {
      return (
        <View style={{ flex: 1 }}>
          <Header toggleDrawer={props.navigation.toggleDrawer} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#42b6d9' }} >
            <Text>Open up App.js to start working on your app!</Text>
          </View>
        </View>
      );
    }

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
            component={App} 
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
    );
};

export default Dashboard;
