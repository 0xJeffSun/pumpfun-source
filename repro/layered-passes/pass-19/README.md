# Layered reconstruction pass19

Pump admin CTO now uses the full BondingCurve account codec and decoded fields.
It clears cashback for holder mode, restores the6080 fee guard, and performs the
proved field mutations before the pool-update CPI and final event Clock read.
The first compile failed on a broad mutable borrow; the separately reviewed
borrow-scope repair passed. Both attempts are retained. All9,269 differential
and1,024 Surfpool comparisons pass. The corpus has no holder+old-cashback,
fee+effective-cashback, actual6080, or exact123-byte/nonzero-fee case; those
newly corrected domains remain supported by static evidence only.

AMM initializer user ownership is restored with AccountInfo. Its full parser,
wrapper and handler now match normalized original bodies, adding three matches
and leaving297 unmatched original windows. All17,462 cases and35,418 signatures
pass;113 existing Sync messages remain exact. The nested initializer helper,
recursive data/call closure and whole ELF identity remain unresolved.

Fees sharing creation now checks the second pool, conditionally rewrites/exits
state, checks program then event, and invokes AMM in the original order. Its
17,461 comparisons and ten-step sequence pass, but no existing case reaches
the late missing-program/event6019 failures. Those branches are static-only.

The [AMM Sync residual review](amm-sync-residual-review/REVIEW.md),
[Mayhem representation review](mayhem-globalparams-layout-review/REVIEW.md),
and [ATA history-branch review](dependency-branch-review/REPORT.md) preserve
precise remaining obligations without unsupported code-shaping changes.

All three main builds reproduce the tested executables and symbols. Exact
acceptance stays0/4 core and2/5 dependency captures. The [remaining-work report](REMAINING.md),
[complete current index](current-analysis-index.json) and byte interval snapshots
retain every mismatch. Security remains incomplete, and the checkpoint branch
remains separate from overlapping remote-main work.

The combined saved-evidence runner initially omitted the repository argument for the new Mayhem report. The failed invocation and packet list are retained under verification; the corrected complete run passed. No target, source or binary was changed to repair that wiring.
