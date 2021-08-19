import styled from 'styled-components/native';
import { fonts, colors } from '../../styles'

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

export const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 14px;
  padding: 12px;
`;

export const Text = styled.Text`
  color: white;
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.bigger};
`;
