const express = require("express");
const scoreController = require("../controllers/score.controller");

const router = express.Router();

router.get("/scores", scoreController.getScores);
router.post("/scores", scoreController.createScore);

module.exports = router;
