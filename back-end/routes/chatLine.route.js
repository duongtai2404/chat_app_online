const express = require('express');

const {
  getChatsWithChatId,
  createChatLine,
} = require('../controllers/chatLine.controller');

const route = express.Router();

route.get('/:chatId', getChatsWithChatId);

route.post('/', createChatLine);

module.exports = route;
