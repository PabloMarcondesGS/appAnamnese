import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'

import { 
  Container,
  ImageStyled,
  Content,
  Title,
  SubTitle,
  Description,
  Product,
  ImageStyledProduct,
  SubTitleProduct,
  TitleViewProduct,
  SubTitleProductButton,
  ButtonProductMore,
  ButtonSeeAll,
  ButtonSeeAllText,
  ViewRound,
  Level,
  Gradient, 
  ViewText,
  TitleTwo,
  ViewTextTwo
} from './styles';
import { colors } from '../../styles'
import Header from '../../componentes/Header';

const ExamResult: React.FC = (props: any) => {
  const navigation = useNavigation();
  const { item } = props.route.params;

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [imageProduct, setImageProduct] = useState('');
  const [level, setLevel] = useState('');
  const [product, setProduct] = useState<any[]>([]);
  const [tip, setTip] = useState();
  const [halitosis, setHalitosis] = useState();

  const getData = useCallback(async () => {
    setLoading(true);
    database()
      .ref(`products/${item.product}`)
      .once('value')
      .then(async (snapshot) => {
        if (snapshot) {
          setProduct(snapshot.val())
        }
        setLoading(false);
      })
    database()
      .ref(`tips/${item.tip}`)
      .once('value')
      .then(async (snapshot) => {
        if (snapshot) {
          setTip(snapshot.val())
        }
        setLoading(false);
      })
    database()
      .ref(`halitosis/${item.halitosis}`)
      .once('value')
      .then(async (snapshot) => {
        if (snapshot) {
          setHalitosis(snapshot.val())
        }
        setLoading(false)
      })
  }, [item])

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (item) {
      setLoading(true)
      const pathReference = storage().ref(item.image);
      pathReference.getDownloadURL().then(function(url) {
        setImage(url)
        setLoading(false);
      }).catch(function () {
        setLoading(false)
      });
    }
  }, [item])

  useEffect(() => {
    if (product && product.image) {
      setLoading(true)
      const pathReference = storage().ref(product.image);
      pathReference.getDownloadURL().then(function(url) {
        setImageProduct(url)
        setLoading(false);
      }).catch(function () {
        setLoading(false)
      });
    }
  }, [product])

  useEffect(() => {
    if(halitosis && halitosis.description_small && halitosis.description_small.split(' ')) {
      setLevel(halitosis.description_small.split(' ')[1])
    }
  }, [halitosis])

  console.log(product)

  return loading ? (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  ) : (
    <Container>
      <Header actionProfile={() => props.navigation.navigate('Profile')}  toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Content>
          <Title>Resultado</Title>
          {/* <ImageStyled source={{
            uri: image
          }} /> */}
          <ViewRound>
            <Title>Nível</Title>
            <Level>{level ? level : ''}</Level>
          </ViewRound>
          <Title>
            {format(item.date, 'dd/MM/yyyy')} 
          </Title>
          <ViewText>
            <Gradient
              colors={[colors.primary,colors.secondary ]}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}>
              <TitleTwo>DIAGNÓSTICO</TitleTwo>
              <Description>{item.diagnostic}</Description>
            </Gradient>
          </ViewText>
          {/* <Description>Halitose {halitosis && halitosis.description_small ? halitosis.description_small : ''}</Description>
          <Description>Detalhes de halitose: {halitosis && halitosis.description ? halitosis.description : ''}</Description> */}
          {/* <Description>{item.diagnostic}</Description> */}
          {tip && tip.description ? (
            <>
              <Title>Dica</Title>
              <Description>{tip && tip.description ? tip.description : ''}</Description>
            </>
          ) : <View />}
          
          {product && product.description ? (
            <Product>
              <ImageStyledProduct source={{
                uri: imageProduct
              }} />
              <TitleViewProduct>
                <ViewTextTwo>
                  <Gradient
                    colors={[colors.primary,colors.secondary ]}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}>
                    <TitleTwo> {product && product.description ? product.description : ''}</TitleTwo>
                    <Description>{product && product.info ? `${product.info.slice(0, 130)}...` : ''}</Description>
                  </Gradient>
                </ViewTextTwo>
                <ButtonProductMore onPress={() => navigation.navigate('WebView', 
                  { url: product.link })}
                >
                  <SubTitleProductButton>
                     CONHEÇA MAIS PRODUTOS PARA RESOLVER A HÁLITOSE
                  </SubTitleProductButton>
                </ButtonProductMore>
              </TitleViewProduct>
            </Product>
          ) : <View/>}
        </Content>
      </ScrollView>
    </Container>
  )
}

export default ExamResult;