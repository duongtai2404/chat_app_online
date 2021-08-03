import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { widthWindow, heightWindow } from '../utils/Dimensions';

const HeaderTab = ({ title, navigation, isChat }) => {
  const handlePress = () => {
    return isChat ? navigate() : configAccount();
  };
  const navigate = () => {
    navigation.goBack();
  };
  const configAccount = () => {
    return;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.button}>
          {isChat ? (
            <Icon name='arrow-left-bold-box-outline' color='white' size={28} />
          ) : (
            <Icon name='account-cog' color='white' size={28} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: heightWindow / 10,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#54c7ec',
  },
  button: {
    width: 30,
    height: 30,
    alignItems: 'center',
    marginRight: (widthWindow - 40) / 2 - 53,
  },
  titleContainer: {
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default HeaderTab;
