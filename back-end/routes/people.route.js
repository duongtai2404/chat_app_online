const express = require('express');
const { getOnlinePeople } = require('../controllers/people.controller');

const route = express.Router();

route.get('/', getOnlinePeople);

module.exports = route;
