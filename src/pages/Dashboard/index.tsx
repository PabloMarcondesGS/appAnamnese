import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Button, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ButtonText } from '../../componentes/Button/styles';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
    // const { signOut } = useAuth();

   const Drawer = createDrawerNavigator();

    function App() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Text>Open up App.js to start working on your app!</Text>
          </View>
        );
      }
      function AppTwo() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Text>App 2</Text>
          </View>
        );
      }

    return (
        // <View style={{ flex: 1, justifyContent: 'center'}}>
            <NavigationContainer>
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
                        drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Primeira Tela</Text>),
                        drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="home" />)
                      }
                    } 
                />
                <Drawer.Screen 
                  name="MeuApp" 
                  component={AppTwo} 
                  options={
                    {
                      drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Segunda Tela</Text>),
                      drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="chat" />)
                    }
                  }
                
                  />
              </Drawer.Navigator>
            </NavigationContainer>
            {/* <Button title="sair" onPress={signOut} /> */}
        {/* </View> */}
    );
};

export default Dashboard;
