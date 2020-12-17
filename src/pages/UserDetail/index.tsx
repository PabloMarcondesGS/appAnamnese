import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native'
import AwesomeAlert from 'react-native-awesome-alerts';

import { 
  Container,
  ImageStyled,
  Content,
  Title,
  Description,
  ButtonSeeAll,
  ButtonSeeAllText,
  CardStyled
} from './styles';
import Header from '../../componentes/Header';
const UserDetail: React.FC = (props: any) => {
  const navigation = useNavigation();
  const { item } = props.route.params;

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');

  const getData = useCallback(async () => {
    setLoading(true);
    database()
      .ref(`users/${item.id}`)
      .once('value')
      .then(async (snapshot) => {
        if (snapshot) {
          // setProduct(snapshot.val())
        }
        setLoading(false);
      })
  }, [item])

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (item && item.image) {
      setLoading(true)
      const pathReference = storage().ref(item.image);
      pathReference.getDownloadURL().then(function(url) {
        setImage(url)
        setLoading(false);
      }).catch(function () {
        setLoading(false)
      });
    }
  }, [item])

  const handleDelete = useCallback(() => {
    database().ref().child('users').child(item.id).remove();
    setShowAlert(false);
    navigation.goBack();
  }, [item])

  return loading ? (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  ) : (
    <Container>
      <Header toggleDrawer={() => props.navigation.goBack()} isHeader={false} />
      <ScrollView style={{ flex: 1 }}>
        <Content>
          <CardStyled>
            {item.image && (
              <ImageStyled source={{
                uri: image
              }} />
            )}
            <Title>Nome: {item.name}</Title>
            <Title>Ativa: {item.active ? 'Sim' : 'Não'}</Title>
            <Description>Tipo: {item.medic ? 'Especialista' : 'Paciente'}</Description>
            <Description>Email: {item.email}</Description>
            <Description>Sexo: {item.sex}</Description>
          </CardStyled>
          <ButtonSeeAll>
            <ButtonSeeAllText>
              DELETAR USUÁRIO
            </ButtonSeeAllText>
          </ButtonSeeAll>
        </Content>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Deletar usuário"
          message="Você tem certeza? Esta ação não poderá ser desfeita!"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Não, cancelar"
          confirmText="Sim, deletar"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            setShowAlert(false)
          }}
          onConfirmPressed={handleDelete}
        />
      </ScrollView>
    </Container>
  )
}

export default UserDetail;