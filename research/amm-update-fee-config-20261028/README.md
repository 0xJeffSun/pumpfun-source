# PumpSwap update_fee_config: per-field cap of exactly 1000 bps

## Problem

`update_fee_config` writes the global fee schedule, but the
boundaries were not pinned: is the cap per field or on the sum,
and must every protocol fee recipient be non-zero? Both are now
pinned at runtime, together with the global config fee layout
itself (lp 40..48, protocol 48..56, recipients 57..313, creator
313..321, authority 321..353).

## Cases

Ten fresh-VM triples (original / #424 control / #427 candidate),
30 signed executions on the repository's own admin harness
(`scripts/pump_amm_admin_differential.py`). The clock is slot 100,
epoch 0. `producer.py` generated these receipts on the author's machine; as committed it expects a
checkout at `~/workspace/pumpfun-sparse` and the #424/#427 `candidate.so.gz` images gunzipped
into `~/workspace/slop-verify`, so it does not run from this packet unmodified.

| Case | Result |
| --- | --- |
| fee-base | stored lp 25, protocol 5, creator 0, recipients 1..8, authority zero |
| fee-all-1000 | stored lp 1000, protocol 1000, creator 1000 |
| fee-lp-1001 | 6000 FeeBasisPointsExceedsMaximum, rollback |
| fee-proto-1001 | 6000 FeeBasisPointsExceedsMaximum, rollback |
| fee-creator-1001 | 6000 FeeBasisPointsExceedsMaximum, rollback |
| fee-one-zero-recip | 6011 AllProtocolFeeRecipientsShouldBeNonZero, rollback |
| fee-all-zero-recip | 6011 AllProtocolFeeRecipientsShouldBeNonZero, rollback |
| fee-outsider | 6005 InvalidAdmin, rollback |
| fee-unsigned | 3010 AccountNotSigner, rollback |
| fee-readonly | 2000 ConstraintMut, rollback |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
stored fee fields at their offsets against the expected values,
the error code and log fragment, the recorded error site (6000
at `global_config.rs:220` lp / `:230` protocol / `:243` creator
original vs `:7` / `:13` / `:19` control/candidate; 6011 at
`:256` vs `:25`), rollback on failures, and agreement across
images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **The cap is per field at exactly 1000 bps (10%)**: 1000
  stores, 1001 fails, and all three fields at 1000 together
  (sum 3000) still store, so there is no sum cap.
- **Every recipient must be non-zero**: a single zero recipient
  fails the whole update, not just that slot.
- **The three authorization layers hold**: outsider, unsigned,
  and read-only calls fail with 6005, 3010, and 2000.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The layout and caps are pinned on the current instruction only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
