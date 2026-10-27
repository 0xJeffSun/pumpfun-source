# Reconstructed Sharing handler

The ordinary Rust implementation of `CreateFeeSharingConfig` now reproduces all
1,510 normalized instruction rows of the original 12,384-byte function. Its 64
direct callees and one external symbol also match. The source recovers the validation
closure, account copies, event values and CPI context lifetimes. Naming the two
migration CPI contexts and evaluating the mint reference before the graduated
predicate recover the original stack storage and load order. No assembly,
compiler hint, unused operation or patched executable bytes are used.

This adds original function `177720` to the [parent](../fees-common-quote-data-order/README.md):
**578/585 normalized functions, 198 raw-local matches, 431 unique pairs, 182
matching Source observations and 3,935/3,941 equal direct-call observations**.
All previous positive observations are retained. Only one of the 46 parent source
inputs changes. The other 585 compiled function bodies retain their normalized
instructions and direct targets.

The override and patch retain the exact compiled source bytes, including blank
line spacing. Scoped Git attributes preserve those bytes across checkouts.

The qualified linker recipe also retains the recovered relocatable-data layout
and orders 623 readonly input sections. All 105 global Source records match the
original. The 379 relocatable-data fields keep their verified target contents;
both readonly sections have their original lengths. The plain readonly section
still differs in 73 bytes within compiler-merged constant pools.

Two native Rust builds produce identical complete stripped and symbol artifacts:

| Artifact | SHA-256 |
| --- | --- |
| Stripped | `ed1c17207ccf1875ca647cbd5ff81472a69dd456127debf7875b3d07afc3a51b` |
| Symbols | `0e56167bbbe7663279a72380262949518c0f346a5b4581f699b1f3c351768ebe` |

Fresh original/candidate execution passes 17,331 cases across 18 suites, including
matching application logs in 6,413 cases. The verifier checks fixture order and
multiplicity against the parent. These are bounded runtime observations, not a
substitute for byte comparison.

**Whole-ELF and capture equality remain false.** Seven original functions remain
unmatched, and one extra compiled event helper remains. Normalization ignores only actual relocation targets and direct-call
immediates; raw target addresses, merged constant order and other ELF differences
remain unresolved. The recovered source and linker ordering are not claimed to
be the historical source or build recipe.

```sh
python3 -B research/fees-sharing-handler-recovery/verify.py
python3 -B research/fees-sharing-handler-recovery/test_verify.py
python3 -B research/fees-sharing-handler-recovery/verify.py --materialize /absolute/new/source
```

Verification performs no compilation, VM execution or network request. The
materializer recovers all 46 source inputs and the linker configuration. Saved
controllers, commands, compiler logs and maps are in `builds/`. Rebuilding uses
the parent's Linux platform-tools v1.44 SDK and locked warm dependency setup;
recorded local mount paths must be preserved or adapted consistently. Both
winning builds recompiled the root crate. This packet does not claim fresh
dependency installation or new SDK provenance.
