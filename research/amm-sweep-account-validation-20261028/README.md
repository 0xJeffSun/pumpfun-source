# Fee sweep account validation: wrong accounts fail before moving funds

## Problem

Protocol and creator fee sweeps move quote out of the pool
vault, and each account they touch is checked first. The
checks are now pinned at runtime.

## Cases

Eight fresh-VM triples (original / #424 control / #427
candidate), 24 signed executions on the repository's own sweep
harness (`scripts/pump_amm_sweep_differential.py`). The clock is
slot 100, epoch 0. `producer.py` reproduces every receipt from
the repository files.

| Case | Result |
| --- | --- |
| sweep-base | protocol sweep: ATA +2,488, vault -2,488, accumulator 0 |
| sweep-wrong-pool | 3007 AccountOwnedByWrongProgram (pool) |
| sweep-wrong-config | 3007 AccountOwnedByWrongProgram (global_config) |
| sweep-wrong-quote-mint | 6009 InvalidQuoteMint (pool) |
| sweep-wrong-vaultquote | 3012 AccountNotInitialized (pool_quote_token_account) |
| sweep-unsigned | 3010 AccountNotSigner (payer) |
| sweep-readonly-pool | 2000 ConstraintMut (pool) |
| sweep-creator-wrong-vault | 3012 AccountNotInitialized (pool_quote_token_account) |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
ATA gain and vault spend against the expected values, the pool
fee field left at zero, the error code and log fragment, the
recorded error site (all are `caused by account` constraint
errors with no file line), rollback on failures, and agreement
across images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in
order.

## Result

- **Ownership is checked first**: a pool or global config
  owned by the wrong program fails 3007 on that account.
- **Mint checks are pool-relative**: a quote mint that is not
  the pool's fails 6009, reported against the pool account.
- **The vault check is an initialization check**: a vault
  that is not the pool's quote vault fails 3012
  AccountNotInitialized on pool_quote_token_account, on both
  the protocol and creator sweeps — the vault account must be
  the derived vault, not merely a token account.
- **Signer and mutability are enforced**: an unsigned payer
  fails 3010 and a read-only pool fails 2000.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The checks are pinned on the fixture pool only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
