import React, { useCallback, useRef, useState, useEffect } from 'react';
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
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'

import { useAuth } from '../../hooks/auth';
import Header from '../../componentes/Header';
import { colors } from '../../styles'

import getValidationErrors from '../../ultils/getValidationErrors';

import Input from '../../componentes/InputTwo';

import {
    Container,
    ViewImage,
    Gradient, 
    Button,
    TextValues,
    Title
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
    const { user, medic } = useAuth();

    const handleUpdateUser = useCallback(async (data: ProfileData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
            });
 
            await schema.validate(data, {
                abortEarly: false,
            });
            
            database().ref(`users`)
            .child(user.uid)
            .update({
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
          const filename = response.uri.substring(response.uri.lastIndexOf('/') + 1);
          const uriD = await getPathForFirebaseStorage(response.uri)
          const source = { uri: uriD };
          const uploadUri = Platform.OS === 'ios' ? source.uri.replace('file://', '') : source.uri;
          setImageUser(uploadUri)
          try {
            const task = storage()
              .ref(`images/users`)
              .child(`${filename}----${user.uid}----`)
              .putFile(uploadUri);
            const resp = await task;
            database()
                .ref(`users`)
                .child(user.uid)
                .update({
                    image: resp.metadata.fullPath
                })
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
      }, [user, getPathForFirebaseStorage]);

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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#005a72" />
        </View>
      ) : (
        <View style={{flex:1}}>
            <Header isHeader={false}  actionProfile={() => navigation.navigate('ProfileEdit')}  toggleDrawer={props.navigation.goBack} />
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
                            {imageUser ? (
                                <Image 
                                    style={{ width: 80, height: 80, borderRadius: 45 }} 
                                    source={{ uri: imageUser }}
                                      />
                            ) : (
                                <Icon size={55} name="user" color={colors.primary} />
                            )}
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
                                prefix="Nome:"
                                defaultValue={userData.name}
                                placeholder="Nome"
                                returnKeyType="next"
                                editable={false}
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />

                            <Input
                                autoCapitalize="words"
                                name="email"
                                icon="user"
                                prefix="Email:"
                                defaultValue={userData.email}
                                returnKeyType="next"
                                editable={false}
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />
                            {!medic ? (
                              <Input
                                  autoCapitalize="words"
                                  name="email"
                                  icon="user"
                                  prefix="Plano:"
                                  defaultValue="FREE"
                                  returnKeyType="next"
                                  editable={false}
                              />
                            ) : <View />}

                            <Input
                                autoCapitalize="words"
                                name="email"
                                icon="user"
                                prefix="Gênero:"
                                defaultValue={userData.sex}
                                returnKeyType="next"
                                editable={false}
                            />

                            <Input
                                autoCapitalize="words"
                                name="signUp"
                                icon="calendar"
                                prefix="Data de Nasc.:"
                                defaultValue={userData.birthDate}
                                returnKeyType="next"
                                editable={false}
                            />


                            <Input
                                autoCapitalize="words"
                                name="signUp"
                                icon="calendar"
                                prefix="Data de Cad.:"
                                defaultValue={userData.signUp}
                                returnKeyType="next"
                                editable={false}
                            />

                            <Button onPress={() => navigation.navigate('ProfileEdit')}>
                              <Gradient
                                colors={[colors.primary,colors.secondary ]}
                                start={{x: 0, y: 1}}
                                end={{x: 1, y: 0}}>
                                <TextValues>EDITAR PERFIL</TextValues>
                              </Gradient>
                            </Button>
                            <TouchableOpacity onPress={() => navigation.navigate('Questions', {item: user.uid, search: true})}>
                              <Title>EDITAR ANAMNESE</Title>
                            </TouchableOpacity>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Profile;
