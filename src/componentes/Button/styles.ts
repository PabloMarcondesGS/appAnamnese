import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { fonts, colors } from '../../styles'

interface ContainerProps{
    width?: number;
}

export const Container = styled(RectButton)<ContainerProps>`
    width: ${({width}) => width ? `${width}` : '100'}%;
    background: ${colors.primary};
    border-radius: 15px;
    margin-top: 8px;
    padding: 10px 0;

    justify-content: center;
    align-items: center;
`;


export const ButtonText = styled.Text`
    color: ${colors.white};
    font-size: ${fonts.regular};
    font-family: ${fonts.fontFamilyRegular};
`;

// talvez seja necessario retirar width: 100%;
