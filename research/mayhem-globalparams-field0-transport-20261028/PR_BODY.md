## Summary

Attributes one still-open Mayhem `GlobalParams` role. In the captured program (`last_deploy_slot` 452655053) and in the 441-window source, `field_0` is only transported: an optional setter store, the account codec, and `GlobalParamsUpdateEvent` at wire offset 16. No width-4 load of the word feeds a compare, so the recorded series of ten `8000` values does not change this image. The historical name stays unresolved.

`field_3` is not attributed. Displacement 104 has 87 eight-byte loads, which is why #466 left it alone. The initializer lane is quoted and not executed.

Package: `research/mayhem-globalparams-field0-transport-20261028/`.

Upstream review diff, against `lalalune/pumpfun-source` `main`:

https://github.com/lalalune/pumpfun-source/compare/main...harrywu666:cursor/mayhem-gp-field0-transport-e4be?expand=1

## Problem

#466 showed `field_1` is transport-only and used the width-4 store at object displacement 232 only as a landmark. The question left open was whether that landmark word is itself consumed. The 441-window source has zero business reads of `field_0`. This package checks the captured text under the same width-4 rule.

## Evidence

| Input | SHA-256 |
| --- | --- |
| `evidence/original/mayhem/deployed.so` (777,408 bytes) | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| `evidence/original/mayhem/capture.json` (`last_deploy_slot` 452655053) | `fcdd031280b2d85491f3600dd8723134d529d39c7e701df9b91ff80a76e48b64` |
| `research/claude-mayhem-441-20261028/sources/source.tar.gz` (94,829 bytes) | `049ba60cfbc9045ccdb1f9e929aed0111f28e7ac01ef4e96413d836c3e0bf494` |
| `src/lib.rs` / `src/state.rs` / `src/instructions/admin.rs` | `5703fd824d0b8d04a5ff9900fd3b882a850d790cf2eeacb80a09a163549db579` / `bbdba89e2ff44fac18dc06a2c75c93718a009ce29c9abdd2b5273886d708c6f0` / `9683684368debce589e639a5e5ceed47d6bf6d598bcf2e0162fbe4d5e1ecad1e` |
| `research/mayhem-globalparams-field-history/evidence/analysis_timeseries.json` | `c0c3a58fe6a92ba7b4d442159c5e0210441e4cb02266d411c89c29542d09448c` |

What matched:

| Site | Text PC | File offset | Raw | Result |
| --- | ---: | ---: | --- | --- |
| Optional setter store | `0x2bc68` | `0x2bd88` | `6321e80000000000` | `stxw [r1+232], r2` only on the `Some` path; paired with `field_1` at +236 |
| Account serializer load | `0x66ef0` | `0x67010` | `6171e80000000000` | 4-byte copy, then a write-status check on `r0` |
| Account decoder store | `0x68198` | `0x682b8` | `6316e80000000000` | store, immediately before the `field_1` store |
| Update-event load | `0xcce0` | `0xce00` | `6179100100000000` | `ldxw r9, [r7+272]`, stored at wire offset 16 by `emit!` and `emit_cpi!` |

The older review's setter, serializer, and event file offsets (`0x2bd88`, `0x67010`, `0xce00`) are these three sites. Source census: 0 business reads, 3 transport writes (initialize 0, reset 0, `apply_update`), 1 event projection. History: `Some(8000)` six times, `None` four times, event stays 8000. The first event payload contains `401f00000a000000` beside discriminator `63a75c9898e32629`.

Width-8 operations at displacement 232 are not this `u32`. The two arithmetic ones (`0x14dd0`, `0x175d0`) are unsigned overflow checks of a qword, on a base that also loads a qword at +240. `GlobalParams.version` at +240 is a `u32`, and the real `field_0` sites are the width-4 pairs above.

## Still unknown

- The historical name and unit of `field_0`.
- Any Mayhem image deployed before slot 452655053.
- `field_3`.
- Runtime behavior of the stopped initializer.

## Test plan

```sh
python3 -B research/mayhem-globalparams-field0-transport-20261028/verify.py
python3 -B research/mayhem-globalparams-field0-transport-20261028/test_verify.py
python3 scripts/verify_evidence.py
python3 scripts/test_tooling.py
```

provider=Cursor, model=grok-4.7, client=grok-build

Made via @slopdotcash
