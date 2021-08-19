import React, { useEffect, useState, useCallback } from 'react';
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
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/auth';

import Input from '../../componentes/InputTwo';
import { colors } from '../../styles'

import { 
  Container,
  ViewImage,
} from './styles';
import Header from '../../componentes/Header';
const UserDetail: React.FC = (props: any) => {
  const navigation = useNavigation();
  const { user, medic } = useAuth();
  const { item } = props.route.params;
  const [userData, setUserData] = useState({} as any);

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [male, setMale] = useState(true);
  const [date, setDate] = useState(new Date());
  const [imageUser, setImageUser] = useState('' as any)
  const [images, setImages] = useState<String[]>([]);
  console.log(imageUser)
  useEffect(() => {
    setLoading(true);
    database()
        .ref(`users/${item.id}`)
        .once('value')
        .then(snapshot => {
            if (snapshot) {
                setUserData(snapshot.val())
            }
            setLoading(false);
        });
    setLoading(false);
}, [item])

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


  useEffect(() => {
    if (userData && userData.image) {
      setLoading(true)
      const pathReference = storage().ref(userData.image);
      pathReference.getDownloadURL().then(function(url) {
        setImage(url)
        setLoading(false);
      }).catch(function () {
        setLoading(false)
      });
    }
  }, [userData])

  const handleDelete = useCallback(() => {
    database().ref().child('users').child(item.id).remove();
    setShowAlert(false);
    navigation.goBack();
  }, [item])

  useEffect(() => {
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
    setLoading(true);
    if (images && images.length) {
      images.map((image): any => {
        const getUser = image.split('----');
        if (getUser[1] === `${item.id}`) {
          setImageUser(image);
        }
      });
    }
    setLoading(false);
  }, [images, item])

  return loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#005a72" />
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
                >
                    <Container>
                        <ViewImage>
                            <TouchableOpacity>
                                {userData.image && imageUser ? (
                                    <Image 
                                        style={{ width: 80, height: 80, borderRadius: 45 }} 
                                        source={{ uri: imageUser }}
                                         />
                                ) : (
                                    <Icon size={55} name="user" color={colors.primary} />
                                )}
                            </TouchableOpacity>
                        </ViewImage>
                        <Form 
                            onSubmit={() => {}}
                            initialData={userData}
                            >
                              {console.log(userData)}
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                prefix="Nome:"
                                defaultValue={userData.name}
                                placeholder="Nome"
                                returnKeyType="next"
                                editable={false}
                            />

                            <Input
                                autoCapitalize="words"
                                name="email"
                                icon="user"
                                prefix="Email:"
                                defaultValue={userData.email}
                                returnKeyType="next"
                                editable={false}
                            />
                            {!medic ? (
                              <Input
                                  autoCapitalize="words"
                                  name="email"
                                  icon="user"
                                  prefix="Plano:"
                                  defaultValue="FREE"
                                  returnKeyType="next"
                                  editable={false}
                              />
                            ) : <View />}

                            <Input
                                autoCapitalize="words"
                                name="email"
                                icon="user"
                                prefix="Gênero:"
                                defaultValue={userData.sex}
                                returnKeyType="next"
                                editable={false}
                            />
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

export default UserDetail;