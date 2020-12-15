import styled from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

export const Container = styled.View`
  width: 100%;
  height: 55px;
  padding: 0 16px;
  background: #F6F9FD;
  border-width: 2px;
  border-color: grey;
  border-radius: 15px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(SimpleLineIcon)`
  margin-right: 16px;
`;