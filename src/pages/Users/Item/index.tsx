import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Checkbox} from 'react-native-paper';
import database from '@react-native-firebase/database';

import { 
  TitleStyled, 
  CardStyled, 
  ParagraphStyled ,
  ButtonStyled
} from './styles';

const Item: React.FC = ({ item }: any) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (item.active) 
      setActive(true)
    else
      setActive(false)
  }, [item])

  const handleUpdateUser = useCallback(() => {
    database().ref(`users`)
    .child(item.id)
    .update({
      active: active ? false : true
    })
    .then(function () {
      Alert.alert(
        'Atualização realizada com sucesso!',
        'Dados atualizados com sucesso.'
    )
    });
  }, [active, item])

  return loading ? (
    <CardStyled style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </CardStyled>
  ) : (
    <CardStyled>
      <ParagraphStyled>
        {item.medic ? 'ESPECIALISTA' : 'PACIENTE'}
      </ParagraphStyled>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12
      }}>
        <ParagraphStyled>
          Nome:
        </ParagraphStyled>
        <TitleStyled>{item && item.name ? item.name : ''}</TitleStyled>
      </View>
      <View style={{ 
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12
      }}>
        <ParagraphStyled>Status:</ParagraphStyled>
        <View style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flexDirection: 'row' 
        }}>
          <Checkbox
            status={!active ? 'checked' : 'unchecked'}
            uncheckedColor="#fff"
            color="#005a72"
            onPress={() => {
              setActive(inactive ? true : false);
              handleUpdateUser()
            }} />
          <ParagraphStyled>Inativo</ParagraphStyled>
        </View>
          <View style={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexDirection: 'row' 
          }}>
            <Checkbox
              status={active ? 'checked' : 'unchecked'}
              uncheckedColor="#fff"
              color="#005a72"
              onPress={() => {
                setActive(!active);
                handleUpdateUser()
              }} />
            <ParagraphStyled>Ativo</ParagraphStyled>
          </View>
      </View>
      <ButtonStyled 
        onPress={() => navigation.navigate('UserDetail', { item })}
        color="#005a72"
        mode="contained">
        Ver Detalhes
      </ButtonStyled>
    </CardStyled>
  );
};

export default Item;
