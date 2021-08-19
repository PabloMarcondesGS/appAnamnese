import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'

import { colors } from '../../../../../styles'
import ModalImage from '../../../../../componentes/ModalImage'

import { 
  TitleStyled, 
  CardStyled, 
  ParagraphStyled ,
  Button, 
  Gradient, 
  TextValues
} from './styles';

const Item: React.FC = ({ item }: any) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [modalVisible,  setModalVisible] = useState(false)

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
        Data de envio:
      </ParagraphStyled>
      <TitleStyled>
        {format(item.date, 'dd/MM/yyyy')}
      </TitleStyled>
      <Button onPress={() => setModalVisible(true)}>
        <Gradient 
          colors={[colors.primary,colors.secondary ]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}>
          <TextValues>Ver imagem</TextValues>
        </Gradient>
      </Button>
      <ModalImage 
        isModalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        image={item.image} />
    </CardStyled>
  );
};

export default Item;
