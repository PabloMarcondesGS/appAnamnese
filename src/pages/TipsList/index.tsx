import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, View, RefreshControl } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';

import { 
  Container,
  Content,
  FlatListStyled,
  Text,
  TouchableOpacity
} from './styles';
import Header from '../../componentes/Header';

import Item from './Item';

const TipsList: React.FC = (props: any) => {

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tips, setTips] = useState([]);
  const [tipsSelected, setTipsSelected] = useState([]);

  const handleDelete = useCallback(() => {
    for (const item of tipsSelected) {
      database().ref().child('tips').child(item.id).remove();
    }
    handleRefresh()
  }, [tipsSelected])

  const getData = useCallback(async () => {
    setLoading(true);
    database()
      .ref(`tips`)
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
        setTips(sortedData);
        setLoading(false);
      })
  }, [])


  useEffect(() => {
    getData();
  }, [getData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setTipsSelected([])
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
      <View style={{ flex: 1, alignItems: 'center' }}>
          <RefreshControl onRefresh={handleRefresh} style={{ flex: 1 }} refreshing={refreshing}>
        <TouchableOpacity style={{ marginBottom: 0 }} onPress={() => props.navigation.navigate('Tips')}>
          <Text>Adicionar dica</Text>
        </TouchableOpacity>
        {tipsSelected && tipsSelected.length ? (
          <TouchableOpacity onPress={handleDelete}>
            <Text style={{color: 'red'}}>Apagar selecionados</Text>
          </TouchableOpacity>
        ) : null}
         <FlatListStyled
              data={tips}
              renderItem={({ item }: any) => (
                <Item
                  item={item}
                  handleRefresh={handleRefresh}
                  setTipsSelected={setTipsSelected}
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

export default TipsList;