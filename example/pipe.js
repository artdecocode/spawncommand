import spawnCommand from '../src'

(async () => {
  const { stdout, promise } = spawnCommand('echo', ['hello world'])

  stdout.pipe(process.stdout)
  await promise
})()
