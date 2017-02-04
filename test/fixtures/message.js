const EXIT0_STRING = 'exit0'
const EXIT1_STRING = 'exit1'
const STDOUT_WRITE_STRING = 'write to stdout'
const STDERR_WRITE_STRING = 'write to stderr'

process.on('message', (m, arg) => {
    if (m === EXIT0_STRING) process.exit(0)
    if (m === EXIT1_STRING) process.exit(1)
    if (m === STDOUT_WRITE_STRING) process.stdout.write(STDOUT_WRITE_STRING)
    if (m === STDERR_WRITE_STRING) process.stderr.write(STDERR_WRITE_STRING)
})

module.exports = {
    EXIT0_STRING,
    EXIT1_STRING,
    STDOUT_WRITE_STRING,
    STDERR_WRITE_STRING,
}