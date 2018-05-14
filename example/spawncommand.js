import spawnCommand from '../src'

(async () => {
  const { promise } = spawnCommand('echo', ['hello world'])
  const { stderr, stdout, code } =  await promise
  console.log(stderr) // undefined
  console.log(stdout) // hello world\n
  console.log(code) // 0
})()
