import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthWindow } from '../utils/Dimensions';

const FormInputWithIcon = ({
  icon,
  placeholder,
  value,
  color,
  error,
  ...rest
}) => {
  return (
    <View style={styles.formInputContainer}>
      <View style={{ ...styles.iconContainer, ...(error ? styles.error : {}) }}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View
        style={{ ...styles.inputContainer, ...(error ? styles.error : {}) }}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          {...rest}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formInputContainer: {
    flexDirection: 'row',
    width: widthWindow,
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    height: 60,
  },
  iconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: 'gray',
  },
  inputContainer: {
    borderWidth: 0.5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    borderLeftWidth: 0,
    borderColor: 'gray',
  },
  error: {
    borderColor: 'red',
    borderWidth: 1.5,
  },
});

export default FormInputWithIcon;
