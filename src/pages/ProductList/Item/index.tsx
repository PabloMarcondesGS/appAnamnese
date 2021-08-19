import React, {useCallback, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import { ViewStyledTwo, EditButton, TitleBtn, EditButtonTwo, TitleBtnTwo, ParagraphStyled, TitleStyled } from './styles'

const Item = ({ item, handleRefresh, setProductsSelected }: any) => {
  const [selected, setSelected] = useState(false)
  const handleDelete = useCallback(() => {
    database().ref().child('products').child(item.id).remove();
    handleRefresh()
  }, [])
  const navigation = useNavigation();
  return (
    <ViewStyledTwo>
      <ParagraphStyled
        style={{
          flexBasis: '100%',
          flexWrap: 'wrap',
          textAlign: 'left',
          paddingTop: 10
        }}>
        PRODUTO
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
      <EditButton onPress={() => navigation.navigate('ProductEdit', { item })}>
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
  )
}

export default Item
