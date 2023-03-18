const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  guesses: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Game", gameSchema);
