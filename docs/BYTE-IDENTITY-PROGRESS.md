# Byte-identity progress after the 26 October audit

The [full audit](RECONSTRUCTION-AUDIT.md) and its generated tables retain their
explicit `1463bd22` snapshot. This log records later research without silently
changing that baseline or promoting new selected artifacts.

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
