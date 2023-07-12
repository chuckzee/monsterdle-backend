const monsters = require('../data/monster_data.json');
const FuzzySet = require('fuzzyset.js');
const _ = require('lodash');

function evaluateGuess(monsterId, guess) {
  const targetName = monsters.monsters[monsterId].name;

  const cleanedTargetName = targetName.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
  const cleanedGuess = guess.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();

  const sortedTargetName = _.sortBy(cleanedTargetName.split(' ')).join(' ');
  const sortedGuess = _.sortBy(cleanedGuess.split(' ')).join(' ');

  const fuzzyset = FuzzySet();
  fuzzyset.add(sortedTargetName);

  const result = fuzzyset.get(sortedGuess, null, 0.75); // 0.5 is the default threshold

  const correctness = result !== null && result[0][0] >= 0.75;

  return correctness;
}

module.exports = evaluateGuess;