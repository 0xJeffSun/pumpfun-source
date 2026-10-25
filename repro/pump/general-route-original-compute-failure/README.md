# V3 original-only attempt 01 — stopped at first failure

Exactly one normally signed original transaction executed, the first frozen case `buy-captured-1000000`. It failed with `ProgramFailedToComplete` at the default transaction compute limit. The outer captured AMM consumed **200,000/200,000** compute units; original Pump exhausted its remaining **106,439** after emitting two TradeEvents. No candidate transaction ran, no case was accepted, and the remaining 15 cases were not executed.

The actual genuine AMM CPI reached Pump with flags `[1,0,2]` and 28 accounts. One ordinary outer signature verified and the packet was 1,088 bytes. All three per-case sidecars were written before the fail-first assertion: signed transaction/before state, raw VM result/logs/after state, and decoded comparison receipt. `failure.json` and `progress.json` preserve the exact driver exception and assertions. No fixture, budget, source or runtime control was changed or retried in this attempt.

The full raw output establishes compute exhaustion, not successful three-hop semantics. Failed-transaction rollback left only the normal user transaction fee changed in watched state. The missing third event and second carried transfer are consequences of this stopped execution; they are not waived assertions or accepted partial-case coverage. `execution.json` records exactly one failed execution and zero accepted comparisons.

`post-failure-input-check.json` verifies unchanged original/dependency/IDL, harness and runtime file bytes after stopping. `saved-signature-check.json` independently verifies the already-saved signed message without executing or signing another transaction. `frozen-v3-proposal.tar.gz` preserves the exact authorized plan and seal.

V3's source-root improvement is explicit isolated-source/portable binding. V2's recorded map already contained `work/.../source` prefixes, so `repo/p` could resolve the correct isolated files in the intact original workspace. No claim is made that V2 necessarily checked moving main. This original-only stage used no candidate source root.

Run `python3 -B verify.py` for portable seal/receipt/binding checks. This does not execute SBF or create signatures. Any compute-budget instruction proposal and retry must be separately reviewed and recorded; this default-budget failure remains immutable and unaccepted.
