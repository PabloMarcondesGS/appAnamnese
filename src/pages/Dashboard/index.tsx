import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


import UploadPicture from '../UploadPicture'
import Questions from '../Questions'
import HeaderHome from '../../componentes/HeaderHome';

const Dashboard: React.FC = () => {
    const Drawer = createDrawerNavigator();

    function App() {
      return (
        <View style={{ flex: 1 }}>
          <HeaderHome />
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
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="chat" />)
            }
          }
        
          />
        <Drawer.Screen 
          name="UploadPicture" 
          component={UploadPicture} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Upload Picture</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="chat" />)
            }
          }
        
          />
      </Drawer.Navigator>
    );
};

export default Dashboard;
