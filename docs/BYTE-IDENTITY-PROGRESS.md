# Byte-identity progress after the 26 October audit

The [full audit](RECONSTRUCTION-AUDIT.md) and its generated tables retain their
explicit `1463bd22` snapshot. This log records later research without silently
changing that baseline or promoting new selected artifacts.

## Relay: donation controls retain the 482-window frontier

The [donation source controls](../repro/donation-relay/donation-source-controls/README.md)
retain 59 builds and 173 targeted comparisons for the four donation wrappers
and shared worker. Construction order, argument handling, ownership timing,
CPI moves and result tuple layouts recover no new complete window. Some
ownership variants lose the matched context-drop helper and are rejected.
The unmodified control reproduces each compiler recipe's exact parent binary.
No new VM execution or source promotion is claimed; Relay remains 482/492 with
10 unmatched. These negative results are separate from the Fees gains below.

## Fees: authority body and refreshed duplicate attribution

The [authority-update study](../research/fees-authority-body-origin/README.md)
recovers the full 3,320-byte original body at 103,408 by preserving its tokens
and reproducing its diagnostic source location. It raises the frontier to
**354 unique structural pairs and 84 unmatched windows**, with no loss. Its
unpadded source-location control loses two later windows and is rejected.

The [fresh call-context analysis](../research/fees-refreshed-call-attribution/README.md)
then rederives 61 additional duplicate-body correspondences on that exact
candidate, for **415 attributed pairs**. Eight attributions are new, with no
previous one lost. It retains 86 unresolved duplicate windows, 2,485 consistent
bound call edges and 22 different-body frontier edges. No additional machine
body coverage or exhaustive semantic identity follows from the attribution.

## Relay: 11 → 10 unmatched normalized windows

The [burn/close ownership recovery](../repro/donation-relay/burn-mint-ownership-recovery/README.md)
recovers the complete 2,856-byte original window 109. The nonzero branch consumes
the mint instead of cloning it, and full context destructuring recovers the
conditional cleanup/return layout. All 24 direct-call sites bind to matched
callees. Both compiler recipes reach **482/492 normalized windows**, **130 raw
local matches**, and **10 unmatched**, with no losses. Each recovered binary
passes fresh 536-record / 534-unique-fixture replay; privileged-success coverage
limits remain. The same 348 source-location pairs remain equal.

The packet retains 36 negative epoch-close builds and eight negative ownership
variants alongside the recovered Darwin/Linux builds. These control results do
not constitute accepted epoch-close reconstruction. Whole-file identity remains
false; the full inventory and remaining-work report are updated.

## Relay: 12 → 11 unmatched normalized windows

The [Jupiter optional-seed recovery](../repro/donation-relay/jupiter-option-source-recovery/README.md)
recovers the complete 2,496-byte original window 90. The previous four-slot
residual concealed a pointer-versus-length distinction: the helper accepts an
optional seed slice, and Rust `match` reproduces its branch layout. `Some(&[])`
and `None` select different invocation wrappers. Both the Darwin/Linux-library
and full Linux builds reach **481/492 normalized windows**, **130 raw local
matches**, and **11 unmatched**, with no losses. Each passes 536 fresh replay
records; the existing privileged-success coverage limits remain.

All 11 direct-call sites bind to matched callees. The original 346 equal
source-location pairs are retained and two are added, for **348/348**. Relative
to the iterator-clone controls, each stripped binary changes at only ten byte
positions. Whole-file and exhaustive semantic identity remain unproved.
Nineteen metadata-source trials and the `if let` form are retained as negative
controls. The full function inventory and remaining-work report are refreshed.

## Fees: Darwin target-library substitution rejected

The [controlled library trial](../research/fees-target-library-control/README.md)
keeps all 33 source inputs and the Linux compiler unchanged while substituting
the official Darwin target libraries. It loses four original Type-ID windows:
352 unique pairs and 89 unmatched versus the retained 353/85 checkpoint. The
trial is not promoted. Its focused comparisons pass, which does not erase the
structural regression. An independent stored-artifact comparison also confirms
that all four selected core programs remain raw-byte unequal to their captures.

