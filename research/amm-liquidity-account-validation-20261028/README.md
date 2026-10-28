# Liquidity account validation: every wrong account is rejected

## Problem

Deposit and withdraw touch the same pool, config, mints,
vaults, and LP mint as trade, and each one is checked before
any funds move. The checks are now pinned at runtime on the
as-is fixture pool.

## Cases

Eleven fresh-VM triples (original / #424 control / #427
candidate), 33 signed executions on the repository's own
liquidity harness (`scripts/pump_amm_liquidity_differential.py`).
The clock is slot 100, epoch 0. `producer.py` reproduces every
receipt from the repository files.

| Case | Result |
| --- | --- |
| liq-base | deposit 10^9: spends 160,619,895,224 base and 29,312,410 quote, gains 10^9 LP |
| liq-wrong-pool | 3007 AccountOwnedByWrongProgram (pool) |
| liq-wrong-config | 3007 AccountOwnedByWrongProgram (global_config) |
| liq-wrong-base-mint | 6008 InvalidBaseMint (pool) |
| liq-wrong-quote-mint | 6009 InvalidQuoteMint (pool) |
| liq-wrong-lp-mint | 6010 InvalidLpMint (pool) |
| liq-wrong-vaultbase | 6014 InvalidPoolBaseTokenAccount (pool) |
| liq-wrong-vaultquote | 6015 InvalidPoolQuoteTokenAccount (pool) |
| liq-unsigned | 3010 AccountNotSigner (user) |
| liq-readonly-pool | 2000 ConstraintMut (pool) |
| liq-withdraw-wrong-vaultquote | 6015 InvalidPoolQuoteTokenAccount (pool) |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
user token and LP deltas against the expected values, the error
code and log fragment, the recorded error site (all are
`caused by account` constraint errors with no file line),
rollback on failures, and agreement across images. Receipts are
stored as parts (`runtime/raw-transactions-part1/2/3/4.jsonl.gz`)
to stay under GitHub's 25MB web-upload limit; `verify.py` reads
them in order.

## Result

- **Ownership is checked first**: a pool or global config
  owned by the wrong program fails 3007 on that account before
  any mint or vault check runs.
- **Mint checks cover all three mints**: a wrong base mint
  fails 6008, a wrong quote mint fails 6009, and a wrong LP
  mint fails 6010, all reported against the pool account.
- **Vault checks are path-independent**: a wrong base vault
  fails 6014 on deposit, and a wrong quote vault fails 6015
  on both deposit and withdraw.
- **Signer and mutability are enforced**: an unsigned user
  fails 3010 and a read-only pool fails 2000.
- **The trade and liquidity checks agree**: the same codes
  guard the same accounts on both instruction families, with
  the LP mint check (6010) as the liquidity-only addition.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The checks are pinned on the fixture pool only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
