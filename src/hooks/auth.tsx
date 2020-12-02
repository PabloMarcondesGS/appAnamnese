import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

interface AuthState {
    user: any;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user:  any;
    loading: boolean;
    signIn(credencials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadStoragedData(): Promise<void>{
            const [user] = await AsyncStorage.multiGet([
                '@GoBarber:user'
            ]);

            if (user[1]) {
                setData({ user: JSON.parse(user[1]) })
            }

            setLoading(false);
        }

        loadStoragedData();
    }, []);

    const signIn = useCallback(async ({ email,  password}) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(async function(user){
                await AsyncStorage.multiSet([
                    ['@GoBarber:user', JSON.stringify(user.user)]
                ])
        
                setData({ user: user.user });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }, [])

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove([
            '@GoBarber:user'
        ]);

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }} >
            {children}
        </ AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('UseAuth must be used whitin an AuthProvider')
    }

    return context;
}

export {  AuthProvider, useAuth };
