const { EventEmitter } = require('events')

class Test extends EventEmitter {
  constructor(n, t) {
    super()
    this._n = n
    if (t) Object.assign(t)
  }
  get n() {
    return this._n
  }
  run() {
    this.emit('data', this._n)
  }
}

const t = new Test(1)
t.on('data', d => console.log('t %s', d))

const t2 = new Test(2, t)
t2.on('data', d => console.log('t2 %s', d))

// console.log(t2)
t.run()
t2.run()