import React, { useState, useCallback } from "react";
import { Modal, Alert, View, ActivityIndicator } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { RNCamera } from "react-native-camera";
import { colors } from '../../styles';

const Camera: React.FC = ({ isVisible, onChangePhoto, onCloseCamera }: any) => {
  const [camera, setCamera] = useState();
  const [loading, setLoading] = useState(false);

  const onTakePicture = useCallback(async () => {
    if(loading) return;
    try {
      setLoading(true)
      if (camera) {
        const { uri } = await camera.takePictureAsync({
          quality: 0.5,
          forceUpOrientation: true,
          fixOrientation: true,
          skipProcessing: true
        });
        onChangePhoto(uri);
      }
      setLoading(false)
      onCloseCamera()
    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao tirar a foto.");
      setLoading(false)
    }
  }, [loading, camera]);

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>

      <RNCamera
        ref={ref => setCamera(ref)}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.front}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: "Permissão para usar a câmera",
          message: "Precisamos da sua permissão para usar a câmera.",
          buttonPositive: "Ok",
          buttonNegative: "Cancelar"
        }}
        captureAudio={false}
      >
        {loading ? (
          <ActivityIndicator size="large" style={{ 
              position: 'absolute',
              alignSelf: "center",
              bottom: 20
            }} color={'#0094a3'} />
        ) : (
          <Icon
            name="photo-camera"
            size={40}
            color={colors.primary}
            onPress={onTakePicture}
            style={{ 
              position: 'absolute',
              alignSelf: "center",
              bottom: 20
            }}
          />
        )}
        <View style={{
          width: 150,
          height: 220,
          borderWidth: 2,
          top: 220,
          borderColor: colors.primary,
          position: 'absolute',
          alignSelf: 'center',
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
        }} />

        <View style={{
          width: 1,
          height: 120,
          borderWidth: 1,
          top: 280,
          borderColor: colors.primary,
          position: 'absolute',
          alignSelf: 'center',
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
        }} />
        <Icon
          name="close"
          size={50}
          color={colors.primary}
          onPress={onCloseCamera}
          style={{ 
            position: 'absolute',
            left: 20,
            top: 10
          }}
        />
      </RNCamera>
    </Modal>
  );
};

export default Camera;