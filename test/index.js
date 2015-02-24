'use strict';

var generateAutoId = require('../');
var test       = require('tape');
var sinon      = require('sinon');

function id () {
  return generateAutoId(new Date().getTime());
}


test('general properties', function (t) {
  t.ok(id().length === 20, 'length is 20');
  t.end();
});

test('time ordering', function (t) {
  var clock = sinon.useFakeTimers();
  var id1 = id();
  clock.tick(1);
  var id2 = id();
  clock.tick(1);
  var id3 = id();
  t.ok(id1 < id2);
  t.ok(id2 < id3);
  clock.restore();
  t.end();
});

test('call ordering', function (t) {
  var clock = sinon.useFakeTimers();
  var id1 = id();
  var id2 = id();
  var id3 = id();
  t.ok(id1 < id2);
  t.ok(id2 < id3);
  clock.restore();
  t.end();
});

