/* eslint-disable react/jsx-filename-extension */
/* eslint-disable eqeqeq */
import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';  
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../ultils/getValidationErrors';

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import logoImg from '../../assets/cyb-logo-maior.png';

import {
  Container,   
  Title,
  ForgotPassword,
  ForgotPasswordText,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail Obrigatório').email('Digite um e-mail valido'),
        password: Yup.string().required('Senha Obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      // history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais',
      );
    }
  }, [signIn]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} style={{width: 150, height: 150}} />

            <View>
              <Title>Teste seu hálito</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                textBottom="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                textBottom="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <View style={{marginTop: 24, marginBottom: 24, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  width={50}
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  Continuar

                </Button>
              </View>
            </Form>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
            <ForgotPassword onPress={() => {navigation.navigate('SignUp')}}>
              <ForgotPasswordText>Faça seu cadastro</ForgotPasswordText>
            </ForgotPassword>
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Fale conosco</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

    </>
  );
};

export default SignIn;
