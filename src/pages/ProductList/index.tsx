import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';

import { 
  Container,
  Content,
  FlatListStyled
} from './styles';
import Header from '../../componentes/Header';

import Item from './Item';

const ProductList: React.FC = (props: any) => {

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

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

  return loading ? (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  ) : (
    <Container>
      <Header toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
      <Content>
        <RefreshControl onRefresh={handleRefresh} style={{ flex: 1 }} refreshing={refreshing}>
          <FlatListStyled
            data={products}
            renderItem={({ item }: any) => (
              <Item
                item={item}
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