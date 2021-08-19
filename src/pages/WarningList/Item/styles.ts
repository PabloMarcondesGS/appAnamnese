import styled from 'styled-components/native'
import { Card } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import { fonts, colors } from '../../../styles'

const windowWidth = Dimensions.get('window').width;

export const ViewStyled = styled.View`
  width: 100%;
  margin-top: 5px;
  flex-direction: column;
  align-items: center;
  min-width: ${windowWidth - 80}px;
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

export const EditButton = styled.TouchableOpacity`
`;

export const TitleBtn = styled.Text`
    font-size: ${fonts.bigger};
    color: ${({selected}) => selected ? 'red' : colors.white};
    font-family: ${fonts.fontFamilyRegular};
    padding: 12px;
    text-align: center;
    width: 100%;
`;

export const EditButtonTwo = styled.TouchableOpacity`
  background-color: red;
  border-radius: 8px;
`;

export const TitleBtnTwo = styled.Text`
    font-size: ${fonts.regular};
    color: ${colors.white};
    font-family: ${fonts.fontFamilyRegular};
    padding: 12px;
    text-align: center;
    width: 100%;
`;

export const ParagraphStyled = styled(Paragraph)`
  color: ${colors.white};
`;

export const TitleStyled = styled(Title)`
  color: ${colors.white};
`;

