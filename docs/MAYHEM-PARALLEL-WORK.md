# Parallel Mayhem reconstruction work

The objective remains byte-identical Rust reproduction, including calls, data,
relocations and ELF layout. The [qualified current composition](../research/mayhem-current437-composition-20261028/README.md)
has **437/441 normalized windows: 141 raw-local, 296 normalized-only and four
unmatched**. The unmatched windows total **63,792 original text bytes**; 642,952
of 706,744 text bytes occur in complete normalized matches. SweepFees O0076 is
now matched in full, preserving every prior body, call-edge and Source result.
Direct closure reaches 431 windows, with 4,525 positive immediate edges and 499
Source observations. The [completion review](MAYHEM-COMPLETION.md) gives exact
percentages and evidence limits.

## Independent lanes

These are independent work assignments, not a claim that workers are currently
running. Each lane needs a separate source directory and build cache. The main
agent integrates, verifies, documents and reviews incoming PRs while independent
source and compiler investigations proceed.

| Lane | Next scope |
| --- | --- |
| AMM trade and quote bodies | O0077 and O0079; cap/min selection, retained-reserve arithmetic, ownership and error flow |
| V2 trade bodies | O0083–O0084; source ownership, fallible arithmetic and CPI error lifetime |
| Runtime and layout | Allocator-provider repair is qualified; continue remaining data/indirect-call closure, section layout and ELF equality |
| Integration / qualification | Preserve the qualified437/141 checkpoint, qualify further combinations, maintain fresh runtime evidence and review incoming PRs |

The active objective covers the remaining source reconstruction and offline
validation. No live-chain deployment or transaction is part of this work.

## All remaining windows

This table comes from the qualified current [441-row inventory](../research/mayhem-current437-composition-20261028/inventory.json).
Each unmatched original window occurs once. Body names are reconstruction
attributions, not authenticated original symbols.

| Window | Original start | Bytes | Remaining body | Lane |
| --- | ---: | ---: | --- | --- |
| O0077 | 85600 | 9736 | AMM Buy | AMM trade and quote |
| O0079 | 95848 | 17312 | AMM Sell | AMM trade and quote |
| O0083 | 140512 | 18648 | BuyV2 | V2 trade |
| O0084 | 159160 | 18096 | SellV2 | V2 trade |

## Closed windows and partial controls

The [qualified437 composition](../research/mayhem-current437-composition-20261028/README.md)
adds the complete 8,400-byte SweepFees body O0076 to the prior 436 source. An
explicit reference to the existing GlobalParams account preserves the original
base-plus-field addressing; named Rent locals and reused AccountInfo references
preserve the observed lifetimes. All 1,050 normalized words, 189 CFG blocks,
51 ordered immediate callee positions and 13 Source observations agree. O0076
and wrapper O0169 enter direct-call closure. These remain normalized matches,
not raw-body or whole-ELF identity.

Fresh signed trade, initializer, sweep and rate receipts belong to this exact
437 artifact. Earlier 436 receipts and separate partial-control receipts are not
transferred. The [qualified436 composition](../research/mayhem-current436-composition-20261027/README.md)
previously closed Legacy Buy O0081 and Legacy Sell O0082. The partial Legacy
controls below remain historical evidence.

The [quote-aware validator](../research/mayhem-trade-origins-validator/README.md)
closes O0095's complete 1,296-byte normalized body, with eight immediate callee
shapes and fourteen typed data references checked. The [staged initializer](../research/mayhem-initializer-current-recovery-20261027/README.md)
closes O0193's complete 960-byte normalized body through a real AccountInfo/key
snapshot. Its five immediate callee shapes and four typed data references agree.
These two windows are no longer pending lane assignments.

The [historical Legacy Buy ownership composition](../research/mayhem-current-ownership-composition-20261027/README.md)
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
are not added to the separate historical 430/100 row.

