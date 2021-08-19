import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import TextInputMask from 'react-native-text-input-mask';
import { fonts, colors } from '../../styles'

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View`
    width: 100%;
    min-height: 60px;
    padding: 0 16px;
    border-radius: 10px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 2px;
    border-bottom-color: ${colors.primary};
`;

export const TextInputMaskStyled = styled(TextInputMask)<ContainerProps>`
    flex: 1;
    color: ${colors.primary};
    font-size: ${fonts.regular};
    font-family: ${fonts.fontFamilyRegular};
    width: 100%;
    padding: 8px;
    text-align: center;

    ${(props) => props.isErrored && css`
        border-bottom-color: #c53030;
    `}

    ${(props) => props.isFocused && css`
        border-bottom-color: ${colors.primary};
    `}
`;

export const TextInput = styled.TextInput<ContainerProps>`
    flex: 1;
    color: ${colors.primary};
    font-size: ${fonts.regular};
    font-family: ${fonts.fontFamilyRegular};
    width: 100%;
    padding: 8px;
    text-align: left;

    ${(props) => props.isErrored && css`
        border-bottom-color: #c53030;
    `}

    ${(props) => props.isFocused && css`
        border-bottom-color: ${colors.primary};
    `}
`;

export const Icon = styled(FeatherIcon)`
    margin-right: 16px;
`;

export const TextStyled = styled.Text`
    color: ${colors.secondary};
    font-family: ${fonts.fontFamilyRegular};
    font-size: ${fonts.regular};
`;
