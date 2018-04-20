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

### `box = scrollbox(opts={})`

Prepare a new scrollbox.

- `opts.width` - Width in columns of the scrollbox.
- `opts.height` - Height in rows of the scrollbox.

### `box.setContent(content)`, `box.content = content`

Set the content of the scrollbox.

### `box.content`

Get the content of the scrollbox.

### `box.scroll(offset)`

Set the scroll position. `offset` is the number of rows from the start of the content. When `offset` is negative, it's the number of rows from the end of the content. Use -1 to scroll to the very end; -1 is "sticky" so it will stay at the end when the content updates.

### `box.resize(opts)`

Update the size of the scrollbox.

- `opts.width` - Width in columns of the scrollbox.
- `opts.height` - Height in rows of the scrollbox.

### `box.toString()`

Get the visible contents of the box. Use with something like [ansi-diff](https://github.com/mafintosh/ansi-diff) for efficient updates on screene.

### `unsub = box.subscribe(listener)`

Call `listener` whenever the box's content, size, or scroll position change. Do `unsub()` to stop listening.

### `box.keypress`

An event listener that implements basic keyboard controls:

- `up` or `k` to scroll 1 row up
- `down` or `j` to scroll 1 row down
- `home` to scroll to the start
- `end` to scroll to the start

Use it with the [keypress](https://github.com/TooTallNate/keypress) module:

```js
require('keypress')(process.stdin)
process.stdin.on('keypress', box.keypress)
```

## License

[Apache-2.0](LICENSE.md)
