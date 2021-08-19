import styled from 'styled-components/native';
import { fonts, colors } from '../../styles'

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  width: 100%;
`

export const Content = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 30px;
`

export const FlatListStyled = styled.FlatList`
  flex-basis: 0;
  flex: 1;
  width: 100%;
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

