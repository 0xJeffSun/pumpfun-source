# PumpSwap creator-fee config and boost controls: no cap, one byte

## Problem

Three admin surfaces sit next to each other on the global
config with opposite validation postures: `update_fee_config`
caps each field at 1000 bps and `update_buyback_config` caps at
10000, but `update_creator_fee_config` caps nothing. The boost
flag and authority live at the tail of the config (authority
907..939, enabled byte 939). All three are now pinned at runtime.

## Cases

Fourteen fresh-VM triples (original / #424 control / #427
candidate), 42 signed executions on the repository's own admin
harness (`scripts/pump_amm_admin_differential.py`). The clock is
slot 100, epoch 0. `producer.py` generated these receipts on the author's machine; as committed it expects a
checkout at `~/workspace/pumpfun-sparse` and the #424/#427 `candidate.so.gz` images gunzipped
into `~/workspace/slop-verify`, so it does not run from this packet unmodified.

| Case | Result |
| --- | --- |
| creatorcfg-true-300 | stored configurable 1, max 300 |
| creatorcfg-false-0 | stored configurable 0, max 0 |
| creatorcfg-true-10001 | stored configurable 1, max 10001 |
| creatorcfg-u64max | stored configurable 1, max 18446744073709551615 |
| creatorcfg-outsider | 6005 InvalidAdmin, rollback |
| creatorcfg-unsigned | 3010 AccountNotSigner, rollback |
| boost-false | byte 939: 1 to 0 |
| boost-true-noop | byte 939 stays 1 |
| boost-outsider | 6005 InvalidAdmin, rollback |
| boost-unsigned | 3010 AccountNotSigner, rollback |
| boost-bad-bool | 102 InstructionDidNotDeserialize, rollback |
| boost-auth-77 | bytes 907..939 become 0x4d x 32 |
| boost-auth-outsider | 6005 InvalidAdmin, rollback |
| boost-auth-unsigned | 3010 AccountNotSigner, rollback |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
stored fields at their offsets against the expected values, the
error code and log fragment, rollback on failures, and agreement
across images. The 102 error's log is the generic "AnchorError
occurred." form with no site line, so no site is recorded for it.
Receipts are stored as parts
(`runtime/raw-transactions-part1/2/3/4/5.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **No cap on creator max**: 10001 and u64::MAX store, unlike
  the 1000 cap on fee config and the 10000 cap on buyback config.
  An admin can therefore set a creator cap above 10000 through
  this instruction, and the trade path does not revalidate it.
- **Boost is one byte**: 939, immediately after the 32-byte
  authority at 907..939. The fixture ships enabled, so true is a
  no-op and false is the visible flip.
- **The two authorization layers hold on all three
  instructions**: outsider 6005, unsigned 3010, with rollback.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The surfaces are pinned on the current instructions only. No live
  transaction was submitted. All executions are offline LiteSVM replays
  with normally signed transactions.
