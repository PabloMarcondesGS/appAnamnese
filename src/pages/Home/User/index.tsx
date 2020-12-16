import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';
import { View, Text } from 'react-native';

import Header from '../../../componentes/Header';
import { useAuth } from '../../../hooks/auth';

import { Container, FlatListStyled, Content } from './styles';
import Item from './Item';

const User: React.FC = (props) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState<any[]>([]);

  const getExams = useCallback(() => {
    
    async function getData() {
      setLoading(true);
      database()
        .ref(`/exams`)
        .once('value', snapshot => {
          const examsData = map(snapshot.val(), x => x);
          let newExams: any[] = [];
          examsData.map(ex => {
            if (ex.user === user.uid) {
              const day  = ex.date.split("/")[0];
              const month  = ex.date.split("/")[1];
              const year  = ex.date.split("/")[2];
              const newDate = new Date(year, month, day);
              const examData = {
                ...ex,
                date: newDate
              }
              newExams.push(examData);
            }
          })
          console.log(newExams)
          const sortedData = 
            newExams.sort(function (a, b) {
              if (a.date > b.date) {
                return 1;
              }
              if (a.date < b.date) {
                return -1;
              }
              return 0;
            });
          setExams(sortedData);
          setLoading(false);
        })
    }
    getData();
  }, [user]);

  useEffect(() => {
    getExams();
  }, [getExams])

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