const mongoose = require('mongoose');
const Chat = require('../models/Chat');
const User = require('../models/User');

const { findUserWithId } = require('../utils/user');

const getChats = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.userId);
  let chats = await Chat.find({
    $or: [{ user1_id: userId }, { user2_id: userId }],
  });

  chats = await Promise.all(
    chats.map(async (chat) => {
      const chatUserId = userId.equals(chat.user1_id)
        ? chat.user2_id
        : chat.user1_id;
      return {
        chatId: chat._id,
        chatUserId: chatUserId,
        chatUserName: await findUserWithId(chatUserId),
      };
    })
  );

  return res.status(200).json(chats);
};

const createChat = async (req, res) => {
  const chatUserId = req.body.chatUserId;
  const userId = req.userId;

  const user = await User.findById(userId);
  const chatUser = await User.findById(chatUserId);
  if (!chatUser) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  const index = user.friends.indexOf(chatUserId);
  if (index < 0) {
    return res.status(404).json({ error: 'Not Friend' });
  }

  let chat = await Chat.findOne({
    $or: [
      { $and: [{ user1_id: userId }, { user2_id: chatUserId }] },
      { $and: [{ user1_id: chatUserId }, { user2_id: userId }] },
    ],
  });
  if (chat) {
    return res.status(200).json({
      chatId: chat.id,
      chatUserId: chatUserId,
      chatUserName: chatUser.name,
      message: 'created',
    });
  }

  chat = new Chat({
    user1_id: userId,
    user2_id: chatUserId,
  });

  try {
    chat = await chat.save();
    const chatId = chat.id;
    user.chats.unshift(chat.id);
    chatUser.chats.unshift(chat.id);
    await user.save();
    await chatUser.save();
    return res.status(200).json({
      chatId: chatId,
      chatUserId: chatUserId,
      chatUserName: chatUser.name,
    });
  } catch (err) {
    return res.status(400).json({ error: 'Can not create chat' });
  }
};

const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  await Chat.deleteOne({ _id: chatId });
  return res.status(200).json({ message: 'Delete chat successful' });
};

module.exports = { getChats, createChat, deleteChat };
