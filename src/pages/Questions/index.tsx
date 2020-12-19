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

const Questions: React.FC = (props: any) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [isAnsered, setIsAnsered] = useState(false);

  const [checkedOneYes, setCheckedOneYes] = useState(true);
  const [checkedOneNo, setCheckedOneNo] = useState(false);
  const [checkedTwoYes, setCheckedTwoYes] = useState(true);
  const [checkedTwoNo, setCheckedTwoNo] = useState(false);
  const [checkedThreeYes, setCheckedThreeYes] = useState(true);
  const [checkedThreeNo, setCheckedThreeNo] = useState(false);
  const [checkedFourYes, setCheckedFourYes] = useState(true);
  const [checkedFourNo, setCheckedFourNo] = useState(false);
  const [checkedFiveYes, setCheckedFiveYes] = useState(true);
  const [checkedFiveNo, setCheckedFiveNo] = useState(false);
  const [checkedSixYes, setCheckedSixYes] = useState(true);
  const [checkedSixNo, setCheckedSixNo] = useState(false);
  const [checkedSevenYes, setCheckedSevenYes] = useState(true);
  const [checkedSevenNo, setCheckedSevenNo] = useState(false);

  const handleSubmit = useCallback(() => {
    const date = format(new Date(), 'dd/MM/yyyy')
    database().ref(`questions`).push({
      questionOne: checkedOneYes ? true : false,
      questionTwo: checkedTwoYes ? true : false,
      questionThree: checkedThreeYes ? true : false,
      questionFour: checkedFourYes ? true : false,
      questionFive: checkedFiveYes ? true : false,
      questionSix: checkedSixYes ? true : false,
      questionSeven: checkedSevenYes ? true : false,
      date,
      user: user.uid
    });
    setIsAnsered(true);
  }, [
    user,
    checkedOneYes, 
    checkedTwoYes, 
    checkedThreeYes,
    checkedFourYes,
    checkedFiveYes,
    checkedSixYes,
    checkedSevenYes
  ]);


  const getData = useCallback(async () => {
    setLoading(true);
    database()
      .ref(`questions`)
      .once('value', snapshot => {
        const questionsData = map(snapshot.val(), x => x);
        if (questionsData.find(question => user.uid === question.user)) {
          setIsAnsered(true)
        }
        setLoading(false);
      })
    setLoading(false);
  }, [user.uid])

  useEffect(() => {
    getData();
  }, [getData]);

  return loading ? (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#999" />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <Header toggleDrawer={props.navigation.toggleDrawer} />
      <Container>
        {isAnsered ? (
          <ViewContainer>
            <Card style={{ marginBottom: 16 }}>
              <Card.Content>
                <Title>Você já preencheu o formulário</Title>
                <Card style={{ maxHeight: 140, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Você tem boca seca?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedOneYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>
                <Card style={{ maxHeight: 140, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Você respira pela boca?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedTwoYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 170, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Você sente frequentemente um gosto ruim na boca?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedThreeYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 180, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Você já consultou um especialista sobre isso?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedFourYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 150, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Você costuma escovar a lingua?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedFiveYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 180, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Você costuma se afastar das pessoas por isso?</Paragraph>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Title>{checkedSixYes ? 'Sim' : 'Não'}</Title>
                    </View>
                  </Card.Content>
                </Card>

                <Card style={{ maxHeight: 180, marginBottom: 16 }}>
                  <Card.Content>
                    <Paragraph>Você acha seu mal halito forte?</Paragraph>
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
        ) : (
          <ViewContainer>
            <TitleStyled>Agora vamos conhecer um pouquinho sobre você</TitleStyled>
            <Card style={{ maxHeight: 140, marginBottom: 16 }}>
              <Card.Content>
                <Title>Você tem boca seca?</Title>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Sim</Paragraph>
                  <Checkbox
                    status={checkedOneYes ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedOneYes(!checkedOneYes);
                      setCheckedOneNo(checkedOneYes ? true : false);
                    }}
                  />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Não</Paragraph>
                  <Checkbox
                    status={checkedOneNo ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedOneNo(!checkedOneNo);
                      setCheckedOneYes(checkedOneNo ? true : false);
                    }}
                  />
                </View>
              </Card.Content>
            </Card>
            <Card style={{ maxHeight: 140, marginBottom: 16 }}>
              <Card.Content>
                <Title>Você respira pela boca?</Title>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Sim</Paragraph>
                  <Checkbox
                    status={checkedTwoYes ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedTwoYes(!checkedTwoYes);
                      setCheckedTwoNo(checkedTwoYes ? true : false);
                    }}
                  />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Não</Paragraph>
                  <Checkbox
                    status={checkedTwoNo ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedTwoNo(!checkedTwoNo);
                      setCheckedTwoYes(checkedTwoNo ? true : false);
                    }}
                  />
                </View>
              </Card.Content>
            </Card>

            <Card style={{ maxHeight: 170, marginBottom: 16 }}>
              <Card.Content>
                <Title>Você sente frequentemente um gosto ruim na boca?</Title>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Sim</Paragraph>
                  <Checkbox
                    status={checkedThreeYes ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedThreeYes(!checkedThreeYes);
                      setCheckedThreeNo(checkedThreeYes ? true : false);
                    }}
                  />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Não</Paragraph>
                  <Checkbox
                    status={checkedThreeNo ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedThreeNo(!checkedThreeNo);
                      setCheckedThreeYes(checkedThreeNo ? true : false);
                    }}
                  />
                </View>
              </Card.Content>
            </Card>

            <Card style={{ maxHeight: 180, marginBottom: 16 }}>
              <Card.Content>
                <Title>Você já consultou um especialista sobre isso?</Title>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Sim</Paragraph>
                  <Checkbox
                    status={checkedFourYes ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedFourYes(!checkedFourYes);
                      setCheckedFourNo(checkedFourYes ? true : false);
                    }}
                  />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Não</Paragraph>
                  <Checkbox
                    status={checkedFourNo ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedFourNo(!checkedFourNo);
                      setCheckedFourYes(checkedFourNo ? true : false);
                    }}
                  />
                </View>
              </Card.Content>
            </Card>

            <Card style={{ maxHeight: 150, marginBottom: 16 }}>
              <Card.Content>
                <Title>Você costuma escovar a lingua?</Title>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Sim</Paragraph>
                  <Checkbox
                    status={checkedFiveYes ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedFiveYes(!checkedFiveYes);
                      setCheckedFiveNo(checkedFiveYes ? true : false);
                    }}
                  />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Não</Paragraph>
                  <Checkbox
                    status={checkedFiveNo ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedFiveNo(!checkedFiveNo);
                      setCheckedFiveYes(checkedFiveNo ? true : false);
                    }}
                  />
                </View>
              </Card.Content>
            </Card>

            <Card style={{ maxHeight: 180, marginBottom: 16 }}>
              <Card.Content>
                <Title>Você costuma se afastar das pessoas por isso?</Title>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Sim</Paragraph>
                  <Checkbox
                    status={checkedSixYes ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedSixYes(!checkedSixYes);
                      setCheckedSixNo(checkedSixYes ? true : false);
                    }}
                  />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Não</Paragraph>
                  <Checkbox
                    status={checkedSixNo ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedSixNo(!checkedSixNo);
                      setCheckedSixYes(checkedSixNo ? true : false);
                    }}
                  />
                </View>
              </Card.Content>
            </Card>

            <Card style={{ maxHeight: 180, marginBottom: 16 }}>
              <Card.Content>
                <Title>Você acha seu mal halito forte?</Title>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Sim</Paragraph>
                  <Checkbox
                    status={checkedSevenYes ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedSevenYes(!checkedSevenYes);
                      setCheckedSevenNo(checkedSevenYes ? true : false);
                    }}
                  />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Paragraph>Não</Paragraph>
                  <Checkbox
                    status={checkedSevenNo ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckedSevenNo(!checkedSevenNo);
                      setCheckedSevenYes(checkedSevenNo ? true : false);
                    }}
                  />
                </View>
              </Card.Content>
            </Card>

            
            <View style={{ marginBottom: 120 }}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonStyle}
              >
                <TextStyled style={styles.textButtonStyle}>Salvar</TextStyled>
              </TouchableOpacity>
            </View>
          </ViewContainer>
        )}
      </Container>
    </View>
  );
};

export default Questions;
