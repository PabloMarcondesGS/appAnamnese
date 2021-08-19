import React, { useCallback, useRef, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker'
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import database from '@react-native-firebase/database';
import { Checkbox, Button as ButtonPaper } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'

import { useAuth } from '../../hooks/auth';
import Header from '../../componentes/Header';
import { colors } from '../../styles'

import getValidationErrors from '../../ultils/getValidationErrors';

import Input from '../../componentes/InputTwo';

import {
    Container,
    ViewImage,
    Gradient, 
    Button,
    TextValues,
    Title
} from './styles';

interface ProfileData {
    name: string;
}

const Settings: React.FC = (props: any) => {
    const [imageUser, setImageUser] = useState('' as any)
    const [images, setImages] = useState<String[]>([]);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const [male, setMale] = useState(true);
    const [female, setFemale] = useState(false);
    const [userData, setUserData] = useState({} as any);

    const emailInputRef = useRef<TextInput>(null);
    const { user, signOut, medic } = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setLoading(true);
        database()
            .ref(`users/${user.uid}`)
            .once('value')
            .then(snapshot => {
                if (snapshot) {
                    setUserData(snapshot.val())
                }
                setLoading(false);
            });
        setLoading(false);
    }, [user])

    useEffect(() => {
        setLoading(true);
        if (userData) {
            if (userData.sex) {
                setMale(userData.sex === 'Masculino')
            }
            if (userData.birthDate) {
                setDate(new Date(userData.birthDate))
            }
        }
        setLoading(false);
    }, [userData])

  const getImages = useCallback(() => {
    setLoading(true);
    const listRef = storage().ref().child(`/images/users`);

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
    getImages()
  }, [getImages])
  
  const getImageUser = useCallback(() => {
    setLoading(true);
    if (images && images.length) {
      images.map((image): any => {
        const getUser = image.split('----');
        if (getUser[1] === `${user.uid}`) {
          setImageUser(image);
        }
      });
    }
    setLoading(false);
  }, [images, user])

  useEffect(() => {
    getImageUser()
  }, [getImageUser])

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getImages()
    getImageUser();
    setRefreshing(false);
  }, [getImages, getImageUser])


    return loading ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#999" />
        </View>
      ) : (
        <View style={{flex:1}}>
            <Header isHeader={false}  actionProfile={() => navigation.navigate('ProfileEdit')}  toggleDrawer={props.navigation.goBack} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS =='ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                ><RefreshControl onRefresh={handleRefresh} style={{ flex: 1 }} refreshing={refreshing}>
                    <Container>
                      
                        <ViewImage>
                          {imageUser ? (
                              <Image 
                                  style={{ width: 80, height: 80, borderRadius: 45 }} 
                                  source={{ uri: imageUser }}
                                    />
                          ) : (
                              <Icon size={55} name="user" color={colors.primary} />
                          )}
                        </ViewImage>
                        
                          <Title>Olá, {userData && userData.name ? userData.name : ''}</Title>
                          {!medic && (
                            <Button onPress={() => navigation.navigate('ExamsUser')}>
                              <Title>Exames realizados</Title>
                            </Button>
                          )}
                          <Button onPress={() => navigation.navigate('Profile')}>
                            <Title>Meu perfil</Title>
                          </Button>
                          {!medic && (
                            <>
                              <Button >
                                <Title>Dicas e informações</Title>
                              </Button>
                              <Button onPress={() => navigation.navigate('Alerts')} >
                                <Title>Novidades</Title>
                              </Button>
                              <Button onPress={() => navigation.navigate('MessagesUser')} >
                                <Title>Mensagens</Title>
                              </Button>
                            </>
                          )}
                          <Button onPress={async() => {await signOut(); navigation.navigate('SignIn')}}>
                            <Title>Sair</Title>
                          </Button>
                    </Container>
                        </RefreshControl>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Settings;
