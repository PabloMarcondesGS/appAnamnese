import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigation from '../../StackNavigation';

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
          component={StackNavigation} 
        />
      </Drawer.Navigator>
  )
}

export default DrawerMedic;