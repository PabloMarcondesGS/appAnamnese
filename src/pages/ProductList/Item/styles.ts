import styled from 'styled-components/native'
import { Card } from 'react-native-paper';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const ViewStyledTwo = styled(Card)`
  position: relative;
  margin-bottom: 8px;
  border-radius: 10px;
  min-width: ${windowWidth - 80}px;
  display: flex;
  padding: 18px;
`
