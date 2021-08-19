import styled from 'styled-components';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {Checkbox} from 'react-native-paper';
import { Dimensions } from 'react-native';

import {colors, fonts} from '../../styles';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const Container = styled.ScrollView`
  background: ${colors.secondary};
  padding: 10px 30px 50px 30px;
  border-radius: 15px;
`;

export const ImageStyled = styled.Image`
  width: ${windowWidth - 100}px;
  height: ${windowHeight - 190}px;
  border-radius: 15px;
  margin-top: 10px;
`;

export const MenuButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;

export const Icon = styled(SimpleLineIcon)``;

export const ButtonSend = styled.TouchableOpacity`
  width: 100%;
  margin: 12px 0;
`;

export const TextButton = styled.Text`
  text-align: center;
  padding: 12px 0 0;
  color: ${colors.white};
  font-size: ${fonts.regular};
  font-family: ${fonts.fontFamilyRegular};
`;
