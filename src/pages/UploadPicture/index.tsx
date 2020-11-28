import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Alert, Platform, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'

import { TouchableImage, ViewStyled } from './styles'

const UploadPicture: React.FC = () => {
  const [images, setImages] = useState<String[]>([]);
  const [isValid, setIsValid] = useState<Boolean>(true);
  const [loading, setLoading] = useState(false);

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
  }, [])

  useEffect(() => {
    setLoading(true);
    if (images && images.length) {
      images.map(image => {
        const getUser = image.split('----');
        if (getUser[1] === 'rodrigoaraujo2') {
          setIsValid(false);
        }
      });
    }
    setLoading(false);
  }, [images])

  async function getPathForFirebaseStorage (uri: any) {
    if (Platform.OS==="ios") return uri
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
  }

  const handleUpdatePicture = useCallback(async () => {
    ImagePicker.showImagePicker({
      title: 'Selecione uma imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar câmera',
      chooseFromLibraryButtonTitle: 'Escolher da galeria'
    }, async response => {
      setLoading(true);
      if (response.didCancel) {
        setLoading(false);
        return;
      } 
      
      if (response.error) {
        console.log(response.error)
        Alert.alert('Erro ao selecionar a imagem');
        setLoading(false);
        return;
      }

      const source = { uri: response.uri };
      const month = new Date().getMonth();
      const filename = source.uri.substring(source.uri.lastIndexOf('/') + 1);
      const fileUri = await getPathForFirebaseStorage(source.uri)
      const task = storage()
        .ref(`images/${month}`)
        .child(`${filename}----rodrigoaraujo2----`)
        .putFile(fileUri);
      try {
        await task;
      } catch (e) {
        console.error(e);
        Alert.alert('Erro ao enviar a imagem');
        return;
      }
      Alert.alert(
        'Envio concluído!',
        'Sua foto foi enviada para o nosso banco de dados'
      );
      setIsValid(false);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#6EE7D3" />
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        {isValid ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ViewStyled>
              <TouchableImage onPress={handleUpdatePicture}>
                <Icon
                  name="image"
                  size={80}
                  color="#4682B4" />
              </TouchableImage>
            </ViewStyled>
            <Text>Clique para selecionar uma imagem</Text>
          </View>
        ) : (
          <Text>Usuário já fez upload este mês</Text>
        )}
    </View>
  );
};

export default UploadPicture;
