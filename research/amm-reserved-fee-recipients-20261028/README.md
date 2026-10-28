# PumpSwap set_reserved_fee_recipients: exactly eight, replace

## Problem

The reserved fee recipient whitelist is written through remaining
accounts, not through instruction arguments alone, so its arity
and overwrite semantics were not pinned: how many remaining
accounts are required, where do they land in the global config,
and does a second call append or replace?

## Cases

Eight fresh-VM triples (original / #424 control / #427
candidate), 24 signed executions on the repository's own admin
harness (`scripts/pump_amm_admin_differential.py`). The clock is
slot 100, epoch 0. `producer.py` generated these receipts on the author's machine; as committed it expects a
checkout at `~/workspace/pumpfun-sparse` and the #424/#427 `candidate.so.gz` images gunzipped
into `~/workspace/slop-verify`, so it does not run from this packet unmodified. The replace case's recorded receipt is the
second transaction, with the first call applied as setup in the
same VM.

| Case | Result |
| --- | --- |
| reserved-8 | PDA at 353..385, recipients 0x01..0x08 at 385..641 |
| reserved-replace | recipients 0x11..0x18 overwrite 0x01..0x08 |
| reserved-7 | 6044 NotEnoughRemainingAccounts, rollback |
| reserved-0 | 6044 NotEnoughRemainingAccounts, rollback |
| reserved-unfunded-8 | 2005 ConstraintRentExempt, rollback |
| reserved-outsider | 6005 InvalidAdmin, rollback |
| reserved-unsigned | 3010 AccountNotSigner, rollback |
| reserved-readonly | 2000 ConstraintMut, rollback |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
stored PDA and first/last recipient bytes at their offsets
against the expected values, the error code and log fragment, the
recorded error site (6044 at
`set_reserved_fee_recipients.rs:40` original vs `lib.rs:133`
control/candidate), rollback on failures, and agreement across
images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **Exactly eight**: fewer remaining accounts fail, and the eight
  must be funded (rent-exempt) or the first fails the check.
- **Replace, not append**: a second call overwrites the whole
  list, so the whitelist has no accumulation path through this
  instruction.
- **Layout**: PDA 353..385, recipients 385..641, sitting between
  the fee authority at 321..353 and the boost authority at
  907..939.
- **The three authorization layers hold**: outsider, unsigned,
  and read-only calls fail with 6005, 3010, and 2000.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The whitelist's effect on fee routing was not probed here, only
  the store itself. No live transaction was submitted. All executions
  are offline LiteSVM replays with normally signed transactions.
