import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import UploadPicture from '../pages/UploadPicture';
import Profile from '../pages/Profile'
import Exam from '../pages/Exam';
import ExamEdit from '../pages/ExamEdit';
import ExamResult from '../pages/ExamResult';
import Tips from '../pages/Tips';
import TipsList from '../pages/TipsList';
import Product from '../pages/Product';
import ProductList from '../pages/ProductList';
import Users from '../pages/Users';
import WebView from '../pages/WebView';
import UserDetail from '../pages/UserDetail';
import QuestionsDetail from '../pages/QuestionsDetail';
import Dashboard from '../navigation/StackNavigation';
import ProductEdit from '../pages/ProductEdit';
import Halitosis from '../pages/Halitosis';
import HalitosisEdit from '../pages/HalitosisEdit'
import ListWithOutResult from '../pages/Home/User/ListWithOutResult';
import Warnings from '../pages/Warnings'
import WarningsEdit from '../pages/WarningsEdit'
import Alerts from '../pages/Alerts'
import Message from '../pages/Messages'
import MedicAdd from '../pages/MedicAdd'
import MedicEdit from '../pages/MedicEdit'
import MessageUser from '../pages/MessagesUser'
import MessagesList from '../pages/MessagesList'
import MessagesEdit from '../pages/MessagesEdit'
import { colors } from '../styles'
import {firstAccess} from '../hooks/access'
import { useAuth } from '../hooks/auth'
import database from '@react-native-firebase/database';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const {second} = firstAccess();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({} as any);

  useEffect(() => {
    setLoading(true);
    database()
        .ref(`users/${user.uid}`)
        .once('value')
        .then(snapshot => {
            if (snapshot) {
                setUserData(snapshot.val())
            }
            setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
  }, [user])

  if(loading || !userData){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#005a72" />
      </View>
    )
  } 

  console.log(userData)
  console.log(userData.admin === true || second)
  if(userData.admin === true || second) {
    return (
      <App.Navigator
          screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: colors.white},
          }}
      >
          <App.Screen name="Dashboard" component={Dashboard} />
          <App.Screen name="QuestionsDetail" component={QuestionsDetail} />
          <App.Screen name="UploadPicture" component={UploadPicture} />
          <App.Screen name="Profile" component={Profile} />
          <App.Screen name="Exam" component={Exam} />
          <App.Screen name="ExamEdit" component={ExamEdit} />
          <App.Screen name="Alerts" component={Alerts} />
          <App.Screen name="ExamResult" component={ExamResult} />
          <App.Screen name="Tips" component={Tips} />
          <App.Screen name="TipsList" component={TipsList} />
          <App.Screen name="Product" component={Product} />
          <App.Screen name="ProductList" component={ProductList} />
          <App.Screen name="WebView" component={WebView} />
          <App.Screen name="Users" component={Users} />
          <App.Screen name="UserDetail" component={UserDetail} />
          <App.Screen name="ListWithOutResult" component={ListWithOutResult} />
          <App.Screen name="ProductEdit" component={ProductEdit} />
          <App.Screen name="MessagesUser" component={MessageUser} />
          <App.Screen name="Messages" component={Message} />
          <App.Screen name="Halitosis" component={Halitosis} />
          <App.Screen name="HalitosisEdit" component={HalitosisEdit} />
          <App.Screen name="Warnings" component={Warnings} />
          <App.Screen name="WarningsEdit" component={WarningsEdit} />
          <App.Screen name="MessagesList" component={MessagesList} />
          <App.Screen name="MessagesEdit" component={MessagesEdit} />
          <App.Screen name="MedicAdd" component={MedicAdd} />
          <App.Screen name="MedicEdit" component={MedicEdit} />
      </App.Navigator>
    ) 
  } else {
    return (
      <App.Navigator
          screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: colors.white},
          }}
      >
        <App.Screen name="UploadPicture" component={UploadPicture} />
      </App.Navigator>
    ) 
  }
};

export default AppRoutes;
