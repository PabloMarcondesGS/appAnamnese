import styled from 'styled-components/native'
import { Card, Button, Paragraph, Title } from 'react-native-paper';
import { fonts, colors } from '../../../styles'

export const ViewStyled = styled.View`
  width: 100%;
  margin-top: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ViewStyledTwo = styled(Card)`
  position: relative;
  margin-bottom: 8px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  padding: 18px;
  background: ${colors.primary};
`

export const ButtonStyled = styled(Button)`
  margin-top: 24px;
  background-color: #42b6d9;
  color: white;
`;

export const ButtonStyledTwo = styled(Button)`
  margin-top: 12px;
  background-color: red;
  color: white;
`;

export const EditButton = styled.TouchableOpacity`
`;

export const TitleBtn = styled.Text`
    font-size: ${fonts.bigger};
    color: ${({selected}) => selected ? 'red' : colors.white};
    font-family: ${fonts.fontFamilyRegular};
    text-align: center;
    width: 100%;
    margin-bottom: 6px;
`;

export const ParagraphStyled = styled(Paragraph)`
  color: ${colors.white};
`;

export const TitleStyled = styled(Title)`
  color: ${colors.white};
`;
