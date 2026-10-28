# Mayhem completion review — 27 October 2026

Reviewed upstream snapshot: `450c11d7d71994e25fb02f649d6ac5bf9bf7035b`.
Mayhem is **not whole-ELF identical**. Its two strongest published results are
different artifacts and must not be added together.

| Artifact | Complete normalized windows | Raw-equal bodies | Direct-call-closed windows | No complete body match |
| --- | ---: | ---: | ---: | ---: |
| [Qualified source-origin checkpoint](../research/mayhem-source-origin-recovery-20261027/README.md) | 432 / 441 (97.96%) | 141 / 441 (31.97%) | 422 / 441 (95.69%) | 9 / 441 (2.04%) |
| [Newer sweep-source composition](../research/claude-fees-final-mayhem-o0073/README.md) | 434 / 441 (98.41%) | 100 / 441 (22.68%) | 417 / 441 (94.56%) | 7 / 441 (1.59%) |

The first row has two agreeing complete builds and independently checked
6,636 trade, 301 ExtendAccount and 69 initializer pairs: 14,042 signed records.
Its 20 corruption/control tests pass. The second row adds complete normalized
O0073 and O0075 bodies, but loses 41 raw matches and eight allocator-related
direct-call closures relative to the first row. It has one composed build,
saved sweep/rate result records without signed-transaction/program-account
attestations, a trade summary without the full reports, and no stated
initializer replay. It is a structural recovery result, not a fully qualified
successor to the first row.

The immediate integration task is to reproduce the 434-window source gains
while preserving all 141 raw bodies, the allocator repair and the checked
source/data references, then repeat the build and authenticate fresh local
runtime records for that exact combined artifact. That combined result is not
claimed yet.

## Percentage of original code still unmatched

All figures use the same 441 inferred original function windows and 706,744
original `.text` bytes, including framework/runtime helpers.

| Artifact | Text in complete normalized matches | Unmatched original text |
| --- | ---: | ---: |
| Qualified source-origin checkpoint | 598,792 / 706,744 (84.73%) | 107,952 bytes (15.27%) |
| Newer sweep-source composition | 607,712 / 706,744 (85.99%) | 99,032 bytes (14.01%) |

The qualified checkpoint's 141 raw-equal bodies contain **65,504 original text
bytes (9.27%)**. This is local raw-body coverage, not the fraction of the whole
ELF that is identical: different layouts, pointers and data remain unresolved.

These percentages measure complete machine-body coverage. They do not estimate
remaining engineering time or prove that the same fraction of behavior is
correct. Normalized matches mask specified address/call operands; raw equality
is local to the body. Data, indirect calls, layout, relocations, reproducible
whole-ELF equality and build provenance remain separate obligations.

## Seven bodies still unmatched in the structural frontier

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
matches. O0073 and O0075 remain unmatched in the qualified 432-window artifact
until their newer source recovery is composed and qualified there.

The [qualified 441-row inventory](../research/mayhem-source-origin-recovery-20261027/inventory.tsv)
lists raw-equal, normalized-only and unmatched bodies with actual counterpart
names and addresses. The [parallel work map](MAYHEM-PARALLEL-WORK.md) records
the source investigations and their separate artifact bindings.

## Active work

- Compose and qualify the two newer body recoveries without losing the stronger
  raw/call/data result.
- Finish the six trade bodies, focusing on actual CPI ownership, seed lifetimes,
  arithmetic order and event construction.
- Reconstruct the remaining SweepFees body and validate its local cases.
- Close remaining data and indirect-call obligations, then reproduce the
  complete original ELF from ordinary Rust and a documented build recipe.

All execution in this work is local. No live-chain deployment or transaction is
part of the completion claim.
