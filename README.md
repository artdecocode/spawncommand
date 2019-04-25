# spawnCommand

[![npm version](https://badge.fury.io/js/spawncommand.svg)](https://npmjs.org/package/spawncommand)

_SpawnCommand_ will run the `spawn` or `fork` methods from the `child_process` module, and add a `promise` property to the returned process instance. The promise will be resolved on process exit with an object consisting of `code`, `stdout` and `stderr` properties.

```
yarn add spawncommand
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [Types](#types)
    * [`_spawncommand.ChildProcessWithPromise`](#type-_spawncommandchildprocesswithpromise)
    * [`_spawncommand.PromiseResult`](#type-_spawncommandpromiseresult)
  * [`spawn(module: string, args: string[], options?: SpawnOptions): ChildProcessWithPromise`](#spawnmodule-stringargs-stringoptions-spawnoptions-childprocesswithpromise)
  * [`fork(module: string, args: string[], options?: ForkOptions): ChildProcessWithPromise`](#forkmodule-stringargs-stringoptions-forkoptions-childprocesswithpromise)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## API

_SpawnCommand_ can be used by importing the default `spawn` and named `fork` exports.

```js
import spawn, { fork } from 'spawncommand'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true" width="15"></a></p>

### Types

The package's main type is _ChildProcessWithPromise_ which enriches the standard _ChildProcess_ with a `promise` property.

[`import('child_process').ChildProcess`](https://nodejs.org/api/child_process.html#child_process_class_childprocess) __<a name="type-child_processchildprocess">`child_process.ChildProcess`</a>__

__<a name="type-_spawncommandchildprocesswithpromise">`_spawncommand.ChildProcessWithPromise`</a>__: A child process with an extra `promise` property.

|       Name        |                         Type                          |                Description                 |
| ----------------- | ----------------------------------------------------- | ------------------------------------------ |
| __promise*__      | <em>!Promise&lt;!_spawncommand.PromiseResult&gt;</em> | A promise resolved when the process exits. |
| __spawnCommand*__ | <em>string</em>                                       | The spawn arguments joined by whitespace.  |

__<a name="type-_spawncommandpromiseresult">`_spawncommand.PromiseResult`</a>__

|    Name     |      Type       |                  Description                   |
| ----------- | --------------- | ---------------------------------------------- |
| __stdout*__ | <em>string</em> | The accumulated result of the `stdout` stream. |
| __stderr*__ | <em>string</em> | The accumulated result of the `stderr` stream. |
| __code*__   | <em>number</em> | The code with which the process exited.        |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true" width="15"></a></p>

### `spawn(`<br/>&nbsp;&nbsp;`module: string,`<br/>&nbsp;&nbsp;`args: string[],`<br/>&nbsp;&nbsp;`options?: SpawnOptions,`<br/>`): ChildProcessWithPromise`

Spawns a command and returns a _ChildProcess_ instance with the `promise` property resolved on exit. The promise will be rejected if an error was encountered when trying to spawn the process.

`import('child_process').SpawnOptions` __<a name="type-child_processspawnoptions">`child_process.SpawnOptions`</a>__

```js
import spawn from 'spawncommand'

(async () => {
  const { promise } = spawn('echo', ['hello world'])
  const { stderr, stdout, code } =  await promise
  console.log(JSON.stringify({
    stderr, stdout, code,
  }, null, 2))
})()
```
```json5
{
  "stderr": "",
  "stdout": "hello world\n",
  "code": 0
}
```

The returned object is a `ChildProcess` and all of its properties can be accessed in the standard way.

```js
import spawnCommand from 'spawncommand'

(async () => {
  const { stdout, promise } = spawnCommand('echo', ['hello world'])

  stdout.pipe(process.stdout)
  await promise
})()
```
```
hello world
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true" width="15"></a></p>

### `fork(`<br/>&nbsp;&nbsp;`module: string,`<br/>&nbsp;&nbsp;`args: string[],`<br/>&nbsp;&nbsp;`options?: ForkOptions,`<br/>`): ChildProcessWithPromise`

Forks a Node.js module and adds a `promise` property to the returned _ChildProcess_.

`import('child_process').ForkOptions` __<a name="type-child_processforkoptions">`child_process.ForkOptions`</a>__

```js
import { fork } from 'spawncommand'

(async () => {
  const { promise } = fork('node_modules/.bin/alanode',
    ['example/spawn.js'], {
      stdio: 'pipe',
    })
  const { stdout } =  await promise
  console.log(stdout)
})()
```
```json5
{
  "stderr": "",
  "stdout": "hello world\n",
  "code": 0
}
```

The `pipe` option needs to be set in order to gather the output of the `stderr` and `stdout` streams (or an array for older versions of Node.js when [this does not work][2]).

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

[2]: https://github.com/nodejs/node/pull/10866

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>