import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

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
      // function AppTwo() {
      //   return (
      //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
      //         <Formik initialValues={initialValues} onSubmit={() =>{}}>
      //         {({
      //           handleChange,
      //           handleBlur,
      //           handleSubmit,
      //           values,
      //           setFieldValue,
      //         }) => (
      //           <View>
      //             <Text style={styles.label}>Você tem boca seca?</Text>
      //             <TextInput
      //               style={styles.input}
      //               // value={subject}
      //               onChangeText={handleChange('continue')}
      //               value={values.continue}
      //               placeholder="Sim/Não"
      //               placeholderTextColor="#c1bccc"
      //             />
                  
      //             <Text style={styles.label}>Você respira pela boca?</Text>
      //             <TextInput
      //               style={styles.input}
      //               // value={subject}
      //               onChangeText={handleChange('continue')}
      //               value={values.continue}
      //               placeholder="Sim/Não"
      //               placeholderTextColor="#c1bccc"
      //             />

      //             <Text style={styles.label}>Você respira pela boca?</Text>
      //             <TextInput
      //               style={styles.input}
      //               // value={subject}
      //               onChangeText={handleChange('continue')}
      //               value={values.continue}
      //               placeholder="Sim/Não"
      //               placeholderTextColor="#c1bccc"
      //             />

      //             <Text style={styles.label}>Você sente frequentemente um gosto ruim na boca?</Text>
      //             <TextInput
      //               style={styles.input}
      //               // value={subject}
      //               onChangeText={handleChange('continue')}
      //               value={values.continue}
      //               placeholder="Sim/Não"
      //               placeholderTextColor="#c1bccc"
      //             />

      //             <Text style={styles.label}>Alguem já disse que você possui mal halito?</Text>
      //             <TextInput
      //               style={styles.input}
      //               // value={subject}
      //               onChangeText={handleChange('continue')}
      //               value={values.continue}
      //               placeholder="Sim/Não"
      //               placeholderTextColor="#c1bccc"
      //             />


      //             <Text style={styles.label}>Você já consultou um especialista sobre isso?</Text>
      //             <TextInput
      //               style={styles.input}
      //               // value={subject}
      //               onChangeText={handleChange('continue')}
      //               value={values.continue}
      //               placeholder="Sim/Não"
      //               placeholderTextColor="#c1bccc"
      //             />

      //             <Text style={styles.label}>Você costuma escovar a lingua?</Text>
      //             <TextInput
      //               style={styles.input}
      //               // value={subject}
      //               onChangeText={handleChange('continue')}
      //               value={values.continue}
      //               placeholder="Sim/Não"
      //               placeholderTextColor="#c1bccc"
      //             />

      //           <Text style={styles.label}>Você costuma se afastar das pessoas por isso?</Text>
      //             <TextInput
      //               style={styles.input}
      //               // value={subject}
      //               onChangeText={handleChange('continue')}
      //               value={values.continue}
      //               placeholder="Sim/Não"
      //               placeholderTextColor="#c1bccc"
      //             />

      //             <Text style={styles.label}>Você acha seu mal halito forte?</Text>
      //             <View style={styles.backgroundPicker}>
      //               <Picker
      //                 selectedValue={values.work_accident}
      //                 style={{ height: 50 }}
      //                 onValueChange={(itemValue, itemIndex) =>
      //                   setFieldValue('work_accident', itemValue)
      //                 }
      //               >
      //                 <Picker.Item label="Sim" value="Sim" />
      //                 <Picker.Item label="Não" value="Não" />
      //               </Picker>
      //             </View>
      //             <View style={{ marginBottom: 120 }}>
      //               <TouchableOpacity
      //                 onPress={handleSubmit as any}
      //                 style={styles.buttonStyle}
      //               >
      //                 <Text style={styles.textButtonStyle}>Salvar</Text>
      //               </TouchableOpacity>
      //             </View>
      //           </View>
      //         )}
      //       </Formik>
      //       </View>
      //   );
      // }

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
