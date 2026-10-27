# Main Pump — lane pump-hi (original windows 0x101170 … 0x1ab9b8)

Review status: this is an unpromoted historical-baseline proposal. The candidate ELF is not included in this packet, so this review cannot independently recompute its claimed function matches. Rebase and full artifact validation are still required.

Isolated, ordinary-source recovery for the upper third of the main Pump program, measured on
top of the newest published frontier, [Round23](../../repro/pump/main-contract-round23-20261027/README.md).
**Whole-ELF identity remains false.** This packet does not edit `programs/pump` (the CI guard pins
it to the Round23 package). The changed source is shipped here as a full file plus `source.patch`.
`tools/apply_lane_changes.py` applies the same change, idempotently, to any later round.

## Result

| | normalized | raw | unmatched | matched text bytes |
|---|---:|---:|---:|---:|
| Round23 frontier (reproduced: `d9fd8f1e…` / `d5a80618…`) | 712 | 123 | 323 | 852,944 |
| Round23 + this lane (`07f3f871…` / `5b65eade…`) | **714** | 123 | 321 | **864,904** |

Two windows are newly matched. There are **no normalized or raw losses** (`evidence/measurements.json`).

| original window | bytes | body | source cause (evidence) |
|---|---:|---|---|
| `0x11b758` | 8,696 | Anchor `entry` / instruction dispatcher | `#[program]` handler order. The original compares the 56 `sha256("global:<name>")[..8]` discriminators in a different order. That order is read from the original dispatcher and the handler items are permuted to match. Every other dispatcher instruction was already identical. |
| `0x1348c0` | 3,264 | `update_global_authority` handler | The original assigns `global.authority` before building the event. The `#[program]` entry passes its `Context` by value to an ordinary handler fn, so the bump and accounts pointer load at entry as in the original. |

Measured on Round21 first (709 → 710, same two gains, no losses), then re-applied and re-measured on Round23.

## Changed files

- `programs/pump/src/lib.rs` only. The full file is at `source/src/lib.rs` (sha256 `499967898d50…`), with a diff against Round23 `primary/src/lib.rs` in `source.patch`.
  1. The `#[program] pub mod pump_recovered` items are reordered (text unchanged, one blank separator line dropped).
  2. `update_global_authority` delegates to `fn update_global_authority_handler(ctx)`, appended at end of file, which does the assignment, then the event, `emit!` and `emit_cpi!`.

Behavior is unchanged: dispatch is an exact-match on distinct discriminators, and the handler emits the same event fields.

## Builds and measurement

- Recipe: the Round23 archived builder (`inputs/scripts/pump_build_verified.py`, v1.44 SDK, workspace layout, physical-source wrapper) with an external-only dependency cache. The cache is private to this lane and was populated by a cache-miss reproduction of the frontier. Every build ran under the shared slot lock.
- `evidence/builds/r23-base` reproduces both published Round23 ELF hashes.
- `evidence/builds/r23-gain` (trial copy) and `evidence/builds/r23-gain-maintained` (same source in the maintained layout) produced identical `candidate.so` `07f3f871ed8027c8b10f9c9c77369e565af72dc974814924c18b76059fc249bd` and `unstripped.so` `5b65eade056826eed16c14e356a4a13be53d9fbe52349e790f04cfc0f0282ca9`.
- `tools/measure.py` reimplements the frontier inventory exactly, reusing the packet's `normalize`/`body` and bucketing candidate symbols by (length, sha256(normalized)). It reproduces 705/120/845,272 for Round20 and 712/123/852,944 for Round23. `evidence/measure-final.json.gz` is the full per-window inventory of the final candidate.

## Runtime differential

See `RUNTIME.md` (public 44-suite captured-loader corpus, original vs candidate, run with `tools/run_suites.py`, which mirrors `scripts/pump_validate_parallel.py` per suite).

## Residual diagnosis for windows examined but not closed

- **30 source-coordinate-only windows (51,376 bytes)** differ only in `error!` Source line and/or filename-length immediates. The original-vs-candidate file and line for each is in `evidence/coordinate-only-residuals.json`. Examples: SellV3 init closure `trade_v3.rs:38` vs 7; `#[program]`/IDL handlers `lib.rs:90` vs 66; toggles `lib.rs:114/121/149`; Global `#[account]` `lib.rs:1815`; Initialize/Create/Buy init closures `lib.rs:2778/2811/2871`; Volume accumulators `token_incentives/volume_accumulator.rs:8/19`; 15 error closures at `lib.rs:268…1037`. The repository bar forbids line padding and fabricated coordinates, so these stay open until the original file organization is recovered without filler.
- `0x180cc0` / `0x192c20` are `anchor_spl::token_2022::burn` / `spl_token_2022::instruction::burn` (tag 8, account/mint argument order), reached only from the migrate LP-burn helpers `0x48e10` / `0x55d30`. They were left to Codex `parallel-main-migration-burn`, which delivered them, and Round23 now matches both.
- `0x137fc0` `mayhem_virtual_params::execute`: the accounts-struct layout differs (original field offsets 528…584 and 1672 vs candidate 480…616 and 1016), and the original calls an unmatched `sync_virtual_quote_reserves` counterpart `0xa23f0`. This needs context-layout recovery.
- `0x12ba48` `__global::migrate_v2`: the original `MigrateV2` accounts value is 274+ bytes with inline `AccountInfo` Rc drops, versus 192 bytes in the candidate. Its handler `0x49888` and LP helpers are in Codex's migration lanes.
- `0x131128` / `0x1316e8` `__global::distribute_creator_fees(_v2)`: the accounts value is 488 vs 448 bytes (one more inline `AccountInfo`), and `try_accounts` `0xc1d58` is unmatched. This is context work.
- `0x10a0e0 … 0x11ad10` (16 windows): generated CPI clients (`invoke_signed` builders, `to_account_metas` / `to_account_infos` for 7–18 accounts). They are called from admin_cto (`0x22a10`), the migrate helpers (`0x43ea0`, `0x45fa0`, `0x502f0`, `0x52660`) and `0x8a530`. The candidate hand-writes these CPIs. Recovering them needs the generated-client form for each target instruction.
- `0x1091b0` / `0x1156f0` (+ deserializers `0x109488` / `0x1159d8`): `try_deserialize` for two declared external accounts (12-char and `FeeConfig` names) at `lib.rs:83/84`, consistent with `declare_program!` invocations there. The wrappers are coordinate-bound.
- `0x188cc8`, `0x19a1a0`, `0x1a8e28`, `0x1ab9b8` (56 bytes each): `type_id` bodies whose 128-bit TypeId constants differ (crate/sysroot hashing).

## Reproduce

```sh
python research/claude-pump-hi-20261027/reproduce.py --registry-home ~/.cargo --output work/pump-hi-reproduce
# optional: --dependency-cache <verified external-only cache dir>
python research/claude-pump-hi-20261027/tools/apply_lane_changes.py --source-directory <crate dir of a later round>
```

`tools/` also holds the triage, diff and Codex-coordination scanners used here: `triage.py`, `sbfdiff.py`, `slotdiff.py`, `ident.py`, `coordinates.py`, `codex_scan.py`. See `PROGRESS.md` for the running log and negative controls.
