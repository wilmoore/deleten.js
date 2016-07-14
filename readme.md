# deleten
[![Sauce Test Status](https://saucelabs.com/browser-matrix/wilmoore-deleten.svg)](https://saucelabs.com/u/wilmoore-deleten)
> Curried function that removes a deeply-nested property from an object via dot/bracket-notation.

[![Build Status](http://img.shields.io/travis/wilmoore/deleten.js.svg)](https://travis-ci.org/wilmoore/deleten.js) [![Code Climate](https://codeclimate.com/github/wilmoore/deleten.js/badges/gpa.svg)](https://codeclimate.com/github/wilmoore/deleten.js) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

```shell
npm install deleten --save
```

or

```html
<script src="https://npmcdn.com/deleten/deleten.min.js"></script>
```

> You may also install `deleten` via [Bower], [Duo], or [jspm].

###### npm stats

[![npm](https://img.shields.io/npm/v/deleten.svg)](https://www.npmjs.org/package/deleten) [![NPM downloads](http://img.shields.io/npm/dm/deleten.svg)](https://www.npmjs.org/package/deleten) [![David](https://img.shields.io/david/wilmoore/deleten.js.svg)](https://david-dm.org/wilmoore/deleten.js)

## Overview

###### allows you to refactor this:

    if (contacts && contacts[0] && contacts[0].addresses && contacts[0].addresses[0]) {
      delete contacts[0].addresses[0]
    }

###### into:

    deleten('[0].addresses[0]', contacts)

## Features

  - Mitigates boilerplate guards like `if (obj && obj.a && obj.a.b && obj.a.b.c) { delete obj.a.b.c; }`.
  - Mitigates **TypeError** `Cannot read property '...' of undefined`.
  - Supports multiple levels of array nesting (i.e. `group[0].section.a.seat[3]`).
  - Supports dashed key access (i.e. `stats.temperature-today`).
  - [Partial application is automatic][Un-bind your JS with curry] when you omit the second argument (i.e. `deleten` is curried).
  - Compatible with [modern and legacy browsers][browsers], Node/CommonJS, and AMD.
  - Haskell style [parameter order] allows for [pointfree style programming][Un-bind your JS with curry].

## Non-Features

  - No [eval][] or [Function][] (see: [`eval`][note] in disguise).
  - No [typeof][] since, [typeof][] is not a real solution to this problem but can _appear_ to be due to the way the global scope is _implied_.

## Usage example(s)

#### property accessor for functor
> Avoid wrapping `delete` in anonymous function.

```js
var deleten = require('deleten')
var buttons = [
  { label: 'show', hidden: true },
  { label: 'hide', hidden: false },
  { label: 'toggle', hidden: true }
]

buttons.forEach(deleten('hidden'))
//=> [ { label: 'show' }, { label: 'hide' }, { label: 'toggle' } ]
```

#### support for keys containing `.`
> Pass an array as path instead of a string.

```js
var deleten = require('deleten')
var data = {
  client: {
    'message.id': 'd50afb80-a6be-11e2-9e96-0800200c9a66'
  }
}

deleten(['client', 'message.id'], data)
//=> { client: {} }
```

## API

### `deleten(String|Array[, Object])`

###### arguments

 * `path (String|Array)` Dot/bracket-notation string path or array.
 * `object (Object)` The target object.

###### returns

 - `(Boolean|Function)` 
     - returns `deleten/1` when partially applied.
     - throws in strict mode if the property is an own non-configurable property (returns false in non-strict).
     - returns true in all other cases.

## Tested/Supported browsers

> The following browsers are continuously tested; however, `deleten` is also supported and known to work on even older browsers not listed below:

|Browser|Version|
|---|---|
|Android|Latest|
|Chrome|49 - Latest|
|Firefox|44 - 46|
|Internet Explorer|9 - Latest|
|Iphone|Latest|
|Safari|6 - Latest|

## Licenses

[![LICENSE](http://img.shields.io/npm/l/deleten.svg)](license)


[Bower]: http://bower.io
[Duo]: http://duojs.org
[Function]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function
[Sauce Test Status]: https://saucelabs.com/browser-matrix/deleten.svg
[Un-bind your JS with curry]: https://medium.com/@wilmoore/un-bind-your-js-with-curry-a8657a4138cb#.6dswguc2q
[browsers]: https://saucelabs.com/u/deleten
[eval]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/eval
[jspm]: http://jspm.io
[note]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Member_Operators#Note_on_eval
[parameter order]: https://wiki.haskell.org/Parameter_order
[selectn]: https://www.npmjs.com/package/selectn
[typeof]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/typeof
