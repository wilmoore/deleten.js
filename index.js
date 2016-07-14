'use strict'

var curry2 = require('curry2')
var debug = require('debug')('deleten')
var dotted = require('brackets2dots')
var splits = require('dotsplit.js')
var string = Object.prototype.toString

module.exports = curry2(deleten)

/**
 * Curried function that removes a deeply-nested property from an object via dot/bracket-notation.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
 *
 * @param {String|Array} path
 * Dot/bracket-notation string path or array.
 *
 * @param {Object} object
 * Source object.
 *
 * @throws
 * @return {Function|Boolean}
 * (1) returns `deleten/1` when partially applied.
 * (2) throws in strict mode if the property is an own non-configurable property (returns false in non-strict).
 * (3) returns true in all other cases.
 */

function deleten (path, object) {
  var idx = -1
  var seg = string.call(path) === '[object Array]' ? path : splits(dotted(path))
  var end = seg.length
  var ref = end ? object : void 0

  debug('seg:', seg)
  debug('ref:', ref)

  while (++idx < (end - 1)) {
    debug('while:1:ref:', ref)
    if (Object(ref) !== ref) return true
    ref = ref[seg[idx]]
    debug('while:4:ref:', ref)
  }

  if (seg[idx] in ref) {
    debug(`KEY (${seg[idx]}) in (${ref}): "${ref[seg[idx]]}"`)
    delete ref[seg[idx]]
    debug('ref:object:', object)
  } else {
    debug(`KEY (${seg[idx]}) in (${ref}): NOT FOUND!`)
  }

  return true
}
