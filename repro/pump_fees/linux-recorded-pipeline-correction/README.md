# Linux pipeline preparation corrections

This is an unexecuted helper proposal for the frozen Fees revision `4ffe8bd88761059693e481ae972443c10204f7af`. Its 22 program/workspace inputs, lock, unwrapped build command and compiler flags are unchanged. The proposed pipeline still compiles with Linux platform-tools v1.44 and post-processes through the already recorded SDK v1.52 installer branch, including Linux Criterion v2.3.3. It is a comparative build of the earlier `a9c4…` Fees source, not the current `e501…` checkpoint.

The changes address two review findings: the host Cargo and SBF Cargo use different observed registry namespace directories, and process tracing previously omitted the fork/clone events needed to associate relative executable paths with inherited working directories. The helper now copies an authentic locked public fetch into real directory views for both observed namespaces. It verifies all 252 selected package archives against the unchanged lock and every extracted source file against its archive, in both views, before and after compilation. No registry symlink aliases, source edits, invented index records or fabricated SDK completion markers are used.

Copied `.cargo-ok` files retain the authentic fetched bytes and are explicitly classified as copied Cargo bookkeeping, not native extraction evidence. Their hashes are recorded separately from the public source inventory. Index trees are recorded before and after; copied trees must be byte-identical at preparation. Existing native dual index trees need not be identical. The synthetic tests do not prove cross-version Cargo index compatibility on Linux; a future authorized build must establish that through its locked offline commands.

The helper rejects SDK scripts unless their recorded regular-file mode is `0755`. It checks the input SDK and its copied tree without changing permissions. It checks native `strace` availability and performs one tiny `/bin/true` trace, with the same fork/vfork/clone/clone3 selector as the later compiler trace, before tool downloads or compiler-attempt counting. It records executable hashes, version/package output and PID-specific trace files and fails closed when tracing is unavailable or denied. There is no tool-install or untraced fallback. No real tracer, compiler, installer or network request was executed during this correction task.

All 30 focused tests passed: 20 preparation/provenance tests plus ten unchanged retention tests. Subprocess and network operations in the new tests are blocked or mocked. Registry fixtures use two packages with only the production package-count constant mocked; this is not a claim that 252 real packages were fetched in the test. The initial three test errors were a macOS fixture omission for Linux `/bin/true`; that failed output remains saved, and the target digest is now mocked without changing helper behavior.

The earlier 26-file independent review is preserved byte-for-byte in `independent-review.tar.gz`, including its original seal. Its runner-image review did not establish `strace` availability or ptrace permission. That remains a hosted preflight requirement. A second read-only static review found no concrete blocker in the corrected helper and noted the index-compatibility limitation above.

Verify this bundle without importing the build helper:

```sh
python3 -B work/fees-linux-pipeline-corrections/verify.py
```

Rerun the focused tests, without compiling:

```sh
python3 -B -m unittest discover -s work/fees-linux-pipeline-corrections -p 'test_core_linux*.py' -v
```

See `INTEGRATION.md` for the exact proposed file mapping. No repository source, workflow, staging area or commit was changed by this task.
