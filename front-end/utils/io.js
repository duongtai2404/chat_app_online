import io from 'socket.io-client';

const SERVER_URL = 'http://192.168.1.7:9000/';

var socket;

const connectToServer = () => {
  socket = io(SERVER_URL);
};

const loginSuccessful = (userId) => {
  socket.emit('loginSuccessful', { userId });
};

const sendMessage = ({ chatId, chatUserId, line }) => {
  socket.emit('sendMessage', { chatId, chatUserId, line });
};

const receiveMessage = () => {
  return new Promise((resolve) => {
    socket.on('receiveMessage', (data) => {
      resolve(data);
    });
  });
};

const removeListenerReceiveMessage = () => {
  socket.removeAllListeners('receiveMessage');
};

export {
  connectToServer,
  loginSuccessful,
  sendMessage,
  receiveMessage,
  removeListenerReceiveMessage,
};
