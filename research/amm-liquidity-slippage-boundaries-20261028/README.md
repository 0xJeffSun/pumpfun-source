# PumpSwap liquidity slippage boundaries: limits inclusive on both sides

## Problem

Liquidity slippage limits are inclusive on both sides, pinned at
runtime. A deposit's limits are maximums: it succeeds when
base_limit and quote_limit equal exactly the computed amounts
(ceil) and fails ExceededSlippage (6004) one unit below either. A
withdraw's limits are minimums: it succeeds when base_limit and
quote_limit equal exactly the computed amounts (floor) and fails
one unit above either. The exact-limit values differ by one unit
between deposit and withdraw (ceil vs floor), matching the
rounding asymmetry pinned by the liquidity extremes packet.

## Cases

Six fresh-VM triples (original / #424 control / #427 candidate), 18
signed executions: `deposit` and `withdraw` with LP amount 10^9 on
the repository's own liquidity differential harness
(`scripts/pump_amm_liquidity_differential.py`), with limits set to
the exact computed amounts or one unit past them. The clock is slot
100, epoch 0. `producer.py` reproduces every receipt from the
repository files.

| Case | Limits | Result |
| --- | --- | --- |
| deposit-limits-exact | base 160,619,895,224, quote 29,312,410 | base spent 160,619,895,224, quote spent 29,312,410, LP gained 1,000,000,000 |
| deposit-base-minus1 | base 160,619,895,223 | 6004 ExceededSlippage |
| deposit-quote-minus1 | quote 29,312,409 | 6004 ExceededSlippage |
| withdraw-limits-exact | base 160,619,895,223, quote 29,312,409 | base gained 160,619,895,223, quote gained 29,312,409, LP burned 1,000,000,000 |
| withdraw-base-plus1 | base 160,619,895,224 | 6004 ExceededSlippage |
| withdraw-quote-plus1 | quote 29,312,410 | 6004 ExceededSlippage |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
amounts against the recorded observations, the error code and log
fragment, the recorded error site (deposit base at
`deposit.rs:79` original vs `:15` control/candidate, quote at
`:100` vs `:23`; withdraw base at `withdraw.rs:86` vs `:16`,
quote at `:107` vs `:24`), rollback on the failures, and
agreement of amounts across images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **Deposit limits are maximums, withdraw limits are minimums**,
  and both are inclusive: the exact computed amount passes on
  every side.
- **The failure boundary is exactly one unit**: one below a
  deposit maximum or one above a withdraw minimum fails, with no
  gap and no overlap.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- No live transaction was submitted. All executions are offline LiteSVM
  replays with normally signed transactions.
