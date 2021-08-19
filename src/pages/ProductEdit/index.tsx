import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import database from '@react-native-firebase/database';
import * as Yup from 'yup';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';

import { 
  Container,
  Content,
  SelectPicture,
  ModalSelection,
  ModalContainer,
  ModalCard,
  ModalTitle,
  ModalButton,
  ModalButtonText,
  ModalOption,
} from './styles';
import Header from '../../componentes/Header';
import Input from '../../componentes/InputTwo';
import Button from '../../componentes/Button';
import {colors} from '../../styles'

import getValidationErrors from '../../ultils/getValidationErrors';

const Product: React.FC = (props: any) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [modalMediaVisible, setModalMediaVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [resizing, setResizing] = useState(false);
  const [productData, setProductData] = useState()

  useEffect(() => {
    setLoading(true);
    if(props && props.route && props.route.params && props.route.params.item){
      setProductData(props.route.params.item)
      formRef.current.setData(props.route.params.item);
    }
    setLoading(false)
  }, [props, formRef])

  const handleSubmit = useCallback(async (data, { reset }) => {
    if (!productData) {
      Alert.alert('Erro', 'Tente novamente');
      return;
    }
    try {
      setLoading(true);
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required('Descrição obrigatória'),
        link: Yup.string().required('Link obrigatório'),
      });
      console.log(data)
      await schema.validate(data, {
        abortEarly: false,
      });
      if (image) {
        const task = storage()
          .ref(`images/products`)
          .child(`${new Date()}`)
          .putFile(image)
          .then(snapshot => {
            database().ref(`products`).child(productData.id).update({
              ...data,
              image: snapshot.metadata.fullPath,
            }).then(function (value) {
              setLoading(false);
              setProductData({...productData, link: data.link, description: data.description, info: data.info})
              Alert.alert(
                'Atualizado com sucesso',
                'Produto atualizado com sucesso'
              );
              navigation.navigate('ProductList', {update: true})
            });
          });
          try {
            await task;
          } catch (e) {
            Alert.alert('Erro ao enviar a imagem');
            setLoading(false);
            return;
          }
      } else {
        database().ref(`products`).child(productData.id).update({
          ...data,
        }).then(function (value) {
          setLoading(false);
          setProductData({...productData, link: data.link, description: data.description, info: data.info})
          Alert.alert(
            'Atualizado com sucesso',
            'Produto atualizado com sucesso'
          );
          navigation.navigate('ProductList', {update: true})
        });
      }
      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError){
        const errors =  getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      console.log(err)
      Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente'
      );
    }
  }, [image, productData]);

  // const handleUpdatePicture = useCallback(async () => {
  //   ImagePicker.showImagePicker({
  //     title: 'Selecione uma imagem',
  //     cancelButtonTitle: 'Cancelar',
  //     takePhotoButtonTitle: 'Usar câmera',
  //     chooseFromLibraryButtonTitle: 'Escolher da galeria'
  //   }, async response => {
  //     if (response.didCancel) {
  //       return;
  //     } 
      
  //     if (response.error) {
  //       console.log(response.error)
  //       Alert.alert('Erro ao selecionar a imagem');
  //       return;
  //     }
  //     const source = { uri: response.uri };
  //     const uploadUri = Platform.OS === 'ios' ? source.uri.replace('file://', '') : source.uri;
  //     setImage(uploadUri);
  //   });
  // }, []);

  function handleImage({response, typeAction}) {
    // console.log('showImagePicker Response = ', response);

    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
    } else {
      const {uri} = response;

      // You can also display the image using data:
      setResizing(true);
     
      setImage(uri);
      // setImage(source);
    }
  }

  async function getImage(typeAction) {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Selecione a imagem',
      takePhotoButtonTitle: 'Tirar foto',
      chooseFromLibraryButtonTitle: 'Selecionar da galeria',
      cancelButtonTitle: 'Cancelar',
      // customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {privateDirectory: true},
    };

    if (typeAction === 'Tirar foto') {
      try {
        launchCamera(options, response => handleImage({response, typeAction}));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        launchImageLibrary(options, response =>
          handleImage({response, typeAction}),
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  return loading ? (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  ) : (
    <Container>
      <Header actionProfile={() => props.navigation.navigate('Profile')}  toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
      <ScrollView style={{ flex: 1 }} 
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      removeClippedSubviews={false}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="description"
              icon="edit"
              multiline={false}
              selectTextOnFocus={true}
              placeholder="Descrição do produto"
            />
            <Input
              name="link"
              icon="link"
              selectTextOnFocus={true}
              placeholder="Link do anúncio"
            />
            <Input
              name="info"
              icon="edit"
              multiline={true}
              selectTextOnFocus={true}
              placeholder="Mais detalhes do produto"
            />
            <SelectPicture onPress={() => setModalMediaVisible(true)}>
              Selecionar uma foto
            </SelectPicture>
            <Button onPress={() => {formRef.current?.submitForm()}}>Salvar</Button>
          </Form>
        </Content>
        </KeyboardAvoidingView>
        <ModalSelection
          animationType="fade"
          visible={modalMediaVisible}
          transparent
          callback={data => {
            setModalMediaVisible(false);

            if (data) {
              requestAnimationFrame(() => {
                getImage(data);
              });
            }
          }}>
          <ModalContainer>
            <ModalCard>
              <ModalTitle>Selecione uma imagem</ModalTitle>
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
      </ScrollView>
    </Container>
  )
}

export default Product;