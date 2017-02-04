# spawncommand

extend `require('child_process').spawn` to set `.promise` property
on the returned object. The promise will be fulfilled on process 
exit with a hash of `code`, `stdout` and `stderr`, where `code`
is the exit code, `stdout` is all data the process wrote to 
_stdout_, and `stderr` is all data the process wrote to _stderr_.
The promise will be rejected if `process.on('error')` fired.

```
npm i --save spawncommand
```

```
const spawnCommand = require('spawncommand')

const echo = spawnCommand('echo', ['hello world'])
echo
    .promise
    .then((res) => {
        console.error(res)
    })
    // { code: 0, stdout: 'hello world', stderr: '' }
    // echo is instance of ChildProcess)
```

## Testing

[zoroaster](https://www.npmjs.com/package/zoroaster)

```
npm t

> spawncommand@1.0.0 test /Users/zavr/Work/spawnCommand
> zoroaster test/spec

 test/spec
   index.js
    ✓  spawnCommand
    ✓  spawnExit0Command
    ✓  spawnExit1Command
    ✓  spanwWithNoChannels
    ✓  spawnError
     message
      ✓  stdout
      ✓  stderr
      ✓  exit0
      ✓  exit1

Executed 9 tests.

```

