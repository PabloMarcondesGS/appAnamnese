import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { format } from 'date-fns';

import { 
  TitleStyled, 
  CardStyled, 
  ParagraphStyled ,
  ButtonStyled
} from './styles';

const Item: React.FC = ({ item }: any) => {

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
        onPress={() => console.log(item)}
        mode="contained">
        Ver imagem
      </ButtonStyled>
    </CardStyled>
  );
};

export default Item;
