import styled, {css} from 'styled-components/native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

export const CardStyled = styled(Card)`
  margin-bottom: 12px;
  padding: 24px;
`;

export const TitleStyled = styled(Title)`
`;

export const ParagraphStyled = styled(Paragraph)``;

export const ButtonStyled = styled(Button)`
  margin-top: 24px;
  background-color: #42b6d9;
  color: white;
`;

export const ViewStyled = styled.View`
  width: 40px;
  background: green;
  ${props => props.height && css`
    height: ${props.height}px;
  `}
`;