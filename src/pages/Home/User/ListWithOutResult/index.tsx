import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, RefreshControl, Text } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';

import { Container, FlatListStyled, Content, TextStyled } from './styles';
import Item from './Item';
import { useAuth } from '../../../../hooks/auth';
import Header from '../../../../componentes/Header';

const Home: React.FC = (props) => {

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [exams, setExams] = useState<any[]>([]);
    const { user } = useAuth();

    const getExams = useCallback(() => {
      async function getData() {
        setLoading(true);
        database()
          .ref(`/exams`)
          .once('value', snapshot => {
            const examsData = map(snapshot.val(), x => x);
            let newExams: any[] = [];
            examsData.map(ex => {
              if (ex.user === user.uid && ex.active) {
              const day  = ex.date.split("/")[0];
                const month  = ex.date.split("/")[1];
                const year  = ex.date.split("/")[2];
                const newDate = new Date(year, month, day);
                const examData = {
                  ...ex,
                  date: newDate
                }
                if (ex.active) {
                  newExams.push(examData);
                }
              }
            })
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
    }, []);

    const handleRefresh = useCallback(() => {
      setRefreshing(true);
      getExams();
      setRefreshing(false);
    }, [getExams])

    useEffect(() => {
      getExams();
    }, [getExams])

    return loading ? (
      <Container style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    ) : (
      <Container>
        <Header isHeader={false} actionProfile={() => props.navigation.navigate('Profile')}  toggleDrawer={props.navigation.goBack} />
        
        <Content>
          {exams.length === 0 ? (
            <TextStyled style={{
              color: 'white'
              
            }}>Sem exames para analise no momento</TextStyled>
          ) : (
            <RefreshControl onRefresh={handleRefresh} style={{ flex: 1 }} refreshing={refreshing}>
              <FlatListStyled
                data={exams && exams.length ? exams : []}
                renderItem={({ item }) => (
                  <Item
                    item={item}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </RefreshControl>
          )}
        </Content>
      </Container>
    );
};

export default Home;
