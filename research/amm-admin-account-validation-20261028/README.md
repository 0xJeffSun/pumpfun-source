# Admin account validation: config ownership and shape checked, address not bound

## Problem

Admin instructions check the admin signer, but they also
validate the config account itself. The checks are now pinned
at runtime, including one case where the check passes that a
reader might expect to fail.

## Cases

Nine fresh-VM triples (original / #424 control / #427
candidate), 27 signed executions on the repository's own admin
harness (`scripts/pump_amm_admin_differential.py`). The clock
is slot 100, epoch 0. `producer.py` reproduces every receipt
from the repository files.

| Case | Result |
| --- | --- |
| admin-base | disable [0,0,0,1,0]: flags 0 to 8 |
| admin-wrong-owner | 3007 AccountOwnedByWrongProgram (global_config) |
| admin-noncanonical | disable succeeds: flags 8 on the noncanonical account |
| admin-wrong-event | 2006 ConstraintSeeds (event_authority) |
| admin-missing-program | MissingAccount, no program log line |
| admin-bad-discriminator | InvalidAccountData (17179869184) |
| admin-truncated | InvalidAccountData (17179869184) |
| admin-mayhem-wrong-owner | 3007 AccountOwnedByWrongProgram (global_config) |
| admin-update-admin-wrong-owner | 3007 AccountOwnedByWrongProgram (global_config) |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
config change against the expected value (reading the config
account as the second transaction account, which covers the
noncanonical key), the error code and log fragment, the
recorded error site (the owner and seed checks are
`caused by account` constraint errors; the discriminator and
truncation cases log `ProgramError caused by account`; the
missing-program case has no program log line), rollback on
failures, and agreement across images. Receipts are stored as
parts (`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay
under GitHub's 25MB web-upload limit; `verify.py` reads them in
order.

## Result

- **Config ownership is checked on every admin instruction**:
  a config owned by the wrong program fails 3007 on
  global_config, whether the instruction is disable,
  toggle_mayhem_mode, or update_admin.
- **The config address is NOT bound**: a noncanonical config
  key holding valid GlobalConfig data with the admin disables
  successfully. The instruction validates ownership and the
  admin field, not the address.
- **The event account is seed-checked**: a wrong event
  account fails 2006 ConstraintSeeds on event_authority.
- **Config shape is validated**: a flipped discriminator or a
  56-byte truncated config fails InvalidAccountData before
  any admin check runs.
- **A missing program account fails at the runtime level**:
  MissingAccount with no program log line, distinct from the
  Anchor constraint errors.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The checks are pinned on the fixture config only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
