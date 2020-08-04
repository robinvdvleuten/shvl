# shvl

Get and set dot-notated properties within an object.

<img src="https://media.giphy.com/media/3o85xLDQLoZD1rk07u/giphy-downsized.gif" width="350" />

<hr />

[![Build Status](https://img.shields.io/github/workflow/status/robinvdvleuten/shvl/test.svg?style=flat-square)](https://github.com/robinvdvleuten/shvl/actions?query=workflow%3Atest)
[![NPM version](https://img.shields.io/npm/v/shvl.svg?style=flat-square)](https://www.npmjs.com/package/shvl)
[![NPM downloads](https://img.shields.io/npm/dm/shvl.svg?style=flat-square)](https://www.npmjs.com/package/shvl)

<a href="https://webstronauts.com/">
	<img src="https://webstronauts.com/badges/sponsored-by-webstronauts.svg" alt="Sponsored by The Webstronauts" width="200" height="65">
</a>

## Installation

```
npm install --save shvl
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com/shvl/dist/shvl.umd.js):

```
<script src="//unpkg.com/shvl/dist/shvl.umd.js"></script>
```

This exposes the shlv object as a global.

## Usage

```js
import * as shvl from 'shvl';

let obj = {
	a: {
		b: {
			c: 1
			d: undefined
			e: null
		}
	}
};

// Use dot notation for keys
shvl.set(obj, 'a.b.c', 2);
shvl.get(obj, 'a.b.c') === 2;

// Or use an array as key
shvl.get(obj, ['a', 'b', 'c']) === 1;

// Returns undefined if the path does not exist and no default is specified
shvl.get(obj, 'a.b.c.f') === undefined;
```

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
