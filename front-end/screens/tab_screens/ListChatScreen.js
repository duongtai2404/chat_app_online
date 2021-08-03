import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ElementList from '../../components/ElementList';
import HeaderTab from '../../components/HeaderTab';
const ListChatScreen = ({ navigation }) => {
  const chats = useSelector((state) => state.listChat.chats);
  const renderItem = ({ item }) => {
    return (
      <ElementList
        title={item.chatUserName}
        message='Chat here'
        type='chat'
        navigation={navigation}
        idItem={item.chatUserId}
        chatId={item.chatId}
      />
    );
  };

  return (
    <View>
      <HeaderTab title='Chat' />
      <View style={styles.container}>
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.chatId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 10,
  },
});

export default ListChatScreen;
