# Mayhem completion review — 27 October 2026

Reviewed upstream snapshot: `55eb899b4b5720be3072ddd8f7d8881a104d5de8`, plus the
independently qualified composition below. **Whole-ELF identity is unfinished.**

| Artifact | Complete normalized windows | Raw-equal bodies | Direct-call-closed windows | No complete body match |
| --- | ---: | ---: | ---: | ---: |
| [Current qualified composition](../research/mayhem-current436-composition-20261027/README.md) | 436 / 441 (98.87%) | 141 / 441 (31.97%) | 429 / 441 (97.28%) | 5 / 441 (1.13%) |
| [Previous qualified composition](../research/mayhem-current434-composition-20261027/README.md) | 434 / 441 (98.41%) | 141 / 441 (31.97%) | 425 / 441 (96.37%) | 7 / 441 (1.59%) |

The current artifact adds O0081 Legacy Buy and O0082 Legacy Sell to the previous
434-window source, retaining all 141 raw bodies and the repaired allocator/data
references. It is one measured build, not a sum of separate frontiers. Two
combined builds agree. Fresh local verification covers
18,534 signed records across the overlapping trade, initializer, sweep and rate
scopes. The [packet](../research/mayhem-current436-composition-20261027/README.md)
contains the source, complete artifacts, receipts and verification commands.

PR #404 first supplied the two Legacy bodies in a 436/100 artifact. The current
composition applies its six disjoint source changes to the stronger 434/141
parent and reruns validation. Its extra raw/call/Source evidence is measured on
this actual combined artifact.

## Percentage of original code still unmatched

All figures use the same 441 inferred original function windows and 706,744
original `.text` bytes, including framework/runtime helpers.

| Artifact | Text in complete normalized matches | Unmatched original text |
| --- | ---: | ---: |
| Current qualified composition | 634,552 / 706,744 (89.79%) | 72,192 bytes (10.21%) |
| Previous qualified composition | 607,712 / 706,744 (85.99%) | 99,032 bytes (14.01%) |

The 141 raw-equal bodies contain **65,504 original text bytes (9.27%)**. This is
local raw-body coverage, not the fraction of the whole ELF that is identical.
These percentages do not estimate remaining engineering time or prove the same
fraction of behavior correct. Normalized matches mask specified address/call
operands. Data, indirect calls, layout, relocations, reproducible whole-ELF
equality and build provenance remain separate obligations.

The [code-reference review](../research/mayhem-current434-code-reference-closure-20261027/README.md)
checks all 48 relocated code-address sites in matched windows, targeting 15
original functions. Adding those edges preserves the same 425-window recursive
closure on the previous 434-window artifact. Its eight tests include 48 actual
pointer corruptions. This closes a bounded code-reference obligation; the 93 indirect calls in 51 matched windows
still need their own value-flow and data evidence. The five unmatched bodies
contain no indirect calls.

The [conditional formatting proof](../research/mayhem-current434-format-route-20261027/README.md)
traces three indirect sites for 25 explicit tag inputs on that same 434 artifact.
It assumes allocation and prefix-write success and stops before the final write;
it does not establish generic indirect-call or formatting correctness.
The [Custom branch follow-up](../research/mayhem-current434-custom-format-route-20261027/README.md)
adds three tuple-dispatch sites and a 32-byte vtable check, stopping at the
numeric formatter with the payload value opaque.

The [current selected-data checks](../research/mayhem-current436-selected-prefixes-20261027/README.md)
bind the 436-window artifact. They add all 486 matching Source coordinates,
48 code-address sites and 119 references to selected 32-byte data prefixes to
the recursive relation. All 429 previously closed windows survive, while 22
ambiguous counterpart pairs are rejected. This checks the stated prefix values
and targets; full data-object extent and general dispatch remain open.

## Five bodies still unmatched

| Original window | Start | Bytes | Remaining function |
| --- | ---: | ---: | --- |
| O0076 | 77,200 | 8,400 | SweepFees business body |
| O0077 | 85,600 | 9,736 | AMM Buy |
| O0079 | 95,848 | 17,312 | AMM Sell |
| O0083 | 140,512 | 18,648 | BuyV2 |
| O0084 | 159,160 | 18,096 | SellV2 |
| **Total** | | **72,192** | |

“Unmatched” means no complete original machine-body counterpart under the
unchanged matcher. It does not mean no Rust implementation exists. The trade
handlers have substantial partial reconstructions; equal size, ordered callee
profiles, CFG correspondence or passing bounded tests do not make them complete
matches. O0073, O0075, O0081 and O0082 are complete normalized matches in the
qualified composition. The Legacy bodies reproduce all 50 direct-call positions
and their complete original control-flow graphs; normalized equality still does
not make them raw-equal or prove all referenced data.

The [441-row inventory](../research/mayhem-current436-composition-20261027/inventory.tsv)
lists every raw-equal, normalized-only and unmatched body with actual counterpart
names and addresses. The [parallel work map](MAYHEM-PARALLEL-WORK.md) records
the source investigations and their artifact bindings.

## Active work

- Finish the four trade bodies, focusing on actual CPI ownership, seed lifetimes,
  arithmetic order, alias metadata and event construction.
- Reconstruct the remaining SweepFees body and validate its local cases.
- Close remaining data and indirect-call obligations, then reproduce the
  complete original ELF from ordinary Rust and a documented build recipe.

All execution in this work is local. No live-chain deployment or transaction is
part of the completion claim.
