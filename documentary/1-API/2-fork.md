```### fork => ChildProcessWithPromise
[
  ["module", "string"],
  ["args", "string[]"],
  ["options?", "ForkOptions"]
]
```

Forks a Node.js module and adds a `promise` property to the returned _ChildProcess_.

%TYPEDEF types/index.xml ForkOptions%

%EXAMPLE: example/fork, ../src => spawncommand%
%FORK-json5 example/fork%

The `pipe` option needs to be set in order to gather the output of the `stderr` and `stdout` streams (or an array for older versions of Node.js when [this does not work][2]).

%~%