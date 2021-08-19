import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'

import { 
  TitleStyled, 
  CardStyled, 
  ParagraphStyled ,
} from './styles';

const Item: React.FC = ({ item }: any) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  return loading ? (
    <CardStyled style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </CardStyled>
  ) : (
    <CardStyled>
      <TitleStyled>
        {item.description}
      </TitleStyled>
      <TitleStyled>
      Data: {format(item.date, 'dd/MM/yyyy')}
      </TitleStyled>
    </CardStyled>
  );
};

export default Item;
