import React, {useCallback, useState} from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import { ViewStyled, ViewStyledTwo,ParagraphStyled,TitleStyled, EditButton, TitleBtn,
  EditButtonTwo, TitleBtnTwo } from './styles'

const Item = ({ item, handleRefresh, setProductsSelected }: any) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(false)
  const handleDelete = useCallback(() => {
    database().ref().child('warnings').child(item.id).remove();
    handleRefresh()
  }, [])
  return (
    <ViewStyled>
      <ViewStyledTwo>
        <ParagraphStyled
          style={{
            flexBasis: '100%',
            flexWrap: 'wrap',
            textAlign: 'left',
            paddingTop: 10
          }}>
          Mensagem:
        </ParagraphStyled>
        <TitleStyled>{item.description}</TitleStyled>
        <EditButton onPress={() => navigation.navigate('WarningsEdit', { item })}>
          <TitleBtn>Editar</TitleBtn>
        </EditButton>
        <EditButton 
          style={{ margin: 0 }}
          onPress={() => {
            setProductsSelected((state) => [...state, item])
            setSelected(true)
          }}
          mode="contained">
          <TitleBtn 
          style={{ margin: 0 }} selected={selected}>Selecionar</TitleBtn>
        </EditButton>
        <EditButtonTwo onPress={() => handleDelete()}>
          <TitleBtnTwo>Deletar</TitleBtnTwo>
        </EditButtonTwo>
      </ViewStyledTwo>
    </ViewStyled>
  )
}

export default Item
