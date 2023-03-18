const express = require("express");
const router = express.Router();

const Game = require("../models/Game");

// Endpoint for starting a new game
router.post("/new-game", async (req, res) => {
  try {
    const { name } = req.body;
    const answer = generateAnswer();
    const game = new Game({ name, answer });
    await game.save();
    res.status(201).json({ gameId: game._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for guessing a number
router.post("/guess/:gameId", async (req, res) => {
  try {
    const { guess } = req.body;
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    if (game.status === "SOLVED") {
      return res.status(400).json({ error: "Game has already been solved" });
    }
    const result = evaluateGuess(guess, game.answer);
    const guessCount = game.guesses.length + 1;
    game.guesses.push({ guess, result });
    if (result === "++++") {
      game.status = "SOLVED";
      await game.save();
    }
    res.json({ result, guessCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to generate a random answer
function generateAnswer() {
  const digits = [];
  while (digits.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  return digits.join("");
}

// Helper function to evaluate a guess and return the result string
function evaluateGuess(guess, answer) {
  let result = "";
  for (let i = 0; i < 4; i++) {
    if (guess[i] === answer[i]) {
      result += "+";
    } else if (answer.includes(guess[i])) {
      result += "-";
    } else {
      result += "*";
    }
  }
  return result;
}

module.exports = router;
