const defaultLib = '../../src'
const { env: { LIB_MAIN = defaultLib } } = process
const { default: spawn, fork } = require(LIB_MAIN)

if (LIB_MAIN != defaultLib) {
  console.log('using lib @ %s', LIB_MAIN) // eslint-disable-line
}

global.spawn = spawn
global.fork = fork
