import React, { useState, useEffect } from "react";
import axios from "axios";

const Score = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios
      .get("/api/scores")
      .then((res) => setScores(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="score-container">
      <h2>Scores:</h2>
      {scores.length ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Attempts</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No scores found.</p>
      )}
    </div>
  );
};

export default Score;
