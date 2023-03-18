const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const gameRoutes = require("./routes/gameRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// const uri = process.env.DB_URI;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/game', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the gameRoutes middleware for all requests starting with "/api"
app.use("/api", gameRoutes);

// Serve the static client files from the "client/build" folder in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
