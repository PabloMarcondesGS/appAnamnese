import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import { fonts, colors } from '../../styles'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS == 'android' ? 150 : 40}px;
    background-color: #fff;
`;

export const Gradient = styled(LinearGradient)`
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  margin: 36px 0 0;
`;

export const TextValues = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
`;

export const ViewImage = styled.View`
    background-color: #fff;
    border-radius: 45px;
    padding: 10px;
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 14px 0;
    border-width: 2px;
    border-color: ${colors.secondary};
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
  margin: 12px 0 0;
`;

export const BackToSignIn = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: #4682B4;
    border-top-width: 1px;
    border-color: #232129;
    padding: 16px 0 ${16 + getBottomSpace()}px;

    justify-content: center;
    align-items:center;
    flex-direction: row;
`;

export const BackToSignInText = styled.Text`
    color: #ADD8E6;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;
`;
