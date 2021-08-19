import React, { useCallback, useRef, useState, useEffect } from 'react';
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
import { Checkbox, Button as ButtonPaper } from 'react-native-paper';

import getValidationErrors from '../../ultils/getValidationErrors';
import { colors } from '../../styles'

import Input from '../../componentes/InputThree';
import Button from '../../componentes/Button';

import logoImg from '../../assets/cyb-logo-maior.png';
import { useAuth } from '../../hooks/auth';
import Header from '../../componentes/Header';

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
    birthDate: string;
}

const SignUp: React.FC = (props: any) => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [other, setOther] = useState(false);
    const [pacient, setPacient] = useState(true);
    const [medic, setMedic] = useState(false);
    const [medicData, setMedicData] = useState()
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    useEffect(() => {
      setLoading(true);
      if(props && props.route && props.route.params && props.route.params.item){
        setMedicData(props.route.params.item)
        console.log(props.route.params.item)
        if (props.route.params.item.sex === 'Masculino') {
          setMale(true)
        } else if(props.route.params.item.sex === 'Feminino') {
          setFemale(true)
        } else {
          setOther(true)
        }
        if (formRef)
          formRef.current?.setData(props.route.params.item);
      }
      setLoading(false)
    }, [props, formRef])

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
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
            database().ref(`users`).child(medicData.id).update({
                name: data.name,
                // email: data.email,
                sex: genrrer,
                birthDate: data.birthDate,
                id: medicData.id,
                medic: true,
                active: true
            })
            setLoading(false)
            Alert.alert('Atualizado com sucesso, atualize a lista!');
            navigation.goBack()

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
    }, [navigation, male, medic, other, medicData]);

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
            ><Header actionProfile={() => props.navigation.navigate('Profile')}  toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
                    
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
                            />

                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                editable={false}
                                name="email"
                                textBottom="E-mail"
                                returnKeyType="next"
                            />

                            <Input
                                autoCapitalize="words"
                                name="birthDate"
                                keyboardType="number-pad"
                                textBottom="Data de nascimento"
                                returnKeyType="next"
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
                                        uncheckedColor="#0094a3"
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
                                        uncheckedColor="#0094a3"
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
                                        uncheckedColor="#0094a3"
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
                            <View style={{paddingTop: 24, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                              <Button width={50} onPress={() => {formRef.current?.submitForm();}}>Atualizar</Button>
                            </View>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
};

export default SignUp;
