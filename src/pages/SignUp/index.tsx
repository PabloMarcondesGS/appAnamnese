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
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {format} from 'date-fns'
import { Checkbox, Button as ButtonPaper } from 'react-native-paper';

import getValidationErrors from '../../ultils/getValidationErrors';
import { colors } from '../../styles'

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import logoImg from '../../assets/cyb-logo-maior.png';
import { useAuth } from '../../hooks/auth';

import {
    Container,
    Title,
    TextValues,
    TextPlaceholder
} from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    date: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [other, setOther] = useState(false);
    const [pacient, setPacient] = useState(true);
    const [medic, setMedic] = useState(false);
       
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
            if(data.password !== data.confirm_password) {
              Alert.alert('Erro', 'As senhas estão diferentes, verifique e tente novamente')
              return;
            }
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
                password: Yup.string().min(3, 'Minimo de 3 caracteres').required('Senha obrigatoria'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            setLoading(true)
            let genrrer = ''
            if(male) {
              genrrer = 'Masculino'
            } else if(female){
              genrrer = 'Feminino'
            }else if(other){
              genrrer = 'Outro'
            }
            auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(async function(user: any) {
                    database().ref(`users/${user.user.uid}`).set({
                        name: data.name,
                        email: data.email,
                        sex: genrrer,
                        birthDate: data.date,
                        id: user.user.uid,
                        medic: false,
                        active: true,
                        signUp: `${format(new Date(), 'dd/MM/yyyy')}`
                    })
                    setLoading(false)
                    Alert.alert('Cadastrado com sucesso!');
                    navigation.navigate('Questions', {item: user.user.uid, email: data.email, password: data.password})
                })
                .catch (function (error) {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Email já cadastrado');
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log('Email invalido!');
                    }
                    setLoading(false)
                    return;
                })
            // Alert.alert(
            //     'Cadastro realizado com sucesso!',
            //     'Você já pode logar na aplicação'
            // )

            // navigation.goBack();
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
            setLoading(false)
            // setLoading(false);
        }
    }, [navigation, male, medic, other]);

    return loading ? (
      <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Container>
    ) : (
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
                            <Title>Cadastro</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                textBottom="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />

                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                name="email"
                                textBottom="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />

                            <Input
                                autoCapitalize="words"
                                name="date"
                                keyboardType="number-pad"
                                textBottom="Data de nascimento"
                                mask="[00]/[00]/[0000]"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />


                            <View style={{ 
                                width: '100%',
                                paddingLeft: 14,
                                paddingRight: 14,
                                paddingTop: 24,
                                paddingBottom: 12,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}> 
                              <View style={{
                                flexDirection: 'row',
                                borderBottomWidth: 2,
                                borderBottomColor: colors.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 8,
                                flexWrap: 'wrap'
                              }}>
                                <View style={{ display: 'flex', marginRight: 16, alignItems: 'center', flexDirection: 'row' }}>
                                    <Checkbox
                                        status={male ? 'checked' : 'unchecked'}
                                        uncheckedColor="#fff"
                                        color={colors.primary}
                                        onPress={() => {
                                            setMale(!male);
                                            setFemale(male ? true : false);
                                            setOther(male ? true : false);
                                        }} />
                                    <TextValues>Masculino</TextValues>
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <Checkbox
                                        color={colors.primary}
                                        status={female ? 'checked' : 'unchecked'}
                                        uncheckedColor="#fff"
                                        onPress={() => {
                                            setFemale(!female);
                                            setMale(female ? true : false);
                                            setOther(female ? true : false);
                                        }} />
                                    <TextValues>Feminino</TextValues>
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <Checkbox
                                        color={colors.primary}
                                        status={other ? 'checked' : 'unchecked'}
                                        uncheckedColor="#fff"
                                        onPress={() => {
                                            setOther(!other);
                                            setMale(other ? true : false);
                                            setFemale(other ? true : false);
                                        }} />
                                    <TextValues>Outro</TextValues>
                                </View>
                              </View>
                              <TextPlaceholder>Gênero</TextPlaceholder>
                            </View>
                            
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                textBottom="Senha"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                            />
                            
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="confirm_password"
                                textBottom="Repetir senha"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                            />
                            <View style={{paddingTop: 24, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                              <Button width={50} onPress={() => {formRef.current?.submitForm();}}>Salvar</Button>
                            </View>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
};

export default SignUp;
