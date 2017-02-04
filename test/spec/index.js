const spawnCommand = require('../../src/index')
const path = require('path')
const assert = require('assert')
const fixtures = path.join(__dirname, '../fixtures')
const nodeJsFile = path.join(fixtures, 'node.js')
const exit0JsFile = path.join(fixtures, 'exit-0.js')
const exit1JsFile = path.join(fixtures, 'exit-1.js')
const exit2JsFile = path.join(fixtures, 'exit-2.js')

module.exports = {
    spawnCommand: () => 
        spawnCommand('node', nodeJsFile)
            .promise
            .then((res) => {
                assert(res.stdout === 'expected stdout')
                assert(res.stderr === 'expected stderr')
            }),
    spawnExit0Command: () => 
        spawnCommand('node', exit0JsFile)
            .promise
            .then((res) => {
                assert(res.stdout === 'expected stdout')
                assert(res.stderr === 'expected stderr')
                assert(exit0.code === 0)
            }),
    spawnExit1Command: () => {
        const exit1 = spawnCommand('node', exit1JsFile)
        let didResolve = false
        return exit1.promise
            .then(() => {
                didResolve = true
                throw new Error('Promise should have been rejected')
            })
            .catch((err) => {
                assert(!didResolve)
                console.error(err)
                
                assert(exit1.code === 1)
            })
    }

}
