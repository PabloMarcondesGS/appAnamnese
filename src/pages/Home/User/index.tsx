import React from 'react'

import { View, Text } from 'react-native';
import Header from '../../../componentes/Header';
const User: React.FC = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <Header toggleDrawer={props.navigation.toggleDrawer} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#42b6d9' }} >
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </View>
    );
}

export default User