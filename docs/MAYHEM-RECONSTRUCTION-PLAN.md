# Mayhem reconstruction priority

Mayhem is the active reconstruction priority. Other PRs can be reviewed and
merged, but new body-recovery experiments should advance Mayhem first.

The current research baseline is
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
