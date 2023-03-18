const Score = require("../models/Score");

// GET /api/scores
exports.getScores = async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1, guesses: 1 }).limit(10);
    res.json(scores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/scores
exports.createScore = async (req, res) => {
  const { name, score, guesses } = req.body;
  if (!name || !score || !guesses) {
    return res
      .status(400)
      .json({ message: "Please provide a name, score, and number of guesses" });
  }
  const newScore = new Score({ name, score, guesses });
  try {
    await newScore.save();
    res.json(newScore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
