import { fork } from '../../src'
import { deepEqual } from 'zoroaster/assert'
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

export default T
