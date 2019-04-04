### Types

The package's main type is _ChildProcessWithPromise_ which enriches the standard _ChildProcess_ with a `promise` property.

%TYPEDEF types/index.xml ChildProcess%

%TYPEDEF types/cp.xml%

%TYPEDEF types/index.xml PromiseResult%

%~ width="15"%

```### spawn => ChildProcessWithPromise
[
  ["module", "string"],
  ["args", "string[]"],
  ["options?", "SpawnOptions"]
]
```

Spawns a command and returns a _ChildProcess_ instance with the `promise` property resolved on exit. The promise will be rejected if an error was encountered when trying to spawn the process.

%TYPEDEF types/index.xml SpawnOptions%

%EXAMPLE: example/spawn, ../src => spawncommand%
%FORK-json5 example/spawn%

The returned object is a `ChildProcess` and all of its properties can be accessed in the standard way.

%EXAMPLE: example/pipe, ../src => spawncommand%
%FORK example/pipe%

%~ width="15"%