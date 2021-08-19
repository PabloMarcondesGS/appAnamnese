import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';

import { 
  Container,
  Content,
  FlatListStyled,
  TouchableOpacity,
  Text
} from './styles';
import Header from '../../componentes/Header';

import Item from './Item';

const ProductList: React.FC = (props: any) => {

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsSelected, setProductsSelected] = useState([]);

  const handleDelete = useCallback(() => {
    for (const item of productsSelected) {
      database().ref().child('products').child(item.id).remove();
    }
    handleRefresh()
  }, [productsSelected])

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
  }, [])

  useEffect(() => {
    getData();
  }, [getData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, [getData])

  useEffect(() => {
    if (props && props.route && props.route.params && props.route.params.update && props.route.params.update === true) {
      handleRefresh()
    }
  }, [handleRefresh, props])

  return loading ? (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#005a72" />
    </Container>
  ) : (
    <Container>
      <Header actionProfile={() => props.navigation.navigate('Profile')}  toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
      <Content>
        <TouchableOpacity onPress={() => props.navigation.navigate('Product')}>
          <Text>Adicionar  produto</Text>
        </TouchableOpacity>
        {productsSelected && productsSelected.length ? (
          <TouchableOpacity onPress={handleDelete}>
            <Text style={{color: 'red'}}>Apagar selecionados</Text>
          </TouchableOpacity>
        ) : null}
        <RefreshControl onRefresh={handleRefresh} style={{ flex: 1 }} refreshing={refreshing}>
          <FlatListStyled
            data={products}
            renderItem={({ item }: any) => (
              <Item
                item={item}
                handleRefresh={handleRefresh}
                setProductsSelected={setProductsSelected}
              />
            )}
            keyExtractor={item => item.id}
          />
        </RefreshControl>
      </Content>
    </Container>
  )
}

export default ProductList;