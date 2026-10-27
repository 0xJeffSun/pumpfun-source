# Mayhem reconstruction priority

Mayhem is the active reconstruction priority. Other PRs can be reviewed and
merged, but new body-recovery experiments should advance Mayhem first.

The current research baseline is
[AMM shared state and source origins](../research/mayhem-amm-source-origins/README.md),
built on the Sell-origin, GlobalParams and shared-error recoveries. It has 198
explicitly examined functions: 188 normalized matches and ten unmatched bodies.
Another 243 original windows remain semantically opaque. Fifty-eight windows
have literal local body matches, including twelve still-opaque windows. These
are separate measurements; none implies whole-program or semantic completeness.

The [complete static scan](../research/mayhem-full-window-audit/README.md) covers
all 441 windows: 58 raw-local matches, 269 normalized-only matches and 114
unmatched windows spanning 495,936 bytes. The ten named gaps below belong to the
narrower source-interpreted cohort; another 104 unmatched windows have unresolved
roles. A further 139 previously opaque windows have structural counterparts,
including ambiguous duplicates, but no new semantic proof follows from this scan.

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

1. Baseline reproduction is complete. Preserve the 16-input source and both
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
The latest packet's 5,382 saved signatures and 624 fully reconstructed successful
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

The latest AMM source-origin packet removes all 27 native and 25 legacy-token
non-compute diagnostic differences in the prior AMM control. All 1,653 current
trade comparisons now have equal logs after removing only compute-consumption
lines. The final 16-input candidate reproduces across two root builds, preserves
188 matches, and passes the admin/Burn lanes. O0090 and O0092 are now admitted
unmatched rows. Next work should resolve O0090's limit-selection branches and
O0092's quote/cap code generation (1,256 original bytes versus 1,120 candidate),
then continue O0095 and the full handlers.
