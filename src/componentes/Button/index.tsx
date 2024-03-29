import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
    children: string;
    width?: number;
}

const Button: React.FC<ButtonProps> = ({ width, children, ...rest }) => (
    <Container width={width} {...rest}>
        <ButtonText>{children}</ButtonText>
    </Container>
);

export default Button;
