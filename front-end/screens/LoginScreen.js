import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FormInputWithIcon from '../components/FormInputWithIcon';
import FormButton from '../components/FormButton';

import { login, setDefaultLoginError } from '../redux/slice/userSlice';
import { getChats } from '../redux/slice/listChatSlice';
import { getFriends } from '../redux/slice/friendsSlice';
import { getPeople } from '../redux/slice/peopleSlice';
import { loginSuccessful } from '../utils/io';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const errorLogin = useSelector((state) => state.user.login);
  const userId = useSelector((state) => state.user.userId);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    errorName: false,
    errorPassword: false,
  });

  useEffect(() => {
    if (errorLogin === '') {
      return;
    }

    if (errorLogin === 'successful') {
      loginSuccessful(userId);
      dispatch(getChats());
      dispatch(getFriends());
      dispatch(getPeople());
    } else {
      Alert.alert('Error', errorLogin, [
        { text: 'Ok', onPress: () => dispatch(setDefaultLoginError()) },
      ]);
    }
  });

  const handleLogin = () => {
    if (userName === '' || password === '') {
      return;
    }
    Keyboard.dismiss();
    dispatch(login({ userName, password }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login</Text>
          </View>
          <View>
            <FormInputWithIcon
              icon='person'
              color='#54c7ec'
              placeholder='User Name'
              value={userName}
              error={error.errorName}
              onChangeText={(text) => {
                if (text === '') {
                  setError({ ...error, errorName: true });
                } else {
                  setError({ ...error, errorName: false });
                }
                setUserName(text);
              }}
            />
            <FormInputWithIcon
              icon='lock-closed'
              color='#54c7ec'
              placeholder='Password'
              value=''
              textContentType='password'
              value={password}
              error={error.errorPassword}
              onChangeText={(text) => {
                if (text === '') {
                  setError({ ...error, errorPassword: true });
                } else {
                  setError({ ...error, errorPassword: false });
                }
                setPassword(text);
              }}
              secureTextEntry={true}
            />
          </View>
          <View>
            <FormButton
              title='Sign In'
              color='white'
              style={{ backgroundColor: '#54c7ec' }}
              onPress={handleLogin}
            />

            <FormButton
              title='Dont have an account? Create here'
              color='#54c7ec'
              style={{ backgroundColor: 'white' }}
              onPress={() => navigation.navigate('Signup')}
            />
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 50,
  },
});

export default LoginScreen;
