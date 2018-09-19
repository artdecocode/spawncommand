### Types

The package has a number of types.

%TYPEDEF types/index.xml%

%~ width="15"%

```### spawn => ChildProcessWithPromise
[
  ["module", "string"],
  ["args", "string[]"],
  ["options?", "ForkOptions"]
]
```

Spawns a command and returns a _ChildProcess_ instance with the `promise` property resolved on exit. The promise will be rejected if an error was encountered when trying to spawn the process.

%EXAMPLE: example/spawn.js, ../src => spawncommand%
%FORK-json5 example example/spawn.js%

The returned object is a `ChildProcess` and all of its properties can be accessed in the standard way.

%EXAMPLE: example/pipe.js, ../src => spawncommand%

%FORK example example/pipe.js%

%~ width="15"%