## Relay: narrowed Jupiter CPI residual, no match-count change

The [residual CPI source trials](../repro/donation-relay/residual-cpi-source-trials/README.md)
bank 53 builds. Iterator-based cloning reproduces 308/312 normalized instruction
slots of the 2,496-byte Jupiter builder; four stack load/store slots remain
unequal and are explicitly retained by the strict matcher. This is **not** a new
complete match: the candidate retains 480/492 windows, 130 raw local matches and
12 unmatched, with fresh 536-record replay. A separate source-only build confirms
the same artifact. The 32 burn/close trials recover no complete body; their
ownership, field-order and return-form variants are preserved as negative evidence.
No selected source or research checkpoint is promoted.

## Post-PR123 cross-program review

The [current reconstruction review](RECONSTRUCTION-STATUS.md) refreshes the full
4,415-row inventory and separates selected artifacts, current research, raw body
matches, normalized matches, opaque windows and behavior gaps. Relay's 12
unmatched windows span 57,968 original body bytes; Fees' 85 span 348,264. These
are whole-window extents, not counts of missing bytes or effort estimates.

## Fees: 87 → 85 unmatched normalized windows

The [Shareholder Copy study](../research/fees-shareholder-copy-clone/README.md)
recovers the complete 336-byte vector-clone window at 58,520 and independently
binds both encoded calls to raw-equal helpers. Its FeeTier-only negative control
adds no match. The [buyback initializer study](../research/fees-buyback-initializer-origin/README.md)
then recovers the complete 600-byte body at 120,216 by moving the unchanged
helper to the original diagnostic path/line. These studies add one unique pair
each with no losses: **353 unique structural pairs, 85 unmatched windows**.

The current candidate has 107 original windows with any raw-equal counterpart,
including ambiguous duplicates; 57 unique structural pairs are raw-equal. It
retains 17,331 suite cases and 1,542 exact outcome/log/compute comparisons. The
proposal replays are fresh; identical control receipts are explicitly reused.
Neither full capture nor meaningful ELF equality is achieved. Historical
duplicate-call attribution counts must be rederived before claiming them for
this candidate.

## Relay: 43 audited location differences → 0

The [compiled source-location study](../repro/donation-relay/source-location-recovery/README.md)
executes all four proposals from the independent location audit, separately and
combined. The same 346 recognized `(window, reference-offset)` pairs remain
present; all now agree in path, line and column. Instruction matching remains
**480/492**, with **12 unmatched** and no normalized losses. The combined build
has **130 raw local matches** and passes all 536 records / 534 unique fixtures.
An independent full Linux SDK build of the same 56 source inputs confirms all
those matches and location values, with its own fresh replay. This closes the
audited location-value differences, not all data or relocation equality.

## Relay: fully Linux build confirms 480-window frontier

The [Linux canonical reproduction](../repro/donation-relay/linux-canonical-reproduction/README.md)
uses the same recovered source with the official Linux v1.48 SDK. It independently
reaches **480/492 normalized windows**, **127 raw local matches**, and the same
**12 unmatched windows**, with 536 fresh replay records passing. A real root-crate
rebuild was required after two inconclusive Cargo cache-reuse attempts; those
attempts and the final compiler invocation are retained. The Linux and earlier
Darwin/Linux-library outputs differ at 9,469 file positions, so this confirms the
window frontier and finite runtime results, not host-independent ELF equality.

## Relay: 13 → 12 unmatched normalized windows

The [mint-fee predicate study](../repro/donation-relay/mint-fee-pair-recovery/README.md)
recovers the complete 3,440-byte mint-policy window 106 by expressing the same
zero-fee test as a tuple comparison. Only three register-operand bytes change in
the full stripped output. No previous match is lost. The current candidate has
**480/492 normalized windows**, **127 raw local matches**, and **12 unmatched**,
with all 536 records / 534 unique fixtures passing fresh replay. The separate
serial-condition trial is retained as a negative result.

## Relay: 22 → 13 unmatched normalized windows

