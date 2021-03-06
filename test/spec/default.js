import { ok } from 'assert'
import { deepEqual, equal, throws } from 'zoroaster/assert'
import spawn from '../../src'
import context from '../context'

/** @type {Object.<string, (ctx: context)>} */
const T = {
  context,
  async 'spawns a process'({ node }) {
    const { promise } = spawn('node', [node])
    const res = await promise
    deepEqual(res, {
      stdout: '',
      stderr: '',
      code: 0,
    })
  },
  async 'spawns a process with exit 0'({ exit0, stdout, stderr }) {
    const { promise } = spawn('node', [exit0])
    const res = await promise
    deepEqual(res, {
      stdout,
      stderr,
      code: 0,
    })
  },
  async 'spawns a process with exit 1'({ exit1, stdout, stderr }) {
    const { promise } = spawn('node', [exit1])
    const res = await promise
    deepEqual(res, {
      stdout,
      stderr,
      code: 1,
    })
  },
  async 'spawns a process with no channels'({ node }) {
    const { promise } = spawn('node', [node], {
      stdio: ['ignore', 'ignore', 'ignore'],
    })
    await promise
  },
  async 'runs a Node.js process which throws an error'({ error }) {
    const { promise } = spawn('node', [error])
    const { stdout, stderr, code } = await promise
    equal(stdout, '')
    ok(/Error: Expected error/.test(stderr))
    equal(code, 1, `Expected exit code ${code} to equal 1`)
  },
  async 'rejects the promise when process is not spawned'() {
    const { promise } = spawn('none-existent-bin', ['non-existent-file'])
    await throws({
      async fn() {
        await promise
      },
      code: 'ENOENT',
    })
  },
}

/** @type {Object.<string, (ctx: context)>} */
export const message = {
  context,
  async 'picks up data from stdout'({ ipc, messages: { STDOUT_WRITE_STRING } }) {
    const proc = spawn('node', [ipc], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })
    proc.send(STDOUT_WRITE_STRING)
    const { stdout } = await proc.promise
    equal(stdout, STDOUT_WRITE_STRING)
  },
  async 'picks up data from stderr'({ ipc, messages: { STDERR_WRITE_STRING } }) {
    const proc = spawn('node', [ipc], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })
    proc.send(STDERR_WRITE_STRING)
    const { stderr } = await proc.promise
    equal(stderr, STDERR_WRITE_STRING)
  },
  async 'exits with code 1'({ ipc, messages: { EXIT1_STRING } }) {
    const proc = spawn('node', [ipc], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })
    proc.send(EXIT1_STRING)
    const { code } = await proc.promise
    equal(code, 1)
  },
  async 'exits with code 0'({ ipc, messages: { EXIT0_STRING } }) {
    const proc = spawn('node', [ipc], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })
    proc.send(EXIT0_STRING)
    const { code } = await proc.promise
    equal(code, 0)
  },
}

export default T
