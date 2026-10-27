# Fees: pinned upstream union and Crank diagnostic source

This compact source-only packet preserves three separately attributable states:

1. **Baseline 545:** the public [PR188 math+pack composition](https://github.com/lalalune/pumpfun-source/blob/af8ab8042c7e1415e8f3aa7169b40461bd443a00/research/fees-math-pack-source-proposal/README.md).
2. **Integrated 550:** four ordinary source files compose public PR169, PR172
   and PR176 with that baseline. **All five added normalized windows belong to
   those upstream authors**, not this integration. Exact immutable revisions and
   attribution are in `upstream-attribution.json`.
3. **Diagnostics 550:** three expressions in `donation.rs` restore the disabled
   branch's explicit message/error conversion, the zero-amount message, and
   ordinary conversion of the overflow error instead of attaching a new source
   origin. No additional complete normalized window is claimed.

The PR172 composition keeps the previously recovered event declaration at its
existing source lines, moves the public handler implementation, and uses its
local event type rather than a duplicate reexport. The readable four-file patch
records this conflict resolution. All stages have exactly **42 source inputs**;
Cargo manifests, lock, dependency versions/features and the math crate are
unchanged. No captured executable, assembly template or ELF enters compiler
inputs. These are source hypotheses, not historical-source proof.

This is a **pinned integration**, not the latest upstream frontier. Later PR185/190
AdminCto integration and PR195 decoder composition report a different 552-window
source. Their gains are not claimed here; the diagnostic source is deliberately
kept on its independently tested 550-window control.

## Fresh static comparison

`expected.json` is recomputed directly from the public original and independently
built local ELF/symbol pairs. It contains static counts, hashes, addresses and
inventories, not archived build or runtime observations. Optional comparison
binds complete output hashes and checks:

- 545 → 550 → 550 normalized windows, **118 raw local windows at every stage**.
- Exactly five integration gains: 18384, 190104, 445160, 464168 and 639104; no
  normalized or raw losses. These are upstream PR169/172/176 recoveries.
- Every previously equal actual direct-callee shape across unique complete-body
  pairs remains equal. Unmatched callee obligations remain; this is not recursive
  or indirect semantic closure.
- The value-equal source-Location cohort grows from 161 to 163 uses. Two complete
  24-byte math Location-shaped records and their length-delimited paths still
  match; Rust type identity is inferred.
- The authentic SyncNative packing body, its four complete direct callees and
  actual incoming discriminant-17 path are retained. The incoming Crank body
  remains unmatched; a four-byte discriminant does not prove full enum extent.
- Whole sections, complete raw/normalized inventories and positional differences
  are reported, including regressions. **Whole meaningful ELF and complete
  capture equality remain false.** Counts are not a completion percentage.

| Static measure | Baseline | Integrated | Diagnostics |
| --- | ---: | ---: | ---: |
| Normalized counterparts | 545 | 550 | 550 |
| Raw local counterparts | 118 | 118 | 118 |
| Unique structural pairs | 398 | 403 | 403 |
| Actual direct-edge observations | 3,033 | 3,189 | 3,189 |
| Unequal complete-callee shapes | 18 | 16 | 16 |
| Equal decoded Location uses | 161 | 163 | 163 |
| Candidate ELF bytes | 871,472 | 872,696 | 871,664 |
| Common-position byte differences | 466,077 | 456,100 | 466,083 |

The diagnostics stage **regresses positional byte distance** while fixing the
observed diagnostics. A smaller file or higher coverage is not whole identity.

The diagnostics changes fix observed behavior but do **not** claim that Crank's
whole native body, all logs or all possible execution paths are now equal.
Section order, unbounded referenced data, indirect calls, error paths outside
covered cases and exact final binary identity remain open.

## Local observations are not downloadable execution proof

Each changed stage was independently repeated with identical root-clean native
outputs using verified cached dependencies. These are not fresh all-dependency
builds. Local offline validation passed 17,331 cases across 18 suites in their
specified observations. A separate local Crank application-log comparison covered
357 cases and corrected 137 prior mismatches. These are **unpublished local
observations**, not evidence established by this source packet or its default
verifier. No build/runtime receipt, replay case, log, receipt excerpt or encoded
derivative is included. Previously omitted messages are ordinary program source,
not copied execution logs. No verifier invokes a compiler, VM or live service.

## Verify and materialize

With Python 3.11+ and a clone containing the exact public commits:

```sh
P=research/fees-upstream-crank-source-proposal
python3 -I -B "$P/verify.py"
python3 -I -B "$P/test_verify.py"
python3 -I -B "$P/verify.py" --variant diagnostics --materialize /fresh/source
```

Other variants are `baseline` and `integrated`. Materialization verifies every
public parent blob and full 42-input result, exact patches and unchanged package
inputs; it rejects existing output paths, traversal and symlink ancestors.
Default tools report `compiler_executed=false`, `runtime_verified=false` and
perform only source/static-metadata integrity checks. The optional ELF path is
not invoked by default. Nine stdlib tests cover exact maps/materialization,
mutation rejection, patches, unsafe paths and absence of artifact/receipt reads.

Build each materialized source separately using the [pinned native Linux v1.44
recipe](https://github.com/lalalune/pumpfun-source/blob/0b5b69c6d4396ac520d1723fa8bd005e2cbbe549/research/fees-current-source-integration/README.md#guarded-portable-build-recipe).
Keep the official authenticated toolchain and strip tool, locked/offline
`sbpf-solana-solana` release target, exact source-path remapping, release profile,
default Anchor/SPL features and explicit clean environment. Require actual root
and local math compiler invocations, rather than accepting a cache-only root
artifact. Verify all public locked registry sources before executing their normal
build scripts/macros. Fresh all-dependency and relocated-path reproduction remain
separate checks; never patch or substitute a binary to repair a mismatch.

Supply all three local output directories (each has `candidate.so`, `symbols.so`)
for an explicit independent static comparison:

```sh
python3 -I -B "$P/verify.py" \
  --baseline-build /path/to/baseline \
  --integrated-build /path/to/integrated \
  --diagnostics-build /path/to/diagnostics
```

This reads hash-pinned public parser code/original and your compiler outputs,
never a saved build/runtime receipt. The source packet contains no ELF, gzip,
archive or hidden binary payload. No selected artifact or prior evidence is
replaced. Overall byte-identical completion remains unachieved.
