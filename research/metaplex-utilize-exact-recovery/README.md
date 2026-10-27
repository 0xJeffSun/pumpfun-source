# Metaplex Utilize: exact meaningful ELF from reconstructed Rust

The selected Rust source closes the last **80 differing byte positions** in the
owned-Uses checkpoint: 79 instruction bytes in `process_utilize` and one relocation
byte. After the normal `llvm-objcopy --strip-all` step, **all 707,448 meaningful
ELF bytes match the captured Token Metadata dependency**, including all 1,251
inferred function windows, data, calls and relocations. No address normalization
is needed for this result.

| Measurement | Previous owned-Uses checkpoint | This source |
| --- | ---: | ---: |
| Different meaningful ELF positions | 80 | **0** |
| Raw-equal inferred function windows | 1,250 / 1,251 | **1,251 / 1,251** |
| Utilize body size | 5,104 | 5,104 |
| Stripped ELF bytes | 707,448 | 707,448 |

Selected SHA-256: `99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff`.
The unstripped compiler output is separately retained: 707,544 bytes, SHA-256
`d38edf7b5c03c25b9c323568932ac6e9c593c0e141bcea3781ee13132d88c6b0`.
The captured payload is 793,991 bytes, SHA-256
`31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011`.
Its final 86,543 bytes are independently checked to be zero. Appending that zero
suffix to the stripped ELF gives the capture exactly; **a loader deployment was
not replayed**, and the compiler did not emit that allocation suffix.

Metaplex is a captured dependency, outside the repository's five-program progress
table. This packet does not change the four core contracts' status or select a
new runtime dependency for them. It preserves the original capture and prior
sealed packets.

## What changed

[utilize.patch](utilize.patch) changes one file relative to
[`metaplex-owned-uses-20261026`](../../repro/pump/metaplex-owned-uses-20261026/README.md).
[source/utilize.rs](source/utilize.rs) is the complete selected file. The source
archive contains the same 18 overrides as that checkpoint, with only this file
changed. Both full 812-file source manifests are retained.

The change moves `metadata.uses` into the owned local instead of calling
`Option<Uses>::clone`, retains the early zero/above-total rejection, and puts the
checked subtraction in a labeled admission block. The repeated guard inside the
block is deliberately dominated by the first guard. It affects early cleanup
block ordering but is eliminated before instruction selection. No `Copy` trait,
unsafe memory operation, assembly, compiler change, or post-build instruction /
relocation patch is introduced. The ordinary strip command is the only build
postprocessing step.

Zero uses and counts above total still fail first. Underflow still fails before
the updated `Uses` is stored. Authority validation, account writes and CPI paths
are unchanged. The variable name and existing line layout preserve the diagnostic
source coordinates. **Do not simplify the dominated guard or run rustfmt on the
reconstruction without rebuilding and comparing the complete ELF.** This is a
compiler-specific reconstruction recipe, not a claim about historical coding
style.

## Compiler-stage diagnosis

The [prior report](prior-20-experiments/REPORT.md) and its 20 rejected source
experiments are retained as historical negative evidence. Their conclusion was
correct for those experiments; their manifest is not rewritten to describe the
new result. The subsequent experiments and their actual commands, source hashes
and logs are under [experiments](experiments/results.json).

1. **MIR / LLVM IR copy operation.** In the control, the `Option<Uses>::clone`
   call survives through optimized LLVM IR. Moving the field produces a 24-byte
   `llvm.memcpy` into the unwrap argument. This changes the selected copy sequence
   without introducing the `Copy` implementations that regressed other windows
   in the earlier experiments.
2. **Instruction selection.** In the control's final LLVM input, the underflow
   error block follows the success block. SelectionDAG emits an unsigned greater
   branch plus an unconditional success jump. In the selected source, final LLVM
   block `bb106` tests remaining/count, `bb110` (underflow failure) immediately
   follows it, then `bb108` succeeds. ISel chooses `JUGE_rr` to success with the
   error as fallthrough. The two original validation conditions still occur only
   once in this optimized region.
3. **Cleanup and late block placement.** Merely merging the failures in a labeled
   block fixed the local copy/guard but moved cleanup between success and the
   owner path. Branch folding then relocated success; basic block placement chose
   the delegated path first at a 50/50 edge. That rejected variant is
   `single-failure-admission`. Keeping the early return and the dominated
   admission guard preserves cleanup ahead of success. The owner/delegated block
   order and the final whole ELF then match.

The [guard excerpts](compiler/guard-excerpts.txt), `compiler/*/utilize.mir.gz`,
initial LLVM snapshot `000.txt.gz`, final LLVM input `246.txt.gz`, pre/post
finalized ISel `249.txt.gz` / `250.txt.gz`, branch folding `329.txt.gz` /
`330.txt.gz`, and block placement `341.txt.gz` / `342.txt.gz` make these changes
reviewable. Snapshots are compressed without altering their original bytes;
use `gzip -dc` to inspect them. Complete traces and exact-output gates are retained.
Tracing is observational: the control still emits its original checkpoint hash,
and the selected traced source emits the same selected hash as ordinary builds.

As a causal discriminator, four full-module `llc` experiments independently
changed the copy operation and the underflow block position:

