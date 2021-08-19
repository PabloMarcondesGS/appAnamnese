import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Questions from '../pages/Questions'
import { colors } from '../styles'

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: colors.secondary},
        }}
    >
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />
        <Auth.Screen name="Questions" component={Questions} />
    </Auth.Navigator>
);

export default AuthRoutes;
