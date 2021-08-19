import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, View,Image,processColor, Dimensions, Alert } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';
import { useNavigation } from '@react-navigation/native'
import Svg from 'react-native-svg';
// import {
//   BarChart,
// } from "react-native-chart-kit";
import { VictoryBar, VictoryChart, VictoryLabel,Bar,
  VictoryTheme } from 'victory-native';

import { Container, Button, Gradient, TextValues, Content,ViewList,ViewBackground } from './styles';
import Item from './Item';
import Header from '../../../../componentes/Header';
import { useAuth } from '../../../../hooks/auth';
import logoImg from '../../../../assets/cyb-logo-maior.png';
import { colors } from '../../../../styles';
import { BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

const Home: React.FC = (props) => {

  const { user } = useAuth();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState<any[]>([]);
  const [dataBarC, setDataBarC] = useState<any[]>([]);
  const [examsAwait, setExamsAwait] = useState<any[]>([]);

  const getExams = useCallback(() => {
    
    async function getData() {
      setLoading(true);
      database()
        .ref(`/exams`)
        .once('value', snapshot => {
          const examsData = map(snapshot.val(), x => x);
          let newExams: any[] = [];
          let examsAwaiting: any[] = [];
          examsData.map(ex => {
            if (ex.user === user.uid && !ex.active) {
              const day  = ex.date.split("/")[0];
              const month  = ex.date.split("/")[1];
              const year  = ex.date.split("/")[2];
              const newDate = new Date(year, month, day);
              const examData = {
                ...ex,
                date: newDate
              }
              newExams.push(examData);
            } else {
              const day  = ex.date.split("/")[0];
              const month  = ex.date.split("/")[1];
              const year  = ex.date.split("/")[2];
              const newDate = new Date(year, month, day);
              const examData = {
                ...ex,
                date: newDate
              }
              examsAwaiting.push(examData);
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
          const sortedDataTwo = 
            examsAwaiting.sort(function (a, b) {
              if (a.date > b.date) {
                return 1;
              }
              if (a.date < b.date) {
                return -1;
              }
              return 0;
            }); 
          setExamsAwait(sortedDataTwo)
          setExams(sortedData);
          setLoading(false);
        })
    }
    setLoading(false);
    getData();
  }, [user]);

  useEffect(() => {
    getExams();
  }, [getExams])

  useEffect(() => {
    if(exams && exams.length) {
      setLoading(true)
      let i = 0
      for (const exam of exams) {
        if(exam.result){
          if(exam.halitosis){
            database()
              .ref(`halitosis/${exam.halitosis}`)
              .once('value')
              .then(snapshot => {
                if (snapshot) {
                  if(snapshot.val() && snapshot.val().description_small && snapshot.val().description_small.split(' ')) {
                    setDataBarC(state => [...state, {exam: exam, date: exam.dateResult, level: snapshot.val().description_small.split(' ')[1]}])
                  }
                }
                i++;
                const load = (i === exams.length)
                if (load === true) {
                  setLoading(false)
                }
              });
          }
        }
      }
      // if(i === exams.length) {
      //   console.log(objData)
      //   console.log(i === exams.length)
      //   console.log(exams.length)
      //   setDataBar(data)
      // }
    }
  }, [exams])

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getExams();
    setRefreshing(false);
  }, [getExams])
  
  const handlePress = useCallback((data) => { 
    props.navigation.navigate('ExamResult', {item: dataBarC[data].exam})
  }, [dataBarC])

  return loading ? (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  ) : (
    <Container>
      <Header isHeader={false} toggleDrawer={props.navigation.goBack} />
      <Content>
        <Image style={{ width: 80, height: 80 }}  source={logoImg}/>
        
        <ScrollView
         horizontal={true}
         showsHorizontalScrollIndicator={false}>

        <Svg height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
            <VictoryChart
              // adding the material theme provided with Victory
              theme={VictoryTheme.material}
              domainPadding={20}
            >
              <VictoryBar
                data={dataBarC ? dataBarC : [{"date": "", "level": ""}]}
                x="date"
                y="level"
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
                barWidth={35}
                cornerRadius={12}
                labelComponent={
                  <VictoryLabel x={270} 
                    verticalAnchor={"start"} 
                    angle={90}
                  />
                }
                style={{
                  data: {
                    fill: colors.primary,
                    width: 25, 
                  }
                }}
                events={[
                  {
                      target: "data",
                      eventHandlers: {
                          onPressIn: (event, data, index) => {
                            handlePress(index);
                          }
                      }
                  }
               ]}
              />
            </VictoryChart>
          </Svg>
        </ScrollView>
        <Button onPress={() => navigation.navigate('ListWithOutResult')}>
          <Gradient
            colors={[colors.primary,colors.secondary ]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}>
            <TextValues>Exames sem resultado</TextValues>
          </Gradient>
        </Button>
      </Content>
    </Container>
  );
};


export default Home;
