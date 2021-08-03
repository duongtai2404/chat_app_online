import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderTab from '../../components/HeaderTab';
import ElementList from '../../components/ElementList';

import { getPeople } from '../../redux/slice/peopleSlice';

const PeopleScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.people);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      dispatch(getPeople());
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <ElementList
        title={item.peopleName}
        message={item.peopleStatus ? 'online' : 'offline'}
        type='people'
      />
    );
  };
  return (
    <View>
      <HeaderTab title='People' />
      <View style={styles.container}>
        <FlatList
          data={people}
          renderItem={renderItem}
          keyExtractor={(item) => item.peopleId}
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

export default PeopleScreen;
