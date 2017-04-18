const Catchment = require('catchment')

const spawn = require('child_process').spawn
const Writable = require('stream').Writable

// better child_process.spawn for nodejs!
function spawnCommand(command, args, options) {
    const proc = spawn(command, args, options)
    const stdErrCatchment = new Catchment()
    const stdOutCatchment = new Catchment()
    if (proc.stdout) {
        proc.stdout.pipe(stdOutCatchment)
    } else {
        stdOutCatchment.end()
    }
    if (proc.stderr) {
        proc.stderr.pipe(stdErrCatchment)
    } else {
        stdErrCatchment.end()
    }
    const promise = new Promise((resolve, reject) => {
        proc.on('error', reject)
        proc.on('exit', (code) => {
            resolve(code)
        })
    })
        .then(code => Promise.all([
            code,
            stdOutCatchment.promise,
            stdErrCatchment.promise,
        ]))
        .then(res => (
            {
                code: res[0],
                stdout: res[1],
                stderr: res[2],
            }
        ))
    proc.promise = promise
    proc.spawnCommand = proc.spawnargs.join(' ')
    return proc
}

module.exports = spawnCommand
