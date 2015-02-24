'use strict';

var allowedCharacters = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
// allowedCharacters.length = 64

function IdGenerator () {
  this.run = {
    time: 0,
    randomCharacterIndexes: []
  };
}

IdGenerator.prototype.time = function () {
  var length = 8;
  var characters = new Array(length);
  var now = this.run.time;
  for (var i = length - 1; i >= 0; i--) {
    characters[i] = allowedCharacters.charAt(now % 64);
    now = Math.floor(now / 64);
  }
  return characters.join('');
};

IdGenerator.prototype.random = function (sequential) {
  var indexes = this.run.randomCharacterIndexes;
  var i;
  if (!sequential) {
    for (i = 0; i < 12; i++) {
      indexes[i] = Math.floor(Math.random() * 64);
    }
  }
  else {
    for (i = 11; i >= 0 && indexes[i] === 63; i--) {
      indexes[i] = 0;
    }
    indexes[i]++;
  }
  return indexes.map(function (index) {
    return allowedCharacters[index];
  })
  .reduce(function (id, character) {
    return id + character;
  }, '');
};

IdGenerator.prototype.generate = function (now) {
  var uniqueTime = now !== this.run.time;
  this.run.time = now;
  return this.time() + this.random(!uniqueTime);
};

module.exports = IdGenerator;
