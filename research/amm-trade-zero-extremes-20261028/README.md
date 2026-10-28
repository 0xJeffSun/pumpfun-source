# PumpSwap trade_v2 zero and extreme inputs: per-side validation

## Problem

The three v2 trade instructions take user-supplied amounts and
limits, but zero is not treated the same on both sides: a buy
limit of zero is invalid while a sell limit of zero means accept
anything. The extreme ends are now pinned at runtime, together
with the exact sites.

## Cases

Nine fresh-VM triples (original / #424 control / #427
candidate), 27 signed executions on the repository's own trade
harness (`scripts/pump_amm_trade_v2_differential.py`). The clock
is slot 100, epoch 0. `producer.py` reproduces every receipt from
the repository files.

| Case | Result |
| --- | --- |
| buy-zero-amount | 6001 ZeroBaseAmount, rollback |
| buy-zero-limit | 6002 ZeroQuoteAmount, rollback |
| sell-zero-amount | 6001 ZeroBaseAmount, rollback |
| sell-zero-limit-ok | base spent 10^9, quote gained 180,212 |
| buy-exact-zero-amount | 6002 ZeroQuoteAmount, rollback |
| buy-exact-zero-limit | 6001 ZeroBaseAmount, rollback |
| buy-exact-limit-exact | base gained 54,115,018,303, quote spent 10^7 |
| buy-u64max | 6016 BuyMoreBaseAmountThanPoolReserves, rollback |
| sell-u64max | token program insufficient funds (error 1), rollback |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
user token deltas against the expected values, the error code
and log fragment, the recorded error site (6001 at
`trade_v2.rs:671` buy / `:876` sell / `:752` buy-exact-limit
original vs `:431` / `:368` / `:471` control/candidate; 6002 at
`:672` / `:753` vs `:432` / `:472`; 6016 at
`constant_product.rs:21` vs `:8`), rollback on failures, and
agreement across images. The insufficient-funds failure has no
Anchor site line, so no site is recorded for it. Receipts are
stored as parts (`runtime/raw-transactions-part1/2/3.jsonl.gz`)
to stay under GitHub's 25MB web-upload limit; `verify.py` reads
them in order.

## Result

- **Zero is per-side**: buy amount 0 and buy limit 0 both fail,
  sell amount 0 fails, but sell limit 0 succeeds. A sell limit of
  zero is "accept anything", not an error.
- **Limits are inclusive**: a buy-exact limit exactly equal to
  the computed output passes.
- **Extremes fail at distinct layers**: buying more than the
  pool holds fails in the curve math (6016); selling more than
  the user holds fails in the token program (insufficient funds),
  before any program check.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The validation is pinned on the current instructions only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
