import styled from 'styled-components/native';
import { fonts, colors } from '../../../../styles'

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

export const Content = styled.View`
  padding: 30px;
  flex: 1;
`

export const FlatListStyled = styled.FlatList`
  flex-basis: 0;
  flex: 1;
`

export const TextStyled = styled.Text`
    color: ${colors.white};
    font-family: ${fonts.fontFamilyRegular};
    font-size: ${fonts.bigger};
    text-align: center;
    width: 100%;
`;

