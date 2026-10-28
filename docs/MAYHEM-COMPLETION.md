# Mayhem completion review — 28 October 2026

Reviewed candidate: `b69ee99d83cb1eaaa999082dc707560e95e1540174f27b5e6a8e1438cc4c34fc`.
**Whole-ELF identity is unfinished.**

| Artifact | Complete normalized windows | Raw-equal bodies | Direct-call-closed windows | No complete body match |
| --- | ---: | ---: | ---: | ---: |
| [Current qualified composition](../research/mayhem-current438-composition-20261028/README.md) | 438 / 441 (99.32%) | 141 / 441 (31.97%) | 433 / 441 (98.19%) | 3 / 441 (0.68%) |
| [Previous qualified composition](../research/mayhem-current437-composition-20261028/README.md) | 437 / 441 (99.09%) | 141 / 441 (31.97%) | 431 / 441 (97.73%) | 4 / 441 (0.91%) |

The 438 matched windows comprise 141 raw-local bodies and 297 normalized-only
matches. The current artifact adds AMM Sell O0079, all 17,312 bytes, 249 CFG
blocks and 47 ordered direct calls. Its 13 direct data references receive
separate bounded checks. Only `sell_pump_swap.rs` changes from qualified437:
inlined arithmetic helpers, inline signer seeds, and scalar/key lifetimes in
the event construction reproduce the original body.

All prior raw bodies, normalized matches, positive edges and Source observations
survive. Direct closure now covers 433 windows, with 4,573 positive immediate
edges and 502 Source observations. Three root builds agree. The fresh 6,636 trade
pairs, 69 initializer pairs, 692 sweep triples, 150 rate triples and 856 targeted
rate triples are bound to this exact artifact. Their 18,534 signed records overlap;
they do not establish exhaustive behavior or historical build provenance.
Independent verification and 21 corruption tests pass.

Qualified437 previously closed SweepFees O0076 and its wrapper O0169, preserving
all 1,050 normalized words, 51 ordered calls and 13 Source observations. The
preceding qualified436 composition closed both Legacy trade bodies. Each older
packet retains its own source, build and runtime bindings.

## Percentage of original code still unmatched

All figures use the same 441 inferred original function windows and 706,744
original `.text` bytes, including framework/runtime helpers.

| Artifact | Text in complete normalized matches | Unmatched original text |
| --- | ---: | ---: |
| Current qualified composition | 660,264 / 706,744 (93.42%) | 46,480 bytes (6.58%) |
| Previous qualified composition | 642,952 / 706,744 (90.97%) | 63,792 bytes (9.03%) |

The 141 raw-equal bodies contain **65,504 original text bytes (9.27%)**. This is
local raw-body coverage, not the fraction of the whole ELF that is identical.
The remaining 0.68% of function windows and 6.58% of text are binary-coverage
figures, not estimates of remaining engineering time. Normalized matches mask
specified address/call operands. Data, indirect calls, layout, relocations,
reproducible whole-ELF equality and build provenance remain separate obligations.

The [code-reference review](../research/mayhem-current434-code-reference-closure-20261027/README.md)
checks 48 relocated code-address sites targeting 15 original functions on the
historical 434-window artifact. It preserves that artifact's 425-window recursive
closure. Its eight tests include 48 actual pointer corruptions. The 93 indirect
calls in 51 matched windows still need their own value-flow and data evidence;
the three unmatched trade bodies contain no indirect calls.

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

The [explicit437 data recheck](../research/mayhem-current437-selected-data-20261028/README.md)
recomputes those obligations on its qualified437 candidate: 431 windows and 581
counterpart pairs survive, with 499 Source sites, 48 code-address sites, 121
selected-prefix references, 48 writer-record references and 21 counted literals
covering 575 bytes. This is a separate measured transfer, not an assumption of
identity from the previous artifact. The same allocation and dispatch limits apply.

The [chained literal/table checks](../research/mayhem-current437-unicode-tables-20261028/README.md)
cover 16,678 of 26,180 payload bytes on the qualified437 image pair, leaving
9,502 unproved bytes. Their exact transfer to qualified438 is being checked
separately; new Sell data checks do not silently rebind those older proofs.

## Three bodies still unmatched

| Original window | Start | Bytes | Remaining function |
| --- | ---: | ---: | --- |
| O0077 | 85,600 | 9,736 | AMM Buy |
| O0083 | 140,512 | 18,648 | BuyV2 |
| O0084 | 159,160 | 18,096 | SellV2 |
| **Total** | | **46,480** | |

“Unmatched” means no complete original machine-body counterpart under the
unchanged matcher. It does not mean no Rust implementation exists. All three
trade handlers have substantial partial reconstructions. Equal size, ordered
callee profiles, CFG correspondence or bounded runtime tests do not make those
bodies complete matches.

O0073, O0075, O0076, O0079, O0081 and O0082 are complete normalized matches in the
qualified composition. SweepFees, AMM Sell and both Legacy bodies remain normalized-only:
this does not make them raw-equal or prove all referenced data. The
[441-row inventory](../research/mayhem-current438-composition-20261028/inventory.json)
lists every raw-equal, normalized-only and unmatched body with actual counterpart
names and addresses. The [parallel work map](MAYHEM-PARALLEL-WORK.md) records the
source investigations and their artifact bindings.

## Retained partial source controls

These separate artifacts preserve the frontier measured for their own builds.
They do not replace qualified438 or add a recovered function.

| Remaining body | Retained evidence | Limit |
| --- | --- | --- |
| AMM Buy | [Qualified437 prefix](../research/mayhem-current437-buy-prefix-20261028/README.md): exact 7,200/9,736-byte normalized prefix; three matching builds and 36 fresh signed pairs | No whole-body gain; event construction remains unmatched |
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
