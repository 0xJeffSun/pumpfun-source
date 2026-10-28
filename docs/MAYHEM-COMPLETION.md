# Mayhem completion review — 28 October 2026

Reviewed candidate: `da217317cd82d23898b846c1d3b47d8643b495fad90796c2a6ef62b37cfbbeef`.
**Whole-ELF identity is unfinished.**

| Artifact | Complete normalized windows | Raw-equal bodies | Direct-call-closed windows | No complete body match |
| --- | ---: | ---: | ---: | ---: |
| [Current qualified composition](../research/mayhem-current437-composition-20261028/README.md) | 437 / 441 (99.09%) | 141 / 441 (31.97%) | 431 / 441 (97.73%) | 4 / 441 (0.91%) |
| [Previous qualified composition](../research/mayhem-current436-composition-20261027/README.md) | 436 / 441 (98.87%) | 141 / 441 (31.97%) | 429 / 441 (97.28%) | 5 / 441 (1.13%) |

The 437 matched windows comprise 141 raw-local bodies and 296 normalized-only
matches. The current artifact adds the complete 8,400-byte SweepFees body, O0076,
to the qualified436 source. Passing the existing GlobalParams account as a separate
method argument preserves the original base-plus-field addressing. Named Rent
locals and reused AccountInfo references preserve the observed lifetimes. These
are ordinary Rust source changes in one file. All 1,050 normalized instruction
words, the relocation pattern, 189 CFG blocks, 51 immediate callee positions and
13 Source observations for this body agree with the original.

All 141 prior raw bodies, normalized matches, positive call edges and Source
observations survive. O0076 and its wrapper O0169 enter the direct-call-closed
set. The complete artifact supports **4,525 positive immediate edges and 499
Source observations**. Repeated root compilations agree; the result is one
composed artifact, not a sum of separate frontiers.

Fresh signed trade, initializer, sweep and rate receipts bind to this exact
437-window candidate. The trade run covers 6,636 pairs; the packet records each
suite's full scope and counts. Scopes overlap and must not be summed as unique
transactions. The qualified436 receipts remain historical evidence for their
own artifact and are not relabeled as 437 results.

The previous composition added O0081 Legacy Buy and O0082 Legacy Sell by applying
PR404's six disjoint source changes to the stronger 434/141 parent. Its own
source, builds and runtime receipts remain in the
[qualified436 packet](../research/mayhem-current436-composition-20261027/README.md).

## Percentage of original code still unmatched

All figures use the same 441 inferred original function windows and 706,744
original `.text` bytes, including framework/runtime helpers.

| Artifact | Text in complete normalized matches | Unmatched original text |
| --- | ---: | ---: |
| Current qualified composition | 642,952 / 706,744 (90.97%) | 63,792 bytes (9.03%) |
| Previous qualified composition | 634,552 / 706,744 (89.79%) | 72,192 bytes (10.21%) |

The 141 raw-equal bodies contain **65,504 original text bytes (9.27%)**. This is
local raw-body coverage, not the fraction of the whole ELF that is identical.
The remaining 0.91% of function windows and 9.03% of text are binary-coverage
figures, not estimates of remaining engineering time. Normalized matches mask
specified address/call operands. Data, indirect calls, layout, relocations,
reproducible whole-ELF equality and build provenance remain separate obligations.

The [code-reference review](../research/mayhem-current434-code-reference-closure-20261027/README.md)
checks 48 relocated code-address sites targeting 15 original functions on the
historical 434-window artifact. It preserves that artifact's 425-window recursive
closure. Its eight tests include 48 actual pointer corruptions. The 93 indirect
calls in 51 matched windows still need their own value-flow and data evidence;
the four unmatched trade bodies contain no indirect calls.

The [conditional formatting proof](../research/mayhem-current434-format-route-20261027/README.md)
traces three indirect sites for 25 explicit tag inputs on that 434 artifact.
It assumes allocation and prefix-write success and stops before the final write;
it does not establish generic indirect-call or formatting correctness.
The [Custom branch follow-up](../research/mayhem-current434-custom-format-route-20261027/README.md)
adds three tuple-dispatch sites and a 32-byte vtable check, stopping at the numeric
formatter with the payload value opaque.

