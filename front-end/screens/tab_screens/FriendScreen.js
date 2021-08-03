import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderTab from '../../components/HeaderTab';
import ElementList from '../../components/ElementList';

const FriendScreen = ({ navigation }) => {
  const friends = useSelector((state) => state.friends.friends);

  const renderItem = ({ item }) => {
    return (
      <ElementList
        title={item.friendName}
        message=''
        navigation={navigation}
        type='friend'
        idItem={item.friendId}
      />
    );
  };

  return (
    <View>
      <HeaderTab title='Friend' />
      <View style={styles.container}>
        <FlatList
          data={friends}
          renderItem={renderItem}
          keyExtractor={(item) => item.friendId}
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

export default FriendScreen;
