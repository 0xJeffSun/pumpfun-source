# Mayhem reconstruction priority

Mayhem is the active reconstruction priority. Other PRs can be reviewed and
merged, but new body-recovery experiments should advance Mayhem first.

The current [Sell quote composition](../research/mayhem-sell-current-recovery-20261027/README.md)
has **431/441 normalized windows: 100 raw-local, 331 normalized-only and 10
unmatched**. The unmatched windows cover 109,208 of 706,744 original text bytes.
The Sell quote, quote-aware validator and complete 960-byte initializer match normalized
code. Two current-source builds agree, and the packet binds 6,636 trade pairs
and 69 initializer pairs to its exact artifact. These are bounded results;
recursive code/data closure, original build provenance and whole-ELF identity
remain open.

The preceding [Legacy Buy composition](../research/mayhem-current-ownership-composition-20261027/README.md)
retained the 430/100 frontier with a 13,784-byte partial body versus 13,848 original
bytes. Its fifty immediate callee shapes and seven Source records agree; two
builds and 486 fresh signed pairs pass. It adds no complete window.

The [parallel work map](MAYHEM-PARALLEL-WORK.md) lists all ten remaining
windows, completed work and cross-cutting obligations. Quote source/IR shape,
trade ownership and error flow are the next active source-recovery targets.
The [same-IR quote backend control](../research/mayhem-quote-backend-replay-20261027/README.md)
adds diagnostic evidence without a new function match. Sweep/burn work remains
outside the currently active scope.

## Historical native-parser and curve plans

The following records retain their original candidate bindings. Their old
"current" measurements and unfinished-task lists are superseded by the linked
431-window checkpoint and work map above.

The then-current research baseline was
[native Program parser recovery](../research/mayhem-native-program-recovery/README.md),
built on the AMM/Sell-origin and GlobalParams recoveries. Its explicit source
cohort has 212 windows: 202 matches and ten unmatched bodies. Another 229
windows remain without complete source attribution. Fifty-eight windows
have literal local body matches, including twelve still-opaque windows. These
are separate measurements; none implies whole-program or semantic completeness.

The [complete static scan](../research/mayhem-native-program-recovery/audit.json)
covers all 441 windows: 58 raw-local matches, 283 normalized-only matches and
100 unmatched windows spanning 350,216 bytes. The ten named gaps below belong
to the narrower source cohort; another 90 unmatched windows have unresolved
roles. Ambiguous structural counterparts and unproved data/callee closure remain
additional work. Fourteen newly matched bodies are account parsers and their
program-validation helper, not completed business handlers.

| Unmatched window | Original extent | Work |
| --- | --- | --- |
| O0071 | 55,448–61,200 | Burn body |
| O0077 | 85,600–95,336 | BuyPumpSwap body |
| O0079 | 95,848–113,160 | SellPumpSwap body |
| O0081 | 113,672–127,520 | Legacy Buy body |
| O0082 | 127,520–140,512 | Legacy Sell body |
| O0083 | 140,512–159,160 | BuyV2 body |
| O0084 | 159,160–177,256 | SellV2 body |
| O0090 | 181,656–184,200 | Shared buy accounting and risk checks |
| O0092 | 185,296–186,552 | AMM Buy quote arithmetic |
| O0095 | 188,864–190,160 | Quote-aware state/reserve validation |

The ten extents total 101,480 bytes. Two formerly opaque helpers are now explicitly
examined; all prior matches remain. This is only the admitted body remainder;
opaque windows, data, relocations, ELF layout and deployment bytes remain
additional obligations. The existing shared-error, scalar-field layout and
codecs must retain their measured matches while these bodies are recovered.

Next steps:

1. Baseline reproduction is complete. Preserve the 16 non-vendor inputs, 38 vendor files and both
   artifact hashes as controls before attributing further gains to source.
2. Recover O0095 from its actual Clock, expiry, quote-mint, reserve-threshold
   and status operations. Verify complete bytes and direct calls/locations;
   do not replace a missing body with a behavior-only approximation.
3. Reconcile Legacy Sell ownership, clone lifetimes and the original single
   typed-CPI call site. Preserve the original fixed and remaining account order.
4. Work through Burn and the other trade bodies with bounded success, rejection,
   rollback and arithmetic cases. Keep raw log/compute differences explicit.
5. Attribute the 104 additional unmatched windows and resolve the 93 ambiguous
   counterpart mappings in the complete static scan. Initializer semantics and
   runtime acceptance remain separate; static matching does not prove them.
