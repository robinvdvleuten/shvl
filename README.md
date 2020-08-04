# shvl

Get and set dot-notated properties within an object.

<img src="https://media.giphy.com/media/3o85xLDQLoZD1rk07u/giphy-downsized.gif" width="350" />

<hr />

[![Build Status](https://img.shields.io/github/workflow/status/robinvdvleuten/shvl/test.svg)](https://github.com/robinvdvleuten/shvl/actions?query=workflow%3Atest)
[![NPM version](https://img.shields.io/npm/v/shvl.svg)](https://www.npmjs.com/package/shvl)
[![NPM downloads](https://img.shields.io/npm/dm/shvl.svg)](https://www.npmjs.com/package/shvl)
[![MIT license](https://img.shields.io/github/license/robinvdvleuten/shvl.svg)](https://github.com/robinvdvleuten/shvl/blob/master/LICENSE)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

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

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
