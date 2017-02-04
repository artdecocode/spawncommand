const spawnCommand = require('../../src/index')
const path = require('path')
const assert = require('assert')
const fixtures = path.join(__dirname, '../fixtures')
const nodeJsFile = path.join(fixtures, 'node.js')
const exit0JsFile = path.join(fixtures, 'exit-0.js')
const exit1JsFile = path.join(fixtures, 'exit-1.js')
const ipcJsFile = path.join(fixtures, 'message.js')
const errorJsFile = path.join(fixtures, 'error.js')
const messages = require('../fixtures/message')

// const errorText = `(function (exports, require, module, __filename, __dirname) { throw new Error('Expected error')
//                                                               ^

// Error: Expected error
//     at Object.<anonymous> (/Users/zavr/Work/spawnCommand/test/fixtures/error.js:1:69)
//     at Module._compile (module.js:571:32)
//     at Object.Module._extensions..js (module.js:580:10)
//     at Module.load (module.js:488:32)
//     at tryModuleLoad (module.js:447:12)
//     at Function.Module._load (module.js:439:3)
//     at Module.runMain (module.js:605:10)
//     at run (bootstrap_node.js:420:7)
//     at startup (bootstrap_node.js:139:9)
//     at bootstrap_node.js:535:3`

module.exports = {
    spawnCommand: () =>
        spawnCommand('node', [nodeJsFile])
            .promise
            .then((res) => {
                assert(typeof res === 'object', 'Promise should resove with an object')
                assert('stdout' in res, 'should have stdout property')
                assert('stderr' in res, 'should have stderr property')
                assert(typeof res.stdout === 'string', 'stdout should be a string')
                assert(typeof res.stderr === 'string', 'stderr should be a string')
                assert(res.stdout === 'expected stdout', 'stdout should equal expected')
                assert(res.stderr === 'expected stderr', 'stderr should equal expected')
            }),
    spawnExit0Command: () => {
        const exit0 = spawnCommand('node', [exit0JsFile])
        return exit0
            .promise
            .then((res) => {
                assert(res.stdout === 'expected stdout')
                assert(res.stderr === 'expected stderr')
                assert(res.code === 0, `Expected exit code ${res.code} to equal 0`)
            })
    },
    spawnExit1Command: () => {
        const exit1 = spawnCommand('node', [exit1JsFile])
        return exit1
            .promise
            .then((res) => {
                assert(res.stdout === 'expected stdout')
                assert(res.stderr === 'expected stderr')
                assert(res.code === 1, `Expected exit code ${res.code} to equal 1`)
            })
    },
    message: {
        stdout: () => {
            const ipc = spawnCommand('node', [ipcJsFile], {
                stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
            })
            ipc.send(messages.STDOUT_WRITE_STRING)
            return new Promise(resolve => setTimeout(resolve, 100))
                .then(() => ipc.kill())
                .then(() => ipc.promise)
                .then((res) => {
                    assert(res.stdout === messages.STDOUT_WRITE_STRING)
                })
        },
        stderr: () => {
            const ipc = spawnCommand('node', [ipcJsFile], {
                stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
            })
            ipc.send(messages.STDERR_WRITE_STRING)
            return new Promise(resolve => setTimeout(resolve, 100))
                .then(() => ipc.kill())
                .then(() => ipc.promise)
                .then((res) => {
                    assert(res.stderr === messages.STDERR_WRITE_STRING)
                })
        },
        exit0: () => {
            const ipc = spawnCommand('node', [ipcJsFile], {
                stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
            })
            ipc.send(messages.EXIT0_STRING)
            return new Promise(resolve => setTimeout(resolve, 100))
                .then(() => ipc.kill())
                .then(() => ipc.promise)
                .then((res) => {
                    assert(res.code === 0)
                })
        },
        exit1: () => {
            const ipc = spawnCommand('node', [ipcJsFile], {
                stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
            })
            ipc.send(messages.EXIT1_STRING)
            return new Promise(resolve => setTimeout(resolve, 100))
                .then(() => ipc.kill())
                .then(() => ipc.promise)
                .then((res) => {
                    assert(res.code === 1)
                })
        },
    },
    spanwWithNoChannels: () => {
        const proc = spawnCommand('node', [nodeJsFile], {
            stdio: ['ignore', 'ignore', 'ignore'],
        })
        return proc
            .promise
    },
    // should not throw an error when spawned without channels
    spawnError: () => {
        const error = spawnCommand('node', [errorJsFile])
        return error
            .promise
            .then((res) => {
                assert(res.stdout === '')
                assert(/Error: Expected error/.test(res.stderr))
                assert(res.code === 1, `Expected exit code ${res.code} to equal 1`)
            })
    },
}

// thanks for watching
// sobesednik.media 2017