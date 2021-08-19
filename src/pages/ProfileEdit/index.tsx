import React, { useCallback, useRef, useState, useEffect } from 'react';
import {RNCamera} from 'react-native-camera';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import database from '@react-native-firebase/database';
import { Checkbox, Button as ButtonPaper } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

import getValidationErrors from '../../ultils/getValidationErrors';
import { colors } from '../../styles'

import Input from '../../componentes/InputThree';
import Button from '../../componentes/Button';
import Header from '../../componentes/Header';

import logoImg from '../../assets/cyb-logo-maior.png';
import { useAuth } from '../../hooks/auth';

import {
    Container,
    Title,
    TextValues,
    TextPlaceholder,
    ModalCard,
    ModalTitle,
    ModalButton,
    ModalButtonText,
    ModalOption,
    ModalSelection,
    ModalContainer,
    ViewImage,
} from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    date: string;
}

const SignUp: React.FC = () => {
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const [imageUser, setImageUser] = useState('' as any)
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [other, setOther] = useState(false);
    const [pacient, setPacient] = useState(true);
    const [medic, setMedic] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({} as any);
    const [modalMediaVisible, setModalMediaVisible] = useState(false);
    const [images, setImages] = useState<String[]>([]);
       
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

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

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
            let genrrer = ''
            if(male) {
              genrrer = 'Masculino'
            } else if(female){
              genrrer = 'Feminino'
            }else if(other){
              genrrer = 'Outro'
            }
            database().ref(`users`)
            .child(user.uid)
            .update({
                name: data.name,
                email: data.email,
                sex: genrrer,
                birthDate: data.birthDate,
                id: user.uid,
                active: true
            })
            // navigation.navigate('Questions', {item: user.uid, email: data.email, password: data.password})
                
            Alert.alert(
                'Alterado com sucesso!',
                'Alteração de dados concluída com sucesso!'
            )

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
            // setLoading(false);
        }
    }, [navigation, male, medic, user, other]);


    useEffect(() => {
      setLoading(true);
      database()
          .ref(`users/${user.uid}`)
          .once('value')
          .then(snapshot => {
              if (snapshot) {
                  setUserData(snapshot.val())
                  if(snapshot.val().sex === 'Masculino') {
                    setMale(true)
                    setFemale(false)
                  }else{
                    setFemale(true)
                    setMale(false)
                  }
              }
              setLoading(false);
          });
      setLoading(false);
  }, [user])

  async function getPathForFirebaseStorage (uri: any) {
    if (Platform.OS==="ios") return uri
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
  }

  const handleImage = useCallback(
    async ({response, typeAction}) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        setLoading(true);
        const filename = response.uri.substring(response.uri.lastIndexOf('/') + 1);
        try {
          // const uriD = await getPathForFirebaseStorage(response.uri)
          const source = { uri: response.uri };
          const uploadUri = Platform.OS === 'ios' ? source.uri.replace('file://', '') : source.uri;
          setImageUser(uploadUri)
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
          setLoading(false);
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
      }
    },
    [user],
  );

  const getImage = useCallback(
    (typeAction) => {
      const options = {
        title: 'Selecione a imagem da refeição',
        takePhotoButtonTitle: 'Tirar foto',
        chooseFromLibraryButtonTitle: 'Selecionar da galeria',
        cancelButtonTitle: 'Cancelar',
        storageOptions: {privateDirectory: true},
      };

      if (typeAction === 'Tirar foto') {
        try {
          launchCamera(options, (response) =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      } else {
        try {
          launchImageLibrary(options, (response) =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      }
    },
    [],
  );
  return loading ? (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#005a72" />
    </View>
  ) : (
      <View style={{flex:1}}>
        <Header isHeader={false}  actionProfile={() => navigation.navigate('ProfileEdit')}  toggleDrawer={navigation.goBack} />
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
                          <TouchableOpacity onPress={() => setModalMediaVisible(true)}>
                              {imageUser ? (
                                  <Image 
                                      style={{ width: 80, height: 80, borderRadius: 45 }} 
                                      source={{ uri: imageUser }}
                                        />
                              ) : (
                                  <Icon size={55} name="user" color={colors.primary} />
                              )}
                          </TouchableOpacity>
                      </ViewImage>
                      <View>
                          <Title>Perfil</Title>
                      </View>
                      <Form ref={formRef} onSubmit={handleSignUp}
                        initialData={userData}>
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
                              editable={false}
                              textBottom="E-mail"
                              returnKeyType="next"
                              onSubmitEditing={() => {
                                  passwordInputRef.current?.focus()
                              }}
                          />

                          <Input
                              autoCapitalize="words"
                              name="birthDate"
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
                          
                          {/* <Input
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
                          /> */}
                          <View style={{paddingTop: 24, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 80}}>
                            <Button width={50} onPress={() => {formRef.current?.submitForm();}}>Salvar</Button>
                          </View>
                      </Form>
                  </Container>
              </ScrollView>
          </KeyboardAvoidingView>
          <ModalSelection
            animationType="fade"
            visible={modalMediaVisible}
            transparent
            callback={(data) => {
              setModalMediaVisible(false);

              if (data) {
                requestAnimationFrame(() => {
                  getImage(data);
                });
              }
            }}>
            <ModalContainer>
              <ModalCard>
                <ModalTitle>Selecione uma foto de perfil</ModalTitle>
                <ModalOption
                  onPress={() => {
                    setModalMediaVisible(false);

                    requestAnimationFrame(() => {
                      getImage('Tirar foto');
                    });
                  }}>
                  <ModalButtonText>Tirar foto</ModalButtonText>
                </ModalOption>
                <ModalOption
                  onPress={() => {
                    setModalMediaVisible(false);

                    requestAnimationFrame(() => {
                      getImage('Selecionar da galeria');
                    });
                  }}>
                  <ModalButtonText>Selecionar da galeria</ModalButtonText>
                </ModalOption>
                <ModalButton onPress={() => setModalMediaVisible(false)}>
                  <ModalButtonText>CANCELAR</ModalButtonText>
                </ModalButton>
              </ModalCard>
            </ModalContainer>
          </ModalSelection>
          <RNCamera
            style={{opacity: 0, width: 0, height: 0}}
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a câmera',
              message: 'Precisamos da sua permissão para usar a câmera.',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancelar',
            }}
            captureAudio={false}
          />
        </View>
    );
};

export default SignUp;
