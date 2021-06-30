const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const login = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    return res
      .status(404)
      .json({ error: 'Your username or password does not exist' });
  }

  const equalPassword = bcrypt.compareSync(password, user.password);
  if (!equalPassword) {
    return res
      .status(404)
      .json({ error: 'Your username or password does not exist' });
  }

  const token = jwt.sign(
    { userId: user._id, name: user.name },
    'somesecretkey',
    { expiresIn: '1h' }
  );

  user.status = true;

  await user.save();

  return res.status(200).json({
    userId: user._id,
    name: user.name,
    token: token,
    tokenExpiration: '1h',
  });
};

module.exports = { login };
