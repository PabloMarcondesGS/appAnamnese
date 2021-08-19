import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Profile from '../../pages/Profile'
import HomeMedic from '../../pages/Home/Medic'
import TipsList from '../../pages/TipsList'
import ProductList from '../../pages/ProductList'
import Users from '../../pages/Users'
import Medics from '../../pages/Medics'
import HalitosisList from '../../pages/HalitosisList'
import ExamsListConfirmed from '../../pages/ExamsListConfirmed'
import WarningList from '../../pages/WarningList'
import MessageList from '../../pages/Messages'


import { useAuth } from '../../hooks/auth';
import { colors } from '../../styles';

const DrawerMedic: React.FC  = () => {
  const { admin } = useAuth();

  const Drawer = createDrawerNavigator();

  if (admin) {
    return (
      <Drawer.Navigator 
        initialRouteName="App"
        drawerStyle={{
          backgroundColor: colors.secondary,
          paddingVertical: 20
        }}
        drawerContentOptions={{
          activeBackgroundColor: colors.primary,
          inactiveTintColor: "#fff"
        }}>
        <Drawer.Screen 
          name="App" 
          component={HomeMedic} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Home</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="home" />)
            }
          } 
        />
        <Drawer.Screen 
          name="ExamsListConfirmed" 
          component={ExamsListConfirmed} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Exames realizados</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          } 
        />
        <Drawer.Screen 
          name="Profile" 
          component={Profile} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Meu perfil</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="user" />)
            }
          }
        />
        {/* <Drawer.Screen 
          name="Tips" 
          component={Tips} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Adicionar  dica</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="book-open" />)
            }
          }
        /> */}
        <Drawer.Screen 
          name="TipsList" 
          component={TipsList} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Dicas</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        />
        {/* <Drawer.Screen 
          name="Product" 
          component={Product} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Adicionar  produto</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="book-open" />)
            }
          }
        /> */}
        <Drawer.Screen 
          name="ProductList" 
          component={ProductList} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Produtos</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        />
        {/* <Drawer.Screen 
          name="Halitosis" 
          component={Halitosis} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Adicionar  halitose</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="book-open" />)
            }
          }
        /> */}
        <Drawer.Screen 
          name="HalitosisList" 
          component={HalitosisList} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Halitose</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        />
        <Drawer.Screen 
          name="Users" 
          component={Users} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Pacientes</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        />
        <Drawer.Screen 
          name="Medics" 
          component={Medics} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>CYB diagnóstico</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        />
        {/* <Drawer.Screen 
          name="Warnings" 
          component={Warnings} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Cadastrar novidade</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        /> */}
        <Drawer.Screen 
          name="WarningList" 
          component={WarningList} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Novidades</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        />
        {/* <Drawer.Screen 
          name="Messages" 
          component={Message} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Adicionar  mensagem</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        /> */}
        <Drawer.Screen 
          name="MessageList" 
          component={MessageList} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Mensagens</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        />
      </Drawer.Navigator>
    )
  } else {
    return (
      <Drawer.Navigator 
        initialRouteName="App"
        drawerStyle={{
          backgroundColor: colors.secondary,
          paddingVertical: 20
        }}
        drawerContentOptions={{
          activeBackgroundColor: colors.primary,
          inactiveTintColor: "#fff"
        }}>
        <Drawer.Screen 
          name="App" 
          component={HomeMedic} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Home</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="home" />)
            }
          } 
        />
        <Drawer.Screen 
          name="ExamsListConfirmed" 
          component={ExamsListConfirmed} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Exames realizados</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          } 
        />
        <Drawer.Screen 
          name="Profile" 
          component={Profile} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Meu perfil</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="user" />)
            }
          }
        />
         <Drawer.Screen 
          name="TipsList" 
          component={TipsList} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Dicas</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        />
        <Drawer.Screen 
          name="HalitosisList" 
          component={HalitosisList} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#fff' : '#fff' }}>Halitose</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#fff' : '#fff' } name="list" />)
            }
          }
        />
      </Drawer.Navigator>
    )
  }
  
}

export default DrawerMedic;