# PumpSwap collect creator fee: the second hop, from vault to creator

## Problem

The sweep packet moves creator fees into the creator-vault ATA.
This packet pins the second hop: collect_coin_creator_fee moves
the vault's full balance to the coin creator's own token account.
Using the fixture pool's real coin creator and the real recorded
creator-fee amount (123,394), a full vault collects exactly that
amount and leaves the vault at 0, an empty vault collects 0 and
still succeeds, a destination owned by someone else fails
ConstraintTokenOwner (2015), and a vault that is not the
creator-vault ATA fails ConstraintAssociated (2009).

## Cases

Four fresh-VM triples (original / #424 control / #427 candidate),
12 signed executions: `collect_coin_creator_fee` with no arguments
on the repository's own collect differential harness
(`scripts/pump_amm_collect_differential.py`). The clock is slot
100, epoch 0. `producer.py` reproduces every receipt from the
repository files.

| Case | Result |
| --- | --- |
| collect-full-vault | destination gained 123,394, vault left 0 |
| collect-empty-vault | destination gained 0, vault left 0 |
| collect-wrong-dest-owner | 2015 ConstraintTokenOwner |
| collect-wrong-vault | 2009 ConstraintAssociated |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
destination gain and vault remainder against the expected values,
the error code and log fragment, the recorded "caused by account"
line for the vault case, rollback on the failures, and agreement
of amounts across images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **Collect drains the vault exactly**: the full balance moves,
  nothing is left behind, and an empty collect is a valid no-op.
- **Two distinct guards**: the destination must belong to the
  creator (2015) and the vault must be the derived associated
  account (2009).

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- No live transaction was submitted. All executions are offline LiteSVM
  replays with normally signed transactions.
