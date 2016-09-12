# JamesCostian.com

Source code for [jamescostian.com](http://jamescostian.com/).

## Building

First install [Node](https://nodejs.org/) version 6 or higher, and then make sure you have rollup (`npm i -g rollup`), and then run `rollup -m inline --format iife -o game.transpiled.js game.js` to build the JS file.

If you want to minify the code afterwards, get set up with `npm i -g babel-cli; npm i babili` and then run `rollup -m inline --format iife -o game.transpiled.js game.js; babel --presets=babili --no-comments game.transpiled.js -o game.transpiled.js`

## Contributing

Contributions welcome! Please read the [contributing guidelines](https://github.com/jamescostian/jamescostian.github.io/blob/master/CONTRIBUTING.md) first.

## License

[ISC](https://github.com/jamescostian/jamescostian.github.io/blob/master/LICENSE)
