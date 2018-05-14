import { resolve } from 'path'
import messages from '../fixtures/message'

const FIXTURES = resolve(__dirname, '../fixtures')
const node = resolve(FIXTURES, 'node.js')
const exit0 = resolve(FIXTURES, 'exit-0.js')
const exit1 = resolve(FIXTURES, 'exit-1.js')
const ipc = resolve(FIXTURES, 'message.js')
const error = resolve(FIXTURES, 'error.js')

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
