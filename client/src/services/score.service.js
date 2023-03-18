import axios from "axios";

const API_URL = "/api/scores";

export const getScores = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve scores from the server");
  }
};

export const createScore = async (name, score, guesses) => {
  try {
    const response = await axios.post(API_URL, { name, score, guesses });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create score on the server");
   }
};
 