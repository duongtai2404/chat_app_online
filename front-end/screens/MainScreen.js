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
import CallScreen from './CallScreen';

const MainScreen = () => {
  const getChatsStatus = useSelector((state) => state.listChat.getChatsStatus);

  return (
    <CallScreen />
    // <NavigationContainer>
    //   {getChatsStatus === '' ? (
    //     <Stack.Navigator>
    //       <Stack.Screen name='Login' component={LoginScreen} />
    //       <Stack.Screen name='Signup' component={SignupScreen} />
    //     </Stack.Navigator>
    //   ) : getChatsStatus === 'successful' ? (
    //     <Stack.Navigator headerMode='none'>
    //       <Stack.Screen name='BottomTab' component={BottomTab} />
    //       <Stack.Screen name='MainChat' component={Chat} />
    //     </Stack.Navigator>
    //   ) : (
    //     <LoadingScreen />s
    //   )}
    // </NavigationContainer>
  );
};

export default MainScreen;
