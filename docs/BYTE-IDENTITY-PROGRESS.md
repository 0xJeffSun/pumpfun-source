# Byte-identity progress after the 26 October audit

The [full audit](RECONSTRUCTION-AUDIT.md) and its generated tables retain their
explicit `1463bd22` snapshot. This log records later research without silently
changing that baseline or promoting new selected artifacts.

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
