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
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://robinvdvleuten.nl/"><img src="https://avatars3.githubusercontent.com/u/238295?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Robin van der Vleuten</b></sub></a><br /><a href="#question-robinvdvleuten" title="Answering Questions">💬</a> <a href="https://github.com/robinvdvleuten/shvl/commits?author=robinvdvleuten" title="Code">💻</a> <a href="https://github.com/robinvdvleuten/shvl/commits?author=robinvdvleuten" title="Documentation">📖</a> <a href="#example-robinvdvleuten" title="Examples">💡</a> <a href="#ideas-robinvdvleuten" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-robinvdvleuten" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/robinvdvleuten/shvl/pulls?q=is%3Apr+reviewed-by%3Arobinvdvleuten" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/robinvdvleuten/shvl/commits?author=robinvdvleuten" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ajenkinski"><img src="https://avatars0.githubusercontent.com/u/20757262?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ajenkinski</b></sub></a><br /><a href="https://github.com/robinvdvleuten/shvl/commits?author=ajenkinski" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
