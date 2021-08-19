import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import UsersRoutes from './users.routes';
// import MedicRoutes from './medics.routes';
import { colors } from '../styles'

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        )
    }
    if (user) {
        return <UsersRoutes />;
    }
    return <AuthRoutes />
};

export default Routes;
