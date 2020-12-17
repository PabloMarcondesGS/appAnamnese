import styled from 'styled-components/native';
import { Card } from 'react-native-paper';

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

export const CardStyled = styled(Card)`
  padding: 24px;
  background-color: white;
  flex: 1;
  width: 100%;

`

export const ImageStyled = styled.Image`
  width: 300px;
  height: 300px;
  border-radius: 150px;
`

export const Title = styled.Text`
    font-size: 20px;
    color: #42b6d9;
    font-family: 'RobotoSlab-Medium';
    margin: 12px 0 12px;
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    color: #42b6d9;
    font-family: 'RobotoSlab-Medium';
`;

export const Description = styled.Text`
    font-size: 17px;
    color: #42b6d9;
    text-align: justify;
    font-family: 'RobotoSlab-Medium';
`;

export const Product = styled.View`
  flex-direction: row;
  margin-top: 24px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ImageStyledProduct = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`

export const TitleViewProduct = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ButtonProductMore = styled.TouchableOpacity`
`;

export const SubTitleProductButton = styled.Text`
    font-size: 17px;
    color: #fff;
    font-family: 'RobotoSlab-Medium';
    text-decoration: underline;
    text-align: center;
    margin: 12px;
`;

export const SubTitleProduct = styled.Text`
    font-size: 20px;
    color: #fff;
    font-family: 'RobotoSlab-Medium';
    text-align: center;
    margin: 12px;
    flex-wrap: wrap;
`;

export const ButtonSeeAll = styled.TouchableOpacity`
  width: 100%;
  margin: 24px;
  background-color: white;
  border-radius: 10px;
  padding: 12px;
`;

export const ButtonSeeAllText = styled.Text`
    font-size: 17px;
    color: #42b6d9;
    flex-wrap: wrap;
    font-family: 'RobotoSlab-Medium';
    text-align: center;
`;
