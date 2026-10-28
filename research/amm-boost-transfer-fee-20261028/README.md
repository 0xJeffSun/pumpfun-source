# boost_buy_and_burn under transfer fees: quote withheld, base invisible, floor sees net

## Problem

boost_buy_and_burn withholds a quote transfer fee on the
vault transfer, ignores a base transfer fee entirely (burning
is not a transfer), and checks its slippage floor against the
net base output, unlike buy_exact's gross-based floor.

## Cases

Eight fresh-VM triples (original / #424 control / #427
candidate), 24 signed executions on the repository's own boost
harness setup (`scripts/pump_amm_boost_burn_differential.py`
account layout, boost vault ATA 10^12, quote input 10^9, pool
virtual quote 10^9). The clock is slot 100, epoch 0.
`producer.py` reproduces every receipt from the repository
files.

| Case | Quote vault | Base vault | Boost ATA |
| --- | --- | --- | --- |
| boost-nofee | +1,000,000,000 | -5,391,870,655,895 | -1,000,000,000 |
| boost-quote-tf100 | +990,000,000 | -5,338,379,201,831 | -1,000,000,000 |
| boost-quote-tf5000 | +500,000,000 | -2,706,767,012,738 | -1,000,000,000 |
| boost-quote-tf10000 | 6002 ZeroQuoteAmount (boost.rs:255) | | |
| boost-base-tf100 | +1,000,000,000 | -5,391,870,655,895 | -1,000,000,000 |
| boost-base-tf5000 | +1,000,000,000 | -5,391,870,655,895 | -1,000,000,000 |
| boost-nofee-limit-plus1 | 6004 ExceededSlippage (boost.rs:274) | | |
| boost-quote-tf100-limit-nofee-exact | 6004 ExceededSlippage (boost.rs:274) | | |

All three images behave identically in every case.
`verify.py` rechecks every receipt independently: signature
validity, the vault and boost ATA deltas against the expected
values for the success cases, the error and log fragment for
the failures, rollback of every non-payer account, and
agreement across images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in
order.

## Result

- **Quote fee withheld, base fee ignored**: a 1% quote fee
  leaves 990,000,000 in the quote vault and draws
  5,338,379,201,831 base; a 50% fee leaves 500,000,000 and
  draws 2,706,767,012,738. A 1% or 50% base fee gives
  byte-identical results to the no-fee case, because the
  base output is burned, not transferred.
- **100% quote fee fails outright**: with no net quote the
  handler fails 6002 ZeroQuoteAmount at boost.rs:255, rather
  than succeeding with a zero delivery.
- **The floor sees net, not gross**: a 1% fee case with the
  floor set to the no-fee exact output (5,391,870,655,895)
  fails 6004 ExceededSlippage at boost.rs:274, because the
  net base output (5,338,379,201,831) is smaller. This is
  the opposite of buy_exact_quote_in_v2, whose floor binds
  on the gross output (see the buy-exact base transfer-fee
  packet).

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The transfer-fee extensions are synthetic: the fixture mints were
  mutated after the fact. The checks are pinned on the fixture pool
  only. No live transaction was submitted. All executions are offline
  LiteSVM replays with normally signed transactions.
