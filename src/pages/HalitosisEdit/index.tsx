import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { 
  Container,
  Content
} from './styles';
import Header from '../../componentes/Header';
import Input from '../../componentes/InputTwo';
import Button from '../../componentes/Button';

import getValidationErrors from '../../ultils/getValidationErrors';

const Halitosis: React.FC = (props: any) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [halitosisData, setHalitosisData] = useState()

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if(props && props.route && props.route.params && props.route.params.item){
      setHalitosisData(props.route.params.item)
      formRef.current?.setData(props.route.params.item);
    }
    setLoading(false)
  }, [props, formRef])


  const handleSubmit = useCallback(async (data, { reset }) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required('Descrição obrigatória'),
        description_small: Yup.string().required('Nível obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      database().ref(`halitosis`).child(halitosisData.id).update({
        ...data,
      }).then(function () {
        setLoading(false);
        setHalitosisData({
          description_small: data.description_small, 
          description: data.description
        })
        Alert.alert(
          'Atualizado com sucesso',
          'Halitose atualizada com sucesso'
        );
        navigation.navigate('HalitosisList', {update: true})
      });
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
  }, [halitosisData]);

  return loading ? (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
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
              placeholder="Nível da halitose"
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="description"
              icon="edit"
              multiline={true}
              placeholder="Descrição completa da halitose"
            />
            <Button onPress={() => {formRef.current?.submitForm()}}>Atualizar</Button>
          </Form>
        </Content>
      </ScrollView>
    </Container>
  )
}

export default Halitosis;