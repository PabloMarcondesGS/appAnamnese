import React, { useState } from "react";
import { Modal, Alert, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { RNCamera } from "react-native-camera";

const Camera: React.FC = ({ isVisible, onChangePhoto, onCloseCamera }: any) => {
  const [camera, setCamera] = useState();

  const onTakePicture = async () => {
    try {
      if (camera) {
        const { uri } = await camera.takePictureAsync({
          quality: 0.5,
          forceUpOrientation: true,
          fixOrientation: true,
          skipProcessing: true
        });
        onChangePhoto(uri);
      }
    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao tirar a foto.");
    }
  };

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
        <Icon
          name="photo-camera"
          size={40}
          color={"#fff"}
          onPress={onTakePicture}
          style={{ 
            position: 'absolute',
            alignSelf: "center",
            bottom: 20
          }}
        />
        <View style={{
          width: 230,
          height: 380,
          borderWidth: 2,
          top: 180,
          borderColor: 'white',
          position: 'absolute',
          alignSelf: 'center'
        }} />
        <Icon
          name="close"
          size={50}
          color={"#fff"}
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