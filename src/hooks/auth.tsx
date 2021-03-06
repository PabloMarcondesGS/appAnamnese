import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';

interface AuthState {
    user: any;
    medic: boolean;
    admin: boolean;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user:  any;
    medic: boolean;
    admin: boolean;
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
            const [user, medic, admin] = await AsyncStorage.multiGet([
                '@GoBarber:user',
                '@GoBarber:medic',
                '@GoBarber:admin'
            ]);

            if (user[1] && medic[1] && admin[1]) {
                setData({ 
                    user: JSON.parse(user[1]), 
                    medic: JSON.parse(medic[1]) , 
                    admin: JSON.parse(admin[1]) 
                })
            }

            setLoading(false);
        }

        loadStoragedData();
    }, []);

    const signIn = useCallback(async ({ email,  password}) => {
        setLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(function(user){
                database()
                    .ref(`users/${user.user.uid}`)
                    .once('value')
                    .then(async (snapshot) => {
                        if (snapshot) {
                            if (snapshot.val().admin) {
                                await AsyncStorage.multiSet([
                                    ['@GoBarber:user', JSON.stringify(user.user)],
                                    ['@GoBarber:medic', JSON.stringify(true)],
                                    ['@GoBarber:admin', JSON.stringify(true)]
                                ])
                                setData({ user: user.user, medic: true, admin: true });
                            } else {
                                if (snapshot.val().active) {
                                    if (snapshot.val().medic) {
                                        await AsyncStorage.multiSet([
                                            ['@GoBarber:user', JSON.stringify(user.user)],
                                            ['@GoBarber:medic', JSON.stringify(true)],
                                            ['@GoBarber:admin', JSON.stringify(false)]
                                        ])
                                        setData({ user: user.user, medic: true, admin: false });
                                    } else {
                                        await AsyncStorage.multiSet([
                                            ['@GoBarber:user', JSON.stringify(user.user)],
                                            ['@GoBarber:medic', JSON.stringify(false)],
                                            ['@GoBarber:admin', JSON.stringify(false)]
                                        ])
                                        setData({ user: user.user, medic: false, admin: false });
                                    }
    
                                } else {
                                    Alert.alert('Erro no acesso', 'Aguarde a liberação ao app.')
                                }
                            }
                        }
                    setLoading(false);
                });
            })
            .catch(error => {
                console.log(error)
                setLoading(false);
                Alert.alert('Erro', 'Cheque suas credênciais e tente novamente.')
            });
    }, [])

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove([
            '@GoBarber:user',
            '@GoBarber:medic', 
            '@GoBarber:admin'
        ]);

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user: data.user, 
            medic: data.medic, 
            admin: data.admin, 
            loading, 
            signIn, 
            signOut 
        }} >
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