6. Reproduce data, relocations and whole-file layout from real Rust builds,
   then compare literal ELF and capture bytes. No output patching or invented
   completeness percentage can substitute for this final check.

The canonical source/checkpoint is not changed by these research experiments.
The latest packet's 15,348 saved signatures and 624 fully reconstructed successful
admin account updates are bounded evidence. Initializers remain untested, and no full
trade handler or whole ELF is equal. All 396 Sell cases now have equal logs after
removing only explicit compute-consumption lines. Raw compute consumption still
differs.

The [quote-validator controls](../research/mayhem-quote-validator-controls/README.md)
and [followups](../research/mayhem-quote-validator-followups/README.md) preserve
the existing matches but leave O0095 unmatched. Their threshold branching and
error layout remain useful comparison points.

The [deployed-wrapper attribution](../research/mayhem-trade-wrapper-attribution/README.md)
identifies all six trade bodies through exact instruction log strings and direct
calls. O0092 is called by BuyPumpSwap and O0093 by SellPumpSwap; their reserve
arguments must not be assumed to describe legacy Buy.

The preceding AMM source-origin packet removed all 27 native and 25 legacy-token
non-compute diagnostic differences in the prior AMM control. All 1,653 current
trade comparisons now have equal logs after removing only compute-consumption
lines. That 16-input candidate reproduced across two root builds, preserved
188 source-cohort matches, and passed the admin/Burn lanes. O0090 and O0092 are now admitted
unmatched rows. Next work should resolve O0090's limit-selection branches and
O0092's quote/cap code generation (1,256 original bytes versus 1,120 candidate),
then continue O0095 and the full handlers.

The standard Program field syntax plus a one-condition Anchor source patch
recovers all six trade account parsers, the Burn account parser and six further
account parsers, as well as the program-validation helper. The patch restores
the original unconditional ID check, including the all-zero System ID. All
6,636 trade cases, 1,032 admin cases and three Burn families pass. Five new bodies
still call an unmatched destination; prioritize the boxed-account helpers and
initializer closure alongside the ten named gaps. Initializer runtime remains
unverified.

The [BuyV2 shared-validator composition](../research/mayhem-native-buy-v2-validation/README.md)
preserves the native Program source's 341 matches and restores O0083's call to
O0094. Both root builds agree; 1,839 fresh BuyV2 cases pass. Non-compute log
differences decrease from 130 to 118, so full diagnostics remain incomplete.
The parent's other runtime lanes keep their original candidate binding.

## Full external curve follow-up

The [curve packet](../research/mayhem-full-curve-recovery/README.md) advances the
current full-window count to 345 matches (59 raw-local) and 96 unmatched windows.
O0018/O0020 boxed helpers and O0059 account parsing now match; O0047 allocator
growth also matches. All earlier parser/BuyV2 work survives. The next curve
bodies remain O0003 (2752, padding), O0027 (26272, account decoding), O0212
(540936, checked decoding) and O0213 (541576, unchecked decoding). Recover their
field layout, consumption and error construction without weakening the matcher.
The four core whole-file comparisons still require completion.

The accepted curve artifact narrows the next source-level comparisons:

| Body | Original bytes | Current bytes | Remaining evidence |
| --- | ---: | ---: | --- |
| Padding wrapper (O0003) | 3,352 | 3,216 | Serialization, short-input consumption and error exits |
| Checked external decoder (O0212) | 640 | 1,000 | Account-name error construction and outlining |
| Unchecked external decoder (O0213) | 2,272 | 2,064 | Field decoding, result layout and error cleanup |

The checked decoder calls original O0202 (538104, 288 bytes), which remains
unmatched. Isolating account-name formatting changes the candidate's outlining
but has not produced another complete match. Do not treat a similar size or an
alignment-aid diff as an identity result; preserve complete call/data checks.

## Parallel continuation

Use the [current 431-window composition](../research/mayhem-sell-current-recovery-20261027/README.md)
as the integration parent and the [work map](MAYHEM-PARALLEL-WORK.md) as the
remaining-body inventory. Preserve the exact source/build bindings of all
historical experiments; their independent gains and runtime cases are not
additive. Isolated caches and content-based package invalidation make parallel
screening efficient without sharing mutable build outputs.

Future source changes must preserve previously verified bodies, call targets,
Source records and runtime behavior. Every new combination needs its own build
and replay evidence. The current counts are not whole-program completion claims.
