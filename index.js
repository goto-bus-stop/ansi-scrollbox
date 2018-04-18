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
    keypress: keypress,
    toString: toString,
    get content () { return content },
    set content (_content) { setContent(_content) },
    get width () { return width },
    get height () { return height },
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

  // TODO optimize
  function updateLinesCache () {
    lines = wrapAnsi(content, width, { wordWrap: false }).split('\n')
    linesDirty = false
  }

  function toString () {
    if (linesDirty) updateLinesCache()
    var o = offset < 0 ? lines.length - height + offset : Math.min(lines.length - height, offset)
    var visible = lines.slice(o, o + height)
    while (visible.length < height) visible.push('')
    return visible.join('\n')
  }

  function keypress (ch, key) {
    if (!key) return
    if (key.name === 'down' || key.name === 'j') {
      offset = offset >= 0 ? offset + 1 : Math.min(offset + 1, -1)
    }
    if (key.name === 'up' || key.name === 'k') {
      offset = offset < 0 ? offset - 1 : Math.max(offset - 1, 0)
    }
    if (key.name === 'home') offset = 0
    if (key.name === 'end') offset = -1
  }

  return instance
}
