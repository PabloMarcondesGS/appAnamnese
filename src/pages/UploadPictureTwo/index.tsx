import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Alert, Platform, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage';

import { useAuth } from '../../hooks/auth';
import { TouchableImage, ViewStyled, TextTitleNumber, TextTitle, Button } from './styles'
import Header from '../../componentes/Header';
import Camera from '../../componentes/Camera';

import imgCamera from '../../assets/camera.jpg' 
import imgLingua from '../../assets/lingua.jpeg' 
import {firstAccess} from '../../hooks/access'
import Modal from '../../componentes/Modal'
import { colors } from '../../styles';

const UploadPicture: React.FC = (props: any) => {
  const { user } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [images, setImages] = useState<String[]>([]);
  const [isValid, setIsValid] = useState<Boolean>(true);
  const [loading, setLoading] = useState(false);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState()
  const {secondAccess} = firstAccess();

  useEffect(() => {
    setLoading(true);
    const month = new Date().getMonth();
    const listRef = storage().ref().child(`/images/${month}`);

    listRef
      .listAll()
      .then(function(res) {
        res.items.forEach(function(itemRef) {
          itemRef
            .getDownloadURL()
            .then(url => {
              if (url)
                setImages(state => [...state, url])
                setLoading(false);
            })
            .catch(error => {
              setLoading(false);
            });
        });
      })
      .catch(function(error) {
        setLoading(false);
      });
    setLoading(false);
  }, [])

  useEffect(() => {
    setLoading(true);
    if (images && images.length) {
      images.map(image => {
        const getUser = image.split('----');
        if (getUser[1] === `${user.uid}`) {
          setIsValid(false);
        }
      });
    }
    setLoading(false);
  }, [images, user])

  useEffect(() => {
    setLoading(true);
    async function loadStoragedData(): Promise<void>{
        const tutorial = await AsyncStorage.getItem('@appAnamnese:tutorial');

        if (tutorial) {
          setStepOne(false)
          setStepTwo(false)
          setStepThree(false)
          setStepFour(true)
        } else {
          setStepOne(true)
          setStepTwo(false)
          setStepThree(false)
          setStepFour(false)
        }

        setLoading(false);
    }

    loadStoragedData();
}, []);

  async function getPathForFirebaseStorage (uri: any) {
    if (Platform.OS==="ios") return uri
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
  }

  const onCloseCamera = useCallback(() => {
    setIsCameraVisible(false);
  }, []);

  const handleStepZero = useCallback(() => {
    setStepOne(true)
    setStepTwo(false)
    setStepThree(false)
    setStepFour(false)
  }, []);

  const handleStepOne = useCallback(() => {
    setStepOne(false)
    setStepTwo(true)
    setStepThree(false)
    setStepFour(false)
  }, []);

  const handleStepTwo = useCallback(() => {
    setStepOne(false)
    setStepTwo(false)
    setStepThree(true)
    setStepFour(false)
  }, []);

  const handleStepFour = useCallback(async () => {
    setStepOne(false)
    setStepTwo(false)
    setStepThree(false)
    const tutorial = await AsyncStorage.setItem('@appAnamnese:tutorial', 'isComplet');
    setStepFour(true)
  }, []);

  const onChangePhoto = useCallback(async (newPhoto) => {
    setPhoto(newPhoto);
    setLoading(true);
    if(newPhoto) {
      const source = { uri: newPhoto };
      setOpen(true)
      setImage(source.uri)
    //   const filename = source.uri.substring(source.uri.lastIndexOf('/') + 1);
    //   const fileUri = await getPathForFirebaseStorage(source.uri)
    //   const task = storage()
    //     .ref(`images/${month}`)
    //     .child(`${filename}----${user.uid}----`)
    //     .putFile(fileUri)
    //     .then(snapshot => {
    //       const date = format(new Date(), 'dd/MM/yyyy');
    //       database()
    //         .ref(`exams`)
    //         .push({
    //           user: user.uid,
    //           image: snapshot.metadata.fullPath,
    //           date,
    //           active: true
    //         }).then(async function (value) {
    //           const splitVal = String(value).split('/');
    //           database()
    //             .ref(`exams/${String(value).split('/')[splitVal.length - 1]}`)
    //             .update({ id: String(value).split('/')[splitVal.length - 1] });
    //           await secondAccess()
    //         });
    //     });
    //   try {
    //     await task;
    //   } catch (e) {
    //     Alert.alert('Erro ao enviar a imagem');
    //     setLoading(false);
    //     return;
    //   }
    //   Alert.alert(
    //     'Envio concluído!',
    //     'Sua foto foi enviada para o nosso banco de dados'
    //   );
    //   setIsValid(false);
    //   setLoading(false);
    }
    // setIsCameraVisible(false);
    setLoading(false);


    // handleUpdatePicture();
  }, [user]);

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#6EE7D3" />
    </View>
  ) : (
    <View style={{flex: 1}}>
      <Header isHeader={false}  actionProfile={() => props.navigation.navigate('Profile')}  toggleDrawer={props.navigation.goBack}  />
      {stepOne && !stepTwo && !stepThree && !stepFour ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
          <TextTitleNumber>Passo 1</TextTitleNumber>
          <TextTitle>Escolha um local com boa iluminação e use a câmera de "SELFIE" do celular (câmera frontal)</TextTitle>
          <Image source={imgCamera} style={{ width: 210, height: 210, borderRadius: 16 }} />
          <Button 
            style={{ marginTop: 24 }} 
            mode="contained"
            onPress={handleStepOne}>Continuar</Button>
        </View>
      ) : <View /> }
      {!stepOne && stepTwo && !stepThree && !stepFour ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
          <TextTitleNumber>Passo 2</TextTitleNumber>
          <TextTitle>Posicione a câmera em frente a boca, coloque a língua para fora como na imagem abaixo:</TextTitle>
          <Image source={imgLingua} style={{ width: 210, height: 210, borderRadius: 16 }} />
          <Button 
            style={{ marginTop: 24 }} 
            mode="contained"
            onPress={handleStepTwo}>Continuar</Button>
        </View>
      ) : <View /> }
      {!stepOne && !stepTwo && stepThree && !stepFour ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
          <TextTitleNumber>Passo 3</TextTitleNumber>
          <TextTitle>É importante que a região destacada na imagem tenha boa iluminação e visibilidade:</TextTitle>
          <Image source={imgLingua} style={{ width: 210, height: 210, borderRadius: 16 }} />
          <Button 
            style={{ marginTop: 24 }} 
            mode="contained"
            onPress={handleStepFour}>Continuar</Button>
        </View>
      ) : <View /> }
      {!stepOne && !stepTwo && !stepThree && stepFour ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            {/* {isValid ? ( */}
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Camera 
                  isVisible={isCameraVisible} 
                  onChangePhoto={onChangePhoto}
                  onCloseCamera={onCloseCamera}
                  setLoading={setLoading}
                  loading={loading} />
                <ViewStyled>
                  <TouchableImage onPress={() => setIsCameraVisible(true)}>
                    <Icon
                      name="image"
                      size={90}
                      color={colors.primary} />
                  </TouchableImage>
                </ViewStyled>
                <Text style={{color: colors.primary}}>Clique acima para abrir a câmera</Text>
                <Button 
                  style={{ marginTop: 24 }} 
                  mode="contained"
                  onPress={handleStepZero}>Como tirar a foto corretamente</Button>
              </View>
            {/* ) : (
              <Text>Usuário já fez upload este mês</Text>
            )} */}
        </View>
      ) : <View /> }
      <Modal 
        isModalVisible={open}  setModalVisible={setOpen} image={image} setLoading={setLoading}
      />
    </View>
  );
};

export default UploadPicture;
