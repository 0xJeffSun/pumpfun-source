# PumpSwap trade and liquidity boundaries: inclusive slippage, zero-amount no-ops

## Problem

Two boundary behaviours, pinned at runtime. First, the slippage
limit is inclusive: a buy succeeds when the limit equals exactly
the quote spent, and a sell succeeds when the limit equals exactly
the quote gained; one unit past either side fails
ExceededSlippage (6004). Second, zero amounts are no-op successes
on both liquidity paths: deposit 0 mints 0 LP and moves 0 tokens,
withdraw 0 burns 0 LP and returns 0 tokens — neither path has a
ZeroAmount check, so a zero-amount liquidity transaction succeeds
and only costs the payer fee.

## Cases

Six fresh-VM triples (original / #424 control / #427 candidate), 18
signed executions: `buy_v2` with base in 10^10, `sell_v2` with base
in 10^9, `deposit` with LP amount 0 and limits u64::MAX, and
`withdraw` with LP amount 0 and limits 0, on the repository's own
trade-v2 and liquidity differential harnesses. The clock is slot
100, epoch 0. `producer.py` reproduces every receipt from the
repository files.

| Case | Limit / amount | Result |
| --- | ---: | --- |
| buy-limit-exact | limit 1,847,796 | base gained 10,000,000,000, quote spent 1,847,796 |
| buy-limit-minus1 | limit 1,847,795 | 6004 ExceededSlippage |
| sell-limit-exact | limit 180,212 | base spent 1,000,000,000, quote gained 180,212 |
| sell-limit-plus1 | limit 180,213 | 6004 ExceededSlippage |
| deposit-amount0-noop | amount 0 | base spent 0, quote spent 0, LP gained 0 |
| withdraw-amount0-noop | amount 0 | base gained 0, quote gained 0, LP burned 0 |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
amounts against the expected values, the error code and log
fragment, the recorded error site (6004 at `trade_v2.rs:706` for
buy and `:906` for sell on the original), rollback on the
failures, and agreement of amounts across images. Receipts are
stored as parts (`runtime/raw-transactions-part1/2.jsonl.gz`) to
stay under GitHub's 25MB web-upload limit; `verify.py` reads them
in order.

## Result

- **The limit is inclusive, not strict**: exact-limit trades
  succeed, so a limit set to the quoted value is safe, and the
  failure boundary is exactly one unit past it.
- **Zero is a valid liquidity amount**: both deposit and withdraw
  accept 0 and do nothing, so callers cannot rely on the program
  to reject empty liquidity transactions.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- No live transaction was submitted. All executions are offline LiteSVM
  replays with normally signed transactions.
