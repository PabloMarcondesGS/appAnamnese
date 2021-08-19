import styled from 'styled-components/native';
import { fonts, colors } from '../../styles'

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

export const Content = styled.View`
  padding: 30px 30px 30px;
  flex: 1;
`

export const FlatListStyled = styled.FlatList`
`

export const TextStyled = styled.Text`
    color: ${colors.primary};
    font-family: ${fonts.fontFamilyRegular};
    font-size: ${fonts.bigger};
    text-align: center;
    width: 100%;
    margin-top: 12px;
    margin-bottom: 6px;
`;

