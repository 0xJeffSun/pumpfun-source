# Fees AdminCto: boxed account ownership and typed self program

This source-only proposal changes exactly three account declarations relative to
[the pinned math+pack combined source](https://github.com/lalalune/pumpfun-source/blob/af8ab8042c7e1415e8f3aa7169b40461bd443a00/research/fees-math-pack-source-proposal/README.md):

* `Global` becomes `Box<Account<Global>>`.
* `SharingConfig` becomes `Box<Account<SharingConfig>>`.
* The self program becomes `Program<PumpFeesCandidate>` instead of an unchecked
  account with a manual address constraint. The event authority stays unchecked.

The observed parser allocates 744 and 104 bytes for these two account values;
its generated context is 176 bytes instead of 1,008. This is ordinary typed
source reconstruction, not emitted-byte substitution. The handler is unchanged.

## Local observations, not published execution evidence

Two local native v1.44 root-clean builds reproduced the same output using the
verified immutable math/dependency cache. This is not a fresh all-dependency build.
The pinned frontier
moves from 545 to 547 of 585 normalized original windows, with no losses:
parser 381352 (6,152 bytes) and generated wrapper 642848 (1,416 bytes).
Raw local matches remain 118. The 4,968-byte original business body is still
unmatched. Whole meaningful-ELF and complete-capture identity both remain false.

A separate local audit checked all 51 parser direct callee bodies and 19 complete
direct data objects; the wrapper closes 8 of 9 direct callees and all 6 direct
objects, leaving its business callee open. Relocated addresses, transitive data,
section order and whole-file identity are not established by this audit.
A separate local 18-suite, 17,331-case offline regression passed. None of those
native artifacts, receipts, runtime cases, logs or encoded derivatives is included
here. These sentences report unpublished observations, not replayable proof in
this packet. A source-only verifier cannot attest native or runtime equivalence.

## Source-only verification

```sh
python3 -B verify.py
python3 -B test_scope.py
python3 -B materialize.py --parent /path/to/exact-combined-source --output /fresh/source
```

The exact 42-file parent map and each public source revision/path are in
`manifest.json`. First materialize the pinned parent package's `combined` stage;
then this materializer accepts only its exact hashes. It performs no downloads,
subprocesses, compiler invocations or VM runs. The readable patch reverses exactly
to the parent hashes, and every unrelated source file is preserved. Output must
be fresh and cannot be a symlink or descend through a symlink.

Default reports deliberately set `runtime_verified`, `native_build_verified`
and `whole_binary_identity_verified` to **false**. Native reproduction is a
separate opt-in operation using the parent's pinned v1.44 recipe and locked
Anchor/SPL feature set; do not silently change defaults, dependencies or target.
The [pinned native v1.44 recipe](https://github.com/lalalune/pumpfun-source/blob/0b5b69c6d4396ac520d1723fa8bd005e2cbbe549/research/fees-current-source-integration/README.md#guarded-portable-build-recipe)
is a reference, not executed by this package. Use the exact composed dependency
lock, including entrypoint 2.2.1 and the separate math crate.
