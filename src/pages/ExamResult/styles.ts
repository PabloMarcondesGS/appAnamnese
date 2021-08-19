import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts, colors } from '../../styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

export const Gradient = styled(LinearGradient)`
  padding: 24px;
  border-radius: 20px;
`;

export const ViewText = styled.View`
  flex: 1;
  margin-top: 24px;
  width: 100%;
`

export const ViewTextTwo = styled.View`
  flex: 1;
  width: 100%;
`

export const ViewRound = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  border-width: 5px;
  border-color: ${colors.primary};
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 24px;
`

export const ImageStyled = styled.Image`
  width: 300px;
  height: 300px;
  border-radius: 150px;
`

export const Title = styled.Text`
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
  margin: 12px 0 0px;
`;

export const TitleTwo = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
  width: 100%;
  border-bottom-color: ${colors.white};
  border-bottom-width: 1px;
  padding-bottom: 5px;
  margin-bottom: 8px;
`;

export const Level = styled.Text`
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  font-size: 60px;
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    color: #fff;
    font-family: 'RobotoSlab-Medium';
`;

export const Description = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.small};
`;

export const Product = styled.View`
  margin-top: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* flex: 1;
  border-width: 1px;
  border-color: grey; */
`;

export const ImageStyledProduct = styled.Image`
  width: 150px;
  height: 300px;
  margin-right: 12px;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px; 
  border-top-right-radius: 40px; 
`

export const TitleViewProduct = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ButtonProductMore = styled.TouchableOpacity`
`;

export const SubTitleProductButton = styled.Text`
    color: ${colors.primary};
    font-family: ${fonts.fontFamilyRegular};
    font-size: ${fonts.regular};
    text-decoration: underline;
    text-align: center;
    margin: 5px 12px;
`;

export const SubTitleProduct = styled.Text`
    color: ${colors.primary};
    font-family: ${fonts.fontFamilyRegular};
    font-size: ${fonts.regular};
    text-align: center;
    margin: 5px 12px;
`;

export const ButtonSeeAll = styled.TouchableOpacity`
  width: 100%;
  margin: 24px;
  background-color: white;
  border-radius: 10px;
  padding: 12px;
`;

export const ButtonSeeAllText = styled.Text`
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
  text-align: center;
`;
