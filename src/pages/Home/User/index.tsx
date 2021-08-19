import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Image,TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import { map } from 'lodash';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native'

import Header from '../../../componentes/Header';
import { useAuth } from '../../../hooks/auth';

import { 
  Container, 
  Gradient, 
  Content, 
  Button, 
  TextValues, 
  TextStyled, 
  TextStyledMargin,
   Row, 
   ViewSeeMore,} from './styles';
import Item from './Item';
import { fonts, colors } from '../../../styles'


import logoImg from '../../../assets/cyb-logo-maior.png';

const User: React.FC = (props) => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
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
    setLoading(false);
  }, [user]);

  useEffect(() => {
    getExams();
  }, [getExams])

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getExams();
    setRefreshing(false);
  }, [getExams])

  return loading ? (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  ) : (
    <Container>
      <Header actionProfile={() => navigation.navigate('Profile')} toggleDrawer={() => navigation.navigate('Settings')} />
      <Content>
        <Image style={{ width: 80, height: 80 }}  source={logoImg}/>

        <Button onPress={() => navigation.navigate('UploadPictureTwo')}>
          <Gradient
            colors={[colors.primary,colors.secondary ]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}>
            <TextValues>Fazer exame</TextValues>
          </Gradient>
        </Button>
        <Button onPress={() => navigation.navigate('ExamsUser')}>
          <Gradient
            colors={[colors.primary,colors.secondary ]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}>
            <TextValues>Exames realizados</TextValues>
          </Gradient>
        </Button>
        <ViewSeeMore>
          <TouchableOpacity onPress={() => navigation.navigate('WebView', 
            { url: 'https://testeseuhalito.com.br' })}
            >
            <TextStyled>SAIBA MAIS SOBRE CYB</TextStyled>
          </TouchableOpacity> 
        
          <Row>
            <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
              <TextStyled>NOVIDADES</TextStyled>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MessagesUser')}>
              <TextStyledMargin>MENSAGENS</TextStyledMargin>
            </TouchableOpacity>
          </Row>
        </ViewSeeMore>
      {/* {exams && exams.length ? (
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
      ) : (
        <Text style={{
          color: 'white',
          fontSize: 17,
          textAlign: 'center'
        }}>Sem exames com diagnostico</Text>
      )} */}
      </Content>
    </Container>
  );
}

export default User