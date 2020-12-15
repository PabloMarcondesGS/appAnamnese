import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { map } from 'lodash';

import { 
  Container,
  ImageStyled,
  Content
} from './styles';
import Header from '../../componentes/Header';
import Input from '../../componentes/Input';
import Picker from '../../componentes/Picker';
import Button from '../../componentes/Button';

const Exam: React.FC = (props: any) => {
  const { item } = props.route.params;
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [level, setLevel] = useState('');
  const [products, setProducts] = useState([]);
  const [productsOne, setProductsOne] = useState<any []>([]);
  const [productOne, setProductOne] = useState('');
  const [productsTwo, setProductsTwo] = useState<any []>([]);
  const [productTwo, setProductTwo] = useState('');
  const [productsThree, setProductsThree] = useState<any []>([]);
  const [productThree, setProductThree] = useState('');

  const [tips, setTips] = useState([]);
  const [tipsOne, setTipsOne] = useState<any []>([]);
  const [tipOne, setTipOne] = useState('');
  const [tipsTwo, setTipsTwo] = useState<any []>([]);
  const [tipTwo, setTipTwo] = useState('');
  const [tipsThree, setTipsThree] = useState<any []>([]);
  const [tipThree, setTipThree] = useState('');

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
    let productsPickerTwo: any[] = [];
    let productsPickerThree: any[] = [];
    productsPickerOne.push({ label: 'SELECIONE UM PRODUTO', value: '' })
    productsPickerTwo.push({ label: 'SELECIONE UM PRODUTO', value: '' })
    productsPickerThree.push({ label: 'SELECIONE UM PRODUTO', value: '' })
    products.map(productData => {
      const newProduct = { label: productData.description, value: productData.id }
      if (!productsPickerOne.find(prod => prod.id === productData.id)) {
        productsPickerOne.push(newProduct)
      }
      if (!productsPickerTwo.find(prod => prod.id === productData.id)) {
        productsPickerTwo.push(newProduct)
      }
      if (!productsPickerThree.find(prod => prod.id === productData.id)) {
        productsPickerThree.push(newProduct)
      }
    })
    setProductsOne(productsPickerOne);
    setProductsTwo(productsPickerTwo);
    setProductsThree(productsPickerThree);
    setLoading(false);
  }, [products])

  useEffect(() => {
    setLoading(true);
    let tipsPickerOne: any[] = [];
    let tipsPickerTwo: any[] = [];
    let tipsPickerThree: any[] = [];
    tipsPickerOne.push({ label: 'SELECIONE UMA DICA', value: '' })
    tipsPickerTwo.push({ label: 'SELECIONE UMA DICA', value: '' })
    tipsPickerThree.push({ label: 'SELECIONE UMA DICA', value: '' })
    tips.map(tipData => {
      const newTip = { label: tipData.description, value: tipData.id }
      if (!tipsPickerOne.find(prod => prod.id === tipData.id)) {
        tipsPickerOne.push(newTip)
      }
      if (!tipsPickerTwo.find(prod => prod.id === tipData.id)) {
        tipsPickerTwo.push(newTip)
      }
      if (!tipsPickerThree.find(prod => prod.id === tipData.id)) {
        tipsPickerThree.push(newTip)
      }
    })
    setTipsOne(tipsPickerOne);
    setTipsTwo(tipsPickerTwo);
    setTipsThree(tipsPickerThree);
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
          <Form ref={formRef} onSubmit={() => {}}>
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
              data={tipsTwo} 
              icon="list"
              setValue={setTipTwo}
              value={tipTwo} />
            <Picker 
              data={tipsThree} 
              icon="list"
              setValue={setTipThree}
              value={tipThree} />
            <Picker 
              data={productsOne} 
              icon="list"
              setValue={setProductOne}
              value={productOne} />
            <Picker 
              data={productsTwo} 
              icon="list"
              setValue={setProductTwo}
              value={productTwo} />
            <Picker 
              data={productsThree} 
              icon="list"
              setValue={setProductThree}
              value={productThree} />
            <Button onPress={() => {formRef.current?.submitForm();}}>Entrar</Button>
          </Form>
        </Content>
      </ScrollView>
    </Container>
  )
}

export default Exam;