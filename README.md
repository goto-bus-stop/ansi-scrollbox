# ansi-scrollbox

a basic scrollable area for terminal apps

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/ansi-scrollbox.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/ansi-scrollbox
[travis-image]: https://img.shields.io/travis/goto-bus-stop/ansi-scrollbox.svg?style=flat-square
[travis-url]: https://travis-ci.org/goto-bus-stop/ansi-scrollbox
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install ansi-scrollbox
```

## Usage

```js
var scrollbox = require('ansi-scrollbox')
var differ = require('ansi-diff')()
var lorem = require('@jamen/lorem')

var box = scrollbox({
  width: 20,
  height: 20
})

box.setContent(lorem(6000))

function render () {
  process.stdout.write(differ.update(box.toString()))
}
setInterval(render, 100)

require('keypress')(process.stdin)
process.stdin.setRawMode(true)
process.stdin.resume()
// Optionally add default scroll keybindings (things like up, down, home, end)
process.stdin.on('keypress', box.keypress)
```

## API

TODO

## License

[Apache-2.0](LICENSE.md)
