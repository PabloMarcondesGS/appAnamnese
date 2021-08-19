import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'

import { 
  TitleStyled, 
  CardStyled, 
  ParagraphStyled ,
  ButtonStyled
} from './styles';

const Item: React.FC = ({ item }: any) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    database()
      .ref(`users/${item.user}`)
      .once('value')
      .then(snapshot => {
        if (snapshot) {
          setUser(snapshot.val())
        }
        setLoading(false);
      });
    setLoading(false);
  }, [item])

  return loading || !user ? (
    <CardStyled style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </CardStyled>
  ) : (
    <CardStyled>
      <ParagraphStyled>
        Nome do paciênte:
      </ParagraphStyled>
      <TitleStyled>{user.name}</TitleStyled>
      <ParagraphStyled>
        Data de envio:
      </ParagraphStyled>
      <TitleStyled>
        {format(item.date, 'dd/MM/yyyy')}
      </TitleStyled>
      <ButtonStyled 
        onPress={() => navigation.navigate('ExamResult', { item })} 
        color="#005a72"
        mode="contained">
        Ver Resultado
      </ButtonStyled>
      <ButtonStyled 
        onPress={() => navigation.navigate('ExamEdit', { item })} 
        color="#005a72"
        mode="contained">
        Alterar
      </ButtonStyled>
    </CardStyled>
  );
};

export default Item;
