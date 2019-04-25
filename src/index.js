import { spawn, fork as forkCp } from 'child_process'
import { collect } from 'catchment'

/**
 * @param {!child_process.ChildProcess} proc
 * @returns {!Promise<_spawncommand.PromiseResult>}
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

/**
 * Spawns a new process using the `command` and returns an instance of a ChildProcess, extended to have a `promise` property which is resolved when the process exits. The resolved value is an object with `stdout`, `stderr` and `code` properties.
 * @param {string} command The command to run.
 * @param {!Array<string>} [args] List of string arguments.
 * @param {!child_process.SpawnOptions} [options] Options used to spawn.
 */
export default function spawnCommand(command, args, options) {
  if (!command) throw new Error('Please specify a command to spawn.')
  const proc = /** @type {!_spawncommand.ChildProcessWithPromise} */ (spawn(command, args, options))

  const promise = getPromise(proc)
  proc.promise = promise
  /** @suppress {checkTypes} */
  proc.spawnCommand = proc['spawnargs'].join(' ')
  return proc
}

/**
 * Forks a process and assign a `promise` property to it, resolved with `stderr`, `stdout` and `code` properties on exit.
 * @param {string} mod The module to run in the child.
 * @param {!Array<string>} [args] List of string arguments.
 * @param {!child_process.ForkOptions} [options] Options to fork the process with.
 */
export function fork(mod, args, options) {
  if (!mod) throw new Error('Please specify a module to fork')
  const proc = /** @type {!_spawncommand.ChildProcessWithPromise} */ (forkCp(mod, args, options))

  const promise = getPromise(proc)
  proc.promise = promise
  /** @suppress {checkTypes} */
  proc.spawnCommand = proc['spawnargs'].join(' ')
  return proc
}

/* typal types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_spawncommand.PromiseResult} PromiseResult
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _spawncommand.PromiseResult
 * @prop {string} stdout The accumulated result of the `stdout` stream.
 * @prop {string} stderr The accumulated result of the `stderr` stream.
 * @prop {number} code The code with which the process exited.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('child_process').SpawnOptions} child_process.SpawnOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('child_process').ForkOptions} child_process.ForkOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('child_process').ChildProcess} child_process.ChildProcess
 */

/* documentary types/cp.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_spawncommand.ChildProcessWithPromise} ChildProcessWithPromise A child process with an extra `promise` property.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {child_process.ChildProcess & _spawncommand.$ChildProcessWithPromise} _spawncommand.ChildProcessWithPromise A child process with an extra `promise` property.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _spawncommand.$ChildProcessWithPromise A child process with an extra `promise` property.
 * @prop {!Promise<!_spawncommand.PromiseResult>} promise A promise resolved when the process exits.
 * @prop {string} spawnCommand The spawn arguments joined by whitespace.
 */
