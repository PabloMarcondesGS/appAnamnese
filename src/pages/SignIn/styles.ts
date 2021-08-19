import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { fonts, colors } from '../../styles'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 80px 30px; 
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
    color: ${colors.primary};
    font-size: ${fonts.regular};
    font-family: ${fonts.fontFamilyRegular};
`;

export const Title = styled.Text`
    font-size: ${fonts.bigger};
    color: ${colors.white};
    font-family: ${fonts.fontFamilyRegular};
    margin: 24px 0 24px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
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

export const CreateAccountButtonText = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.white}; 
  font-family: ${fonts.fontFamilyRegular};
  margin-left: 16px;
`;
