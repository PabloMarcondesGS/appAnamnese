import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import UploadPicture from '../pages/UploadPicture';
import Profile from '../pages/Profile';
import Exam from '../pages/Exam';
import Tips from '../pages/Tips';
import TipsList from '../pages/TipsList';
import Product from '../pages/Product';
import ProductList from '../pages/ProductList';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
    <App.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#ADD8E6'},
        }}
    >
        <App.Screen name="Dashboard" component={Dashboard} />
        <App.Screen name="UploadPicture" component={UploadPicture} />
        <App.Screen name="Profile" component={Profile} />
        <App.Screen name="Exam" component={Exam} />
        <App.Screen name="Tips" component={Tips} />
        <App.Screen name="TipsList" component={TipsList} />
        <App.Screen name="Product" component={Product} />
        <App.Screen name="ProductList" component={ProductList} />
    </App.Navigator>
);

export default AppRoutes;
