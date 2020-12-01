import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/cyb-logo-maior.png';

const Header: React.FC = ({ toggleDrawer }) => {
  return (
    <View style={{ 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      flexDirection: 'row',
      minHeight: 80,
      backgroundColor: 'white'
    }}>
      <TouchableOpacity style={{ marginLeft: 16 }}onPress={() => toggleDrawer()}>
        <FeatherIcon name="menu" size={25} />
      </TouchableOpacity>
      <Image  style={{ marginLeft: '35%', width: 40, height: 40 }} source={logoImg}/>
    </View>
  )
}

export default Header;
