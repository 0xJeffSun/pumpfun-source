# Layered reconstruction pass16

Pump creator setters and migration now use the already-recovered full BondingCurve
codec, preserve original mutation-before-Clock order, and retain the original
creator-path log messages. The one pinned build changes only two source files.
All9,269 existing differential cases and1,024 Surfpool comparisons pass. Full
original application bodies, unusual layout failures and Clock-error behavior
remain incompletely reconstructed or tested.

AMM claim now checks total-claimed addition overflow before clearing unclaimed
rewards. The original and emitted candidate control flow support that order.
All17,462 unchanged comparisons and35,418 saved signatures pass. Normalized
inventory counts remain483 matched and302 unmatched original windows; the whole
claim handler remains different. No persisted-state difference on a reverted
transaction is claimed.

Both clean main builds exactly equal their separately tested executable and
symbol files. No new fixture, compiler search, binary adjustment or target probe
is added. Full frozen source maps and prior failures remain available.

Fresh candidate-source security coverage for Pump, Fees, AMM and Mayhem is indexed in
the [security review](../../security-reviews/pass-16/README.md). It does not certify
the deployed programs or close the excluded and external-program domains.

The [remaining-work report](REMAINING.md), [current ledger index](current-analysis-index.json)
and [before](before-corrections/summary.json)/[after](after-corrections/summary.json)
snapshots preserve all mismatch intervals. Exact acceptance remains0/4 core and
2/5 dependency captures. The bounded140/150 source-path count is not an overall
completion percentage.
