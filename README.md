# shvl

Get and set dot-notated properties within an object. **~190 bytes min+gzip, zero dependencies.**

<img src="https://media.giphy.com/media/3o85xLDQLoZD1rk07u/giphy-downsized.gif" width="350" />

<hr />

[![NPM version](https://img.shields.io/npm/v/shvl.svg)](https://www.npmjs.com/package/shvl)
[![Build Status](https://github.com/robinvdvleuten/shvl/actions/workflows/test.yml/badge.svg)](https://github.com/robinvdvleuten/shvl/actions/workflows/test.yml)
[![NPM downloads](https://img.shields.io/npm/dm/shvl.svg)](https://www.npmjs.com/package/shvl)
[![MIT license](https://img.shields.io/github/license/robinvdvleuten/shvl.svg)](https://github.com/robinvdvleuten/shvl/blob/main/LICENSE)

<a href="https://webstronauts.com?utm_source=github&utm_medium=readme&utm_campaign=shvl">
	<picture>
		<img src="https://webstronauts.com/images/sponsored-by.svg" alt="Sponsored by The Webstronauts" width="200" height="65">
	</picture>
</a>

## Installation

```
npm install --save shvl
```

## Usage

```js
import * as shvl from 'shvl';

let obj = {
	a: {
		b: {
			c: 1,
			d: undefined,
			e: null,
		},
	},
};

// Use dot notation for keys
shvl.set(obj, 'a.b.c', 2);
shvl.get(obj, 'a.b.c') === 2;

// Or use an array as key
shvl.get(obj, ['a', 'b', 'c']) === 2;

// Returns undefined if the path does not exist and no default is specified
shvl.get(obj, 'a.b.c.f') === undefined;

// Pass a third argument to get a fallback instead of undefined
shvl.get(obj, 'a.b.c.f', 'fallback') === 'fallback';
```

## API

### `get(object, path, default?)`

Reads the value at `path`, a dot-string or an array of keys. Returns `default` when the path does not resolve, or `undefined` when no default is given.

### `set(object, path, value)`

Writes `value` at `path`, creating intermediate objects along the way, and returns the mutated object.

## Safety

`set` never writes through `__proto__` or `constructor`, so a crafted path like `constructor.prototype.polluted` cannot reach `Object.prototype`. The guard compares keys with strict equality rather than a regular expression, so overriding `RegExp.prototype.test` cannot bypass it.

## License

MIT © [Robin van der Vleuten](https://robinvdvleuten.nl)
