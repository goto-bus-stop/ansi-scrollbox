var scrollbox = require('./')
var lorem = require('@jamen/lorem')
var diff = require('ansi-diff')()

var box = scrollbox({
  width: 20,
  height: 10
})
box.setContent(`
some content that will be logged in a smallish box
hopefully that box will scroll! that is the goal… but who can tell?
time can, that's who! booooo

there was an empty line there just to check that it doesn't disappear and stuff
ansi codes should work but i don't have any on hand to test with :shrug: too bad

${lorem(1024)}
`.trim())

function write () {
  process.stdout.write(diff.update(box.toString()))
}

var sizes = [
  { width: 30, height: 20 },
  { width: 80, height: 1 },
  { width: 20, height: 30 },
  { width: 20, height: 10 }
]
var currentSize = 0
function nextSize () {
  box.resize(sizes[currentSize++ % sizes.length])
}

var scroll = 0

write()
box.subscribe(write)

// make `process.stdin` begin emitting "keypress" events
require('keypress')(process.stdin)
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  if (key.name === 'j') {
    scroll = scroll >= 0 ? scroll + 1 : Math.min(scroll + 1, -1)
    box.scroll(scroll)
  }
  if (key.name === 'k') {
    scroll = scroll < 0 ? scroll - 1 : Math.max(scroll - 1, 0)
    box.scroll(scroll)
  }
  if (key.name === 'home') box.scroll(scroll = 0)
  if (key.name === 'end') box.scroll(scroll = -1)
  if (key.name === 'r') nextSize()
  if (key.name === 'c') process.exit()
})
process.stdin.setRawMode(true)
process.stdin.resume()
