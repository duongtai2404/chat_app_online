const jwt = require('jsonwebtoken');

const User = require('../models/User');

const isAuth = async (req, res, next) => {
  const authorization = req.get('Authorization');
  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorization' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { userId, name } = jwt.verify(token, 'somesecretkey');
    req.userId = userId;
    // const user = await User.findById(userId);
    // user.status = true;
    // await user.save();
  } catch (error) {
    return res.status(400).json({ error: 'Incorrect token' });
  }

  return next();
};

module.exports = isAuth;
