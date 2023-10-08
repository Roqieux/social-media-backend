const { Thought } = require('../models');

// Create a reaction

const createReaction = async (req, res) => {
  try {
    const thoughtUpdate = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    res.status(200).json(thoughtUpdate);
  } catch (error) {
    console.log(error);
  }
};

// Delete a reaction

const removeReaction = async (req, res) => {
  try {
    const thoughtUpdate = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    res.status(200).json(thoughtUpdate);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createReaction,
  removeReaction,
};