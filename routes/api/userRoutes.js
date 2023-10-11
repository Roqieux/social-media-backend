const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

const {
  addFriend,
  removeFriend,
} = require('../../controllers/friendController');

// /api/users
router.route('/').post(createUser).get(getAllUsers);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// /api/users/:userId
router.route('/:userId').get(getOneUser).delete(deleteUser).put(updateUser);

module.exports = router;