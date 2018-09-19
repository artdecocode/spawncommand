import { fork } from '../../src'
import { equal, deepEqual } from 'zoroaster/assert'
import context from '../context'

/** @type {Object.<string, (ctx: context)>} */
const T = {
  context,
  async 'spawns a fork process'({ exit0, stdout, stderr }) {
    const { promise } = fork(exit0, [], {
      stdio: 'pipe',
    })
    const res = await promise
    deepEqual(res, {
      stdout,
      stderr,
      code: 0,
    })
  },
}

/** @type {Object.<string, (ctx: context)>} */
export const message = {
  context,
  async 'picks up data from stdout'({ ipc, messages: { STDOUT_WRITE_STRING } }) {
    const proc = fork(ipc, [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })
    proc.send(STDOUT_WRITE_STRING)
    const { stdout } = await proc.promise
    equal(stdout, STDOUT_WRITE_STRING)
  },
  async 'picks up data from stderr'({ ipc, messages: { STDERR_WRITE_STRING } }) {
    const proc = fork(ipc, [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })
    proc.send(STDERR_WRITE_STRING)
    const { stderr } = await proc.promise
    equal(stderr, STDERR_WRITE_STRING)
  },
  async 'exits with code 1'({ ipc, messages: { EXIT1_STRING } }) {
    const proc = fork(ipc, [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })
    proc.send(EXIT1_STRING)
    const { code } = await proc.promise
    equal(code, 1)
  },
  async 'exits with code 0'({ ipc, messages: { EXIT0_STRING } }) {
    const proc = fork(ipc, [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })
    proc.send(EXIT0_STRING)
    const { code } = await proc.promise
    equal(code, 0)
  },
}

export default T
