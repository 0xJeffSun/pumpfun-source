# Layered reconstruction pass15

Fees withdrawal now supplies the fieldless error enum to `ok_or`; the conversion
to an owned Anchor error happens only when an option is missing. All17461 existing
comparisons and the ten-step sequence pass. Four missing-vault and two missing-user
application arms are exercised; the final missing-token-program arm is static-only.
Raw6523 diagnostic differences remain. An additional20 existing focused comparisons repeat against the main artifact to check CI wiring; they add no unique coverage. The complete enum converter matches under
the retained normalization; the whole withdrawal body and ELF still differ.

The AMM claim context now owns user/event AccountInfo values and stores its global
accumulator Account inline. Its complete parser, initialization closure, exit and
wrapper bodies match under normalization, gaining four original windows. The
handler and recursive graph still differ;302 original windows remain unmatched.
All17462 unchanged comparisons and35418 retained signatures pass.

Both clean main builds exactly equal the separately tested executables and symbol
files. Fees has one explicit README-only difference in its26-input main/scratch
source maps; all25 other inputs match. AMM matches all28 inputs including vendor assets.

The [remaining-work report](REMAINING.md), [current ledger index](current-analysis-index.json)
and [before](before-corrections/summary.json)/[after](after-corrections/summary.json)
snapshots preserve every mismatch. Exact acceptance stays0/4 core and2/5 dependency
captures. Full security, historical source/toolchain and recursive data/call
reconstruction remain incomplete.
