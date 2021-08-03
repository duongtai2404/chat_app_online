import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ListChatScreen from '../screens/tab_screens/ListChatScreen';
import FriendScreen from '../screens/tab_screens/FriendScreen';
import PeopleScreen from '../screens/tab_screens/PeopleScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chat') {
            iconName = focused
              ? 'chatbubble-ellipses'
              : 'chatbubble-ellipses-outline';
          } else if (route.name === 'People') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Friend') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#54c7ec',
        inactiveTintColor: 'gray',
      }}
      initialRouteName='ListChat'
    >
      <Tab.Screen name='Chat' component={ListChatScreen} />
      <Tab.Screen name='Friend' component={FriendScreen} />
      <Tab.Screen name='People' component={PeopleScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
