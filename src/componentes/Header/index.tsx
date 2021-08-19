import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import { colors } from '../../styles';

const Header: React.FC = ({ toggleDrawer, actionProfile, isHeader = true }) => {
  const { signOut } = useAuth();

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [])
  
  const handleAction = () => {
    try{
      actionProfile()
    } catch (err) {
      console.log(err)
    }
  }
  
  const handleActionToggle = () => {
    try{
      toggleDrawer()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={{ 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      flexDirection: 'row',
      minHeight: 80,
      backgroundColor: colors.secondary,
    }}>
      <TouchableOpacity style={{ marginLeft: 16 }} onPress={handleActionToggle}>
        <SimpleLineIcon name={isHeader ? 'options-vertical' : 'arrow-left'} size={25} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: colors.white,
          marginLeft: 12
        }} onPress={handleAction}>
            <FeatherIcon name="user" size={28} color={colors.primary} />
        </TouchableOpacity>
    </View>
  )
}

export default Header;
