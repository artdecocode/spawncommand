const defaultLib = '../../src'
const { env: { LIB_MAIN = defaultLib } } = process
const m = require(LIB_MAIN)
const spawnCommand = typeof m == 'function' ? m : m.default

if (LIB_MAIN != defaultLib) {
  console.log('using lib @ %s', LIB_MAIN) // eslint-disable-line
}

global.spawnCommand = spawnCommand
