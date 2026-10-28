# Mayhem completion review — 27 October 2026

Reviewed upstream snapshot: `9a77d121116526339e87c376d01eb1ce48f3c180`, plus the
independently qualified composition below. **Whole-ELF identity is unfinished.**

| Artifact | Complete normalized windows | Raw-equal bodies | Direct-call-closed windows | No complete body match |
| --- | ---: | ---: | ---: | ---: |
| [Current qualified composition](../research/mayhem-current434-composition-20261027/README.md) | 434 / 441 (98.41%) | 141 / 441 (31.97%) | 425 / 441 (96.37%) | 7 / 441 (1.59%) |
| [Previous source-origin checkpoint](../research/mayhem-source-origin-recovery-20261027/README.md) | 432 / 441 (97.96%) | 141 / 441 (31.97%) | 422 / 441 (95.69%) | 9 / 441 (2.04%) |

The current artifact combines O0073 and O0075 recovery with all 141 raw bodies
and the repaired allocator/data references. It is one measured build, not a sum
of separate frontiers. An unchanged control reproduces the previous checkpoint;
two combined builds agree. Independent verification passes all nine controls and
18,534 signed records across the overlapping trade, initializer, sweep and rate
scopes. The [packet](../research/mayhem-current434-composition-20261027/README.md)
contains the source, complete artifacts, receipts and verification commands.

The older published 434/100 composition was weaker in raw equality and runtime
evidence. It is retained as source provenance; its limitations do not transfer
to the newly compiled and independently qualified 434/141 artifact.

## Percentage of original code still unmatched

All figures use the same 441 inferred original function windows and 706,744
original `.text` bytes, including framework/runtime helpers.

| Artifact | Text in complete normalized matches | Unmatched original text |
| --- | ---: | ---: |
| Current qualified composition | 607,712 / 706,744 (85.99%) | 99,032 bytes (14.01%) |
| Previous source-origin checkpoint | 598,792 / 706,744 (84.73%) | 107,952 bytes (15.27%) |

The 141 raw-equal bodies contain **65,504 original text bytes (9.27%)**. This is
local raw-body coverage, not the fraction of the whole ELF that is identical.
These percentages do not estimate remaining engineering time or prove the same
fraction of behavior correct. Normalized matches mask specified address/call
operands. Data, indirect calls, layout, relocations, reproducible whole-ELF
equality and build provenance remain separate obligations.

The [code-reference review](../research/mayhem-current434-code-reference-closure-20261027/README.md)
checks all 48 relocated code-address sites in matched windows, targeting 15
original functions. Adding those edges preserves the same 425-window recursive
closure. Its eight tests include 48 actual pointer corruptions. This closes a
bounded code-reference obligation; the 93 indirect calls in 51 matched windows
still need their own value-flow and data evidence. The seven unmatched bodies
contain no indirect calls.

## Seven bodies still unmatched

| Original window | Start | Bytes | Remaining function |
| --- | ---: | ---: | --- |
| O0076 | 77,200 | 8,400 | SweepFees business body |
| O0077 | 85,600 | 9,736 | AMM Buy |
| O0079 | 95,848 | 17,312 | AMM Sell |
| O0081 | 113,672 | 13,848 | Legacy Buy |
| O0082 | 127,520 | 12,992 | Legacy Sell |
| O0083 | 140,512 | 18,648 | BuyV2 |
| O0084 | 159,160 | 18,096 | SellV2 |
| **Total** | | **99,032** | |

“Unmatched” means no complete original machine-body counterpart under the
unchanged matcher. It does not mean no Rust implementation exists. The trade
handlers have substantial partial reconstructions; equal size, ordered callee
profiles, CFG correspondence or passing bounded tests do not make them complete
matches. O0073 and O0075 are now complete normalized matches in the qualified
composition.

The [441-row inventory](../research/mayhem-current434-composition-20261027/inventory.tsv)
lists every raw-equal, normalized-only and unmatched body with actual counterpart
names and addresses. The [parallel work map](MAYHEM-PARALLEL-WORK.md) records
the source investigations and their artifact bindings.

## Active work

- Finish the six trade bodies, focusing on actual CPI ownership, seed lifetimes,
  arithmetic order, alias metadata and event construction.
- Reconstruct the remaining SweepFees body and validate its local cases.
- Close remaining data and indirect-call obligations, then reproduce the
  complete original ELF from ordinary Rust and a documented build recipe.

All execution in this work is local. No live-chain deployment or transaction is
part of the completion claim.
