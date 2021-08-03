import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FormInputWithIcon from '../components/FormInputWithIcon';
import FormButton from '../components/FormButton';

import { signup, setDefaultSignUpError } from '../redux/slice/userSlice';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const errorSignup = useSelector((state) => state.user.signup);

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (errorSignup === '') {
      return;
    }

    if (errorSignup === 'successful') {
      Alert.alert('Message', 'Signup successful, click OK to Login', [
        { text: 'Ok', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Error', errorSignup, [
        { text: 'Ok', onPress: () => dispatch(setDefaultSignUpError()) },
      ]);
    }
  });

  const handleSignup = () => {
    Keyboard.dismiss();
    if (password !== confirmPassword) {
      return;
    }
    dispatch(
      signup({ name, userName, password, retypePassword: confirmPassword })
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create an account</Text>
          </View>
          <View>
            <FormInputWithIcon
              icon='person'
              color='#54c7ec'
              placeholder='Name'
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <FormInputWithIcon
              icon='person'
              color='#54c7ec'
              placeholder='User Name'
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            <FormInputWithIcon
              icon='lock-closed'
              color='#54c7ec'
              placeholder='Password'
              value=''
              textContentType='password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <FormInputWithIcon
              icon='lock-closed'
              color='#54c7ec'
              placeholder='Confirm Password'
              value=''
              textContentType='password'
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
              error={password !== confirmPassword}
            />
          </View>
          <View>
            <FormButton
              title='Sign Up'
              color='white'
              style={{ backgroundColor: '#54c7ec' }}
              onPress={handleSignup}
            />

            <FormButton
              title='Have an account? Sign In'
              color='#54c7ec'
              style={{ backgroundColor: 'white' }}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
        {/* <Modal animationType={'slide'} transparent={false} visible={true}>
          <Text>AAa</Text>
        </Modal> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 40,
  },
});

export default SignupScreen;
