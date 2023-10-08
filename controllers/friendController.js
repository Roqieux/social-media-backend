const { User } = require('../models');

const addFriend = async (req, res) => {
  try {
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(404).json({ msg: `No users with the provided id: ${req.params.userId}`, error: error });
  }
};

const removeFriend = async (req, res) => {
  try {
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(404).json({ msg: `No users found`, error: error });
  }
};

module.exports = {
  addFriend,
  removeFriend,
};