import styled from 'styled-components/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import { fonts, colors } from '../../../../../styles'

export const CardStyled = styled(Card)`
  margin-bottom: 12px;
  padding: 24px;
`;

export const TitleStyled = styled(Title)`
  width: 100%;
  font-size: ${fonts.regular};
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  text-align: center;
`;

export const ParagraphStyled = styled(Paragraph)`
  width: 100%;
  font-size: ${fonts.regular};
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  text-align: center;
  width: 100%;
`;
export const Gradient = styled(LinearGradient)`
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  margin: 0 30px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  margin: 12px 0 36px;
`;

export const TextValues = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.bigger};
`;
