const User = require('../models/User');

const getOnlinePeople = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  const friends = [...user.friends];
  friends.push(userId);
  let onlinePeople = await User.find({ _id: { $nin: friends } });
  onlinePeople = onlinePeople.map((person) => {
    return {
      peopleId: person.id,
      peopleName: person.name,
      peopleStatus: person.status,
    };
  });
  return res.status(200).json(onlinePeople);
};

module.exports = { getOnlinePeople };