The [framework/sysroot/share-error study](../repro/donation-relay/framework-sysroot-recovery/README.md)
recovers nine more original windows without losing any of the previous 470:
four framework/CPI/resize helpers, the Pubkey base58 writer, three raw-equal
`StringError` type-ID bodies, and the missing share-total `with_values` helper.

The best retained candidate has **479/492 normalized matches**, **127 raw local
matches**, and **13 unmatched windows**. It passes fresh replay of all 536 records
/ 534 unique fixtures. The share-total error now includes `(sum, 10000)`; its three
callers and complete captured helper are independently checked. The corpus does
not establish the protected rejection path end to end.

This is an explicit cross-host recipe: Darwin v1.48 compiler and linker with
official Linux v1.48 target libraries, Anchor Lang/SPL 0.32.1 and resolved macros
0.32.2. It is not a claim of a full Linux-host build or the unique historical
recipe. Whole-file identity and selected-artifact promotion remain open. All 13
remaining windows belong to donation/settlement bodies, mint policy, Jupiter CPI
construction, residual burn/close, and the shared donation worker.

## Relay: repeated type-ID attribution, no count change

The [StringError provenance study](../research/relay-string-error-provenance/README.md)
connects the candidate's three repeated type-ID bodies to `alloc`'s internal
boxed `StringError`, rather than `std::io::Error` itself. Seventeen successful
local compiler/target probes do not reproduce the captured constants; two
missing-library failures and six build-setting controls are retained. One
v1.48 canonical-target probe reproduces the latest candidate constants. Full linked-sysroot
provenance remains open. Relay stays at **470/492**, with **22 unmatched**.

## Relay: 26 → 22 unmatched normalized windows

The [Token-2022 dependency-path study](../repro/donation-relay/token-extension-version-recovery/README.md)
recovers full original windows 240, 242, 243 and 244: TLV data inspection, total
TLV sizing, required account extensions and token-instruction packing.

Latest research: **470/492 normalized windows**, **88 raw local body matches**,
**22 unmatched**, with no prior normalized window lost. All 536 records / 534
unique fixtures pass fresh original/candidate replay. The 812,864-byte output
still differs from the original; selection and exhaustive behavior are unresolved.

The direct Token-2022 v8 control had no normalized gain. The successful trial
also changes Anchor SPL's separately pinned token-interface dependency to v8,
using otherwise unchanged Anchor SPL Rust source. This identifies a matching
tested source/dependency arrangement, not the uploader's historical manifest.
The audit verifies 187 registry packages / 4,135 files; failed offline cache
preparations and the negative control are retained.

## Relay: 27 → 26 unmatched normalized windows

The [SwapReceipt coordinate study](../repro/donation-relay/swap-receipt-coordinate-recovery/README.md)
reproduced the retained 465-window build, tested the canonical target with fixed
source, and recovered the full 1,120-byte decoder at original window 167.
The observed attribute coordinate is line 5, not line 2. Moving the attribute by
three blank lines changes exactly two output bytes and loses no normalized match.

Latest research: **466/492 normalized windows**, **88 raw local body matches**,
**26 unmatched**. Fresh replay of 536 records / 534 unique fixtures gave zero
mismatches and reproduced the saved original observations. The output remains
813,968 bytes and is not equal to the 830,448-byte captured allocation.
These counts do not establish historical source text, all transitive data/calls,
successful privileged settlement or complete semantic equivalence.

The target-only control recovered no normalized window, so it is retained as a
negative result for the repeated `Error::type_id` hypothesis. The three type-ID
windows still need work. The current residual list is in the new package.

## Fees: 89 → 87 unmatched normalized windows

