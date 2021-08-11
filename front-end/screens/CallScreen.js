import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Peer from 'peerjs';

const CallScreen = () => {
  const [localStream, setLocalStream] = useState();
  const peer = new Peer(undefined, {
    host: 'localhost',
    port: '9001',
  });

  useEffect(() => {});

  return (
    <View>
      <Text>Call screen</Text>
    </View>
  );
};

const styles = StyleSheet.create();

export default CallScreen;
