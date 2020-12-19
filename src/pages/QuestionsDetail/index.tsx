import React, { useState, useCallback, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { map } from 'lodash';

import { TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import { Container, styles, TextStyled, ViewContainer, TitleStyled } from './styles'
import { Card, Title, Paragraph, Checkbox, Button } from 'react-native-paper';
import { useAuth } from '../../hooks/auth';
import Header from '../../componentes/Header';

const QuestionsDetail: React.FC = (props: any) => {
  const user = props.route.params.id;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [isAnsered, setIsAnsered] = useState(false);

  const [checkedOneYes, setCheckedOneYes] = useState(true);
  const [checkedTwoYes, setCheckedTwoYes] = useState(true);
  const [checkedThreeYes, setCheckedThreeYes] = useState(true);
  const [checkedFourYes, setCheckedFourYes] = useState(true);
  const [checkedFiveYes, setCheckedFiveYes] = useState(true);
  const [checkedSixYes, setCheckedSixYes] = useState(true);
  const [checkedSevenYes, setCheckedSevenYes] = useState(true);


  const getData = useCallback(async () => {
    setLoading(true);
    database()
      .ref(`questions`)
      .once('value', snapshot => {
        const questionsData = map(snapshot.val(), x => x);
        const question = questionsData.find(question => user === question.user)
        if (question) {
          setIsAnsered(true)
          setCheckedOneYes(question.questionOne)
          setCheckedTwoYes(question.questionTwo)
          setCheckedThreeYes(question.questionThree)
          setCheckedFourYes(question.questionFour)
          setCheckedFiveYes(question.questionFive)
          setCheckedSixYes(question.questionSix)
          setCheckedSevenYes(question.questionSeven)
        }
        setLoading(false);
      })
    setLoading(false);
  }, [user])

  useEffect(() => {
    getData();
  }, [getData]);

  return loading ? (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#999" />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <Header toggleDrawer={() => props.navigation.goBack()}  isHeader={false}/>
      <Container>
        {isAnsered ? (
          <ViewContainer>
            <Card style={{ marginBottom: 16 }}>
              <Card.Content>
                <Card style={{ maxHeight: 140, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Paciente tem boca seca?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedOneYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>
                <Card style={{ maxHeight: 140, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Paciente respira pela boca?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedTwoYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 170, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Paciente sente frequentemente um gosto ruim na boca?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedThreeYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 180, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Paciente já consultou um especialista sobre isso?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedFourYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 150, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Paciente costuma escovar a lingua?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedFiveYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 180, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Paciente costuma se afastar das pessoas por isso?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedSixYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 180, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Paciente acha seu mal halito forte?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedSevenYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>
                <Button 
                  onPress={() => navigation.goBack()}
                  mode="contained" 
                  icon="arrow-left" 
                  style={{ 
                    marginTop: 24, 
                    backgroundColor: '#42b6d9',
                  }}>
                  Voltar
                </Button>
              </Card.Content>
            </Card>
          </ViewContainer>
        ) : <View />}
      </Container>
    </View>
  );
};

export default QuestionsDetail;