| Diagnostic IR variant | Utilize bytes | Entire normalized Utilize equal |
| --- | ---: | --- |
| Unmodified control | 5,104 | No; reproduces the normalized control |
| Copy only | 5,112 | No |
| Block layout only | 5,096 | No |
| Copy and layout | 5,104 | **Yes** |

These are **diagnostic counterfactuals**, not accepted reconstruction artifacts.
The comparison masks unresolved call/address operands in the object. The accepted
result instead comes from unmodified Rust compiler output plus ordinary stripping
and is compared raw, without masks. `diagnose_ir.py` replays the diagnostic from
the retained optimized full module; its output is never consumed by `build.py`.

The pinned Rust frontend also documents the mechanism: [reverse-postorder MIR
codegen](https://github.com/anza-xyz/rust/blob/764ce69bd00903f5c59f44b6aa72649b173f568c/compiler/rustc_codegen_ssa/src/mir/mod.rs)
and [conditional successor block creation](https://github.com/anza-xyz/rust/blob/764ce69bd00903f5c59f44b6aa72649b173f568c/compiler/rustc_codegen_ssa/src/mir/block.rs).
These explain the observed reconstruction; they do not authenticate deployment
provenance.

## Local reproduction and verification

Requirements: Python 3.11+, repository `requirements.txt`, Linux/WSL2, Docker,
the pinned public source, official platform-tools v1.37 archive and a populated
Cargo cache for the recorded lockfile. Public source is
[`metaplex-foundation/mpl-token-metadata` at `17e99434`](https://github.com/metaplex-foundation/mpl-token-metadata/tree/17e99434af5ead3e989c08f32af33609821d0bc0).
The SDK archive SHA-256 is
`8d5153589dbe19635affe937663cf4555a7e69a62d91ab4a1df064aaa8d5f066`.
The Docker image is pinned in `build.py`. Registry/Git fetching is a separate
preparation step; the compiler runs with `--locked --offline --network none`.

From the repository root, with absolute input paths:

```sh
python3 research/metaplex-utilize-exact-recovery/build.py \
  --upstream /path/to/clean/mpl-token-metadata \
  --sdk /path/to/platform-tools-v1.37 \
  --sdk-archive /path/to/platform-tools-v137.tar.bz2 \
  --cargo-cache /path/to/populated/cargo-home \
  --output /path/to/new/empty-build
python3 research/metaplex-utilize-exact-recovery/validate.py \
  --candidate /path/to/new/empty-build/candidate.so \
  --output /path/to/new/runtime-receipts
python3 -B research/metaplex-utilize-exact-recovery/verify.py
python3 -B research/metaplex-utilize-exact-recovery/test_verify.py
```

`build.py` validates every upstream file, copies only the 812 manifest files into
a new source tree, applies the 18 recorded overrides, and checks the resulting
manifest. It verifies all **1,977 SDK files and 13 symlinks** against the hashed
archive, all **537 registry archives and 24,651 extracted source files**, and the
locked Rooster Git checkout. Source, SDK and dependency mounts are read-only;
the target starts empty. No original binary is mounted into the compiler.
Use an account that can read the dependency cache; this session's cache was
created by root inside Docker, so the final preflight ran as root in WSL.

The retained `builds/portable` run used this portable driver and passed in 63.55
compiler seconds. `builds/fresh` is an earlier independent empty-target success
at 67.36 seconds; its initial dependency receipt checked archives but reported
zero extracted packages. The portable run closes that audit limitation by
comparing extracted files directly against each archive. An initial Docker
mount setup failure and two portable preflight failures (cache permissions, then
Git ownership) occurred before compilation; see [execution-notes.md](execution-notes.md).

Both `runtime` and `runtime-portable` retain a separate 147-case local replay:
135 existing edition/uses/burn/context/validation cases plus 12 direct Utilize
boundary cases. Each replay contains 294 signed original/candidate transaction
records. Error, resulting account state and inner instructions agree. The direct
matrix includes zero, total/remaining limits, `u64::MAX`, single-use and burn
terminal/partial cases. It does not add delegated-authority success coverage.
These repeat runs are not summed as distinct scenarios. All activity used local
LiteSVM accounts; no live transactions were submitted.

The offline verifier checks the exact packet inventory (including nested
manifests), repository references, source patch/snapshot relation, raw ELF bytes,
zero suffix, build/trace receipts, and signed runtime receipts. Its negative
tests reject an extra nested manifest, a re-sealed corrupt ELF, a mislabeled
candidate receipt, and matching original/candidate records with invalid signatures.
It does not rebuild the compiler or independently rerun the VM; the commands
above do that. `execution-scripts` preserves original exploratory commands with
their local paths; `build.py`, `validate.py` and `diagnose_ir.py` are portable.

## Remaining limits

This is exact reproduction from a **reconstructed** source recipe. The historical
private source, build provenance and deployment process remain unauthenticated.
The result is specific to the pinned compiler, dependency inputs and source
coordinates. Finite local cases do not prove current-chain acceptance. A local
loader allocation replay remains separate work. No claim is made about the
current on-chain binary, unrelated contracts or a deployable release.

Latest overlap review: main `ff3d2ceb8`; open PR #263 concerns recovery findings
for the four core contracts, with no Metaplex source or packet overlap. The
snapshot is retained in `open-pr-snapshot.json`.
