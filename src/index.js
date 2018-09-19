import { spawn, fork as forkCp, ChildProcess } from 'child_process'
import { collect } from 'catchment'

/**
 * @returns {PromiseResult}
 */
const getPromise = async (proc) => {
  const [code, stdout, stderr] = await Promise.all([
    new Promise((resolve, reject) => {
      proc.on('error', reject)
        .on('exit', (code) => {
          resolve(code)
        })
    }),
    proc.stdout ? collect(proc.stdout) : undefined,
    proc.stderr ? collect(proc.stderr) : undefined,
  ])
  return {
    code,
    stdout,
    stderr,
  }
}

class ChildProcessWithPromise extends ChildProcess {
  constructor(p, promise) {
    super()
    this._promise = promise
    Object.assign(this, p)
    this.spawnCommand = p.spawnargs.join(' ')
  }
  /**
   * @type {Promise.<PromiseResult>} The promise resolved when the process exits.
   */
  get promise() {
    return this._promise
  }
}

/**
 * Spawns a new process using the `command` and returns an instance of a ChildProcess, extended to have a `promise` property which is resolved when the process exits. The resolved value is an object with `stdout`, `stderr` and `code` properties.
 * @param {string} command The command to run.
 * @param {string[]} [args] List of string arguments.
 * @param {SpawnOptions} [options] Options used to spawn.
 */
export default function spawnCommand(command, args = [], options = {}) {
  if (!command) throw new Error('Please specify a command to spawn.')
  const proc = spawn(command, args, options)

  const promise = getPromise(proc)
  const p = new ChildProcessWithPromise(proc, promise)
  return p
}

/**
 * Forks a process and assign a `promise` property to it, resolved with `stderr`, `stdout` and `code` properties on exit.
 * @param {string} mod The module to run in the child.
 * @param {string[]} [args] List of string arguments.
 * @param {ForkOptions} [options] Options to fork the process with.
 */
export function fork(mod, args = [], options) {
  if (!mod) throw new Error('Please specify a module to fork')
  const proc = forkCp(mod, args, options)

  const promise = getPromise(proc)
  const p = new ChildProcessWithPromise(proc, promise)
  return p
}

/* documentary types/index.xml */
/**
 * @typedef {import('child_process').SpawnOptions} SpawnOptions
 * @typedef {import('child_process').ForkOptions} ForkOptions
 * @typedef {import('child_process').ChildProcess} ChildProcess
 *
 * @typedef {ChildProcess} ChildProcessWithPromise A child process with an extra `promise` property.
 * @prop {Promise.<PromiseResult>} promise A promise resolved when the process exits.
 *
 * @typedef {Object} PromiseResult
 * @prop {string} stdout The accumulated result of the `stdout` stream.
 * @prop {string} stderr The accumulated result of the `stderr` stream.
 * @prop {number} code The code with which the process exited.
 */
