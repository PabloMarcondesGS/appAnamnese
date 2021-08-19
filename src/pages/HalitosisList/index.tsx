import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, View, RefreshControl } from 'react-native';
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

const HalitosisList: React.FC = (props: any) => {

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [halitosis, setHalitosis] = useState([]);

  const getData = useCallback(async () => {
    setLoading(true);
    database()
      .ref(`halitosis`)
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
        setHalitosis(sortedData);
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
        <TouchableOpacity onPress={() => props.navigation.navigate('Halitosis')}>
          <Text>Adicionar halitose</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <RefreshControl onRefresh={handleRefresh} style={{ flex: 1, width: '100%' }} refreshing={refreshing}>
            <FlatListStyled
              data={halitosis}
              renderItem={({ item }: any) => (
                <Item
                  item={item}
                  handleRefresh={handleRefresh}
                />
              )}
              keyExtractor={item => item.id}
            />
          </RefreshControl>
        </View>
      </Content>
    </Container>
  )
}

export default HalitosisList;