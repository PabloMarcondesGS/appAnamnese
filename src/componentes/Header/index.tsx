import React, { useCallback } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/cyb-logo-maior.png';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = ({ toggleDrawer, isHeader = true }) => {
  const { signOut } = useAuth();

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [])

  return (
    <View style={{ 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      flexDirection: 'row',
      minHeight: 80,
      backgroundColor: 'white',
      justifyContent: 'space-between'
    }}>
      <TouchableOpacity style={{ marginLeft: 16 }}onPress={() => toggleDrawer()}>
        <FeatherIcon name={isHeader ? 'menu' : 'arrow-left'} size={25} />
      </TouchableOpacity>
      <Image  style={{ width: 40, height: 40 }} source={logoImg}/>
      <TouchableOpacity style={{ marginRight: 24 }} onPress={handleLogout}>
        <FeatherIcon name="power" size={20} />
      </TouchableOpacity>
    </View>
  )
}

export default Header;
