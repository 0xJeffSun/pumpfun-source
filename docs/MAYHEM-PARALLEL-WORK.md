# Parallel Mayhem reconstruction work

The objective remains byte-identical Rust reproduction, including calls, data,
relocations and ELF layout. The [current Buy/Sell quote composition](../research/mayhem-quotes-current-recovery-20261027/README.md)
has **432/441 normalized windows: 100 raw-local, 332 normalized-only and 9
unmatched**. The unmatched windows total **107,952 original text bytes**.
Normalized body matches do not establish recursive semantic or whole-ELF equality.

## Independent lanes

These are independent work assignments, not a claim that workers are currently
running. Each lane needs a separate source directory and build cache. The main
agent integrates, verifies, documents and reviews incoming PRs while independent
source and compiler investigations proceed.

| Lane | Next scope |
| --- | --- |
| AMM trade and quote bodies | O0077 and O0079; cap/min selection, retained-reserve arithmetic, ownership and error flow |
| Legacy and V2 trade bodies | O0081–O0084; source ownership, fallible arithmetic and CPI error lifetime |
| Runtime and layout | Recursive call/data closure, allocation-provider provenance, genuine section layout and ELF equality |
| Integration | Preserve the 432-window parent, qualify combinations with fresh builds and signed local replays, synchronize documentation and PRs |

Sweep/burn work is outside the active scope. O0073 and O0076 are connected to the
sweep path and are not dispatched. O0075's business attribution is unresolved;
it receives no execution assignment here. Historical sweep evidence remains
available under its original artifact bindings.

## All remaining windows

The table is derived from the current packet's [441-row inventory](../research/mayhem-quotes-current-recovery-20261027/inventory.json).
Each unmatched original window occurs once. Body names are reconstruction
attributions, not authenticated original symbols.

| Window | Original start | Bytes | Remaining body | Lane |
| --- | ---: | ---: | --- | --- |
| O0073 | 65472 | 912 | Sweep fee-recipient helper / block placement | Paused scope |
| O0075 | 69192 | 8008 | Business body; attribution unresolved | Unassigned |
| O0076 | 77200 | 8400 | Sweep business body | Paused scope |
| O0077 | 85600 | 9736 | AMM Buy | AMM trade and quote |
| O0079 | 95848 | 17312 | AMM Sell | AMM trade and quote |
| O0081 | 113672 | 13848 | Legacy Buy | Legacy and V2 trade |
| O0082 | 127520 | 12992 | Legacy Sell | Legacy and V2 trade |
| O0083 | 140512 | 18648 | BuyV2 | Legacy and V2 trade |
| O0084 | 159160 | 18096 | SellV2 | Legacy and V2 trade |

## Closed windows and partial controls

The [quote-aware validator](../research/mayhem-trade-origins-validator/README.md)
closes O0095's complete 1,296-byte normalized body, with eight immediate callee
shapes and fourteen typed data references checked. The [staged initializer](../research/mayhem-initializer-current-recovery-20261027/README.md)
closes O0193's complete 960-byte normalized body through a real AccountInfo/key
snapshot. Its five immediate callee shapes and four typed data references agree.
These two windows are no longer pending lane assignments.

The [current Legacy Buy ownership composition](../research/mayhem-current-ownership-composition-20261027/README.md)
preserves the frontier. Its 13,784-byte body remains different from the original
13,848 bytes despite equal immediate-callee and Source profiles. Its 486 signed
pairs are bound to that exact artifact, not to every private source variant.

The [qualified Sell quote composition](../research/mayhem-sell-current-recovery-20261027/README.md)
closes O0093 with all 140 instruction slots, ten ordered immediate callee shapes
and ten ordered typed references checked. Two builds repeat and fresh trade and
initializer matrices pass. The earlier 124/140-slot controls and backend replay
remain negative evidence; they do not add another match. The [qualified Buy/Sell composition](../research/mayhem-quotes-current-recovery-20261027/README.md) also closes O0092 with all 157 slots, ten ordered immediate callees and ten typed references, without losing any earlier match. Its own repeat builds and fresh runtime matrices pass.

The [account-data cohort](../research/mayhem-account-cohort-complete/README.md)
checks 156 typed references. The [historical parser composition](../research/mayhem-historical-macro-current-20261027/README.md)
reproduces the allocation context with historical macro/event sources, but does
not authenticate the original framework. The later historical initializer
composition reaches 430 normalized / 141 raw windows separately; its raw gains
are not added to the current 430/100 row.

## Integration requirements

Preserve every prior normalized/raw match, immediate call shape and Source
profile, then verify referenced data and transitive/indirect callees separately.
Search builds use content-based local-package invalidation and isolated caches;
they reuse pinned dependencies and are not fresh full-dependency builds.
Acceptance requires ordinary Rust compilation, repeatable artifacts and signed
local execution evidence bound to the composed source. No assembly substitution,
dummy operations, invented padding or executable patching is an identity result.

Finite local replay does not establish exhaustive behavior or current-chain
acceptance. Source-coordinate and compute-log normalizations must remain
explicit for each packet. Whole-ELF identity remains false.
