# ansi-scrollbox change log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## 0.2.1
* Update dependencies.
* Add more documentation.

## 0.2.0
* Calculate all scrolling from the start of the content.
  Previously scrolling to the end, then back up, would calculate scrolling from the end of the content, so the content would autoscroll as it was updated. Now ansi-scrollbox only autoscrolls if you're at the very bottom.
* Add a `subscribe(listener)` API to listen for updates to content, size or scroll

## 0.1.0
* Initial (pretty beta) release.
