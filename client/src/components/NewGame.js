import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function NewGame() {
  const [name] = useState("");
  const navigate = useNavigate();

 

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/game/${name}`);
  };

  return (
    <div className="App">
      <h1>Guessing Number Game</h1>
      <form onSubmit={handleSubmit}>
        
        <button type="submit">Start a New Game</button>
      </form>
    </div>
  );
}

export default NewGame;
