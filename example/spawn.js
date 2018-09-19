import spawn from '../src'

(async () => {
  const { promise } = spawn('echo', ['hello world'])
  const { stderr, stdout, code } =  await promise
  console.log(JSON.stringify({
    stderr, stdout, code,
  }, null, 2))
})()