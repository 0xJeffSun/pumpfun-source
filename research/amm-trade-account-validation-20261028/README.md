# trade_v2 account validation: every wrong account is rejected

## Problem

trade_v2 touches a dozen accounts, and each one is checked
before any funds move. The checks are now pinned at runtime:
which account fails, with which code, and on which path.

## Cases

Twelve fresh-VM triples (original / #424 control / #427
candidate), 36 signed executions on the repository's own trade
harness (`scripts/pump_amm_trade_v2_differential.py`). The clock
is slot 100, epoch 0. `producer.py` reproduces every receipt
from the repository files.

| Case | Result |
| --- | --- |
| trade-base | buy 10^10: gains 10^10 base, spends 1,847,796 quote |
| trade-wrong-pool | 3007 AccountOwnedByWrongProgram (pool) |
| trade-wrong-config | 3007 AccountOwnedByWrongProgram (global_config) |
| trade-wrong-feeconfig | 3007 AccountOwnedByWrongProgram (fee_config) |
| trade-wrong-base-mint | 6008 InvalidBaseMint (pool) |
| trade-wrong-quote-mint | 6009 InvalidQuoteMint (pool) |
| trade-wrong-vaultbase | 6014 InvalidPoolBaseTokenAccount (pool) |
| trade-wrong-vaultquote | 6015 InvalidPoolQuoteTokenAccount (pool) |
| trade-wrong-buyback | 6009 InvalidQuoteMint at trade_v2.rs:146 |
| trade-unsigned | 3010 AccountNotSigner (user) |
| trade-readonly-pool | 2000 ConstraintMut (pool) |
| trade-sell-wrong-vaultbase | 6014 InvalidPoolBaseTokenAccount (pool) |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
user token deltas against the expected values, the error code
and log fragment, the recorded error site (the buyback mint
check at `trade_v2.rs:146` original vs `:75` control/candidate;
the rest are `caused by account` constraint errors with no
file line), rollback on failures, and agreement across images.
Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3/4.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in
order.

## Result

- **Ownership is checked first**: a pool, global config, or
  fee config owned by the wrong program fails 3007 on that
  account before any mint or vault check runs.
- **Mint and vault checks are distinct**: a wrong base mint
  fails 6008, a wrong quote mint fails 6009, a wrong base vault
  fails 6014, a wrong quote vault fails 6015, all reported
  against the pool account.
- **The buyback check is separate**: a buyback recipient whose
  mint is not the quote fails 6009 at a different site
  (`trade_v2.rs:146`) than the pool mint check, so the two
  6009 paths are distinguishable.
- **The vault check is path-independent**: the wrong base
  vault fails 6014 on sell exactly as on buy.
- **Signer and mutability are enforced**: an unsigned user
  fails 3010 and a read-only pool fails 2000.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The checks are pinned on the fixture pool only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
