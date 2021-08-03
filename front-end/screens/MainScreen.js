import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import BottomTab from '../components/BottomTab';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import LoadingScreen from './LoadingScreen';
import Chat from './Chat';
import { connectToServer, loginSuccessful } from '../utils/io';

const MainScreen = () => {
  const getChatsStatus = useSelector((state) => state.listChat.getChatsStatus);
  // const userId = useSelector((state) => state.user.userId);

  // useEffect(() => {
  //   if (getChatsStatus === 'successful') {
  //     loginSuccessful(userId);
  //   }
  // });

  return (
    <NavigationContainer>
      {getChatsStatus === '' ? (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
      ) : getChatsStatus === 'successful' ? (
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='BottomTab' component={BottomTab} />
          <Stack.Screen name='MainChat' component={Chat} />
        </Stack.Navigator>
      ) : (
        <LoadingScreen />
      )}
    </NavigationContainer>
  );
};

export default MainScreen;