Merged [PR #120](https://github.com/lalalune/pumpfun-source/pull/120) restores the
source origin of two unchanged buyback helpers and recovers their complete
inlined program-body windows. The [buyback-origin packet](../research/fees-buyback-update-origins/README.md)
reaches **351 unique structural pairs**, with no loss and **87 unmatched** windows.
It retains 17,331 proposal suite cases, 1,542 focused comparisons, and a separate
1,249-case buyback suite. The initial missing-fixture attempt is preserved.
Selected artifacts and whole-file identity remain unchanged.

## Fees: 92 → 89 unmatched normalized windows

Merged [PR #117](https://github.com/lalalune/pumpfun-source/pull/117) recovers three
complete donation, sharing-config and social-creation account-parser windows.
The [creation-origin packet](../research/fees-creation-account-origins/README.md)
reaches **349 unique structural pairs**, with no loss and **89 unmatched** original
windows. It retains exact declaration/path/line evidence, 17,331 proposal suite
cases and 1,542 focused comparisons. Whole-file identity remains false.

## Fees: 94 → 92 unmatched normalized windows

Merged [PR #116](https://github.com/lalalune/pumpfun-source/pull/116) restores the
recorded source paths and derive lines for the two initializer account parsers.
It recovers complete 6,320-byte and 5,888-byte windows, reaching **346 unique
structural pairs** with no loss and **92 unmatched** original windows. The
[initializer-origin packet](../research/fees-initializer-account-origins/README.md)
verifies declaration preservation, exact path/line references, 17,331 proposal
suite cases and 1,542 focused comparisons. Selection and whole-file identity
remain unresolved.

## Fees: 95 → 94 unmatched normalized windows

Merged [PR #109](https://github.com/lalalune/pumpfun-source/pull/109) recovers the
complete 1,560-byte `get_fees` wrapper. Unique structural pairs rise from 343
to **344**, with no previous match lost and **94 unmatched** original windows.
The [optional-boolean study](../research/fees-optional-bool-query/README.md)
retains 17,331 passing full-suite comparisons and a separate 1,542-case focused
matrix covering every optional-byte value and absence. In the focused matrix,
proposal outcomes, raw logs and compute units agree; the retained control has
1,539 log/compute differences. These are finite cases, not whole-program proof.
Selected Fees source and artifacts are unchanged.

## Fees: 98 → 95 unmatched normalized windows

Merged [PR #96](https://github.com/lalalune/pumpfun-source/pull/96) recovers a
376-byte tier selector, a 656-byte quote selector and a 1,384-byte generated
quote-query wrapper. Its source separates helper boundaries, derives `Copy` for
Fees, and uses the observed Pubkey comparison order.

That research output has **343 unique structural pairs** (up from 340), **95
unmatched original windows**, and retains 17,331 finite passing comparisons.
The 393 call-attributed-pair count in the earlier audit belongs to the earlier
stable-sort build; it has not been automatically transferred to this candidate.
Selected Fees source and binary are unchanged. See the
[query-selector evidence](../research/fees-query-selectors/README.md).

## PR review and evidence maintenance

PRs #97–#99 clarify provenance, licensing and the distinction between executed
and post-hoc evidence. PR #95 now checks all pass-27 guard files before import;
its conflicts were resolved while preserving the newer audit and README pins.
These are evidence/guard changes, not byte-identity gains.

Whole-program status remains **0/4 selected core programs**, with selected Relay
also byte-unequal. The original byte-identity goal remains open.

## Shared-worker flow audit and mint-source controls

The [flow audit](../repro/donation-relay/shared-worker-flow-audit/README.md)
recomputes the original/current shared-worker instruction graphs. Every path
to an explicit return crosses the matched context-drop helper, including paths
from the transfer continuation. Calls are assumed to return; this is not a
semantic or runtime-success proof. Different linear cleanup offsets do not
establish different ownership stages. Five additional compiled mint-key and
whitelist-slice forms remain negative, with no lost matches. Relay remains at
482/492 with ten unmatched bodies and 130 raw local body matches.

## Complete partial-argument control family

All [32 subsets of donation argument fields](../repro/donation-relay/partial-argument-controls/README.md)
were compiled across the five source wrappers, yielding 128 negative comparisons
against original windows 92–95. The other source inputs, context field order and
compiler recipe remain fixed. Partial binding alone does not recover these
wrappers under this recipe. Every variant retains the 482/492 frontier and 130
raw local body matches, with no gained or lost matched window. No candidate is
promoted and no fresh runtime acceptance is claimed for these controls.

## Conditional regular/payer wrapper value flow

The [restricted caller diagnostic](../repro/donation-relay/wrapper-value-flow/README.md)
compares four modeled success/error traces. Both wrappers agree on 204 selected
context bytes, 68 argument bytes, and 153 success/24 error return bytes under
explicit callee summaries, nonwrapping guards and input-address assumptions.
Eight negative-control tests detect changed bumps, event discriminators, copy
lengths and unsupported model operations. These are conditional caller findings,
not fresh runtime acceptance, semantic equivalence, or new byte matches. Relay
remains at 482/492, with 130 exact local bodies and ten unmatched windows.

## Epoch-close field and error-result controls

Fourteen [compiled controls](../repro/donation-relay/epoch-source-controls/README.md)
test retaining debouncer fields across initialization and varying the checked-add
error/Result construction. None recovers the 4,000-byte original epoch-close
window. Every variant retains 482 normalized and 130 raw local matches with no
gained or lost window. No candidate is promoted or newly runtime-accepted.

A separate compiler-only control keeps the source, Cargo, linker and Linux target
libraries fixed while substituting the cached Darwin v1.50 Rust compiler. It
produces 226 normalized / 108 raw local matches, losing 256 normalized windows
and gaining none. The rejected 800,608-byte output and tool fingerprints are
retained in the same packet. This does not identify a historical compiler or
prove anything about other v1.50 recipes; no runtime acceptance is claimed.

## Root-profile and Result-helper controls

The [twelve-build packet](../repro/donation-relay/profile-result-controls/README.md)
reproduces the baseline exactly, then tests four root compiler overrides and seven
Result-helper source variants. No build gains a new original window. The compiler
overrides lose 100, 166, 168 and 110 matches; the source variants retain 482. A
unit-result helper duplicates original window 115, which was already matched by
an Error-returning helper. This is evidence against inferring a unique Rust return
type from local body shape, not additional recovery. The Relay frontier stays
482/492 with 130 raw local bodies and ten unmatched windows.

## Shared-worker arithmetic and tip-order controls

Six [compiled source forms](../repro/donation-relay/arithmetic-order-controls/README.md)
test in-place checked operations and naming the tip division before/after state
updates. All retain 482 normalized and 130 raw local matches without recovering
the worker. The two tip-only forms reproduce the candidate and symbol image
exactly. No candidate is promoted, and no new runtime acceptance is claimed.

## Swap caller layout and constructor order

The [six-build study](../repro/donation-relay/swap-caller-controls/README.md)
prints the current Rust account/context layouts without changing the baseline
binary. A reordered burn-context initializer removes `just_swap`'s extra memcpy
and passes fresh original/candidate replay of 536 records / 534 unique fixtures.
Its 4,408-byte body still differs from the original's 4,448 bytes. Four wire-arg
variants also remain unmatched. No matched window is gained or lost, and no
candidate is promoted. The original field-name mapping remains an inference.

## Settlement direct-call inventory

A [read-only ledger](../repro/donation-relay/settlement-call-audit/README.md)
checks all direct local calls in original windows 97–100 against both published
candidate forms. All callees have normalized-body counterparts; three baseline
caller multisets agree, and the constructor-order candidate agrees for all four.
No linear sequence or full caller body matches. The result narrows investigation
without asserting control-flow or semantic equivalence. Counts remain 482/492.

## Legacy Fees account ownership and total-check source probe

[PR #140](https://github.com/lalalune/pumpfun-source/pull/140) adds two complete
Fees body counterparts without losing a prior match: a 776-byte raw-equal
legacy cleanup and a 1,072-byte normalized dispatcher. Its standalone verifier
passes. The refreshed 585-window inventory now contains 108 raw, 395
normalized-only and 82 unmatched windows. There are 356 unique structural pairs
and 61 additional call-attributed pairs (417 total); 86 duplicates remain
unattributed. The newly recomputed call ledger has 2,493 bound-target edges and
23 different-body edges. Candidate size is 854,672 bytes; full ELF identity fails.

Separately, the [fee-total probe](../research/fees-total-predicate-probe/README.md)
reproduces a 192-byte predicate's instruction sequence using ordinary Rust. It
uses the Darwin v1.44 compiler and an isolated object; panic operands and full
Linux-candidate integration remain unresolved. It adds zero inventory matches.

## Fee-total predicate integrated and original diagnostic restored

The [full Linux packet](../research/fees-total-predicate-integration/README.md)
rebuilds PR #140's control exactly, then connects the predicate to the real fee
validator. Both variants gain original window 700568 (192 bytes), losing none:
357 unique structural pairs, 81 unmatched windows and 58 unique raw pairs. The
complete inventory partitions Fees into 108 raw, 396 normalized-only and 81
unmatched original windows. Call refinement yields 418 correspondences, 2,494
bound-target edges and 23 different-body edges; 86 duplicates stay unattributed.

The preferred method also reconstructs the observed `pump-fees-math/src/lib.rs`
line 28, column 9 and the overflow message. Both candidates pass fresh 17,331-case
suite and 1,542-case exact focused replays; all 15 applicable overflow diagnostic
cases match for the preferred candidate. Original helper callers remain open.
The failed missing-host-linker attempt and rejected stale-cache attempt are
retained explicitly. This updates research evidence, not selected program pins.

## Flat-fee setters and V2 sharing combined

The [new packet](../research/fees-config-setter-recovery/README.md) recovers the
two 624-byte flat/exotic setters, including their field writes, source origins
and all ten direct local callee bindings. The first edit lost two unrelated
matches by shifting source lines; restoring the blank line preserves both.
The rejected build is retained. The corrected setter candidate gains two and
loses none.

[PR #143](https://github.com/lalalune/pumpfun-source/pull/143) was also verified
and merged. Its V2 ownership change was compiled together with the setters:
all five gains survive in one actual binary, for 362 unique structural pairs,
59 unique raw pairs and 76 unmatched windows. Full window counts are 109 raw,
400 normalized-only and 76 unmatched. Call refinement gives 423 correspondences,
2,515 bound-target edges and 24 different-body edges; 86 duplicates stay
unattributed. Both the corrected setter and combined candidates pass fresh
17,331-case suites and 1,542-case exact matrices. Whole-file identity still fails.

## Complete normal and stable tier replacement/upsert bodies

The [six-variant packet](../research/fees-tier-splice-recovery/README.md) recovers
both 4,160-byte tier bodies and two helpers at 54864 and 784168. `FeeTier: Copy`,
an explicit usize limit, an aggregate validity predicate, and the correct stable
vector base/source positions explain the successive compiled differences.
No prior body is lost. [PR #145](https://github.com/lalalune/pumpfun-source/pull/145)
independently recovered the reserve helper and was verified/merged; that body is
counted only once in the combined candidate.

The final build has 366 unique structural pairs, 72 unmatched originals and 63
unique raw pairs. The full inventory records 116 raw, 397 normalized-only and 72
unmatched original windows. Call refinement gives 427 correspondences, 2,572
bound-target edges and 24 different-body edges; 86 duplicates remain unattributed.
All 57 direct calls in the four new bodies reach matching local callee bodies.
Fresh 17,331-case and 1,542-case exact replays pass. Whole-file identity still fails.

## Configuration-event borrowing and stored admin

The [two-build recovery](../research/fees-config-event-recovery/README.md) removes
four unnecessary event clones, then uses the configuration's stored admin value.
The unchanged `has_one = admin` constraints guard the instruction path. All four
caller bodies now match, with no existing match lost. Two callers add unique
pairs; the upserts form a duplicate-body group. Outgoing-callee checks identify
both upserts uniquely and agree with incoming-call attribution.

The final candidate has 368 unique structural pairs, 149 original windows in
ambiguous body groups and 68 unmatched windows. The full partition is 116 raw,
401 normalized-only and 68 unmatched. Call refinement gives 431 correspondences
(63 additional duplicate pairs), 2,625 bound-target edges and 20 different-body
edges; 86 duplicates remain unattributed. All 49 local calls in the four recovered
callers have matching callee bodies. Fresh 17,331-case and 1,542-case exact
replays pass. Whole-file identity still fails.
