import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
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
        const studentiesData = map(snapshot.val(), x => x);
        const sortedData = 
          studentiesData.sort(function (a, b) {
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
    setLoading(true);
    getData();
    setLoading(false);
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
        <FlatListStyled
          data={products}
          renderItem={({ item }: any) => (
            <Item
              item={item}
            />
          )}
          keyExtractor={item => item.id}
        />
      </Content>
    </Container>
  )
}

export default ProductList;