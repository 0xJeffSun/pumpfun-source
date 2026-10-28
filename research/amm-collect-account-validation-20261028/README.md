# collect_coin_creator_fee account validation: wrong vault chain fails first

## Problem

collect_coin_creator_fee moves the creator fee out of a
derived vault, and every link in the vault chain is checked
before anything moves. The checks are now pinned at runtime on
the fixture pool's real creator and vault.

## Cases

Eight fresh-VM triples (original / #424 control / #427
candidate), 24 signed executions on the repository's own
collect harness (`scripts/pump_amm_collect_differential.py`).
The clock is slot 100, epoch 0. `producer.py` reproduces every
receipt from the repository files.

| Case | Result |
| --- | --- |
| collect-base | vault -123,394, destination +123,394 |
| collect-wrong-creator | 2006 ConstraintSeeds (coin_creator_vault_authority) |
| collect-wrong-auth | 2006 ConstraintSeeds (coin_creator_vault_authority) |
| collect-wrong-vault | 2015 ConstraintTokenOwner (coin_creator_vault_ata) |
| collect-wrong-dest-owner | 2015 ConstraintTokenOwner |
| collect-wrong-token-program | 2023 ConstraintAssociatedTokenTokenProgram |
| collect-readonly-vault | 2000 ConstraintMut (coin_creator_vault_ata) |
| collect-readonly-dest | 2000 ConstraintMut (coin_creator_token_account) |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
vault and destination deltas against the expected values, the
error code and log fragment, the recorded error site (the
seed, owner, and mut checks are `caused by account` constraint
errors; the destination-owner and token-program cases log the
general "AnchorError occurred." form with no site line),
rollback on failures, and agreement across images. Receipts are
stored as parts (`runtime/raw-transactions-part1/2/3.jsonl.gz`)
to stay under GitHub's 25MB web-upload limit; `verify.py` reads
them in order.

## Result

- **The vault authority is seed-checked**: a creator or
  authority that is not the derived PDA fails 2006
  ConstraintSeeds on coin_creator_vault_authority.
- **The vault owner check fires first**: a vault that is not
  the pool's fails 2015 ConstraintTokenOwner, before any mint
  check on the vault.
- **The destination owner is checked too**: a destination
  whose owner is not the creator fails 2015 as well.
- **The token program is constrained**: a token program that
  is not the vault's fails 2023
  ConstraintAssociatedTokenTokenProgram.
- **Mutability is enforced on both ends**: a read-only vault
  fails 2000 on coin_creator_vault_ata and a read-only
  destination fails 2000 on coin_creator_token_account.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The checks are pinned on the fixture pool only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
