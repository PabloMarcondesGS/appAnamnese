import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
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
  ButtonSeeAllText
} from './styles';
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
          <Title>Resultado</Title>
          <SubTitle>
            {format(item.date, 'dd/MM/yyyy')} - Halitose {item.level}
          </SubTitle>
          <Description>{item.diagnostic}</Description>
          <Title>Dica</Title>
          <Description>{tip && tip.description ? tip.description : ''}</Description>
          <Product>
            <ImageStyledProduct source={{
              uri: imageProduct
            }} />
            <TitleViewProduct>
              <SubTitleProduct>
                {product && product.description ? product.description : ''}
              </SubTitleProduct>
              <ButtonProductMore onPress={() => navigation.navigate('WebView', 
                { url: product.link })}
              >
                <SubTitleProductButton>
                  Mais detalhes
                </SubTitleProductButton>
              </ButtonProductMore>
            </TitleViewProduct>
          </Product>
          <ButtonSeeAll>
            <ButtonSeeAllText>
              CONHECER TODOS OS PRODUTOS PARA RESOLVER A HÁLITOSE
            </ButtonSeeAllText>
          </ButtonSeeAll>
        </Content>
      </ScrollView>
    </Container>
  )
}

export default ExamResult;