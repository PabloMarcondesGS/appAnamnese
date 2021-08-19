import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';
import { View } from 'react-native';

import Header from '../../componentes/Header';
import { useAuth } from '../../hooks/auth';

import { Container, FlatListStyled, Content, 
  TouchableOpacity,
  Text } from './styles';
import Item from './Item';

const User: React.FC = (props) => {
  const { user } = useAuth();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exams, setUsers] = useState<any[]>([]);

  const getUsers = useCallback(() => {
    async function getData() {
      setLoading(true);
      database()
        .ref(`/users`)
        .once('value', snapshot => {
          const userData = map(snapshot.val(), x => x);
          const usersD = userData.filter(u => u.id !== user.uid && u.medic);
          setUsers(usersD);
          setLoading(false);
        })
    }
    getData();
  }, [user]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getUsers();
    setRefreshing(false);
  }, [getUsers])

  useEffect(() => {
    getUsers();
  }, [getUsers])

  return loading ? (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#005a72" />
    </View>
  ) : (
    <Container>
      <Header actionProfile={() => props.navigation.navigate('Profile')}  toggleDrawer={props.navigation.toggleDrawer} />
      <Content>
      <TouchableOpacity onPress={() => props.navigation.navigate('MedicAdd')}>
          <Text>Adicionar CYB</Text>
      </TouchableOpacity>
        <RefreshControl onRefresh={handleRefresh} style={{ flex: 1 }} refreshing={refreshing}>
      {exams && exams.length ? (
          <FlatListStyled
            data={exams && exams.length ? exams : []}
            renderItem={({ item }) => (
              <Item
                item={item}
              />
            )}
            keyExtractor={item => item.id}
          />
      ) : (
        <Text style={{
          color: 'white',
          fontSize: 17,
          textAlign: 'center'
        }}>Sem exames com diagnostico</Text>
      )}
      </RefreshControl>
      </Content>
    </Container>
  );
}

export default User