import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    useState,
    useCallback,
   } from 'react';
import { TextInputProps } from 'react-native';
import {useField} from '@unform/core'
import { Container, TextInput, TextStyled, TextInputMaskStyled } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    textBottom: string;
    mask?: string;
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
    { prefix = '',name, mask = null, textBottom, ...rest }, ref
) => {
    const inputElementRef =  useRef<any>(null);

    const { registerField, defaultValue, fieldName, error} = useField(name);
    const inputValueRef = useRef<InputValueReference>({value: defaultValue});

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!! inputValueRef.current.value)
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        }
    }));

    useEffect(() =>{
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value});
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        })
    }, [fieldName, registerField])

    return (
        <Container>
            <TextStyled>{prefix}</TextStyled>
            {!mask ? (
                <TextInput
                    isFocused={isFocused} isErrored={!!error}
                    ref={inputElementRef}
                    keyboardAppearance='dark'
                    defaultValue={defaultValue}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChangeText={(value) => {
                        inputValueRef.current.value = value;
                    }}
                    {...rest}
                />
                ) : (
                <TextInputMaskStyled
                    isFocused={isFocused} isErrored={!!error}
                    ref={inputElementRef}
                    keyboardAppearance='dark'
                    defaultValue={defaultValue}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    mask={mask}
                    onChangeText={(value) => {
                        inputValueRef.current.value = value;
                    }}
                    {...rest}
                />
                )}
                <TextStyled>{textBottom}</TextStyled>
        </Container>
    );
};

export default forwardRef(Input);
