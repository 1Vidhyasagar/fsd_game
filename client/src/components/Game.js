import React, { useState, useEffect } from "react";
import { createScore } from "../services/score.service";

const Game = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");
  const [numGuesses, setNumGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [setWin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (number.length !== 4 || new Set(number).size !== 4) {
      setMessage(
        "Please enter a valid 4-digit number with no repeating digits"
      );
      return;
    }
    checkNumber(number);
    setNumber("");
    setNumGuesses(numGuesses + 1);
  };

  const checkNumber = (num) => {
    let plusCount = 0;
    let minusCount = 0;
    for (let i = 0; i < 4; i++) {
      if (num[i] === guesses[i]) {
        plusCount++;
      } else if (guesses.includes(num[i])) {
        minusCount++;
      }
    }
    if (plusCount === 4) {
      setGameOver(true);
      setWin(true);
      setMessage(
        `Congratulations ${name}! You guessed the number in ${numGuesses} tries.`
      );
      createScore(name, numGuesses, guesses.length)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    } else {
      setMessage(`+${plusCount} -${minusCount}`);
    }
  };

  useEffect(() => {
    const generateNumber = () => {
      const digits = "0123456789";
      let num = "";
      while (num.length < 4) {
        const index = Math.floor(Math.random() * digits.length);
        const digit = digits[index];
        if (!num.includes(digit)) {
          num += digit;
        }
      }
      setGuesses(num);
    };
    generateNumber();
  }, []);

  const handleNewGame = () => {
    setNumGuesses(0);
    setGameOver(false);
    setWin(false);
    setMessage("");
    setName("");
    setGuesses([]);
    const generateNumber = () => {
      const digits = "0123456789";
      let num = "";
      while (num.length < 4) {
        const index = Math.floor(Math.random() * digits.length);
        const digit = digits[index];
        if (!num.includes(digit)) {
          num += digit;
        }
      }
      setGuesses(num);
    };
    generateNumber();
  };

  return (
    <div className="game">
      {!gameOver ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            Guess:
            <input
              type="text"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
          </label>
          <button type="submit">Guess</button>
          <p>{message}</p>
        </form>
      ) : (
        <>
          <h2>{message}</h2>
          <button onClick={handleNewGame}>New Game</button>
        </>
      )}
    </div>
  );
};

export default Game;
