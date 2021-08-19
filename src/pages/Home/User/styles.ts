import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts, colors } from '../../../styles'


export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Gradient = styled(LinearGradient)`
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-radius: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  margin: 36px 0 0;
`;

export const TextValues = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.bigger};
`;

export const Content = styled.View`
  padding: 30px;
  flex: 1;
  width: 100%;
  align-items: center;
`

export const FlatListStyled = styled.FlatList`
  flex-basis: 0;
  flex: 1;
`


export const TextStyled  = styled.Text`
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.small};
`;

export const TextStyledMargin = styled.Text`
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.small};
  margin-left: 8px;
  border-left-color: ${colors.primary};
  border-left-width: 2px;
  padding-left: 8px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

export const ViewSeeMore = styled.View`
  margin-top: 32px;
  align-items: center;
`;