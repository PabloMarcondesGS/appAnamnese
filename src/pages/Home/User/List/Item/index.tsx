import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native'

import { 
  CardStyled, 
  ButtonStyled,
  ViewStyled
} from './styles';

const Item: React.FC = ({ item }: any) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [medic, setMedic] = useState();
  const [level, setLevel] = useState();

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

  useEffect(() => {
    setLoading(true);
    if(item.halitosis){
      database()
        .ref(`halitosis/${item.halitosis}`)
        .once('value')
        .then(snapshot => {
          if (snapshot) {
            setMedic(snapshot.val())
            if(snapshot.val() && snapshot.val().description_small && snapshot.val().description_small.split(' ')) {
              setLevel(snapshot.val().description_small.split(' ')[1])
            }
          }
          setLoading(false);
        });
    }
    setLoading(false);
  }, [item])
  return loading || !medic ? (
    <CardStyled style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </CardStyled>
  ) : (
    <CardStyled>
      {level && (
        <ViewStyled height={level ? level * 50 : 0}></ViewStyled>
      )}
      <ButtonStyled 
        onPress={() => navigation.navigate('ExamResult', { item })}
        mode="contained">
        Ver Resultado
      </ButtonStyled>
    </CardStyled>
  );
};

export default Item;
