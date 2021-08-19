import styled from 'styled-components/native';
import { Button } from 'react-native-paper'

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

export const Content = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 24px;
`

export const SelectPicture = styled(Button)`

`

export const ModalSelection = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalCard = styled.View`
  background-color: #fff;
  padding:10px;
  margin: 20px;
`;

export const ModalTitle = styled.Text`
  padding:10px;
  line-height: 16px;
  font-size: 14px;
  color: #777777;
`;

export const ModalButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding:10px;
`;

export const ModalOption = styled.TouchableOpacity`
  padding:10px;
`;

export const ModalButtonText = styled.Text`
  line-height: 16px;
  font-size: 14px;
  color: #777777;
`;
