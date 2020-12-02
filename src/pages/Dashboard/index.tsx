import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import {  Button, TouchableOpacity, TextInput, Picker } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import { ButtonText } from '../../componentes/Button/styles';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import styles from './styles';

interface ValuesForm {
  continue: string;
  company_month: number;
  month: number;
  registred: string;
  occupation: string;
  remuneration: number;
  hour_months_clt: number;
  hour_months_pj: number;
  hour_months_without_register: number;
  hour_months_night_pj: number;
  hour_months_night_clt: number;
  hour_months_night_without_register: number;
  benefits_unpaid: number;
  thirteen: number;
  unsuccessful_holidays: number;
  vancation_unpaid: number;
  family_salary: number;
  childrens: number;
  moral_damages: string;
  work_accident: string;
  month_pregnancy: number;
  wage_parity: number;
  months_to_match: number;
  work_risk: string;
  work_risk_gral: string;
  payments_late: number;
  payments_late_days: number;
  payment_differences: number;
}


const initialValues: ValuesForm = {
  continue: '',
  company_month: 0,
  month: 0,
  registred: '',
  occupation: '',
  remuneration: 0,
  hour_months_clt: 0,
  hour_months_pj: 0,
  hour_months_without_register: 0,
  hour_months_night_pj: 0,
  hour_months_night_clt: 0,
  hour_months_night_without_register: 0,
  benefits_unpaid: 0,
  thirteen: 0,
  unsuccessful_holidays: 0,
  vancation_unpaid: 0,
  family_salary: 0,
  childrens: 0,
  moral_damages: '',
  work_accident: '',
  month_pregnancy: 0,
  wage_parity: 0,
  months_to_match: 0,
  work_risk: '',
  work_risk_gral: '',
  payments_late: 0,
  payments_late_days: 0,
  payment_differences: 0,
};
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


import UploadPicture from '../UploadPicture'
import Questions from '../Questions'

const Dashboard: React.FC = () => {
    const Drawer = createDrawerNavigator();

    function App() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Text>Open up App.js to start working on your app!</Text>
          </View>
        );
      }
      function AppTwo() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
              <Formik initialValues={initialValues} onSubmit={() =>{}}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
              }) => (
                <View>
                  <Text style={styles.label}>Você tem boca seca?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('continue')}
                    value={values.continue}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  />
                  
                  <Text style={styles.label}>Você respira pela boca?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('continue')}
                    value={values.continue}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Você respira pela boca?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('continue')}
                    value={values.continue}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Você sente frequentemente um gosto ruim na boca?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('continue')}
                    value={values.continue}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Alguem já disse que você possui mal halito?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('continue')}
                    value={values.continue}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  />


                  <Text style={styles.label}>Você já consultou um especialista sobre isso?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('continue')}
                    value={values.continue}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Você costuma escovar a lingua?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('continue')}
                    value={values.continue}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  />

                <Text style={styles.label}>Você costuma se afastar das pessoas por isso?</Text>
                  <TextInput
                    style={styles.input}
                    // value={subject}
                    onChangeText={handleChange('continue')}
                    value={values.continue}
                    placeholder="Sim/Não"
                    placeholderTextColor="#c1bccc"
                  />

                  <Text style={styles.label}>Você acha seu mal halito forte?</Text>
                  <View style={styles.backgroundPicker}>
                    <Picker
                      selectedValue={values.work_accident}
                      style={{ height: 50 }}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('work_accident', itemValue)
                      }
                    >
                      <Picker.Item label="Sim" value="Sim" />
                      <Picker.Item label="Não" value="Não" />
                    </Picker>
                  </View>
                  <View style={{ marginBottom: 120 }}>
                    <TouchableOpacity
                      onPress={handleSubmit as any}
                      style={styles.buttonStyle}
                    >
                      <Text style={styles.textButtonStyle}>Salvar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
            </View>
        );
      }

    // return (
    //           <Drawer.Navigator 
    //             initialRouteName="App"
    //             drawerStyle={{
    //               backgroundColor: "#313131",
    //               paddingVertical: 20
    //             }}
    //             drawerContentOptions={{
    //               activeBackgroundColor: "#fff",
    //               inactiveTintColor: "#fff"
    //             }}>

                  
    //             <Drawer.Screen 
    //                 name="App" 
    //                 component={App} 
    //                 options={
    //                   {
    //                     drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Primeira Tela</Text>),
    //                     drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="home" />)
    //                   }
    //                 } 
    //             />
    //             <Drawer.Screen 
    //               name="MeuApp" 
    //               component={AppTwo} 
    //               options={
    //                 {
    //                   drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Anamnese</Text>),
    //                   drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="file-text" />)
    //                 }
    //               }
                
    //               />
    //           </Drawer.Navigator>
      // return (
      //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
      //     <Text>Open up App.js to start working on your app!</Text>
      //   </View>
      // );
    // }

    return (
        // <View style={{ flex: 1, justifyContent: 'center'}}>
      <Drawer.Navigator 
        initialRouteName="App"
        drawerStyle={{
          backgroundColor: "#313131",
          paddingVertical: 20
        }}
        drawerContentOptions={{
          activeBackgroundColor: "#fff",
          inactiveTintColor: "#fff"
        }}>

          
        <Drawer.Screen 
            name="App" 
            component={App} 
            options={
              {
                drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Home</Text>),
                drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="home" />)
              }
            } 
        />
        <Drawer.Screen 
          name="MeuApp" 
          component={Questions} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Meu App</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="chat" />)
            }
          }
        
          />
        <Drawer.Screen 
          name="UploadPicture" 
          component={UploadPicture} 
          options={
            {
              drawerLabel: (({focused}) => <Text style={{color: focused ? '#313131' : '#fff' }}>Upload Picture</Text>),
              drawerIcon: (({focused}) => <Icon color={focused ? '#313131' : '#fff' } name="chat" />)
            }
          }
        
          />
      </Drawer.Navigator>
    );
};

export default Dashboard;
