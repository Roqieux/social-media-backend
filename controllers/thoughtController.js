const { Thought, User } = require('../models');

// Get all thoughts

const getAllThoughts = async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(404).json({ msg: `No thoughts found`, error: error });
    }
  };

// Get a single thought

const getThought = async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      res.status(200).json(thought);
    } catch (error) {
      res.status(404).json({ msg: `No thoughts found with id` });
    }
  };

// Create a new thought

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const updatedUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
    res.status(200).json({ thought, updatedUser });
  } catch (error) {
    console.log(error);
  }
};

// update a thought

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(404).json({ msg: `No thoughts found with this id`, err: err });
  }
};

// Delete a thought

const deleteThought = async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete({
        _id: req.params.thoughtId,
      });
      res.status(200).json({ message: 'thought deleted!', deletedThought });
    } catch (error) {
      res.status(404).json({ msg: `No users found`, error: error });
    }
  };

module.exports = {
  getAllThoughts,
  getThought,
  createThought,
  deleteThought,
  updateThought,
};