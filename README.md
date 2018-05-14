# spawnCommand

[![npm version](https://badge.fury.io/js/spawncommand.svg)](https://badge.fury.io/js/spawncommand)

```
yarn add -E spawncommand
```

This package is a wrapper around `child_process.spawn` methods to set `.promise` property on the returned `ChildProcess` instances. The promise will be fulfilled on process exit with an object consisting of `code`, `stdout` and `stderr` properties, where:

- `code` is the exit code
- `stdout` is all data the process wrote to _stdout_
- `stderr` is all data the process wrote to _stderr_

The promise will be rejected if an error was encountered when trying to spawn the process.

```js
/* yarn example/spawncommand.js */
import spawnCommand from 'spawncommand'

(async () => {
  const { promise } = spawnCommand('echo', ['hello world'])
  const { stderr, stdout, code } =  await promise

  console.log(stderr) // undefined
  console.log(stdout) // hello world\n
  console.log(code) // 0
})()
```

Because the returned object is a `ChildProcess`, all its properties can be accessed.

```js
/* yarn example/pipe.js */
import spawnCommand from 'spawncommand'

(async () => {
  const { stdout, promise } = spawnCommand('echo', ['hello world'])

  stdout.pipe(process.stdout)
  await promise
})()
```

## fork

It is also possible to fork a Node.js process and execute a module in it.

```js
/* yarn example/fork.js */
import { resolve } from 'path'
import { fork } from 'spawncommand'

const MODULE_PATH = resolve(__dirname, 'example/spawn.js')

;(async () => {
  const { promise } = fork('example/spawn.js', [], {
    stdio: 'pipe',
  })
  const { stdout } =  await promise
  console.log(stdout) // same output as example/spawn.js
})()
```

Make sure to pass `pipe` option to be able to gather stderr and stdout streams (or an array for versions of Node.js when [this does not work][2]).

---

(c) [Art Deco Code][1] 2018

[1]: https://artdeco.bz
[2]: https://github.com/nodejs/node/pull/10866
