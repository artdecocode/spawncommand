import Catchment from 'catchment'
import { spawn } from 'child_process'

const pipe = (stream, catchment) => {
  if (!stream) return catchment.end()
  stream.pipe(catchment)
}

const getPromise = async (proc, { promise: stdoutPromise }, { promise: stderrPromise }) => {
  const code = await new Promise((resolve, reject) => {
    proc.on('error', reject)
    proc.on('exit', (code) => {
      resolve(code)
    })
  })
  const [stdout, stderr] = await Promise.all([
    stdoutPromise,
    stderrPromise,
  ])
  return {
    code,
    stdout,
    stderr,
  }
}


/**
 * Spawns a command and returns an instance of a ChildProcess, extended to have promise property which is resolved when the process has exited. The resolved value is an object with stdout, stderr and code properties.
 * @param {string} command A command to spawn.
 * @param {string[]} args Args to pass to the command.
 * @param {object} options Options used to spawn.
 */
export default function spawnCommand(command, args = [], options = {}) {
  if (!command) throw new Error('Please specify a command to spawn')
  const proc = spawn(command, args, options)
  const stdout = new Catchment()
  const stderr = new Catchment()
  pipe(proc.stdout, stdout)
  pipe(proc.stderr, stderr)

  const promise = getPromise(proc, stdout, stderr)
  proc.promise = promise
  proc.spawnCommand = proc.spawnargs.join(' ')
  return proc
}
