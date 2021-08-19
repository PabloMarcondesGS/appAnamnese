import React, { useState, useCallback, useEffect } from 'react';
import { View, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { map } from 'lodash';

import { useAuth } from '../../hooks/auth';
// import Icon from 'react-native-vector-icons/Feather';
import { Container, styles, TextStyled, 
  ViewContainer, CardStyled, Title, ViewOption, TextStyledOption } from './styles'
import { Card, Paragraph, Checkbox, Switch } from 'react-native-paper';
import Button from '../../componentes/Button';

import logoImg from '../../assets/cyb-logo-maior.png';
import Header from '../../componentes/Header';

const Questions: React.FC = (props: any) => {
  const userId = props.route.params.item
  const {email, password} = props.route.params
  const { signIn, user } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [isAnsered, setIsAnsered] = useState(false);

  const [checkedOneYes, setCheckedOneYes] = useState(false);
  const [checkedTwoYes, setCheckedTwoYes] = useState(false);
  const [checkedThreeYes, setCheckedThreeYes] = useState(false);
  const [checkedFourYes, setCheckedFourYes] = useState(false);
  const [checkedFiveYes, setCheckedFiveYes] = useState(false);
  const [checkedSixYes, setCheckedSixYes] = useState(false);
  const [checkedSevenYes, setCheckedSevenYes] = useState(false);
  const [question, setQuestion] = useState()

  const handleSubmit = useCallback(async () => {
    const date = format(new Date(), 'dd/MM/yyyy')
   
    if(props && props.route && props.route.params && props.route.params.search){
      try {
        if(question) {
          database()
            .ref(`questions`)
            .orderByChild('user')
            .equalTo(user.uid)
            .on("value", function(snapshot) {
              snapshot.forEach(function(data) {
                console.log(data.key);
                database()
                  .ref(`questions`)
                  .child(data.key)
                  .update({
                    questionOne: checkedOneYes ? true : false,
                    questionTwo: checkedTwoYes ? true : false,
                    questionThree: checkedThreeYes ? true : false,
                    questionFour: checkedFourYes ? true : false,
                    questionFive: checkedFiveYes ? true : false,
                    questionSix: checkedSixYes ? true : false,
                    questionSeven: checkedSevenYes ? true : false,
                    date
                  });
              });
            });
            Alert.alert('Salvo com sucesso!')
        }
      }catch (err){
        console.log(err)
        Alert.alert('Erro, tente novamente!')
      }
    } else {
      database().ref(`questions`).push({
        questionOne: checkedOneYes ? true : false,
        questionTwo: checkedTwoYes ? true : false,
        questionThree: checkedThreeYes ? true : false,
        questionFour: checkedFourYes ? true : false,
        questionFive: checkedFiveYes ? true : false,
        questionSix: checkedSixYes ? true : false,
        questionSeven: checkedSevenYes ? true : false,
        date,
        user: userId
      });
      await signIn({email, password});
    }
    setIsAnsered(true);
  }, [
    props,
    userId,
    checkedOneYes, 
    checkedTwoYes, 
    checkedThreeYes,
    checkedFourYes,
    checkedFiveYes,
    checkedSixYes,
    checkedSevenYes,
    question,
    user
  ]);


  const getData = useCallback(async () => {
    setLoading(true);
    if(props && props.route && props.route.params && props.route.params.search){
      database()
        .ref(`questions`)
        .once('value', snapshot => {
          const questionsData = map(snapshot.val(), x => x);
          const question = questionsData.find(question => userId === question.user)
          if (question) {
            setIsAnsered(true)
            setIsAnsered(true)
            setCheckedOneYes(question.questionOne)
            setCheckedTwoYes(question.questionTwo)
            setCheckedThreeYes(question.questionThree)
            setCheckedFourYes(question.questionFour)
            setCheckedFiveYes(question.questionFive)
            setCheckedSixYes(question.questionSix)
            setCheckedSevenYes(question.questionSeven)
            setQuestion(question)
          }
          setLoading(false);
        })
    }
    setLoading(false);
  }, [props])

  useEffect(() => {
    getData();
  }, [getData]);

  return loading ? (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#999" />
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      {props && props.route.params && props.route.params.search ? (
        <Header isHeader={false}  actionProfile={() => navigation.navigate('ProfileEdit')}  toggleDrawer={props.navigation.goBack} />
      ) : null}
    <ScrollView
        showsVerticalScrollIndicator={false}
      >
      <Container>
        <Image style={{ width: 80, height: 80 }}  source={logoImg}/>
        <ViewContainer>
          <Title>
            {props && props.route && props.route.params && props.route.params.search 
            ? 'Detalhes do paciente' : 'Agora vamos conhecer um pouquinho sobre você'
          }</Title>
          <CardStyled>
            <TextStyled>
            {props && props.route && props.route.params && props.route.params.search 
              ? 'Paciente tem a boca seca?' : 'Você tem boca seca?'
            }</TextStyled>
              <ViewOption>
                <TextStyledOption>Não</TextStyledOption>
                <Switch value={checkedOneYes} onValueChange={() => setCheckedOneYes(!checkedOneYes)} />
                <TextStyledOption>Sim</TextStyledOption>
              </ViewOption>
          </CardStyled>
          <CardStyled>
            <TextStyled>
            {props && props.route && props.route.params && props.route.params.search 
              ? 'Paciente respira pela boca?' : 'Você respira pela boca?'
            }</TextStyled>
              <ViewOption>
                <TextStyledOption>Não</TextStyledOption>
                <Switch value={checkedTwoYes} onValueChange={() => setCheckedTwoYes(!checkedTwoYes)} />
                <TextStyledOption>Sim</TextStyledOption>
              </ViewOption>
          </CardStyled>
          <CardStyled>
            <TextStyled>
            {props && props.route && props.route.params && props.route.params.search 
              ? 'Paciente sente frequentemente um gosto ruim na boca?' 
              : 'Você sente frequentemente um gosto ruim na boca?'
            }</TextStyled>
              <ViewOption>
                <TextStyledOption>Não</TextStyledOption>
                <Switch value={checkedThreeYes} onValueChange={() => setCheckedThreeYes(!checkedThreeYes)} />
                <TextStyledOption>Sim</TextStyledOption>
              </ViewOption>
          </CardStyled>
          <CardStyled>
            <TextStyled>
            {props && props.route && props.route.params && props.route.params.search 
              ? 'Paciente já consultou um especialista sobre isso?' 
              : 'Você já consultou um especialista sobre isso?'
            }</TextStyled>
              <ViewOption>
                <TextStyledOption>Não</TextStyledOption>
                <Switch value={checkedFourYes} onValueChange={() => setCheckedFourYes(!checkedFourYes)} />
                <TextStyledOption>Sim</TextStyledOption>
              </ViewOption>
          </CardStyled>
          <CardStyled>
            <TextStyled>
            {props && props.route && props.route.params && props.route.params.search 
              ? 'Paciente costuma escovar a lingua?' 
              : 'Você costuma escovar a lingua?'
            }</TextStyled>
              <ViewOption>
                <TextStyledOption>Não</TextStyledOption>
                <Switch value={checkedFiveYes} onValueChange={() => setCheckedFiveYes(!checkedFiveYes)} />
                <TextStyledOption>Sim</TextStyledOption>
              </ViewOption>
          </CardStyled>
          <CardStyled>
            <TextStyled>
            {props && props.route && props.route.params && props.route.params.search 
              ? 'Paciente costuma se afastar das pessoas por isso?' 
              : 'Você costuma se afastar das pessoas por isso?'
            }</TextStyled>
              <ViewOption>
                <TextStyledOption>Não</TextStyledOption>
                <Switch value={checkedSixYes} onValueChange={() => setCheckedSixYes(!checkedSixYes)} />
                <TextStyledOption>Sim</TextStyledOption>
              </ViewOption>
          </CardStyled>
          <CardStyled>
            <TextStyled>
            {props && props.route && props.route.params && props.route.params.search 
              ? 'Paciente acha seu mal halito forte?' 
              : 'Você acha seu mal halito forte?'
            }</TextStyled>
              <ViewOption>
                <TextStyledOption>Não</TextStyledOption>
                <Switch value={checkedSevenYes} onValueChange={() => setCheckedSevenYes(!checkedSevenYes)} />
                <TextStyledOption>Sim</TextStyledOption>
              </ViewOption>
          </CardStyled>

        </ViewContainer>
        {props && props.route && props.route.params && props.route.params.search ? (
          <View style={{paddingTop: 24, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Button width={50} onPress={handleSubmit}>Salvar</Button>
          </View>
        ) : (
          <View style={{paddingTop: 24, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Button width={50} onPress={handleSubmit}>Enviar</Button>
          </View>
        )}
      </Container>
            
      </ScrollView>
    </View>
  );
};

export default Questions;
