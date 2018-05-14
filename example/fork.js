import { resolve } from 'path'
import { fork } from '../src'

const MODULE_PATH = resolve(__dirname, 'index.js')

;(async () => {
  const { promise } = fork(MODULE_PATH, ['example/spawn.js'], {
    stdio: 'pipe',
  })
  const { stdout } =  await promise
  console.log(stdout) // same output as example/spawn.js
})()
