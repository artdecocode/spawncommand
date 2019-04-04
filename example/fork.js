import { fork } from '../src'

(async () => {
  const { promise } = fork('node_modules/.bin/alanode',
    ['example/spawn.js'], {
      stdio: 'pipe',
    })
  const { stdout } =  await promise
  console.log(stdout)
})()