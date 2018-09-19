import { join } from 'path'
import messages from '../FIXTURE/message'

const FIXTURE = 'test/fixture'
const node = join(FIXTURE, 'node.js')
const exit0 = join(FIXTURE, 'exit-0.js')
const exit1 = join(FIXTURE, 'exit-1.js')
const ipc = join(FIXTURE, 'message.js')
const error = join(FIXTURE, 'error.js')

const stdout = 'expected stdout\n'
const stderr = 'expected stderr\n'

export default {
  node,
  exit0,
  exit1,
  ipc,
  error,
  messages,
  stdout,
  stderr,
}
