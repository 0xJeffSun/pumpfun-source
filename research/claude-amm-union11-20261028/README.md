# PumpSwap AMM union composite 11: 782 -> 783/785 normalized, raw 236, layout layer raw 259

Follow-up to [`research/claude-amm-union10-20261028`](../claude-amm-union10-20261028/README.md) (merged as #525,
Linux 782/785, 236 raw source-only, 248 raw with its layout layer). It adds one fz-run lane delivery, `fz-A-vol-r3-01`,
which makes `GlobalVolumeAccumulator::update_token_incentives` (`0x6db20`, 6,312 bytes) normalized-equal. It also
regenerates the **separately labeled layout layer**, a linker order **generated from the original program's layout**.

This is a research packet: the maintained `programs/` tree and `repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union10-20261028` (symbols `b07ff033…`) | 782/785 | 236 |
| **this candidate, source only** (symbols `89962e4c…`, stripped `433b8e25…`) | **783/785** | **236** |
| this candidate **+ generated layout layer** (stripped `8cac7480…`) | 783/785 | 259 |

- **Source-only result against the parent:** +1 normalized window (`0x6db20`), raw unchanged at 236, with zero
  normalized and zero raw losses.
- **Layout layer:** it keeps the same 783 normalized set. Raw goes from the parent layer's 248 to 259: +11 raw
  (`0x3d828 0x40890 0x457c8 0x51d08 0x52c58 0x565e8 0x58028 0x5e778 0x5e978 0x64e20 0x650e8`), with no raw loss against
  the parent's layout layer or against this packet's source-only image.
- **Native macOS build** of the same tree measures 778/225 (union-778: 777/225). It differs from Linux only in 5 sysroot
  TypeId windows and in raw layout.
- **Runtime:** the 25 maintained suites report 17,462 cases and 0 mismatches for both images. That includes the
  incentive suites (admin 668, claim 807 and sync 222 cases). The five incentive error-order controls in `negative/`
  agree 5/5 for both images, each run in a fresh VM.
- **Still open:** 2 windows are unmatched: `0x351a8 0x4c750`. Whole-ELF identity is still false, both source-only and
  with the layout layer.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

Against the parent archive, 1 file is modified (`state/volume_accumulator.rs`); none are added or removed. The lane patch
was made on union-777. The file is identical in union-777 and union-778, so it applies unchanged.

- **`0x6db20` `GlobalVolumeAccumulator::update_token_incentives`** (lane fz-A-vol-r3-01, which builds on the fz-A-vol-r2
  partial):
  - `update_token_supply` becomes a dispatcher. Before the start time it returns
    `set_token_supply_before_start(day_number, token_supply_per_day)`. Otherwise it returns
    `err!(SupplyUpdateForFinishedRange)` when `current_timestamp > self.end_time` (error line 251), and else
    `set_token_supply_after_start(day_number, token_supply_per_day, current_timestamp)`.
  - the two helpers hold the code of the former single path. Before the start time, one day (with the
    `DayIndexAfterEndIndex` check) or days `0..=end_day` are set. After the start time, `current_day` is computed with the
    same `.expect`, then one day (with the `DayIndexAfterEndIndex` and `DayInActiveRange` checks) or days
    `current_day..=end_day` are set. The error condition is unchanged: an error exactly when now >= start_time and
    now > end_time.
  - in `update_time_range`, `let next_day = current_day + 1;` is computed right after `end_day` instead of inside the
    later `for` range. `current_day` comes from a day index, so the addition cannot overflow, and the loop covers the same
    days.
  - in `update_token_incentives`, `if token_supply_per_day != 0 { self.update_token_supply(..)?; }` replaces
    `> 0` (the same test for a `u64`).

The checks, error codes and lines, panics, events and store order are the same, and `update_token_incentives` is
normalized-equal to the original as a whole function. The incentive suites and the error-order controls re-check the
behavior.

The composite was measured natively against the union-778 frontier (zero normalized and zero raw losses), then rebuilt
twice with the Linux recipe.

