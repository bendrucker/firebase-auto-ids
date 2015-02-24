'use strict';

var allowedCharacters = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
// allowedCharacters.length = 64

var run = {
  time: 0,
  randomCharacterIndexes: []
};

function generateTimeId (now) {
  var length = 8;
  var characters = new Array(length);
  for (var i = length - 1; i >= 0; i--) {
    characters[i] = allowedCharacters.charAt(now % 64);
    now = Math.floor(now / 64);
  }
  return characters.join('');
}

var generateIndexes = {
  random: function randomCharacterIndexes () {
    for (var i = 0; i < 12; i++) {
      run.randomCharacterIndexes[i] = Math.floor(Math.random() * 64);
    }
  },
  sequential: function collisionSafeCharacterIndexes () {
    for (var i = 11; i >= 0 && run.randomCharacters[i] === 63; i--) {
      run.randomCharacters[i] = 0;
    }
    run.randomCharactersIndexes[i]++;
  }
};

module.exports = function generateAutoId (now) {
  var uniqueTime = now !== run.time;
  run.time = now;
  var id = generateTimeId(now);
  generateIndexes[uniqueTime ? 'random' : 'sequential']();
  return run.randomCharacterIndexes
    .map(function (index) {
      return allowedCharacters[index];
    })
    .reduce(function (id, character) {
      return id + character;
    }, id);
};
