import React, { useCallback, useState } from 'react'
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';

import { ViewStyled, ViewStyledTwo, EditButton, TitleStyled, ButtonStyledTwo, TitleBtn, ParagraphStyled } from './styles'

const Item = ({ item, handleRefresh, setTipsSelected }: any) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(false)
  const handleDelete = useCallback(() => {
    database().ref().child('tips').child(item.id).remove();
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
          DICA
        </ParagraphStyled>
        <TitleStyled>{item.description_small}</TitleStyled>
        <ParagraphStyled
          style={{
            flexBasis: '100%',
            flexWrap: 'wrap',
            textAlign: 'left',
            paddingTop: 10
          }}>
          DESCRIÇÃO
        </ParagraphStyled>
        <TitleStyled>{item.description}</TitleStyled>
        <ParagraphStyled
          style={{
            flexBasis: '100%',
            flexWrap: 'wrap',
            textAlign: 'left',
            paddingTop: 10
          }}>
          LINK
        </ParagraphStyled>
        <ParagraphStyled>{item.link}</ParagraphStyled>
      <EditButton 
        style={{ margin: 0 }}
        onPress={() => navigation.navigate('Tips', { item })}
        mode="contained">
        <TitleBtn>Editar</TitleBtn>
      </EditButton>
      <EditButton 
        style={{ margin: 0 }}
        onPress={() => {
          setTipsSelected((state) => [...state, item])
          setSelected(true)
        }}
        mode="contained">
        <TitleBtn 
        style={{ margin: 0 }} selected={selected}>Selecionar</TitleBtn>
      </EditButton>
      <ButtonStyledTwo 
      style={{ marginTop: 0 }}
        onPress={() => handleDelete()}
        mode="contained">
        Deletar
      </ButtonStyledTwo>
      </ViewStyledTwo>
    </ViewStyled>
  )
}

export default Item