The [AMM handler controls](../research/mayhem-amm-handler-shape-controls-20261027/README.md)
retain nine source/compiler comparisons. Explicit AccountInfo copies and enum-valued
arithmetic recover the Sell immediate-callee multiset; evaluation-order changes
improve partial instruction alignment. The full body and ordered callees still
differ. These controls add no accepted match or runtime qualification.

The [later AMM Sell controls](../research/mayhem-amm-sell-cfg-recovery-20261027/README.md)
preserve an equal-length 17,312-byte direct-signer body and a 17,320-byte
conditional-event body. Both retain all 47 ordered immediate-callee shapes;
the corrected relocation-aware CFG maps all 249 blocks without topology
conflicts. Four event-region opcode differences remain. Each exact candidate
passes its own 18-pair / 36-signature replay. These are 432/89 search contexts,
not replacements for the later qualified artifacts.

The [Legacy/V2 ownership packet](../research/mayhem-trade-ownership-current-20261027/README.md)
preserves separate partial controls with full source maps and artifacts:

| Partial body | Original bytes | Retained candidate bytes | Evidence scope |
| --- | ---: | ---: | --- |
| Legacy Sell, Q18 | 12,992 | 12,992 | Static evidence on Q18's artifact; its replay covers V2 only |
| Legacy Sell, Q22 | 12,992 | 12,928 | Static late-bump placement; no transferred runtime claim |
| Legacy Sell, Q28 | 12,992 | 12,912 | Static pre-Clock field-read sequence; no transferred runtime claim |
| BuyV2, Q18 | 18,648 | 18,328 | Eight native/token/token22 cases each, with signed receipts |
| SellV2, Q18 | 18,096 | 17,992 | Eight native/token/token22 cases each, with signed receipts |

These are separate 432/89 search contexts. Equal length, callee profiles and
partial opcode sequences do not close a full window. Q18's 48 total V2 pairs
and 96 signatures do not qualify the Legacy Sell control or other artifacts.

The [native historical-macro quote composition](../research/mayhem-native-current432-composition/README.md)
repeats 432 normalized / 85 native raw-local windows with its own 2,496 signed
trade pairs and 69 initializer pairs. It retains the earlier 13,680-byte Legacy
Buy body; it is not promoted over the qualified 432/100 source.

