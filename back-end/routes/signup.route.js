const express = require('express');

const { signup } = require('../controllers/signup.controller');

const route = express.Router();

route.post('/', signup);

module.exports = route;
