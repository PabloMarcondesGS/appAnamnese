import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import { 
  ViewStyled, ViewStyledTwo, ParagraphStyled, TitleStyled, EditButton, TitleBtn,
  EditButtonTwo, TitleBtnTwo } from './styles'

const Item = ({ item, handleRefresh }: any) => {
  const navigation = useNavigation();
  const handleDelete = useCallback(() => {
    database().ref().child('halitosis').child(item.id).remove();
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
          Nível
        </ParagraphStyled>
        <TitleStyled>{item.description_small}</TitleStyled>
        <ParagraphStyled
          style={{
            flexBasis: '100%',
            flexWrap: 'wrap',
            textAlign: 'left',
            paddingTop: 10
          }}>
          Detalhes
        </ParagraphStyled>
        <ParagraphStyled>{item.description}</ParagraphStyled>

        <EditButton onPress={() => navigation.navigate('HalitosisEdit', { item })}>
          <TitleBtn>Editar</TitleBtn>
        </EditButton>
        <EditButtonTwo onPress={() => handleDelete()}>
          <TitleBtnTwo>Deletar</TitleBtnTwo>
        </EditButtonTwo>
      </ViewStyledTwo>
    </ViewStyled>
  )
}

export default Item
