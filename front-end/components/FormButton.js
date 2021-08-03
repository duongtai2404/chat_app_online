import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { widthWindow } from '../utils/Dimensions';

const FormButton = ({ title, color, style, ...rest }) => {
  return (
    <View style={styles.buttonContainer}>
      <View style={{ ...styles.button, ...style }}>
        <Button title={title} color={color} {...rest} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: widthWindow,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    borderRadius: 5,
    height: 60,
    justifyContent: 'center',
  },
});

export default FormButton;
