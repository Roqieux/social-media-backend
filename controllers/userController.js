const { User, Thought } = require('../models');

// Get all users

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ msg: `No users found`, error: error });
    }
};

// Get one user -> use _id

const getOneUser = async (req, res) => {
    try {
        const singleUser = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');
        res.status(200).json(singleUser);
    } catch (error) {
        res.status(404).json({ msg: `User not found with that id` });
    }
};

// Post one user -> create one

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ msg: `new user creation was unsuccessful`, error });
    }
};

// Put one user -> update using _id
// Delete one user -> delete using _id