const bcrypt = require('bcrypt');
const User = require('../models/User');

const signup = async (req, res) => {
  const { name, userName, password, retypePassword } = req.body;

  if (password !== retypePassword) {
    return res.status(404).json({ error: 'Retype' });
  }
  let user = await User.findOne({ userName });
  if (user) {
    return res.status(409).json({ error: 'Account exist !' });
  }
  const encodePassword = bcrypt.hashSync(password, 10);

  user = new User({ name, userName, password: encodePassword });

  try {
    await user.save();
    return res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { signup };
