import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { map } from 'lodash';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'

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
  const navigation = useNavigation();
  const [exam, setExam] = useState();

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [level, setLevel] = useState('');
  const [products, setProducts] = useState([]);
  const [productsOne, setProductsOne] = useState<any []>([]);
  const [productOne, setProductOne] = useState('');

  const [tips, setTips] = useState([]);
  const [tipsOne, setTipsOne] = useState<any []>([]);
  const [tipOne, setTipOne] = useState('');

  const [halitosis, setHalitosis] = useState([]);
  const [halitosisOne, setHalitosisOne] = useState<any []>([]);
  const [halitosi, setHalitosi] = useState('');
  const [halitosiDescription, setHalitosiDescription] = useState('');

  useEffect(() => {
    if (halitosi) {
      const val = halitosisOne.find(hal => hal.value === halitosi)
      if (val) {
        setHalitosiDescription(val.description)
      }
    } else {
      setHalitosiDescription('')
    }
  }, [halitosisOne, halitosi])

  useEffect(() => {
    setLoading(true);
    console.log(props.route.params.item)
    if(props && props.route && props.route.params && props.route.params.item){
      setExam(props.route.params.item)
      setHalitosi(props.route.params.item.halitosis)
      setTipOne(props.route.params.item.tip ? props.route.params.item.tip : '')
      setProductOne(props.route.params.item.product ? props.route.params.item.product : '')
      if (formRef)
        formRef.current?.setData(props.route.params.item);
    }
    setLoading(false)
  }, [props, formRef])

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
    database()
      .ref(`halitosis`)
      .once('value', snapshot => {
        const halitosisData = map(snapshot.val(), x => x);
        const sortedData = 
          halitosisData.sort(function (a, b) {
            if (a.description_small > b.description_small) {
              return 1;
            }
            if (a.description_small < b.description) {
              return -1;
            }
            return 0;
          });
        setHalitosis(sortedData);
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
    setLoading(true);
    let halitosisPicker: any[] = [];
    halitosisPicker.push({ label: 'SELECIONE UM N. DE HALITOSE', value: '' })
    halitosis.map(halitosisData => {
      const newProduct = { 
        label: halitosisData.description_small, 
        value: halitosisData.id,
        description: halitosisData.description
      }
      if (!halitosisPicker.find(hal => hal.id === halitosisData.id)) {
        halitosisPicker.push(newProduct)
      }
    })
    setHalitosisOne(halitosisPicker);
    setLoading(false);
  }, [halitosis])

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
    if (!halitosiDescription) {
      Alert.alert('Erro', 'Insira o diagnóstico')
      return;
    }
    if (!halitosi) {
      Alert.alert('Erro', 'Insira o nível de halitose')
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
          diagnostic: halitosiDescription,
          halitosis: halitosi,
          tip: tipOne,
          product: productOne,
          medic: user.uid
        })
        .then(function () {
          Alert.alert('Exame concluído', 'Diagnóstico enviado com sucesso ao paciente!');
          navigation.goBack()
        });
    } catch (err) {
      setLoading(false);
    }
  }, [
    item, 
    level,
    tipOne,
    productOne,
    user,
    halitosi,
    halitosiDescription
  ])

  return loading ? (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  ) : (
    <Container>
      <Header actionProfile={() => props.navigation.navigate('Profile')}  toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Content>
          <ImageStyled source={{
            uri: image
          }} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Picker 
              data={halitosisOne} 
              icon="list"
              setValue={setHalitosi}
              value={halitosi} />
            {halitosiDescription ? (
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                name="description"
                icon="edit"
                multiline={true}
                placeholder={
                  "Descrição da halitose"
                }
                onChangeText={(e) => setHalitosiDescription(e)}
                value={halitosiDescription}
              />
            ) : null}
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
            <Button onPress={() => navigation.navigate('Questions', { id: item.user, search: true })}>
              Detalhes do paciente
            </Button>
            <Button onPress={() => {formRef.current?.submitForm()}}>
              Alterar diagnóstico
            </Button>
          </Form>
        </Content>
      </ScrollView>
    </Container>
  )
}

export default Exam;