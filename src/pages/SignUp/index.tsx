import React, { useCallback, useRef, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
    Text
} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Checkbox, Button as ButtonPaper } from 'react-native-paper';

import getValidationErrors from '../../ultils/getValidationErrors';

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import logoImg from '../../assets/cyb-logo-maior.png';

import {
    Container,
    Title,
    BackToSignIn,
    BackToSignInText
} from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const [male, setMale] = useState(true);
    const [female, setFemale] = useState(false);

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
                password: Yup.string().min(3, 'Minimo de 3 caracteres').required('Senha obrigatoria'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(function(user: any) {
                    database().ref(`users/${user.user.uid}`).set({
                        name: data.name,
                        email: data.email,
                        sex: male ? 'Masculino' : 'Feminino',
                        birthDate: date,
                        id: user.user.uid
                    });
                })
                .catch (function (error) {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Email já cadastrado');
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log('Email invalido!');
                    }
                    return;
                })
            Alert.alert(
                'Cadastro realizado com sucesso!',
                'Você já pode logar na aplicação'
            )

            navigation.goBack();
        } catch (err) {
            console.log(err)
            if (err instanceof Yup.ValidationError){
                const errors =  getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }
            Alert.alert(
                'Erro no cadastro',
                'Ocorreu um erro ao fazer cadastro, tente novamente'
            );
            setLoading(false);
        }
    }, [navigation, male, date]);

    const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS =='ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image style={{ width: 80, height: 80 }}  source={logoImg}/>
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignUp}>

                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />

                            <View style={{ 
                                backgroundColor: 'white', 
                                width: '100%',
                                paddingLeft: 14,
                                paddingRight: 14,
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 8,
                                marginBottom: 10,
                                borderWidth: 2,
                                borderColor: '#808080'
                            }}>
                                <Text>Data de nascimento:</Text>
                                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                                    <ButtonPaper onPress={() => setShow(true)}>Selecionar data</ButtonPaper>
                                    <Text>{date ? format(date, 'dd/MM/yyyy') : ''}</Text>
                                </View>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='datetime'
                                        display="default"
                                        onChange={onChange} />
                                )}
                            </View>


                            <View style={{ 
                                backgroundColor: 'white', 
                                width: '100%',
                                paddingLeft: 14,
                                paddingRight: 14,
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 8,
                                marginBottom: 10,
                                borderWidth: 2,
                                borderColor: '#808080'
                            }}>
                                <Text>Sexo:</Text>
                                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <Checkbox
                                        status={male ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setMale(!male);
                                            setFemale(male ? true : false);
                                        }} />
                                    <Text>Homem</Text>
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <Checkbox
                                        status={female ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setFemale(!female);
                                            setMale(female ? true : false);
                                        }} />
                                    <Text>Mulher</Text>
                                </View>
                            </View>

                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />
                            
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                            />

                            <Button onPress={() => {formRef.current?.submitForm();}}>Entrar</Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSignIn onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="#ADD8E6"/>
                    <BackToSignInText>Voltar para login</BackToSignInText>
            </BackToSignIn>

        </>
    );
};

export default SignUp;
