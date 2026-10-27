# Mayhem native Program parser recovery

Restoring the captured program-ID validation and using Anchor's standard
`Program` field parsing recovers **14 complete normalized original bodies** with
no loss of earlier matches. The full static inventory advances from 327 to
**341/441 matching windows**: 58 raw-local, 283 normalized-only and 100 unmatched.
The recovered extents total **145,720 original text bytes**. Unmatched extents
fall from 495,936 to **350,216 bytes**. These are body comparisons, not a whole
program or semantic completion score.

Two real root builds produce the identical 625,904-byte candidate
`62a9e700ea52f7afb269e1aea22e4c163221cbe353539829cc1e1010bfcb819a` and symbol ELF
`bfc7eb5994365d8388b56385e0c369c6c9879be4cac4afd40ca1f803cd107c68`.
Canonical selected source/checkpoints are unchanged.

## Source change and cause

Anchor 1.0's `Program` uses the all-zero ID to mean an unchecked generic program,
which skips the System program's ID check. The captured Mayhem code checks that
ID first, then executable status. The preceding source used a custom composite
account wrapper to preserve behavior, but this changed generated account-parser
layout. Replacing the wrapper's implementation alone did not recover the bodies.

The recovered source uses the normal `Program<'info, System>` field. A local,
vendored Anchor 1.0 copy removes the zero-ID exemption in `Program::try_from`.
Other crate files are byte-identical to the checksum-authenticated upstream
archive. The only extra vendor file is Cargo's `{"v":1}` completion marker.
The verifier rechecks the complete archive/file map and exact program.rs delta.
No compiler artifact is modified. This is a reconstructed dependency variant,
not proof of the historical dependency repository or build recipe.

There are 16 non-vendor compiler/source inputs and 38 vendored files. Cargo.lock
retains every dependency/version/checksum except the registry identity of the
single path-patched Anchor crate. No latest-version dependency refresh is used.
The two builds retain commands, source hashes, logs and binaries; they reuse
private dependency caches and do not claim all-dependency-clean compilation.

## New complete body matches

| Original window | Start | Bytes |
| --- | ---: | ---: |
| O0062 | 41,952 | 400 |
| O0099 | 197,000 | 3,216 |
| O0102 | 205,704 | 4,376 |
| O0104 | 210,888 | 4,512 |
| O0109 | 231,024 | 10,568 |
| O0111 | 244,328 | 3,816 |
| O0120 | 268,912 | 8,008 |
| O0122 | 278,360 | 7,808 |
| O0124 | 287,608 | 19,256 |
| O0127 | 314,520 | 18,656 |
| O0129 | 337,400 | 15,008 |
| O0131 | 356,104 | 14,728 |
| O0134 | 378,584 | 17,664 |
| O0136 | 400,192 | 17,704 |

Addresses are checked by `transition.json` and the complete [inventory](functions.tsv).
The six trade account parsers and Burn account parser now match. All matches use
the existing strict normalization: equal extents, instructions and relocation
patterns, masking only permitted call displacements/relocations.

Five new bodies (O0099, O0129, O0131, O0134, O0136) still call a destination with
a different complete shape. In particular, the boxed-account helpers and an
initializer closure remain work. Referenced-data equality and transitive closure
are not established by a normalized body match. Raw-local matches remain 58;
whole ELF equality remains false.

The explicit source-examined cohort expands to 212 rows: 202 matching and ten
unmatched, leaving 229 without full source attribution. This cohort is distinct
from the complete 441-window mechanical scan. The ten known handler/math gaps
are not removed by account-parser recovery.

## Runtime preservation

All 14 trade suites pass: **6,636 comparisons**, covering legacy Buy/Sell, V2
Buy/Sell in three quote families, and PumpSwap Buy/Sell in three quote families.
The 1,032-case admin lane and three sequential Burn families also pass. All
**15,348 saved transaction signatures** are independently verified. Successful
admin outcomes include 624 fully reconstructed account results. Initializers
remain excluded from runtime testing.

The comparator checks signed transactions, errors, tracked account bytes and
metadata (excluding the changed Mayhem executable), inner instructions, return
data and event logs. The verifier checks exact ordered case coverage against
retained case definitions. Source/compute-log differences in the older suites
remain separately reported; a passing normalized-log comparison is not raw-log
identity. Token-2022 suites include rejection-only families. No mainnet execution
or exhaustive behavioral proof is asserted.

```
python3 -B research/mayhem-native-program-recovery/verify.py
python3 -B research/mayhem-native-program-recovery/analysis.py --check
```

These checks read saved evidence without compiling or executing target programs.
The source archive, exact root patch, upstream crate, builds and full receipts
are retained in this packet. Recorded build paths need relocation and a prepared
SDK/cache environment for a new build.
