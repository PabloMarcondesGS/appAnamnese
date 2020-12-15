import React from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Title, Paragraph } from 'react-native-paper';

import { ViewStyled, ViewStyledTwo } from './styles'

const Item = ({ item }: any) => {
  const navigation = useNavigation();
  return (
    <ViewStyled>
      <ViewStyledTwo>
        <Paragraph
          style={{
            flexBasis: '100%',
            flexWrap: 'wrap',
            textAlign: 'left',
            paddingTop: 10
          }}>
          DICA
        </Paragraph>
        <Title>{item.description}</Title>
        <Paragraph
          style={{
            flexBasis: '100%',
            flexWrap: 'wrap',
            textAlign: 'left',
            paddingTop: 10
          }}>
          LINK
        </Paragraph>
        <Paragraph>{item.link}</Paragraph>
      </ViewStyledTwo>
    </ViewStyled>
  )
}

export default Item
