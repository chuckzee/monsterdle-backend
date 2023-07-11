const monsters = require('../data/monster_data.json');
const FuzzySet = require('fuzzyset.js');

function evaluateGuess(monsterId, guess) {
  // Get the target monster name
  const targetName = monsters.monsters[monsterId].name;

  // Create a FuzzySet instance and add the target monster name to it
  const fuzzyset = FuzzySet();
  fuzzyset.add(targetName);

  // Perform a fuzzy match between the user's guess and the target monster name
  const result = fuzzyset.get(guess, null, 0.75); // 0.5 is the default threshold

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
