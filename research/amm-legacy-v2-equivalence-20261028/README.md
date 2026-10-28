# PumpSwap legacy vs v2 equivalence: same fixture, same amounts

## Problem

The legacy (v1) trade path reaches fees through the Fees program
CPI while the v2 path computes them in-program, so agreement
between the two is a real property of this fixture's fee
configuration, not a given. On the shared fixture they agree
exactly: legacy buy spends and gains what buy_v2 does, with or
without volume tracking; legacy buy_exact_quote_in gains and
spends what buy_exact_quote_in_v2 does; legacy sell spends and
gains what sell_v2 does. The v2 amounts are not executed in this
packet; the receipts pin the legacy amounts.

## Cases

Five fresh-VM triples (original / #424 control / #427 candidate),
15 signed executions: `buy`, `buy_exact_quote_in`, and `sell` on
the repository's own legacy differential harnesses
(`scripts/pump_amm_legacy_buy_differential.py`,
`scripts/pump_amm_legacy_sell_differential.py`). The clock is slot
100, epoch 0. `producer.py` generated these receipts on the author's machine; as committed it expects a
checkout at `~/workspace/pumpfun-sparse` and the #424/#427 `candidate.so.gz` images gunzipped
into `~/workspace/slop-verify`, so it does not run from this packet unmodified.

| Case | Result |
| --- | --- |
| legacy-buy | base gained 10,000,000,000, quote spent 1,847,796 |
| legacy-buy-track1 | base gained 10,000,000,000, quote spent 1,847,796 |
| legacy-buy-exact | base gained 54,115,018,303, quote spent 10,000,000 |
| legacy-sell | base spent 1,000,000,000, quote gained 180,212 |
| legacy-sell-limit-plus1 | 6004 ExceededSlippage |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the user
token deltas against the expected values, the error code and log
fragment, the recorded error site (6004 at `sell.rs:189`
original vs `legacy_sell.rs:152` control/candidate), rollback on
the failure, and agreement of amounts across images. Receipts are
stored as parts (`runtime/raw-transactions-part1/2.jsonl.gz`) to
stay under GitHub's 25MB web-upload limit; `verify.py` reads them
in order.

## Result

- **Legacy (v1) amounts equal the v2 values for this fixture**: this
  packet executes only legacy instructions; the v2 amounts are not
  re-executed here.
- **Volume tracking does not change trade amounts**: the track
  flag leaves the buy result byte-identical.
- **The legacy sell limit fails one above the output**: limit 180,213
  fails with 6004 (`sell.rs:189` on the original, `legacy_sell.rs:152`
  on the rebuilt images). The exact limit (180,212) is not executed.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The equivalence is pinned on this fixture's fee configuration
  only; other fee configurations could diverge. No live transaction
  was submitted. All executions are offline LiteSVM replays with
  normally signed transactions.
