# Mayhem reconstruction priority

Mayhem is the active reconstruction priority. Other PRs can be reviewed and
merged, but new body-recovery experiments should advance Mayhem first.

The current research baseline is
[Sell arithmetic and source-origin recovery](../research/mayhem-sell-origin-recovery/README.md),
built on the GlobalParams, shared-error and typed Sell CPI recoveries. It has 196
explicitly examined functions: 188 normalized matches and eight unmatched bodies.
Another 245 original windows remain semantically opaque. Fifty-eight windows
have literal local body matches, including twelve still-opaque windows. These
are separate measurements; none implies whole-program or semantic completeness.

| Unmatched window | Original extent | Work |
| --- | --- | --- |
| O0071 | 55,448–61,200 | Burn body |
| O0077 | 85,600–95,336 | Trade handler body |
| O0079 | 95,848–113,160 | Trade handler body |
| O0081 | 113,672–127,520 | Trade handler body |
| O0082 | 127,520–140,512 | Legacy Sell body |
| O0083 | 140,512–159,160 | Trade handler body |
| O0084 | 159,160–177,256 | Trade handler body |
| O0095 | 188,864–190,160 | Quote-aware state/reserve validation |

The eight extents total 97,680 bytes. This is only the admitted body remainder;
opaque windows, data, relocations, ELF layout and deployment bytes remain
additional obligations. The existing shared-error, scalar-field layout and
codecs must retain their measured matches while these bodies are recovered.

Next steps:

1. Baseline reproduction is complete. Preserve the 15-input source and both
   artifact hashes as controls before attributing further gains to source.
2. Recover O0095 from its actual Clock, expiry, quote-mint, reserve-threshold
   and status operations. Verify complete bytes and direct calls/locations;
   do not replace a missing body with a behavior-only approximation.
3. Reconcile Legacy Sell ownership, clone lifetimes and the original single
   typed-CPI call site. Preserve the original fixed and remaining account order.
4. Work through Burn and the other trade bodies with bounded success, rejection,
   rollback and arithmetic cases. Keep raw log/compute differences explicit.
5. Examine the opaque inventory and initializer separately. Exclusion from a
   prior execution lane is not completion, and unexamined code cannot count as
   reconstructed. No stopped process is automatically resumed by this plan.
6. Reproduce data, relocations and whole-file layout from real Rust builds,
   then compare literal ELF and capture bytes. No output patching or invented
   completeness percentage can substitute for this final check.

The canonical source/checkpoint is not changed by these research experiments.
The latest packet's 2,868 saved signatures and 624 fully reconstructed successful
account updates are bounded evidence. Initializers remain untested, and no full
trade handler or whole ELF is equal. All 396 Sell cases now have equal logs after
removing only explicit compute-consumption lines; 337 raw logs still differ in
compute consumption.

The [quote-validator controls](../research/mayhem-quote-validator-controls/README.md) independently reproduce the baseline and preserve all 188 matches across seven source controls. They recover the expiry-before-Clock register/spill prefix, but threshold branching and error layout still differ. None is promoted as a complete O0095 recovery.

The [interval-location recovery](../research/mayhem-interval-location-recovery/README.md) corrects the overflow location with exactly one changed data byte and identical instructions. Its fresh 396-case/792-signature Sell run passes, reducing known non-compute log differences from four to three. O0095 is still unmatched after five further [source controls](../research/mayhem-quote-validator-followups/README.md). The remaining subtraction and division panic evidence points to state.rs 321 and state.rs 398; O0092/O0093 are additional arithmetic-body leads, not yet admitted as recovered.

The [refreshed 441-window Mayhem inventory](../research/mayhem-sell-origin-recovery/functions.tsv) retains opaque scope explicitly. Recovering the shared arithmetic and validation source origins removed the previous four diagnostic discrepancies without adding complete body matches. The eight admitted body gaps and whole-ELF work remain.
