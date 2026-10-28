# PumpSwap AMM union composite 3: 759 -> 763/785 normalized, plus a labeled layout layer (raw 172)

Follow-up to [`research/claude-amm-union2-20261028`](../claude-amm-union2-20261028/README.md) (merged as #430,
Linux 759/785, 159 raw). It composes four more mega-run lane windows. It also adds, as a **separately labeled
layout layer**, a linker order that is **generated from the original program's layout**.

This is a research packet: the maintained `programs/` tree and `repro/status.json` are untouched. **Both compiled variants retain a confirmed incentive error-order regression and are ineligible for maintained-source promotion.** The results below qualify a static research experiment, not strict conformance.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union2-20261028` (symbols `5c02eed7…`) | 759/785 | 159 |
| **this candidate, source only** (symbols `5d1bac28…`, stripped `5a032d6d…`) | **763/785** | **160** |
| this candidate **+ generated layout layer** (stripped `3c0357f9…`) | 763/785 | 172 |

- **Source-only result:** +4 normalized windows (`0x16128 0x26da8 0x28dd0 0xf31d8`) and +1 raw (`0xf31d8`), with
  zero normalized and zero raw losses.
- **Against the research chain head** `research/amm-fee-value-call-recovery` (733/148): +30 normalized, +12 raw
  (source only).
- **Native macOS build:** 758/151 for the same tree.
- **Still open:** 22 windows are unmatched (`measurement.json`), and whole-ELF identity is still false.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

- **s10 `0x16128`** `admin_update_token_incentives` handler (lane mg-A-sp2). It now lives in
  `instructions/admin/admin_update_token_incentives.rs`, and `admin_cto_pool` moved to
  `instructions/admin/admin_cto_pool.rs`. The update call takes `&mint.key()` as a by-reference temporary.
- **s11 `0xf31d8`** (normalized and raw; lane mg-A-7). The Token-2022 TLV decoder `decode_transfer_fees` moves into
  `crates/native-transfer-fee` and is re-exported on the existing line 6 of `utils/transfer_fee.rs`. It keeps the
  same checks in the same order.
- **s12 `0x26da8 0x28dd0`** legacy and v2 `transfer_creator_fees_to_pump` (lane mg-A-sp4). Both move from
  `src/transfer_creator.rs` to `instructions/coin_creator/transfer_creator_fees_to_pump.rs` as external functions;
  `lib.rs` line 31 is changed in place.

The four additional local-window gains do not establish full behavioral conformance. Both variants retain the inherited failure documented below.

## Layout layer (`layout/`, mega-run rule 4b)

The project already ships generated linker orders: the Fees whole-ELF identity (#392) used one, and Codex's
qualified Mayhem builds ship an `ordered.ld`. This packet applies the same method to the AMM. Say it plainly:
**`layout/ordered.ld` is generated from the original deployed program's layout. It is not evidence of historical
build provenance.**

The layer is built in three passes:

1. `tools/lbuild-raw.sh` builds the root crate with
   `cargo rustc ... -- -C linker=lwrap-lin.sh`. The wrapper saves the link inputs and the link map
   (`layout/link-map.txt.gz`). Without a script, this build is byte-identical to the source-only build.
2. `tools/lay.py --mode order` (copied from lane mg-A-raw) binds candidate functions and data atoms to original
   windows and addresses. It writes `.text` input sections in original window order and `.rodata`/`.data.rel.ro`
   atoms in bound original-address order. It adds no padding and no address assignments.
3. The second build links with that script.

Results of the layer:

- The normalized set is unchanged (763), and raw goes 160 -> 172 with no raw loss. The raw gains are
  `0x8740 0xf2d60 0xf2ed0 0x1011c8 0x101238 0x101268 0x101290 0x10c850 0x10c948 0x10c9b8 0x10c9e8 0x10dcb0`.
- More raw matches need `.text` size parity first: every unmatched window still shifts all later addresses.
- `verify.py` regenerates `ordered.ld` from the source-only build plus the saved link map and requires the same
  bytes.

## Positioning devices (all of them, this step)

- **s10:** file moves to the original `instructions/admin/` paths. The `lib.rs` line-8 `use` and the two handler
  lines change in place, so the line count is unchanged; `admin/mod.rs` gains two `pub mod` lines.
- **s11:** none; the re-export sits on an existing line.
- **s12:** file move to the original error-origin path, with error sites on lines 88 and 239. `lib.rs` line 31 is
  changed in place.

Devices from earlier steps are listed in the parent packets. `source-changes.json` has per-file layout counts.

## Builds, runtime, verify

- **Builds:** the source-only builds (`builds/a`, `builds/b`) use the parent recipe: the pinned
  `solana-verifiable-build` image with the recorded mounts and cargo command. The two layout builds
  (`layout/builds/a`, `layout/builds/b`) use the same image, plus the linker wrapper and script. Each pair is
  byte-identical, and only the workspace crates recompile.
- **Reported runtime:** each retained 25-suite summary reports **17,462 cases, 35,074 transactions, 35,418 signatures and 0 mismatches** (`runtime/`, `layout/runtime/`). Neither directory includes the underlying per-case receipts or transaction sidecars. The saved verifier checks those reported totals and input hashes; it cannot independently recount or cryptographically verify those executions. These summaries are not a blanket runtime pass.

### Confirmed error-order failure in both variants

`negative/` retains five freshly executed original/candidate pairs for **each** current image: source-only `5a032d6d…` and layout `3c0357f9…`. Each has **2 mismatches in 5 pairs**; together these are **20 signed executions**, not a new full 1,730-case replay. For positive supply, disabled range updates, and `stored_end < now < stored_start`, the original returns `ProgramFailedToComplete` while either candidate returns 6035 (`SupplyUpdateForFinishedRange`). Three active/equality/zero-supply controls per variant agree. These are synthetic AMM-owned schedules, with no live-state reachability claim.

Both variants retain the unconditional finished-range guard. The original first branches on `now < stored_start`; the maintained H11 lineage already gates its finished-range check with `now >= stored_start`. The parent PR430 records the same failure, but its receipts are not relabeled as evidence for these new images. Current signed transactions and per-execution executable-account hashes are retained here. No compiled source or ELF was altered for this disclosure.

```sh
python3 -I -B research/claude-amm-union3-20261028/verify.py
python3 -I -B research/claude-amm-union3-20261028/negative/verify.py --signatures
python3 -I -B research/claude-amm-union3-20261028/test_verify.py
```

`verify.py` uses the standard library only. Its PASS means the static record and admitted negative results verify, not that either candidate conforms. The separate signature command requires `solders`. It checks:

- exact packet membership and hashes;
- `source.patch`, rebuilt from the parent archive;
- both build pairs;
- the source-only and layout measurements, plus the parent's measurement, recomputed against
  `evidence/original/pump_amm/deployed.so`;
- the regenerated `ordered.ld`;
- the documented `tools/lay.py --predict` path, repaired to use the shipped two-input measurement API and tested to preserve the generated order and data bindings;
- both reported runtime summaries against the repository harness hashes;
- the current five-pair negative record for each image.

Both verifier entry points reject symlinks and special files before reading packet metadata and require exact packet membership and hashes. Tests cover root-manifest and measurement symlinks/FIFOs with all file-content reads forbidden.

## Limits

Still open:

- whole-ELF identity;
- 22 unmatched windows (cashback helpers, `amm_hop`, `curve_run`, `execute`, trade_v2 handlers, create_pool,
  `buy_exact_quote_in`, admin and fee helpers);
- the merged constant-pool order, which needs source-order work.

The positioning devices and the generated layout reproduce original line numbers and addresses. They are not
claims about the original file layout or build process.
