import { fork } from '../src'

(async () => {
  const { promise } = fork('example/index.js', ['example/spawn.js'], {
    stdio: 'pipe',
  })
  const { stdout } =  await promise
  console.log(stdout)
})()