The [fresh Linux closure follow-up](../research/mayhem-direct-call-closure-20261027/README.md#fresh-linux-follow-up)
repeats the same 414-window relation and the same 18 unclosed windows on two
fresh-dependency artifacts. Those unchanged-source builds retain the allocator
call-target problem; the qualified macro/IDL source change now fixes it without
changing the nine-body list.

The [independent allocator composition reproduction](../research/mayhem-allocator-call-closure/README.md)
repeats PR295/296's complete native artifacts from two empty dependency target
directories. It provides an executed portable build recipe, current curve/root
optimized IR comparison and fresh initializer qualification. Its 432 normalized,
85 native raw and 422 direct-closed counts are inherited source results, not
additional recovery. That separate qualified 432/100 layout and its ten unmatched
handler-dependent call relationships describe the historical checkpoint.

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

## Ordered direct-call audit

The [qualified macro composition](../research/mayhem-current-macro-call-closure-20261027/README.md)
raises the original 414-window direct-call relation to **422 of 432 matched
windows**. O0210 now calls the matching O0209 allocator specialization, closing
O0207, O0208, O0210, O0214, O0215, O0217, O0219 and O0222. Ten matched windows
still have no direct-closed counterpart because they depend on unmatched handlers.
All prior raw matches survive, with 41 additional raw-local bodies in the actual
composed artifact. Two repeat builds and all 6,636 trade / 69 initializer pairs
pass. Indirect/data closure, historical provenance and whole-ELF identity remain
open; these counts are separate from a semantic-equivalence claim.

The [Legacy Sell signer-seed controls](../research/mayhem-signer-seed-order/README.md)
trace a current-source evaluation-order difference: moving the signer-bump read
after CPI account construction moves its instruction offset from 1,968 to
6,144, versus 6,296 in the original. The repeated inline control remains an
unmatched 12,952-byte body versus 12,992 original bytes. All 432/77 native
matches and 4,314 positive immediate-call observations remain; the qualified
432/100 artifact is separate. This is source-order research with no new complete
match, runtime qualification or checkpoint promotion.

The subsequent [arithmetic-lowering controls](../research/mayhem-signer-seed-order/composition/arithmetic/README.md)
bind the early multiply/divide difference to actual compiler stages. Reusing
the existing overflow-tuple price form restores price-before-guard ordering,
including with late inline seeds, but leaves the original branch layout and
complete handler unmatched. Six root builds and one fresh dependency rebuild
preserve 432/77 native matches and reproduce both complete control outputs.
This is bounded source/compiler evidence, not a selected-source promotion.

The [ordinary price-first control](../research/mayhem-signer-seed-order/composition/arithmetic/guard/README.md)
then restores the original first seven callee identities and nonzero overflow
branch direction by placing price before `checked_mul`. Three source-control
compilations and a fresh 163-command rebuild repeat both complete checked
outputs, but the shared error-block layout and full handler remain unmatched.
The alternative Option conversion is retained as a negative control.

The [price-profile pass traces](../research/mayhem-signer-seed-order/composition/price-profile/README.md)
locate a compiler difference within those historical 432-window controls: an
immediately invoked checked closure loses a redundant profiled overflow test
during `SimplifyCFG`, before ordinary inlining. The inline helper retains its
profiled test. Four trace builds reproduce both complete parent ELFs exactly.
The closure also emits the distinct Option control's complete ELFs, despite
different CodeGen Prepare IR. This records source/compiler evidence; it adds
no new match to the qualified current checkpoint.

## Current-source allocator-provider composition

The [current 432-window provider composition](../research/mayhem-current-provider-closure-20261027/README.md)
combines the qualified quote/initializer program source with the complete historical
macro/IDL context. In the fresh Linux cohort, the curve reserve now calls the
matching 328-byte allocator at relative offset 528. Eight windows regain ordered
direct-call closure (414 to 422), and O0207 becomes raw-equal (84 to 85), with
all prior normalized and raw matches preserved. Three enabled builds agree;
6,636 fresh trade pairs pass independent signature/state/non-compute-log checks.

This remains a mixed-framework source-context diagnostic, separate from the
qualified ordered 141-raw checkpoint. No new normalized body is recovered. The upstream
gate returns the direct-closed set to 414, but its complete ELF differs from the
baseline. Indirect/data closure, initializer qualification on this artifact,
historical source attribution and whole-original identity remain open.

## 28 October continuation

SweepFees is now a complete normalized match in qualified437. Its earlier
[Rent lifetime](../research/mayhem-current436-sweep-rent-lifetime-20261028/README.md)
and [address-selection](../research/mayhem-current436-sweep-address-selection-20261028/README.md)
controls remain archived negative evidence for their exact436-based artifacts;
their incomplete body and runtime claims are not promoted retroactively.

AMM and V2 work continues on event/key allocation and expression lifetimes. The
[Linux dependency control](../research/mayhem-current436-linux-dependency-control-20261028/README.md)
retains436 normalized windows with 80 raw-local matches and does not close the
four trade bodies. Its complete AMM normalized arrays and the separate V2 triad
are comparisons of those concrete recipes, not proof of general compiler
identity or a replacement for qualified437.

Data work remains separate from body completion. The
[selected 32-byte checks](../research/mayhem-current436-selected-prefixes-20261027/README.md)
and [writer48 extension](../research/mayhem-current436-writer-records-20261028/README.md)
are bound to their 436-window images. Their source, code-reference and selected
record obligations require explicit remeasurement on 437 before a new packet can
claim them. Allocation extents, general indirect dispatch and complete ELF
identity remain unresolved.