## Positioning devices (all of them, this step)

- **fz-A-vol-r3-01:** comment-only `//` lines in `state/volume_accumulator.rs`, as in the fz-A-vol-r2 partial. They pin
  the error lines 251, 263, 291, 292, 313, 327, 329, 331 and 352 and the panic sites 271, 285 and 300 to the original
  lines. The existing padding is rearranged: the file has 161 comment-only lines, against 164 in the parent. It goes
  from 391 to 392 lines net. The last hunk adds a blank line before the final `Ok(())` of `update_token_incentives`,
  below every pinned line. There is no `#[inline]` attribute and no file move.

Devices from earlier steps are listed in the parent packets. `source-changes.json` has per-file counts of blank, comment,
doc and `#[inline]` lines.

## Layout layer (`layout/`, mega-run rule 4b)

**`layout/ordered.ld` is generated from the original deployed program's layout. It is not evidence of historical build
provenance.** The method is the same as in the parent:

1. `tools/lbuild-raw.sh` builds the root crate through `lwrap-lin.sh`. The output is byte-identical to the source-only
   build, and the link map is saved.
2. `tools/lay.py --mode order` writes the order: `.text` input sections in original window order, `.rodata` and
   `.data.rel.ro` atoms in bound original-address order, no padding, and no address assignments.
3. The program is relinked with that script.

`verify.py` regenerates `ordered.ld` from the source-only build plus the saved link map and requires the same bytes.

## Builds, runtime, verify

- **Builds:** `builds/a`, `builds/b`, `layout/builds/a` and `layout/builds/b` use the parent recipe: the pinned
  `solana-verifiable-build` image with the recorded mounts and cargo command (`tools/lbuild.sh`, `tools/lbuild-raw.sh`).
  - Each pair is byte-identical. Only the two workspace crates recompile.
  - The existing `admin_update_token_incentives` stack-frame diagnostic remains, as in the parent, so this is not a
    warning-free build. There is no `Stack offset` warning.
- **Runtime (reported):** `runtime/` and `layout/runtime/` each report 25 suites, **17,462 cases, 35,074 transactions,
  35,418 signatures and 0 mismatches**. Each summary is bound to its stripped image and to the repository harness
  hashes. As in the parent, the per-case receipts are not included, so the verifier checks only the reported totals and
  input hashes.
- **Error-order controls (`negative/`):** the PR434/PR464/PR494/PR500/PR525 producer and fixture, byte-identical, re-run for
  both images with `PUMP_AMM_FRESH_VM=1`. All 5 pairs agree for each image (20 signed executions). `negative/verify.py`
  checks the H11 guard witness in `state/volume_accumulator.rs` in its new dispatcher form (see `negative/README.md`).

```sh
python3 -I -B research/claude-amm-union11-20261028/verify.py
python3 -I -B research/claude-amm-union11-20261028/negative/verify.py --signatures   # needs solders
python3 -I -B research/claude-amm-union11-20261028/test_verify.py
```

`verify.py` uses only the standard library. It checks:

- exact packet membership and hashes, rejecting symlinks and special files first;
- the source archive against the staged build inputs, and `source.patch` rebuilt from the parent archive;
- both build pairs;
- the source-only, layout and parent measurements, recomputed against `evidence/original/pump_amm/deployed.so`;
- the layout layer against the parent packet's layout layer (no raw loss), and its raw differences from the source-only
  image against the recorded lists;
- the regenerated `ordered.ld`;
- both reported runtime summaries against the repository harness hashes;
- the five-pair error-order record for each image.

## Limits

Still open:

- whole-ELF identity;
- 2 unmatched windows: `0x351a8 0x4c750`;
- `0x6db20` is normalized-equal but not raw-equal, in the source-only image and with the layout layer;
- the merged constant-pool order, which needs more source-order work.

Normalized equality masks address and call operands, so it is not raw identity. The positioning devices and the
generated layout reproduce original line numbers and addresses. They are not claims about the original file layout or
build process. The runtime evidence is synthetic local execution, not a whole-program equivalence proof.
