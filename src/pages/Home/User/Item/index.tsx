import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
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
  const [medic, setMedic] = useState();

  useEffect(() => {
    setLoading(true);
    database()
      .ref(`users/${item.medic}`)
      .once('value')
      .then(snapshot => {
        if (snapshot) {
          setMedic(snapshot.val())
        }
        setLoading(false);
      });
    setLoading(false);
  }, [item])

  return loading || !medic ? (
    <CardStyled style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </CardStyled>
  ) : (
    <CardStyled>
      <ParagraphStyled>
        Especialista:
      </ParagraphStyled>
      <TitleStyled>{medic && medic.name ? medic.name : ''}</TitleStyled>
      <ParagraphStyled>
        Data do resultado:
      </ParagraphStyled>
      <TitleStyled>
        {item.dateResult}
      </TitleStyled>
      <ButtonStyled 
        onPress={() => navigation.navigate('ExamResult', { item })}
        mode="contained">
        Ver Resultado
      </ButtonStyled>
    </CardStyled>
  );
};

export default Item;
