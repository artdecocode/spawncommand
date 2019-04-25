/* typal types/index.xml */
/** @const */
var _spawncommand = {}
/**
 * @typedef {{ stdout: string, stderr: string, code: number }}
 */
_spawncommand.PromiseResult

/* typal types/cp.xml */
/**
 * A child process with an extra `promise` property.
 * @extends {child_process.ChildProcess}
 * @constructor
 */
_spawncommand.ChildProcessWithPromise
/**
 * A promise resolved when the process exits.
 * @type {!Promise<!_spawncommand.PromiseResult>}
 */
_spawncommand.ChildProcessWithPromise.prototype.promise
/**
 * The spawn arguments joined by whitespace.
 * @type {string}
 */
_spawncommand.ChildProcessWithPromise.prototype.spawnCommand
