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
  let guess = req.query.guessNumber; // Get guess from query parameters
  let result = evaluateGuess(monsterId, guess);
  res.send(result);
});

module.exports = router;
