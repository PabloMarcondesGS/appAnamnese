import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 60px;
    background: #4682B4;
    border-radius: 10px;
    margin-top: 8px;

    justify-content: center;
    align-items: center;
`;


export const ButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #ADD8E6;
    font-size: 18px;
`;

// talvez seja necessario retirar width: 100%;
