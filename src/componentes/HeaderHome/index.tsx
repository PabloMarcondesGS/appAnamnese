import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/cyb-logo-maior.png';

const Header: React.FC = () => {
  return (
    <View style={{ 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      flexDirection: 'row',
      minHeight: 80,
      backgroundColor: 'white',
      justifyContent: 'center',
    }}>
      <Image  style={{ width: 40, height: 40 }} source={logoImg}/>
    </View>
  )
}

export default Header;
