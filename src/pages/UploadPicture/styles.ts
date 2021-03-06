import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const TouchableImage = styled(RectButton)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 60px;
`
export const ViewStyled = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-items: center;
  border-width: 1px;
  border-color: black;
  justify-content: center;
  margin-bottom: 20px;
`;

export const TextTitleNumber = styled.Text`
  color: white;
  font-size: 40px;
  margin-bottom: 14px;
  padding: 0 24px;
`;

export const TextTitle = styled.Text`  
  color: white;
  font-size: 18px;
  margin-bottom: 14px;
  padding: 0 24px;
  text-align: center;
`;
