import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import HeaderTab from '../components/HeaderTab';
import ElementChat from '../components/ElementChat';
import {
  sendChat,
  getChatLines,
  setIsGettingChatToDefault,
  receiveMessageInSlice,
} from '../redux/slice/chatLineSlice';
import LoadingScreen from './LoadingScreen';
import {
  sendMessage,
  receiveMessage,
  removeListenerReceiveMessage,
} from '../utils/io';

const Chat = ({ route, navigation }) => {
  const { chatId, id, name } = route.params;
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    const pos = state.chatLine.data.findIndex((e) => e.chatId === chatId);
    if (pos > -1) {
      return state.chatLine.data[pos].chats;
    } else {
      return null;
    }
  });

  const [input, changeInput] = useState('');
  const [receiveMessageData, changeReceiveMessageData] = useState({});

  const renderItem = ({ item }) => {
    const { user_id, line } = item;
    return <ElementChat isRight={user_id !== id} chatLine={line} />;
  };

  const send = () => {
    if (input !== '') {
      dispatch(sendChat({ chatId, chatUserId: '', chatLine: input }));
      sendMessage({ chatId, chatUserId: id, line: input });
    }
    changeInput('');
  };

  useEffect(() => {
    if (data === null) {
      dispatch(getChatLines({ chatId }));
    }
    receiveMessage().then((data) => {
      removeListenerReceiveMessage();
      dispatch(receiveMessageInSlice(data));
      changeReceiveMessageData(data);
    });
    return () => {
      removeListenerReceiveMessage();
    };
  }, [receiveMessageData]);

  return (
    <View style={styles.container}>
      <HeaderTab isChat={true} title={name} navigation={navigation} />
      {data === null ? (
        <LoadingScreen />
      ) : (
        <KeyboardAvoidingView behavior='padding' style={styles.containerChat}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={data}
              renderItem={renderItem}
              inverted={true}
              keyExtractor={(item) => {
                return item._id;
              }}
            />
          </TouchableWithoutFeedback>
          <View style={styles.footerChat}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Aa'
                style={styles.input}
                onChangeText={(value) => changeInput(value)}
                value={input}
              />
            </View>
            <TouchableOpacity style={styles.buttonSend} onPress={send}>
              <View>
                <Icon name='send' size={28} color='black' />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerChat: {
    flex: 1,
    // paddingHorizontal: 15,
    justifyContent: 'flex-end',
  },
  bodyChat: {
    marginBottom: 20,
  },
  footerChat: {
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 7,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: '#E6E6E6',
  },
  input: {
    fontSize: 18,
    color: 'black',
  },
  buttonSend: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Chat;
