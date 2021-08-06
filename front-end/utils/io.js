import io from 'socket.io-client';
import YOUR_IP_COMPUTER from '../constants';

const SERVER_URL = `http://${YOUR_IP_COMPUTER}:9000`;

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
