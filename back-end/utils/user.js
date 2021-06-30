const User = require('../models/User');

const findUserWithId = async (userId) => {
  const user = await User.findById(userId);
  return user.name;
};

module.exports = { findUserWithId };
