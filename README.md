# shvl

Get and set dot-notated properties within an object. **~190 bytes min+gzip, zero dependencies.**

<img src="https://media.giphy.com/media/3o85xLDQLoZD1rk07u/giphy-downsized.gif" width="350" />

<hr />

[![NPM version](https://img.shields.io/npm/v/shvl.svg)](https://www.npmjs.com/package/shvl)
[![Build Status](https://github.com/robinvdvleuten/shvl/actions/workflows/test.yml/badge.svg)](https://github.com/robinvdvleuten/shvl/actions/workflows/test.yml)
[![NPM downloads](https://img.shields.io/npm/dm/shvl.svg)](https://www.npmjs.com/package/shvl)
[![MIT license](https://img.shields.io/github/license/robinvdvleuten/shvl.svg)](https://github.com/robinvdvleuten/shvl/blob/main/LICENSE)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<a href="https://webstronauts.com/">
	<img src="https://webstronauts.com/badges/sponsored-by-webstronauts.svg" alt="Sponsored by The Webstronauts" width="200" height="65">
</a>

## Installation

```
npm install --save shvl
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com/shvl/dist/index.umd.js), exposing `shvl` as a global:

```
<script src="//unpkg.com/shvl/dist/index.umd.js"></script>
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

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://robinvdvleuten.nl/"><img src="https://avatars3.githubusercontent.com/u/238295?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Robin van der Vleuten</b></sub></a><br /><a href="#question-robinvdvleuten" title="Answering Questions">💬</a> <a href="https://github.com/robinvdvleuten/shvl/commits?author=robinvdvleuten" title="Code">💻</a> <a href="https://github.com/robinvdvleuten/shvl/commits?author=robinvdvleuten" title="Documentation">📖</a> <a href="#example-robinvdvleuten" title="Examples">💡</a> <a href="#ideas-robinvdvleuten" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-robinvdvleuten" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/robinvdvleuten/shvl/pulls?q=is%3Apr+reviewed-by%3Arobinvdvleuten" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/robinvdvleuten/shvl/commits?author=robinvdvleuten" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ajenkinski"><img src="https://avatars0.githubusercontent.com/u/20757262?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ajenkinski</b></sub></a><br /><a href="https://github.com/robinvdvleuten/shvl/commits?author=ajenkinski" title="Code">💻</a></td>
    <td align="center"><a href="https://lemonslab.me"><img src="https://avatars.githubusercontent.com/u/6394077?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matheus Vrech</b></sub></a><br /><a href="https://github.com/robinvdvleuten/shvl/commits?author=vrechson" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
