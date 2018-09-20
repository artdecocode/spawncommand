const { EventEmitter } = require('events')

// class ChildProcessWithPromise extends ChildProcess {
//   /**
//    * @param {ChildProcess}
//    * @param {Promise.<PromiseResult>} promise The promise resolved when the process exits.
//    */
//   constructor(p, promise) {
//     super()
//     this.promise = promise
//     Object.assign(this, p)
//     // this.spawnCommand = p.spawnargs.join(' ')
//   }
// }

class Test extends EventEmitter {
  constructor(n, t) {
    super()
    this._n = n
    if (t) Object.assign(t)
  }
  run() {
    this.emit('data', this._n)
  }
}

const t = new Test(1)
t.on('data', d => console.log('t %s', d))

const t2 = new Test(2, t)
t2.on('data', d => console.log('t2 %s', d))

t.run()
t2.run()