import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes/index';
import {colors} from './styles'

const App: React.FC = () => (
    <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
        <AppProvider>
            <View style={{ flex:1, backgroundColor: colors.secondary }}>
                <Routes />
            </View>
        </AppProvider>
    </ NavigationContainer>
);

export default App;
