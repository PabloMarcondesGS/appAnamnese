import React, {useCallback, useEffect,useState} from 'react';
import Modal from 'react-native-modal';
import {Platform, View, ActivityIndicator} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import storage from '@react-native-firebase/storage';

import { colors } from '../../styles';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Icon,
  MenuButton,
  ImageStyled,
} from './styles';

const ModalLoad = ({isModalVisible, setModalVisible, image}) => {
  const { user } = useAuth();

  const [imageUser, setImageUser] = useState('' as any)
  const [images, setImages] = useState<String[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  async function getPathForFirebaseStorage (uri: any) {
    if (Platform.OS==="ios") return uri
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
  }

  useEffect(() => {
    setLoading(true);
    const pathReference = storage().ref(image);
      pathReference.getDownloadURL().then(function(url) {
        setImageUser(url)
        setLoading(false);
      }).catch(function () {
        setLoading(false)
      });
    setLoading(false);
  }, [])

  return (
    <Modal isVisible={isModalVisible}>
      {loading ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#999" />
        </View>
      ) : (
        <Container contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
          <MenuButton onPress={handleClose}>
            <Icon name="close" size={25} color={colors.primary} />
          </MenuButton>
          <ImageStyled 
            source={{uri: imageUser}}  />
        </Container>
      )}
    </Modal>
  );
};

export default ModalLoad;
