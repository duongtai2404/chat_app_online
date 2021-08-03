import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ElementChat = ({ isRight, chatLine }) => {
  return (
    <View
      style={[
        styles.textContainer,
        isRight ? styles.textContainerRight : styles.textContainerLeft,
      ]}
    >
      <Text style={[styles.text, isRight ? styles.textRight : styles.textLeft]}>
        {chatLine}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 15,
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderColor: 'white',
    alignSelf: 'flex-end',
  },
  textContainerRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#54c7ec',
  },
  textContainerLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6E6E6',
  },
  text: {
    fontSize: 18,
  },
  textLeft: {
    color: 'black',
  },
  textRight: {
    color: 'white',
  },
});

export default ElementChat;
