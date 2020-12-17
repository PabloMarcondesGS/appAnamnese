import React from 'react'
import { Title, Paragraph } from 'react-native-paper';

import { ViewStyledTwo } from './styles'

const Item = ({ item }: any) => {
  return (
    <ViewStyledTwo>
      <Paragraph
        style={{
          flexBasis: '100%',
          flexWrap: 'wrap',
          textAlign: 'left',
          paddingTop: 10
        }}>
        PRODUTO
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
  )
}

export default Item
