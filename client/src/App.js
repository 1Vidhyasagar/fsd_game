import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Game from "../src/components/Game";
import Score from "../src/components/Score";
import NewGame from "../src/components/NewGame";
import  "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div class="App">
        <ul>
          <li>
            <Link to="/NewGame">New Game</Link>
          </li>
        
          <li>
            <Link to="/Score">Score</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path="/" element={<NewGame />}></Route>
          <Route exact path="/Game" element={<Game />}></Route>
          <Route exact path="/Score" element={<Score />}></Route>{" "}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
