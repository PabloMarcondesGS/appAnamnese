import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { fonts, colors } from '../../styles'
import { Button as ButtonPaper } from 'react-native-paper';

export const TouchableImage = styled(RectButton)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 60px;
`

export const Button = styled(ButtonPaper)`
  background-color: ${colors.primary};
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
`;

export const ViewStyled = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.primary};
  justify-content: center;
  margin-bottom: 20px;
`;

export const TextTitleNumber = styled.Text`
  color: white;
  margin-bottom: 14px;
  padding: 0 24px;
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.bigger};
`;

export const TextTitle = styled.Text`  
  color: white;
  margin-bottom: 14px;
  padding: 0 24px;
  text-align: center;
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
`;
