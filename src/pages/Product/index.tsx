import React, { useState, useRef, useCallback } from 'react';
import { ActivityIndicator, ScrollView, Alert, Platform } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import database from '@react-native-firebase/database';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import { 
  Container,
  Content,
  SelectPicture,
} from './styles';
import Header from '../../componentes/Header';
import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import getValidationErrors from '../../ultils/getValidationErrors';

const Product: React.FC = (props: any) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  const handleSubmit = useCallback(async (data, { reset }) => {
    if (!image) {
      Alert.alert('Erro', 'Selecione uma imagem');
      return;
    }
    try {
      setLoading(true);
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required('Descrição obrigatória'),
        link: Yup.string().required('Link obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      
      const task = storage()
        .ref(`images/products`)
        .child(`${new Date()}`)
        .putFile(image)
        .then(snapshot => {
          database().ref(`products`).push({
            ...data,
            image: snapshot.metadata.fullPath,
          }).then(function (value) {
            database()
              .ref(`products`)
              .child(String(value).split('/')[4])
              .update({ id: String(value).split('/')[4] });
            setLoading(false);
            Alert.alert(
              'Cadastrado com sucesso',
              'Produto cadastrado com sucesso'
            );
            reset();
          });
        });
      try {
        await task;
      } catch (e) {
        Alert.alert('Erro ao enviar a imagem');
        return;
      }
    } catch (err) {
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
  }, [image]);

  const handleUpdatePicture = useCallback(async () => {
    ImagePicker.showImagePicker({
      title: 'Selecione uma imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar câmera',
      chooseFromLibraryButtonTitle: 'Escolher da galeria'
    }, async response => {
      if (response.didCancel) {
        return;
      } 
      
      if (response.error) {
        console.log(response.error)
        Alert.alert('Erro ao selecionar a imagem');
        return;
      }
      const source = { uri: response.uri };
      const uploadUri = Platform.OS === 'ios' ? source.uri.replace('file://', '') : source.uri;
      setImage(uploadUri);
    });
  }, []);

  return loading ? (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  ) : (
    <Container>
      <Header toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="description"
              icon="edit"
              multiline={false}
              placeholder="Descrição do produto"
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="link"
              icon="link"
              placeholder="Link do anúncio"
            />
            <SelectPicture onPress={handleUpdatePicture}>
              Selecionar uma foto
            </SelectPicture>
            <Button onPress={() => {formRef.current?.submitForm()}}>Cadastrar</Button>
          </Form>
        </Content>
      </ScrollView>
    </Container>
  )
}

export default Product;