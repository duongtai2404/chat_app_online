const express = require('express');

const {
  getChats,
  createChat,
  deleteChat,
} = require('../controllers/chat.controller');

const route = express.Router();

route.get('/', getChats);

route.post('/', createChat);

route.delete('/:chatId', deleteChat);

module.exports = route;
