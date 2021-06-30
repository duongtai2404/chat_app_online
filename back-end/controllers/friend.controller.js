const User = require('../models/User');
const { findUserWithId } = require('../utils/user');

const getFriends = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);

  let friends = user.friends;

  friends = await Promise.all(
    friends.map(async (friend) => {
      const name = await findUserWithId(friend);
      //   const name = await User.findById(friend);
      return { friendId: friend, friendName: name };
    })
  );

  return res.status(200).json(friends);
};

const createFriend = async (req, res) => {
  const userId = req.userId;
  const { friendId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  const friend = await User.findById(friendId);
  if (!friend) {
    return res.status(404).json({ error: 'Friend does not exist' });
  }

  const friends = user.friends;
  const index = friends.indexOf(friendId);
  if (index > -1) {
    return res.status(400).json({ error: 'Have friend with friendId' });
  }

  friends.unshift(friendId);
  await user.save();
  return res.status(200).json({
    message: 'Add friend successful',
    friendId,
    friendName: friend.name,
  });
};

const deleteFriend = async (req, res) => {
  const { friendId } = req.params;
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  const friends = user.friends;
  const index = friends.indexOf(friendId);

  if (index < 0) {
    return res.status(404).json({ error: 'Do not have friend with friendId' });
  }

  friends.splice(index, 1);

  await user.save();
  return res.status(200).json({ message: 'Unfriend successful' });
};

module.exports = { getFriends, deleteFriend, createFriend };
