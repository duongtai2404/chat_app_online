import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import MainScreen from './screens/MainScreen';

import store from './redux/store/store';
import { Provider } from 'react-redux';
import { connectToServer } from './utils/io';

export default function App() {
  useEffect(() => {
    connectToServer();
  });
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