The [selected-data checks](../research/mayhem-current436-selected-prefixes-20261027/README.md)
are bound to the 436-window artifact. They add 486 Source coordinates, 48
code-address sites and 119 references to selected 32-byte prefixes to that
artifact's recursive relation. All 429 closed windows survive while 22 ambiguous
counterpart pairs are rejected. The
[writer-record extension](../research/mayhem-current436-writer-records-20261028/README.md)
checks 80 additional original data bytes as ten relocated method pointers in five
48-byte spans, retaining 429 windows and 579 counterpart pairs. These historical
results do not automatically transfer to 437. Full object extents, arbitrary
dispatch and complete data identity remain open.

## Four bodies still unmatched

| Original window | Start | Bytes | Remaining function |
| --- | ---: | ---: | --- |
| O0077 | 85,600 | 9,736 | AMM Buy |
| O0079 | 95,848 | 17,312 | AMM Sell |
| O0083 | 140,512 | 18,648 | BuyV2 |
| O0084 | 159,160 | 18,096 | SellV2 |
| **Total** | | **63,792** | |

“Unmatched” means no complete original machine-body counterpart under the
unchanged matcher. It does not mean no Rust implementation exists. All four
trade handlers have substantial partial reconstructions. Equal size, ordered
callee profiles, CFG correspondence or bounded runtime tests do not make those
bodies complete matches.

O0073, O0075, O0076, O0081 and O0082 are complete normalized matches in the
qualified composition. SweepFees and both Legacy bodies remain normalized-only:
this does not make them raw-equal or prove all referenced data. The
[441-row inventory](../research/mayhem-current437-composition-20261028/inventory.json)
lists every raw-equal, normalized-only and unmatched body with actual counterpart
names and addresses. The [parallel work map](MAYHEM-PARALLEL-WORK.md) records the
source investigations and their artifact bindings.

## Retained partial source controls

These separate artifacts preserve the frontier measured for their own builds.
They do not replace qualified437 or add a recovered function.

| Remaining body | Retained evidence | Limit |
| --- | --- | --- |
| AMM Buy / Sell | [AMM event controls](../research/mayhem-current436-amm-event-controls-20261027/README.md): Buy's complete 7,144-byte normalized prefix; Sell's opcode, field-read and 39 event-store order; 36 signed pairs | Whole bodies still differ in event construction and stack/register allocation |
| BuyV2 / SellV2 | [Four V2 controls](../research/mayhem-current436-v2-controls-20261027/README.md): alternative sizing and event-lifetime arrangements, retaining their prior 436/141 matches | No runtime qualification for these exact controls; no whole-body match |

The [Linux dependency control](../research/mayhem-current436-linux-dependency-control-20261028/README.md)
preserves 436 normalized windows but has 80 raw-local matches, so it is not
promoted. Its AMM normalized bodies agree with the corresponding partial Darwin
bodies. The separate V2 triad also leaves both complete trade bodies unmatched.
This is evidence about those concrete recipes, not a general operating-system
or compiler-equivalence result.

The earlier [8,384-byte Sweep control](../research/mayhem-current436-sweep-controls-20261027/README.md),
[Rent lifetime control](../research/mayhem-current436-sweep-rent-lifetime-20261028/README.md)
and [three-operand address-selection control](../research/mayhem-current436-sweep-address-selection-20261028/README.md)
remain historical partial candidates. The final 437 source resolves their
remaining address-selection difference. Their old runtime limitations and
436-based measurements remain attached to those exact artifacts.

## Active work

- Finish the four trade bodies, focusing on CPI ownership, seed lifetimes,
  arithmetic order, alias metadata and event construction.
- Close remaining data and indirect-call obligations on each exact candidate.
- Reproduce the complete original ELF from ordinary Rust and a documented build
  recipe, preserving current source and runtime evidence during integration.

All execution in this work is local. No live-chain deployment or transaction is
part of the completion claim.
