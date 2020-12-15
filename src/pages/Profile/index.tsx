import React, { useCallback, useRef, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker'
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
    Text,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import database from '@react-native-firebase/database';
import { Checkbox, Button as ButtonPaper } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'

import { useAuth } from '../../hooks/auth';
import Header from '../../componentes/Header';

import getValidationErrors from '../../ultils/getValidationErrors';

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import {
    Container,
    ViewImage,
} from './styles';

interface ProfileData {
    name: string;
}

const Profile: React.FC = (props: any) => {
    const [imageUser, setImageUser] = useState('' as any)
    const [images, setImages] = useState<String[]>([]);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const [male, setMale] = useState(true);
    const [female, setFemale] = useState(false);
    const [userData, setUserData] = useState({} as any);

    const emailInputRef = useRef<TextInput>(null);
    const { user } = useAuth();

    const handleUpdateUser = useCallback(async (data: ProfileData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            
            database().ref(`users/${user.uid}`).set({
                name: data.name,
                sex: male ? 'Masculino' : 'Feminino',
                birthDate: format(date, 'dd/MM/yyyy')
            });
                
            Alert.alert(
                'Atualização realizada com sucesso!',
                'Dados atualizados com sucesso.'
            )
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
        }
    }, [navigation, male, date, user]);

    const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    async function getPathForFirebaseStorage (uri: any) {
      if (Platform.OS==="ios") return uri
      const stat = await RNFetchBlob.fs.stat(uri)
      return stat.path
    }

    const handleUpdatePicture = useCallback(async () => {
        ImagePicker.showImagePicker({
          title: 'Selecione uma imagem',
          cancelButtonTitle: 'Cancelar',
          takePhotoButtonTitle: 'Usar câmera',
          chooseFromLibraryButtonTitle: 'Escolher da galeria'
        }, async response => {
          setLoading(true);
          if (response.didCancel) {
            setLoading(false);
            return;
          } 
          
          if (response.error) {
            console.log(response.error)
            Alert.alert('Erro ao selecionar a imagem');
            setLoading(false);
            return;
          }
          const source = { uri: response.uri };
          const filename = source.uri.substring(source.uri.lastIndexOf('/') + 1);
          const uploadUri = Platform.OS === 'ios' ? source.uri.replace('file://', '') : source.uri;
          setImageUser(uploadUri)
          try {
            const task = storage()
              .ref(`images/users`)
              .child(`${filename}----${user.uid}----`)
              .putFile(uploadUri);
            await task;
          } catch (e) {
            setLoading(false);
            console.error(e);
            Alert.alert('Erro ao enviar a imagem');
            return;
          }
          Alert.alert(
            'Envio concluído!',
            'Sua foto foi atualizada'
          );
          setLoading(false);
        });
      }, [user]);

    useEffect(() => {
        setLoading(true);
        database()
            .ref(`users/${user.uid}`)
            .once('value')
            .then(snapshot => {
                if (snapshot) {
                    setUserData(snapshot.val())
                }
                setLoading(false);
            });
        setLoading(false);
    }, [user])

    useEffect(() => {
        setLoading(true);
        if (userData) {
            if (userData.sex) {
                setMale(userData.sex === 'Masculino')
            }
            if (userData.birthDate) {
                setDate(new Date(userData.birthDate))
            }
        }
        setLoading(false);
    }, [userData])

    useEffect(() => {
        setLoading(true);
        const listRef = storage().ref().child(`/images/users`);
    
        listRef
          .listAll()
          .then(function(res) {
            res.items.forEach(function(itemRef) {
              itemRef
                .getDownloadURL()
                .then(url => {
                  if (url)
                    setImages(state => [...state, url])
                    setLoading(false);
                })
                .catch(error => {
                  setLoading(false);
                });
            });
          })
          .catch(function(error) {
            setLoading(false);
          });
        setLoading(false);
      }, [])
    
      useEffect(() => {
        setLoading(true);
        if (images && images.length) {
          images.map((image): any => {
            const getUser = image.split('----');
            if (getUser[1] === `${user.uid}`) {
              setImageUser(image);
            }
          });
        }
        setLoading(false);
      }, [images, user])

    return loading ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#999" />
        </View>
      ) : (
        <View style={{flex:1}}>
            <Header toggleDrawer={props.navigation.toggleDrawer} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS =='ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <ViewImage>
                            <TouchableOpacity onPress={handleUpdatePicture}>
                                {imageUser ? (
                                    <Image 
                                        style={{ width: 80, height: 80, borderRadius: 45 }} 
                                        source={{ uri: imageUser }}
                                         />
                                ) : (
                                    <Icon size={55} name="user" color="grey" />
                                )}
                            </TouchableOpacity>
                        </ViewImage>
                        <Form 
                            ref={formRef} 
                            onSubmit={handleUpdateUser}
                            initialData={userData}
                            >

                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                defaultValue={userData.name}
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

                            <Button onPress={() => {formRef.current?.submitForm();}}>Atualizar</Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Profile;
