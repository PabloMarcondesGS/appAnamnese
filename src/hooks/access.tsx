import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface AuthState {
    second: boolean;
}

interface FirstAccessData {
    second:  any;
    secondAccess(): void;
}

const FirstAccessContext = createContext<FirstAccessData>({} as FirstAccessData);

const FirstAccessProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);

    useEffect(() => {
        async function loadStoragedData(): Promise<void>{
          const [secondAccess] = await AsyncStorage.multiGet([
              '@appAnamnese:secondAccess',
          ]);
          setData({second: secondAccess[1] !== null});
        }
        loadStoragedData();
      }, [])

    const secondAccess = useCallback(async () => {
        await AsyncStorage.multiSet([
            ['@appAnamnese:secondAccess', JSON.stringify(true)]
        ])
        setData({second: true})
    }, [])

    return (
        <FirstAccessContext.Provider value={{ 
            second: data.second, 
            secondAccess, 
        }} >
            {children}
        </ FirstAccessContext.Provider>
    );
};

function firstAccess(): FirstAccessData {
    const context = useContext(FirstAccessContext);

    if (!context) {
        throw new Error('firstAccess must be used whitin an FirstAccessProvider')
    }

    return context;
}

export {  FirstAccessProvider, firstAccess };
