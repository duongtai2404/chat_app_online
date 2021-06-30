const User = require('../models/User');

const getOnlinePeople = async (req, res) => {
  let onlinePeople = await User.find({ status: true });
  onlinePeople = onlinePeople.map((person) => {
    return { peopleId: person.id, peopleName: person.name };
  });
  return res.status(200).json(onlinePeople);
};

module.exports = { getOnlinePeople };
