import React, {useState, useCallback, useEffect} from 'react';
import Modal from 'react-native-modal';
import {Platform, Alert} from 'react-native'
import database from '@react-native-firebase/database';
import { format } from 'date-fns';
import RNFetchBlob from 'rn-fetch-blob'
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native'

import { colors } from '../../styles';
import { useAuth } from '../../hooks/auth';
import {firstAccess} from '../../hooks/access';

import {
  Container,
  Icon,
  MenuButton,
  ImageStyled,
  ButtonSend,
  TextButton,
} from './styles';

const ModalLoad = ({isModalVisible, setModalVisible, image, setLoading}) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const {secondAccess, second} = firstAccess();

  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  async function getPathForFirebaseStorage (uri: any) {
    if (Platform.OS==="ios") return uri
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
  }

  const handleSend = useCallback(async () => {
    setLoading(true);
    if(image) {
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const fileUri = await getPathForFirebaseStorage(image)
      const month = new Date().getMonth();
      const task = storage()
        .ref(`images/${month}`)
        .child(`${filename}----${user.uid}----`)
        .putFile(fileUri)
        .then(snapshot => {
          const date = format(new Date(), 'dd/MM/yyyy');
          database()
            .ref(`exams`)
            .push({
              user: user.uid,
              image: snapshot.metadata.fullPath,
              date,
              active: true
            }).then(async function (value) {
              const splitVal = String(value).split('/');
              database()
                .ref(`exams/${String(value).split('/')[splitVal.length - 1]}`)
                .update({ id: String(value).split('/')[splitVal.length - 1] });
              if(!second){
                await secondAccess()
                navigation.navigate('Dashboard')
              }
            });
        });
      try {
        await task;
      } catch (e) {
        Alert.alert('Erro ao enviar a imagem');
        setLoading(false);
        return;
      }
      Alert.alert(
        'Envio concluído!',
        'Sua foto foi enviada para o nosso banco de dados'
      );
      setLoading(false);
    }
    // setIsCameraVisible(false);
    setLoading(false);
    handleClose();

    // handleUpdatePicture();
  }, [user, image]);

  return (
    <Modal isVisible={isModalVisible}>
      <Container contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
        <MenuButton onPress={handleClose}>
          <Icon name="close" size={25} color={colors.primary} />
        </MenuButton>
        <ImageStyled 
          source={{uri: image}}  />
        <ButtonSend onPress={() => handleSend()}>
          <TextButton>
            Enviar
          </TextButton>
        </ButtonSend>
      </Container>
    </Modal>
  );
};

export default ModalLoad;
