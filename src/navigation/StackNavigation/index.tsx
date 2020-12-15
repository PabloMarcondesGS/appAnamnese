import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../../pages/Dashboard';
import UploadPicture from '../../pages/UploadPicture';
import Profile from '../../pages/Profile';
import Exam from '../../pages/Exam';

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
    </App.Navigator>
);

export default AppRoutes;
