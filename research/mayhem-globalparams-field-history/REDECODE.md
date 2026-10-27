# Independent re-decode of the Mayhem GlobalParams history

Follow-up requested by `docs/REMAINING-WORK.md` ("Mayhem history follow-up") in lalalune/pumpfun-source: independently re-decode the raw transaction arguments and event payloads behind PR #148's reported history, independently of the existing checker implementation.

Method: `verify_raw.py` in this folder is a fresh decoder written from the byte layouts. It imports nothing from the study's decoder or the package's `verify.py`; its only inputs include the retained transaction/account captures and the supplied account crosswalk. It re-derives every `update_global_params` argument pattern and value, every `GlobalParamsUpdateEvent` post-update snapshot (old/new version words plus all fields), the initializer, and the current account state, then compares all of it against `evidence/analysis_timeseries.json`, the package README's history table, and the README's current-state claims.

## Verdict: FULL MATCH

Every independently decoded value agrees with the reported history. No mismatches, no decode errors, no anomalies.

## Coverage

- Transactions decoded from raw captures: 13 of 13 cited (capture set on disk and cited set are identical: True).
- Mayhem instructions compared (name, length, raw bytes, accounts): 32, covering 1882 raw instruction bytes.
- update_global_params instructions independently decoded: 10; event payloads independently decoded: 10.
- Argument fields compared (incl. Option presence and not-in-schema fields): 173.
- Event fields compared (incl. old/new version words, the state-chain cross-check, README table cells, and account fields): 392.
- Transaction metadata fields compared (signature, slot, block time, fee payer, error): 65.

## Per-transaction verdicts

| # | Signature | Slot | Updates | Events | Verdict |
|---|---|---|---|---|---|
| 0 | `5RTiv1wUFaE1VvqG...` | 378783267 | 1 | 1 | MATCH |
| 1 | `SGWkAFL8PGT2jppC...` | 379195472 | 1 | 1 | MATCH |
| 2 | `4JXZRNXgemacaoVg...` | 379453369 | 0 | 0 | MATCH |
| 3 | `2aiqiufkc8qYg2LQ...` | 379676062 | 1 | 1 | MATCH |
| 4 | `4umsCirZpTSfiCgC...` | 379833115 | 1 | 1 | MATCH |
| 5 | `4iJN5WGToRhxuDZe...` | 380046118 | 0 | 0 | MATCH |
| 6 | `4LfcQpXDyhGRPzVn...` | 381107792 | 1 | 1 | MATCH |
| 7 | `21xjJPEze2WGkcC4...` | 384484658 | 1 | 1 | MATCH |
| 8 | `3t8JmTdTcLRALCRC...` | 415858254 | 0 | 0 | MATCH |
| 9 | `4R6xZbvESQSq6jYd...` | 416519896 | 1 | 1 | MATCH |
| 10 | `5NwoenGkceEZ3PmY...` | 417164704 | 1 | 1 | MATCH |
| 11 | `L8XYNzWyE3RMtRCJ...` | 426649509 | 1 | 1 | MATCH |
| 12 | `4JYgYYEZXsvvxutM...` | 433094602 | 1 | 1 | MATCH |

Version sequence from the independently decoded events: old/new pairs chain 0->1->...->10 with no gaps; total updates 10, initializer count 1 (in the earliest transaction, ahead of the first update, as reported).

Other Mayhem instructions found in the raw captures, by discriminator (names as reported; the byte streams and, where reported, the u64 arguments all match):

- `da578ec8cec516c8` -> initialize_fee_recipient
- `22ada705c885e192` -> update_max_sol_per_sweep
- `804b4c8b7dc46f67` -> update_max_stable_per_sweep
- `c9cf63406556af60` -> update_trader

## Account state

- `capture_globalparams_current.json` (slot 461857236, 318 bytes): field_0=8000, field_1=0, field_3=20000000000, field_6=24, field_10=86280, version=10. Verdict: MATCH.
- `capture_globalparams_current2.json` (slot 461863638, 318 bytes): field_0=8000, field_1=0, field_3=20000000000, field_6=24, field_10=86280, version=10. Verdict: MATCH.

The two captures agree on the six compared values. Bytes differ at offsets [113, 114, 115, 116, 117]; this check does not assign those bytes a semantic role. The version is read at the supplied crosswalk offset 162 and equals 10 in both captures, matching the end of the decoded version chain.

## README history table

All 110 numeric cells of the README's v1-v10 history table (fields 0-10) were parsed and compared against the independent event decodes: 0 mismatched.

## Layout notes (derived from the raw bytes)

- update_global_params instruction data: 8-byte discriminator `9224de6c59e2f97e`, then one Borsh Option per field in field order (tag byte plus little-endian value). Widths: u32, u32, u64, u64, u64, u64, u8, u64, u64, u64, u64 for fields 0-10; fields 11-15 (v10 only) are u64 each.
- Event carrier instruction data: carrier discriminator `e445a52e51cb9a1d`, event discriminator `63a75c9898e32629`, then u32 old_version, u32 new_version, then the full post-update state in the same widths with no Option tags (payload 81 bytes in era 1, 121 bytes in era 2).
- The applied-arguments state chain (each update's Some values applied in slot order) reproduces the event snapshot of the same transaction at every version, so the reported history is consistent across both channels independently of the original decoder.

This corroborates consistency of the retained captures. It does not authenticate RPC responses or prove the fields’ semantic meanings.

Artifacts: `verify_raw.py` (this decoder), `diff.json` (machine-readable results). Captured inputs were not modified.
