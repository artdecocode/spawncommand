```### fork => ChildProcessWithPromise
[
  ["module", "string"],
  ["args", "string[]"],
  ["options?", "SpawnOptions"]
]
```

Forks a Node.js module and adds a `promise` property to the returned _ChildProcess_.

%EXAMPLE: example/fork.js, ../src=>spawncommand%
%FORK example example/fork.js%

The `pipe` option needs to be set in order to gather the output of the `stderr` and `stdout` streams (or an array for older versions of Node.js when [this does not work][2]).

%~%