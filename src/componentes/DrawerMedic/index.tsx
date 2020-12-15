import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Profile from '../../pages/Profile'
import HomeMedic from '../../pages/Home/Medic'
import Tips from '../../pages/Tips'
import TipsList from '../../pages/TipsList'
import Product from '../../pages/Product'
import ProductList from '../../pages/ProductList'

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
        <Drawer.Screen 
          name="Tips" 
          component={Tips} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Adicionar dica</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="book-open" />)
            }
          }
        />
        <Drawer.Screen 
          name="TipsList" 
          component={TipsList} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Listar dicas</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="list" />)
            }
          }
        />
        <Drawer.Screen 
          name="Product" 
          component={Product} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Adicionar produto</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="book-open" />)
            }
          }
        />
        <Drawer.Screen 
          name="ProductList" 
          component={ProductList} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Listar produtos</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="list" />)
            }
          }
        />
      </Drawer.Navigator>
  )
}

export default DrawerMedic;