const ChatLine = require('../models/Chat-Line');
const Chat = require('../models/Chat');
const User = require('../models/User');

const getChatsWithChatId = async (req, res) => {
  const { chatId } = req.params;

  const chats = await ChatLine.find({ chat_id: chatId });

  chats.reverse();

  return res.status(200).json(chats);
};

const createChatLine = async (req, res) => {
  const { chatId, userId, line } = req.body;

  const existChat = await Chat.findById(chatId);
  if (!existChat) {
    return res.status(404).json({ error: 'Chat is not exist' });
  }
  const existUser = await User.findById(userId);
  if (!existUser) {
    return res.status(404).json({ error: 'User is not exist' });
  }

  const chatLine = new ChatLine({
    chat_id: chatId,
    user_id: userId,
    line: line,
  });

  await chatLine.save();
  return res.status(200).json(chatLine);
};

module.exports = { getChatsWithChatId, createChatLine };
