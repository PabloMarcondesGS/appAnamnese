import styled, {css} from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { colors, fonts } from '../../../../styles'
const windowWidth = Dimensions.get('window').width;


export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`

export const Content = styled.View`
  padding: 50px 10px 30px;
  flex: 1;
  align-items: center;
`

export const ViewBackground = styled.View`
  position: absolute;
  top: 20%;
  width: ${windowWidth - 150}px;
  height: 2px;
  background-color: red;
  z-index: 9999;
  ${props => props.top && css`
    top: ${props.top}%;
  `}
`;

export const ViewList = styled.View`
  position: relative;
  align-items: flex-end;
  justify-content: flex-end;
  flex: 1;
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
  margin: 36px 0 0;
`;

export const TextValues = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.bigger};
`;