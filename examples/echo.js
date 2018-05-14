const spawnCommand = require('spawncommand')

const echo = spawnCommand('echo', ['hello world'])
echo
  .promise
  .then((res) => {
    console.error(res)
  })

