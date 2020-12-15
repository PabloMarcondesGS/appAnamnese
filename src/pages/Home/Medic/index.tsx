import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';

import { Container, FlatListStyled, Content } from './styles';
import Item from './Item';
import Header from '../../../componentes/Header';

const Home: React.FC = (props) => {
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

    useEffect(() => {
      getExams();
    }, [getExams])

    return loading ? (
      <Container style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    ) : (
       <Container>
          <Header toggleDrawer={props.navigation.toggleDrawer} />
          <Content>
            <FlatListStyled
              data={exams && exams.length ? exams : []}
              renderItem={({ item }) => (
                <Item
                  item={item}
                />
              )}
              keyExtractor={item => item.id}
            />
          </Content>
       </Container>
    );
};

export default Home;
