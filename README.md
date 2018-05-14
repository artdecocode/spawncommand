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

---

(c) [Art Deco Code][1] 2018

[1]: https://artdeco.bz
