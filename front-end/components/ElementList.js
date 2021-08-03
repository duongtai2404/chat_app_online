import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';

import { createChat } from '../redux/slice/listChatSlice';

const ElementList = ({ title, message, type, idItem, navigation, chatId }) => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.listChat.chats);

  const renderRightAction = (icon, color, backgroundColor, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: backgroundColor }]}
        >
          <Icon name={icon} size={30} color={color} />
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress) => {
    const color = type === 'people' ? '#45F080' : '#0564FC';
    const icon = type === 'people' ? 'account-plus' : 'delete';
    return (
      <View style={{ width: 85, flexDirection: 'row' }}>
        {renderRightAction(icon, '#ffffff', color, 85, progress)}
      </View>
    );
  };

  const handleOnPressItem = () => {
    switch (type) {
      case 'friend':
        handleCreateChatForFriend();
        return;
      case 'chat':
        navigateToChat();
        return;
      case 'people':
        return;
      default:
        return;
    }
  };

  const handleCreateChatForFriend = () => {
    const chat = chats.filter((element) => element.chatUserId === idItem);
    console.log(chat);
    if (chat.length === 0) {
      dispatch(createChat({ chatUserId: idItem }));
    }
    navigation.jumpTo('Chat');
  };

  const navigateToChat = () => {
    navigation.navigate('MainChat', { id: idItem, name: title, chatId });
  };

  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      <TouchableOpacity onPress={handleOnPressItem}>
        <View style={styles.item}>
          <Image source={require('../assets/image.jpg')} style={styles.image} />
          <View>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  message: {
    color: 'gray',
    fontSize: 13,
    marginTop: 3,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 75,
  },
});

export default ElementList;
