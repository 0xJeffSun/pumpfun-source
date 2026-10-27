# Fees: public module boundary restores InitializeBuyback's default bump store

This source-only proposal changes **one line** in the exact public
[PR188 math+pack combined source](https://github.com/lalalune/pumpfun-source/blob/af8ab8042c7e1415e8f3aa7169b40461bd443a00/research/fees-math-pack-source-proposal/README.md):

```diff
-mod instructions;
+pub mod instructions;
```

All other 41 inputs and every other byte of `lib.rs` stay unchanged. No explicit
store, inline/assembly directive, generated-code replacement, linker rule or
binary payload is added. The ordinary public module boundary preserves the
real `Default` bump initialization in the generated wrapper instead of allowing
it to be optimized away. This compiler/source explanation is an inference,
not proof of the historical module's visibility or original source layout.

## Pinned result and attribution

Local native comparison recovers the complete **1,208-byte wrapper at original
650064**, adding the missing halfword-default store at offset 104. The pinned
inventory moves **545 → 546 of 585 normalized windows**, with no losses and
118 raw local matches unchanged. The wrapper itself is not raw-equal; call/data
addresses remain relocated. The later public PR195 552-window dataset is a
separate source and was independently confirmed still to leave 650064 unmatched.
This packet does not claim a measured integration onto that newer frontier.

A local static audit closes all six actual direct-callee bodies and both complete
direct objects: the length-delimited instruction message and the 24-byte IO
message descriptor plus its complete string. It checks the actual default store,
not merely a masked signature. Transitive data, indirect behavior and exhaustive
semantics remain unproved; no full-file identity follows from these bounds.

The local candidate is 871,480 bytes, SHA-256
`cba39652a15cd2947669cfd5a8cc0c9b5a7b5c6266c49b3ae22074fe59da0677`;
symbols SHA-256
`71841a7a6cfac64027221bbd51939005c2d441823ac2f057ae119a103095a87e`.
It still differs at 457,624 common file positions and is not the original
873,256-byte meaningful ELF or 948,944-byte full capture. All four core-program
whole identities remain unresolved. No selected checkpoint is replaced.

## Source-only evidence boundary

Two root-clean native v1.44 builds repeated both outputs, using a verified
immutable dependency/math cache, not fresh all-dependency targets. The finite
local offline regression passed 17,331 cases across 18 suites. These statements
are **unpublished local observations**, not downloadable execution evidence.
No native artifact, binary, archive, runtime case, log, archived build/replay
receipt or encoded derivative is included. Default tools neither compile nor
execute a target; `native_build_verified`, `runtime_verified` and
`whole_binary_identity_verified` are always false.

## Verify and materialize

```sh
python3 -B verify.py
python3 -B test_scope.py
python3 -B materialize.py --parent-source /exact/pr188-combined-source --output /fresh/source
```

The manifest records the complete public parent revisions/paths and both exact
42-input hash maps. First materialize PR188's `combined` stage. The materializer
accepts only those bytes, checks the reversible readable one-line patch, rejects
existing/symlink output paths and writes a fresh exact source directory. It does
not download, invoke subprocesses, compile or execute a VM. Thirteen stdlib tests
cover source/patch drift, false runtime claims, path safety and no-artifact scope.

Native reproduction is a separate operation using the [pinned v1.44 recipe](https://github.com/lalalune/pumpfun-source/blob/0b5b69c6d4396ac520d1723fa8bd005e2cbbe549/research/fees-current-source-integration/README.md#guarded-portable-build-recipe).
Keep official authenticated tools, all locked dependencies/default features,
entrypoint 2.2.1, the local math crate, source remapping and the release profile
unchanged. Require real root/math compiler invocations. Fresh all-dependency and
relocated-path results must be independently checked; never patch or substitute
an output binary to repair a mismatch.
