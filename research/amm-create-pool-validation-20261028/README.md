# PumpSwap create_pool validation: same-mint, zero, duplicate

## Problem

`create_pool` takes user-supplied amounts and vault accounts, so
its input validation decides what malformed pools can exist.
The boundaries are now pinned at runtime: same-mint, zero
amounts, wrong vault ownership, and duplicate creation each fail
at a distinct layer.

## Cases

Seven fresh-VM triples (original / #424 control / #427
candidate), 21 signed executions on the repository's own create
harness (`scripts/pump_amm_create_differential.py`). The clock is
slot 100, epoch 0. `producer.py` reproduces every receipt from the
repository files. The duplicate case's recorded receipt is the
second transaction, with the first creation applied as setup in
the same VM.

| Case | Result |
| --- | --- |
| create-base | vaults hold 10^9 base and 10^9 quote |
| create-same-mint | 6022 SameMint, rollback |
| create-zero-base | 6001 ZeroBaseAmount, rollback |
| create-zero-quote | 6002 ZeroQuoteAmount, rollback |
| create-zero-both | 6001 ZeroBaseAmount (base first), rollback |
| create-wrong-vaultbase | 2015 ConstraintTokenOwner, rollback |
| create-twice | System Allocate "account already in use" (0x0), rollback |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
vault token amounts against the expected values, the error code
and log fragment, the recorded error site (6022 at
`create_pool.rs:217` original vs `:101` control/candidate; 6001
at `:198` vs `:87`; 6002 at `:199` vs `:88`), rollback on
failures, and agreement across images. The duplicate failure has
no Anchor site line (it fails in the System Program), so no site
is recorded for it. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **Same-mint is rejected**: a pool cannot quote itself.
- **Zero amounts are rejected per side**: base first, then
  quote, so a zero-zero call reports the base error.
- **Vault ownership is enforced**: a base vault not owned by
  the pool PDA fails before any transfer.
- **Duplicates fail at allocation**: the second creation never
  reaches program logic; the System Program refuses to allocate
  an account that already exists.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The validation is pinned on the current instruction only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
