import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { map } from 'lodash';
import { format } from 'date-fns';

import { 
  Container,
  ImageStyled,
  Content
} from './styles';
import Header from '../../componentes/Header';
import Input from '../../componentes/Input';
import Picker from '../../componentes/Picker';
import Button from '../../componentes/Button';
import { useAuth } from '../../hooks/auth';

const Exam: React.FC = (props: any) => {
  const { user } = useAuth();
  const { item } = props.route.params;
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [level, setLevel] = useState('');
  const [products, setProducts] = useState([]);
  const [productsOne, setProductsOne] = useState<any []>([]);
  const [productOne, setProductOne] = useState('');

  const [tips, setTips] = useState([]);
  const [tipsOne, setTipsOne] = useState<any []>([]);
  const [tipOne, setTipOne] = useState('');

  const DATA = [
    {label: 'NÍVEL DE ALITOSE', value: ''},
    {label: 'Nível 1', value: 'Nível 1'},
    {label: 'Nível 2', value: 'Nível 2'},
    {label: 'Nível 3', value: 'Nível 3'},
    {label: 'Nível 4', value: 'Nível 4'},
  ]

  const getData = useCallback(async () => {
    setLoading(true);
    database()
      .ref(`products`)
      .once('value', snapshot => {
        const productsData = map(snapshot.val(), x => x);
        const sortedData = 
          productsData.sort(function (a, b) {
            if (a.description > b.description) {
              return 1;
            }
            if (a.description < b.description) {
              return -1;
            }
            return 0;
          });
        setProducts(sortedData);
        setLoading(false);
      })
    database()
      .ref(`tips`)
      .once('value', snapshot => {
        const tipsData = map(snapshot.val(), x => x);
        const sortedData = 
          tipsData.sort(function (a, b) {
            if (a.description > b.description) {
              return 1;
            }
            if (a.description < b.description) {
              return -1;
            }
            return 0;
          });
        setTips(sortedData);
        setLoading(false);
      })
  }, [])

  useEffect(() => {
    setLoading(true);
    let productsPickerOne: any[] = [];
    productsPickerOne.push({ label: 'SELECIONE UM PRODUTO', value: '' })
    products.map(productData => {
      const newProduct = { label: productData.description, value: productData.id }
      if (!productsPickerOne.find(prod => prod.id === productData.id)) {
        productsPickerOne.push(newProduct)
      }
    })
    setProductsOne(productsPickerOne);
    setLoading(false);
  }, [products])

  useEffect(() => {
    setLoading(true);
    let tipsPickerOne: any[] = [];
    tipsPickerOne.push({ label: 'SELECIONE UMA DICA', value: '' })
    tips.map(tipData => {
      const newTip = { label: tipData.description_small, value: tipData.id }
      if (!tipsPickerOne.find(prod => prod.id === tipData.id)) {
        tipsPickerOne.push(newTip)
      }
    })
    setTipsOne(tipsPickerOne);
    setLoading(false);
  }, [tips])

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (item) {
      const pathReference = storage().ref(item.image);
      pathReference.getDownloadURL().then(function(url) {
        setImage(url)
        setLoading(false);
      }).catch(function () {
        setLoading(false)
      });
    }
  }, [item])

  const handleSubmit = useCallback((data, { reset }) => {
    if (!data.description) {
      Alert.alert('Erro', 'Insira o diagnóstico')
      return;
    }
    if (!level) {
      Alert.alert('Erro', 'Insira o nível de halitose')
      return;
    }
    if (!tipOne) {
      Alert.alert('Erro', 'Insira pelo menos uma dica')
      return;
    }
    if (!productOne) {
      Alert.alert('Erro', 'Insira pelo menos um produto')
      return;
    }
    try {
      const date = format(new Date(), 'dd/MM/yyyy');
      database()
        .ref(`exams`)
        .child(item.id)
        .update({ 
          active: false,
          result: true,
          dateResult: date,
          diagnostic: data.description,
          level,
          tip: tipOne,
          product: productOne,
          medic: user.uid
        })
        .then(function () {
          Alert.alert('Exame concluído', 'Diagnóstico enviado com sucesso ao paciente!')
        });
    } catch (err) {
      console.log(err)
      setLoading(false);
    }
  }, [
    item, 
    level,
    tipOne,
    productOne,
    user
  ])

  return loading ? (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  ) : (
    <Container>
      <Header toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Content>
          <ImageStyled source={{
            uri: image
          }} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Picker 
              data={DATA} 
              icon="list"
              setValue={setLevel}
              value={level} />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="description"
              icon="edit"
              multiline={true}
              placeholder="Descrição do diagnóstico"
            />
            <Picker 
              data={tipsOne} 
              icon="list"
              setValue={setTipOne}
              value={tipOne} />
            <Picker 
              data={productsOne} 
              icon="list"
              setValue={setProductOne}
              value={productOne} />
            <Button onPress={() => {formRef.current?.submitForm();}}>
              Enviar diagnóstico
            </Button>
          </Form>
        </Content>
      </ScrollView>
    </Container>
  )
}

export default Exam;