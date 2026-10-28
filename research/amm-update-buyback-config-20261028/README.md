# PumpSwap update_buyback_config: validated at the admin boundary

## Problem

The buyback fee path panics when `buyback_basis_points` exceeds
10000 (see the buyback-bps panic packet), so whether that value
can be set through the admin instruction matters. It cannot:
`update_buyback_config` validates the new value before storing
it, and passing `None` does not clear the stored value at all.

## Cases

Nine fresh-VM triples (original / #424 control / #427
candidate), 27 signed executions on the repository's own admin
harness (`scripts/pump_amm_admin_differential.py`). The clock is
slot 100, epoch 0. `producer.py` reproduces every receipt from the
repository files.

| Case | Result |
| --- | --- |
| buyback-some-5000 | stored 5000 |
| buyback-some-0 | stored 0 |
| buyback-some-10000 | stored 10000 |
| buyback-some-10001 | 6056 BuybackBasisPointsOutOfRange, rollback |
| buyback-some-65535 | 6056 BuybackBasisPointsOutOfRange, rollback |
| buyback-none-noop | 4880 stays 4880 |
| buyback-outsider | 6005 InvalidAdmin, rollback |
| buyback-unsigned | 3010 AccountNotSigner, rollback |
| buyback-readonly | 2000 ConstraintMut, rollback |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
stored `buyback_basis_points` (offset 899..907) against the
expected value, the error code and log fragment, the recorded
error site (6056 at `global_config.rs:306` original vs `:70`
control/candidate), rollback on failures, and agreement across
images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **The admin boundary is validated**: values above 10000 are
  rejected before any store, so the buyback panic surface cannot
  be reached through this instruction. A stored value above 10000
  would have to come from somewhere else (genesis state or a
  migration), not from an admin update.
- **`None` is a no-op, not a clear**: it leaves the stored value
  untouched. There is no way through this instruction to unset a
  buyback rate back to "absent"; `Some(0)` is the way to zero it.
- **The three authorization layers hold**: outsider, unsigned,
  and read-only calls fail with 6005, 3010, and 2000.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The validation is pinned on the current instruction only; other
  instructions that write the same field were not probed here. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
