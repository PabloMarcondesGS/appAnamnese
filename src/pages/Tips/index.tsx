import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import database from '@react-native-firebase/database';
import * as Yup from 'yup';

import { 
  Container,
  Content
} from './styles';
import Header from '../../componentes/Header';
import Input from '../../componentes/InputTwo';
import Button from '../../componentes/Button';
import {colors} from '../../styles';

import getValidationErrors from '../../ultils/getValidationErrors';

const Tips: React.FC = (props: any) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState()
  const handleSubmit = useCallback(async (data, { reset }) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required('Descrição obrigatória'),
        link: Yup.string().required('Link obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      setLoading(true);
      if (props && props.route && props.route.params && props.route.params.item) {
        try {
          database()
            .ref(`tips`)
            .child(props.route.params.item.id)
            .update(data);
          setLoading(false);
          Alert.alert(
            'Atualizado!',
            'Dica atualizada com sucesso, atualize a lista'
          );
          navigation.navigate('TipsList', {update: true})
          setItem(data);
          return;
        } catch (err) {
          setLoading(false);
          Alert.alert(
            'Erro!',
            'Tente novamente'
          );
        }
      } else {
        database().ref(`tips`).push({
          ...data
        }).then(function (value) {
          database()
            .ref(`tips`)
            .child(String(value).split('/')[4])
            .update({ id: String(value).split('/')[4] });
          setLoading(false);
          Alert.alert(
            'Cadastrado com sucesso',
            'Dica cadastrada com sucesso'
          );
          reset();
        });
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
  }, [props, formRef]);

  useEffect(() => {
    setLoading(true)
    if (props && props.route && props.route.params && props.route.params.item) {
      formRef.current.setData(props.route.params.item);
    }
    if(item && item.id){
      formRef.current.setData(item);
    }
    setLoading(false)
  }, [formRef, props, item])

  return loading ? (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  ) : (
    <Container>
      <Header actionProfile={() => props.navigation.navigate('Profile')}  toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="description_small"
              icon="edit"
              multiline={false}
              placeholder="Descrição breve da dica"
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="description"
              icon="edit"
              multiline={true}
              placeholder="Descrição completa da dica"
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="link"
              icon="video"
              placeholder="Link do vídeo"
            />
            <Button onPress={() => {formRef.current?.submitForm()}}>
              {props && props.route && props.route.params && props.route.params.item
                ? 'Atualizar'
                : 'Cadastrar'}
            </Button>
          </Form>
        </Content>
      </ScrollView>
    </Container>
  )
}

export default Tips;