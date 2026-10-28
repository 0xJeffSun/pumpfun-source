# PumpSwap account validation: Anchor discriminators vs manual loads

## Problem

Not every account goes through the same validation. Zeroing an
account's data (lamports and owner kept) shows the split: the fee
config and the user volume accumulator fail with Anchor's 3002
AccountDiscriminatorMismatch, naming the account, while the pool
and the global config fail with the generic InvalidAccountData
program error, also naming the account. The two paths matter
because a corrupted fee config and a corrupted pool surface
differently to callers and indexers, even though both are "bad
account data".

## Cases

Six fresh-VM triples (original / #424 control / #427 candidate), 18
signed executions: `buy_v2` with base in 10^10 and limit 10^9, and
`deposit` with LP amount 10^9 and limits u64::MAX, on the
repository's own trade-v2 and liquidity differential harnesses,
with one account's data zeroed per case (the volume account, which
the fixture leaves empty, is instead given 64 zero bytes owned by
the program so its discriminator check fires). The clock is slot
100, epoch 0. `producer.py` reproduces every receipt from the
repository files.

| Case | Zeroed account | Result |
| --- | --- | --- |
| buy-feeconfig-zeroed | fee_config | 3002 AccountDiscriminatorMismatch |
| buy-volume-bad-disc | user_volume_accumulator | 3002 AccountDiscriminatorMismatch |
| buy-pool-zeroed | pool | InvalidAccountData |
| buy-config-zeroed | global_config | InvalidAccountData |
| deposit-pool-zeroed | pool | InvalidAccountData |
| deposit-config-zeroed | global_config | InvalidAccountData |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the error
code and log fragment, the recorded "caused by account" line
naming the expected account, rollback, and agreement across
images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **Anchor accounts fail with 3002**: fee_config and
  user_volume_accumulator carry Anchor discriminators, so a
  zeroed discriminator is caught by the framework check.
- **Core state fails with InvalidAccountData**: pool and
  global_config are loaded manually, so corruption surfaces as
  the generic program error instead.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The corruption levels are synthetic boundary conditions, not mainnet
  account states: they isolate the validation path per account. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
