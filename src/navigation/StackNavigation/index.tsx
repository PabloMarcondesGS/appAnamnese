import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from '../../navigation/TabNavigator';
import UploadPictureTwo from '../../pages/UploadPictureTwo';
import Profile from '../../pages/Profile';
import Exam from '../../pages/Exam';
import ExamsUser from '../../pages/Home/User/List';
import ExamResult from '../../pages/ExamResult'
import ProfileEdit from '../../pages/ProfileEdit'
import Settings from '../../pages/Settings'
import Questions from '../../pages/Questions'
import Alerts from '../../pages/Alerts'
import Message from '../../pages/Messages'
import MessageList from '../../pages/MessagesList'
import ListWithOutResult from '../../pages/Home/User/ListWithOutResult';
import { colors } from '../../styles'

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
    <App.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: colors.white},
        }}
    >
        <App.Screen name="Dashboard" component={TabNavigator} />
        <App.Screen name="UploadPictureTwo" component={UploadPictureTwo} />
        <App.Screen name="Exam" component={Exam} />
        <App.Screen name="ExamResult" component={ExamResult} />
        <App.Screen name="ExamsUser" component={ExamsUser} />
        <App.Screen name="Profile" component={Profile} />
        <App.Screen name="Alerts" component={Alerts} />
        <App.Screen name="ProfileEdit" component={ProfileEdit} />
        <App.Screen name="Settings" component={Settings} />
        <App.Screen name="Questions" component={Questions} />
        <App.Screen name="Message" component={Message} />
        <App.Screen name="MessageList" component={MessageList} />
        <App.Screen name="ListWithOutResult" component={ListWithOutResult} />
    </App.Navigator>
);

export default AppRoutes;
