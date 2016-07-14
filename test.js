'use strict'

var test = require('tape-catch')

var deleten = require('./')

test('deleten/1', function (t) {
  var del = deleten('foo.bar')
  t.equal(typeof del, 'function', 'returns function')
  t.equal(del.length, 1, 'returns function/1 (unary)')

  var source = { foo: { bar: 1 } }
  var result = { foo: {} }

  t.strictEqual(del(source), true, 'returns true when property exists')
  t.deepEqual(source, result, 'removes property from source object')

  t.end()
})

test('deleten on array element', function (t) {
  var source = {
    half_damage_from: [
      {
        url: 'http://pokeapi.co/api/v2/type/2/',
        name: 'fighting'
      },
      {
        url: 'http://pokeapi.co/api/v2/type/7/',
        name: 'bug'
      },
      {
        url: 'http://pokeapi.co/api/v2/type/12/',
        name: 'grass'
      }
    ]
  }

  var result = {
    half_damage_from: [
      {},
      {
        url: 'http://pokeapi.co/api/v2/type/7/',
        name: 'bug'
      },
      {
        url: 'http://pokeapi.co/api/v2/type/12/',
        name: 'grass'
      }
    ]
  }
  delete result.half_damage_from[0]

  t.strictEqual(deleten('half_damage_from[0]', source), true, 'returns true when property exists')
  t.deepEqual(source, result, 'removes property from source object')

  t.end()
})

test('deleten() on property that does not exist', function (t) {
  var source = {}
  t.strictEqual(deleten('a.b.c', source), true, 'returns true when property does not exist')
  t.end()
})
