const monsters = require('../data/monster_data.json');
const FuzzySet = require('fuzzyset.js');
const _ = require('lodash');

function evaluateGuess(monsterId, guess) {
  // Get the target monster name
  const targetName = monsters.monsters[monsterId].name;

  // Remove all non-alphanumeric characters and convert to lowercase
  const cleanedTargetName = targetName.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
  const cleanedGuess = guess.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();

  // Split into words, sort, and join back together
  const sortedTargetName = _.sortBy(cleanedTargetName.split(' ')).join(' ');
  const sortedGuess = _.sortBy(cleanedGuess.split(' ')).join(' ');

  // Create a FuzzySet instance and add the sorted target monster name to it
  const fuzzyset = FuzzySet();
  fuzzyset.add(sortedTargetName);

  // Perform a fuzzy match between the user's sorted guess and the sorted target monster name
  const result = fuzzyset.get(sortedGuess, null, 0.75); // 0.5 is the default threshold

  // If a match was found and its score is greater than or equal to the threshold, the guess is correct
  const correctness = result !== null && result[0][0] >= 0.75;

  // Prepare the response
  let response;
  if (correctness) {
    const monsterData = monsters.monsters[monsterId];
    response = {"correct": true, "monster": monsterData};
  } else {
    response = {"correct": false};
  }

  return response;
}

module.exports = evaluateGuess;