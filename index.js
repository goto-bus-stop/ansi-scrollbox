var assert = require('assert')
var wrapAnsi = require('wrap-ansi')

module.exports = function scrollbox (opts) {
  opts = opts || {}
  assert.equal(typeof opts, 'object', 'opts must be object')
  var content = opts.content || ''
  var width = opts.width
  var height = opts.height
  var lines = []
  var linesDirty = false

  var instance = {
    setContent: setContent,
    resize: resize,
    scroll: scroll,
    scrollUp: scrollUp,
    scrollDown: scrollDown,
    keypress: keypress,
    toString: toString,
    get content () { return content },
    set content (_content) { setContent(_content) },
    get width () { return width },
    get height () { return height }
  }

  var offset = 0

  function setContent (_content) {
    assert.equal(typeof _content, 'string', 'content must be string')

    content = _content
    linesDirty = true
  }

  function resize (s) {
    assert.equal(typeof s, 'object', 'size must be an object { width, height }')
    assert.equal(typeof s.width, 'number', 'size.width must be number')
    assert.equal(typeof s.height, 'number', 'size.height must be number')

    width = s.width
    height = s.height
    linesDirty = true
  }

  function scroll (_offset) {
    assert.equal(typeof _offset, 'number', 'offset must be number')

    offset = _offset
  }
  function scrollUp (d) {
    scroll(offset < 0 ? offset - d : Math.max(offset - d, 0))
  }
  function scrollDown (d) {
    scroll(offset >= 0 ? offset + d : Math.min(offset + d, -1))
  }

  // TODO optimize
  function updateLinesCache () {
    lines = wrapAnsi(content, width, { wordWrap: false }).split('\n')
    linesDirty = false
  }

  function resolveOffset () {
    if (offset === -1) return
    if (offset >= lines.length - height) {
      offset = Math.max(0, lines.length - height)
    } else if (offset < -1) {
      offset = Math.max(0, lines.length + offset + 1 - height)
    }
  }

  function toString () {
    if (linesDirty) updateLinesCache()
    resolveOffset()
    var o = offset === -1 ? lines.length - height : Math.min(lines.length - height, offset)
    var visible = lines.slice(o, o + height)
    while (visible.length < height) visible.push('')
    return visible.join('\n')
  }

  function keypress (ch, key) {
    if (!key) return
    if (key.name === 'down' || key.name === 'j') {
      scrollDown(1)
    }
    if (key.name === 'up' || key.name === 'k') {
      scrollUp(1)
    }
    if (key.name === 'home') offset = 0
    if (key.name === 'end') offset = -1
  }

  return instance
}
