import styled from 'styled-components/native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { fonts, colors } from '../../../styles'

export const CardStyled = styled(Card)`
  margin-bottom: 12px;
  padding: 24px;
  background: ${colors.primary};
`;

export const ButtonStyled = styled(Button)`
  margin-top: 24px;
  background-color: ${colors.secondary};
`;

export const ParagraphStyled = styled(Paragraph)`
  color: ${colors.white};
`;

export const TitleStyled = styled(Title)`
  color: ${colors.white};
`;