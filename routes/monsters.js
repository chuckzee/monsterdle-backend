var express = require('express');
var router = express.Router();
var returnMonsterData = require('../services/getMonsterData.js');
var evaluateGuess = require('../services/evaluateGuess.js');

router.get('/:id', async function(req, res, next) {
  let monsterId = req.params.id;
  let tipNumber = parseInt(req.query.guessNumber);
  let monsterData = await returnMonsterData(monsterId, tipNumber);
  res.send(monsterData);
});

router.get('/:id/guess', function(req, res, next) {
  let monsterId = req.params.id; // Get id from path parameters
  let guess = req.query.guess; // Get guess from query parameters
  let guessNumber = parseInt(req.query.guessNumber);
  let correctness = evaluateGuess(monsterId, guess);
  // if result is { correct: false } & guessNumber >= 7, send the response
  // otherwise, sent returnMonsterData(monsterId, guessNumber +1)
  res.send(correctness);
});

module.exports = router;
