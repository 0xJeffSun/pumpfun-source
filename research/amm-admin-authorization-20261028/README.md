# PumpSwap admin authorization: outsider, unsigned, and read-only each fail distinctly

## Problem

Admin instructions on the global config are gated in three
distinct layers, pinned at runtime. The disable instruction (five
bools, one per bit) by the admin sets the flags byte; the same
call by an outsider fails InvalidAdmin (6005), an unsigned admin
fails AccountNotSigner (3010), and a read-only config fails
ConstraintMut (2000). The toggle and update_admin instructions
share the outsider gate: toggle_mayhem_mode by the admin flips
byte 417 while an outsider fails InvalidAdmin, and update_admin by
the admin replaces the admin key (bytes 8..40) while an outsider
fails InvalidAdmin.

## Cases

Eight fresh-VM triples (original / #424 control / #427 candidate),
24 signed executions: `disable`, `toggle_mayhem_mode`, and
`update_admin` on the repository's own admin differential harness
(`scripts/pump_amm_admin_differential.py`). The clock is slot 100,
epoch 0. `producer.py` generated these receipts on the author's machine; as committed it expects a
checkout at `~/workspace/pumpfun-sparse` and the #424/#427 `candidate.so.gz` images gunzipped
into `~/workspace/slop-verify`, so it does not run from this packet unmodified.

| Case | Result |
| --- | --- |
| disable-buy-admin | flags 0 -> 8 |
| disable-outsider | 6005 InvalidAdmin |
| disable-unsigned | 3010 AccountNotSigner |
| disable-readonly | 2000 ConstraintMut |
| mayhem-on-admin | mayhem byte 417: 0 -> 1 |
| mayhem-outsider | 6005 InvalidAdmin |
| update-admin-admin | admin bytes 8..40 become 0x37 x 32 |
| update-admin-outsider | 6005 InvalidAdmin |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
config change against the expected value, the error code and log
fragment, the recorded "caused by account" line (global_config for
6005/2000, admin for 3010), rollback on the failures, and
agreement of state across images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **Three gates, three errors**: identity (6005), signature
  (3010), and writability (2000) are checked independently, so a
  caller can tell exactly which authorization failed.
- **Toggles and admin transfer share the identity gate**: the
  outsider fails the same way on all three instructions.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- No live transaction was submitted. All executions are offline LiteSVM
  replays with normally signed transactions.
