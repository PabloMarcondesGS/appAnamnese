import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
  background-color: #42b6d9;
`

export const Content = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 24px;
`

export const ImageStyled = styled.Image`
  width: ${windowWidth - 40}px;
  height: ${windowHeight - 180}px;
  border-radius: 10px;
  margin-bottom: 24px;
`