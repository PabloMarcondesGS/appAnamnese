import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';
import { View, Text } from 'react-native';

import Header from '../../componentes/Header';
import { useAuth } from '../../hooks/auth';

import { Container, FlatListStyled, Content } from './styles';
import Item from './Item';

const User: React.FC = (props) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [exams, setUsers] = useState<any[]>([]);

  const getUsers = useCallback(() => {
    async function getData() {
      setLoading(true);
      database()
        .ref(`/users`)
        .once('value', snapshot => {
          const userData = map(snapshot.val(), x => x);
          const usersD = userData.filter(u => u.id !== user.uid);
          setUsers(usersD);
          setLoading(false);
        })
    }
    getData();
  }, [user]);

  useEffect(() => {
    getUsers();
  }, [getUsers])

  return loading ? (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : (
    <Container>
      <Header toggleDrawer={props.navigation.toggleDrawer} />
      <Content>
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
      </Content>
    </Container>
  );
}

export default User