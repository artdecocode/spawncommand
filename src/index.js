const spawn = require('child_process').spawn
const Writable = require('stream').Writable

function getDataFromSet(set) {
    const arr = Array.from(set)
    return arr.join('').trim()
}
function addToSet(set, data) {
    return set.add(data)
}
function addToSetAsString(set, data) {
    return addToSet(set, String(data))
}
function createWritableForSet(set) {
    const addData = addToSetAsString.bind(null, set)
    return createWritable(addData)
}
function createWritable(fn) {
    const ws = new Writable()
    ws._write = (chunk, enc, next) => {
        if (typeof fn === 'function') fn.call(null, chunk)
        next(null)
    }
    return ws
}

// better child_process.spawn for nodejs!
function spawnCommand(command, args, options) {
    const proc = spawn(command, args, options)
    const promise = new Promise((resolve, reject) => {
        try {
            const stdoutData = new Set()
            const stderrData = new Set()
            const writeStdout = createWritableForSet(stdoutData)
            const writeStderr = createWritableForSet(stderrData)

            proc.on('error', reject)
            proc.on('exit', (code) => {
                resolve({
                    code,
                    stdout: getDataFromSet(stdoutData),
                    stderr: getDataFromSet(stderrData),
                })
            })
            if (proc.stdout) proc.stdout.pipe(writeStdout)
            if (proc.stderr) proc.stderr.pipe(writeStderr)
        } catch (err) {
            return reject(err)
        }
    })
    proc.promise = promise
    proc.spawnCommand = proc.spawnargs.join(' ')
    return proc
}

module.exports = spawnCommand
