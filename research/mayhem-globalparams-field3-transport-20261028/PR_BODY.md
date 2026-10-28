## Summary

Attributes the Mayhem `GlobalParams` role that #466 and #474 left open. In the captured program (`last_deploy_slot` 452655053) and in the 441-window source, `field_3` is only transported: an optional setter store, the account codec, `reset_state` / `initialize_global_params` zeros, and `GlobalParamsUpdateEvent` at wire offset 32. Displacement 104 has 87 eight-byte loads, but only one of them is this field, and that load is the serializer copy. The recorded series of ten `20000000000` values does not change this image. The historical name stays unresolved.

Package: `research/mayhem-globalparams-field3-transport-20261028/`.

Upstream review diff, against `lalalune/pumpfun-source` `main`:

https://github.com/lalalune/pumpfun-source/compare/main...harrywu666:cursor/mayhem-gp-field3-transport-bc0d?expand=1

## Problem

A width filter cannot pin `field_3`. Object displacement 104 is an 8-byte slot, and the captured text has 87 `ldxdw` plus 16 `stxdw` at that displacement. #466 and #474 stopped there. The question is which of those operations are `GlobalParams.field_3`, and whether any of them is a business read.

## Evidence

| Input | SHA-256 |
| --- | --- |
| `evidence/original/mayhem/deployed.so` (777,408 bytes) | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |
| `evidence/original/mayhem/capture.json` (`last_deploy_slot` 452655053) | `fcdd031280b2d85491f3600dd8723134d529d39c7e701df9b91ff80a76e48b64` |
| `research/claude-mayhem-441-20261028/sources/source.tar.gz` (94,829 bytes) | `049ba60cfbc9045ccdb1f9e929aed0111f28e7ac01ef4e96413d836c3e0bf494` |
| `src/lib.rs` / `src/state.rs` / `src/instructions/admin.rs` | `5703fd824d0b8d04a5ff9900fd3b882a850d790cf2eeacb80a09a163549db579` / `bbdba89e2ff44fac18dc06a2c75c93718a009ce29c9abdd2b5273886d708c6f0` / `9683684368debce589e639a5e5ceed47d6bf6d598bcf2e0162fbe4d5e1ecad1e` |
| `research/claude-mayhem-441-20261028/builds/symbols.so.gz` | `8f93fd2e398135ba42086c9ba57c7733f7fc8129c03bd7ff52742c67724ea8f3` |
| decompressed symbols ELF (907,776 bytes; `.text` equals the captured `.text`) | `5fda674541c8a39caf95d304d4cfb14fe5b0493a0c57e16a4dd78447b7169448` |
| `research/mayhem-globalparams-field-history/evidence/analysis_timeseries.json` | `c0c3a58fe6a92ba7b4d442159c5e0210441e4cb02266d411c89c29542d09448c` |

What matched:

| Site | Text PC | File offset | Raw | Result |
| --- | ---: | ---: | --- | --- |
| Optional setter store | `0x2bcc0` | `0x2bde0` | `7b21680000000000` | `stxdw [r1+104], r2` only on the `Some` path; paired with `field_2` at +96, `field_4` at +112, and `field_0` at +232 |
| Account serializer load | `0x66fb0` | `0x670d0` | `7971680000000000` | 8-byte copy, then a write-status check on `r0` |
| Account decoder store | `0x681d8` | `0x682f8` | `7b16680000000000` | store, between the `field_2` and `field_4` stores |
| Update-event load | `0xccb0` | `0xcdd0` | `7971900000000000` | `ldxdw r1, [r7+144]`, stored at wire offset 32 by `emit!` and `emit_cpi!` |
| `initialize_global_params` zero | `0x7e018` | `0x7e138` | stack `stdw` | slot `r10-416`, the unique base that matches the source zero set |
| `reset_state` zero | `0x7f7c0` | `0x7f8e0` | stack `stdw` | slot `r10-432`; this is the older review's reset witness |

The other 100 width-8 operations at displacement 104 are not on a base that also holds `field_0`. Seventy-nine of the loads are inside the six trade handlers. The rest are account parsers, exits, event data, `BondingCurve` decode, or `drop_in_place` of `AccountInfo` arrays. None of those symbols is a `GlobalParams` method. Source census: 0 business reads, 3 transport writes, 1 event projection. History: `Some(20000000000)` six times, `None` four times, event stays `20000000000` (`00c817a804000000`) beside discriminator `63a75c9898e32629`.

Displacement 144 inside the codec is `field_7`, paired with object `field_0` at 232. The `field_3` event is the other 144, on the wrapper, paired with 272. `field_7` is not reopened.

## Still unknown

- The historical name and unit of `field_3`.
- Any Mayhem image deployed before slot 452655053.
- Names for the other displacement-104 slots. They are not this field.
- Runtime behavior of the stopped initializer.

## Test plan

```sh
python3 -B research/mayhem-globalparams-field3-transport-20261028/verify.py
python3 -B research/mayhem-globalparams-field3-transport-20261028/test_verify.py
python3 scripts/verify_evidence.py
python3 scripts/test_tooling.py
```

provider=Cursor, model=grok-4.7, client=grok-build

Made via @slopdotcash
