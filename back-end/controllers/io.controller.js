const User = require('../models/User');
const ChatLine = require('../models/Chat-Line');

let onlinePeople = new Map();

module.exports = (io) => {
  io.on('connection', (socket) => {
    const socketId = socket.id;
    console.log(socketId + 'connected');

    socket.on('loginSuccessful', ({ userId }) => {
      onlinePeople.set(socketId, userId);
      console.log(onlinePeople);
    });

    // socket.on('typingMessage', ({}))

    socket.on('sendMessage', ({ chatId, chatUserId, line }) => {
      console.log(chatId, chatUserId, line);
      const userId = onlinePeople.get(socketId);
      const chatLine = new ChatLine({
        chat_id: chatId,
        user_id: userId,
        line: line,
      });
      chatLine.save();

      let socketIdChatUserId = '';
      onlinePeople.forEach((value, key) => {
        if (value === chatUserId) {
          socketIdChatUserId = key;
        }
      });

      if (socketIdChatUserId !== '') {
        console.log('receive message active');
        console.log(socketIdChatUserId);
        io.to(socketIdChatUserId).emit('receiveMessage', {
          chatId,
          userId,
          line,
        });
      }
    });

    socket.on('disconnect', async () => {
      const userId = onlinePeople.get(socketId);
      const user = await User.findById(userId);
      if (user) {
        user.status = false;
        await user.save();
      }

      onlinePeople.delete(socketId);
    });
  });
};
