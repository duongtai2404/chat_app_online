const express = require('express');
const {
  getFriends,
  deleteFriend,
  createFriend,
} = require('../controllers/friend.controller');

const route = express.Router();

route.get('/', getFriends);

route.post('/', createFriend);

route.delete('/:friendId', deleteFriend);

module.exports = route;
