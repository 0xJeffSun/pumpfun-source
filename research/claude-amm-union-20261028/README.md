# PumpSwap AMM union composite: 733 -> 755/785 normalized, 148 -> 159 raw

This packet composes, on top of the research chain head
[`research/amm-fee-value-call-recovery`](../amm-fee-value-call-recovery/README.md) (733/785, 148 raw), every
source-shape result that the parallel AMM lanes had matched outside that chain, plus the one window that only
Codex's selected checkpoint matched. It is a research packet: the maintained `programs/` tree and
`repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw | text bytes matched |
|---|---:|---:|---:|
| parent `research/amm-fee-value-call-recovery` (symbols `fe66adb9…`) | 733/785 | 148 | — |
| **this candidate** (symbols `cc9586e3…`, stripped `2b869a02…`) | **755/785** | **159** | 969,128 / 1,162,040 |

**+22 normalized windows, +11 raw, zero normalized and zero raw losses.** Whole-ELF identity is still false;
30 windows remain unmatched (listed in `measurement.json`). The plain macOS v1.44 build of the same tree measures
750/150 (it differs only in the five sysroot TypeId windows and in raw layout).

Gained windows: `0x13458 0x1c890 0x1ef90 0x1fed8 0x22e88 0x2fb38 0x32750 0x40100 0x40308 0x44ab0 0x452e0 0x51d08
0x59408 0x5a570 0x5b5b8 0x5c590 0x5dc20 0x6f3c8 0x73ef0 0x74b80 0xb92c8 0xf2ed0`.
Raw gains (byte-identical bodies): `0xf4180 0xf7918 0xf8758 0xf8d08 0xf8fb8 0xf91b0 0xf92f8 0xf9458 0xfccb0 0xfcdf8 0xfcf58`.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

Five steps, each kept only with zero normalized/raw losses against the previous one:

1. **s01** (+0x13458 +0xf2ed0, raw +11): `select_and_apply` builds the `get_fees_with_quote_mint` arguments inline;
   `DecodedTransferFee::calculate_pre_fee_amount` lives in `crates/native-transfer-fee` next to `calculate_fee`
   and `amount_before_fee` calls it instead of the SPL `TransferFee` conversion (the conversion code is gone).
2. **s02** (+7): `update_buyback_config` handler in `instructions/admin/update_buyback_config.rs`; boost
   `init_boost`/`buy_and_burn` shapes; `collect_coin_creator_fee` in `instructions/coin_creator/`; deposit/withdraw
   bodies with `pub use instructions::liquidity` (external handlers); `apply_hop_fees` as
   `select_and_apply_v2(..).map(|fees| gate_fees(fees, *context.gates))`.
3. **s03** (+6): close/sync/claim_token_incentives handler shapes, the shared non-inlined
   `GlobalVolumeAccumulator::update_user_volume_accumulator` and `end_day`, claim handlers in
   `instructions/token_incentives/claim.rs`, `sweep_fees` in `instructions/sweep_fees.rs`.
4. **s04** (+0x73ef0): the pure `supported_mint_data` scanner moves into `crates/native-transfer-fee`
   (Codex `repro/pump_amm/native-scanners-recovery-20261028`).
5. **s05** (+6): multi-hop skeleton at original lines (execute closure, `program_for`, `vault_for_mint`,
   `curve_run` closure) keeping the parent's `amm_hop` closures; `buy_transfers` last transfer as
   `if let Err(e) = .. { return Err(e); }`; `amount_before_fee` matches `*data` and `calculate_pre_fee_amount`
   takes `&self`.

Sources: amm100 lane wins (`math-r1-04`, `utilmath-r1-02/03`, `admin-r1-03`, `boost-r1-02/04`, `creatorfees-r1-01`,
`liquidity-r1-02/03`, `closures520-r1-03`, `multihop-r1-05`, `incentives-r1-02..07`, `poolstate-r1-02`), Codex's
native-scanners checkpoint, and mega-run lanes `mg-A-4`, `mg-A-6`, `mg-A-7`. No reachable error, check, event, CPI
or account constraint was added or removed. One unreachable path changed form: the multi-hop route direction is
read with `sell.ok_or_else(|| error!(NotEnoughRemainingAccounts))?` (the original's closure at
`multi_hop_swap.rs:307`) where the parent had `sell.unwrap()`; `sell` is always set because the route is
required to be non-empty.

### Behavior fix found by the runtime replay

The first full replay of the s04 tree failed `incentives_claim` cases 254/255 (end_time < start_time): the original
panics with `end_time should be bigger than start_time`, the candidate claimed successfully. The lane version of
`update_user_volume_accumulator` evaluated `end_day()` only after `last_update_day < current_day`. The final tree
evaluates `self.end_day()` first (one condition moved within the same `if`, line-neutral), which is the order the
parent's claim path already had. All 807 claim cases then agree.

## Positioning devices (all of them)

Source-line numbers of `error!`/`require!` sites are part of the normalized bytes, so some moves exist only to put
code on its original line. Every such device in this composite:

- **File moves to the original error-origin paths:** `instructions/admin/update_buyback_config.rs`,
  `instructions/coin_creator/collect_coin_creator_fee.rs`, `instructions/sweep_fees.rs`,
  `instructions/token_incentives/claim.rs` (from `collect.rs`, `sweep.rs`, `cashback.rs`, lib.rs/incentives.rs).
- **Blank lines:** before the `update_buyback_config` handler (err! on line 40); in place of the removed SPL
  conversion in `utils/transfer_fee.rs` and of moved code in `lib.rs`; two after `apply_hop_fees`; two removed
  after `select_and_apply`; inside `amm_hop` (as in the parent).
- **Comment / doc-comment lines:** the lanes' rustfmt/doc layouts in `deposit.rs`, `withdraw.rs`, `boost.rs`,
  `sweep_fees.rs`, `claim.rs`, `state/volume_accumulator.rs` (keeps `#[account]` Location lines 8/25), `//` lines
  inside `curve_run`.
- **Joined lines:** the `amm_hop` tail after line 719 is written on 46 long lines (formatting only, same tokens) so
  `vault_for_mint` stays at original line 768.
- **Inline attributes:** new `#[inline(never)]` on `vault_for_mint` and `curve_run` (collect-C multi-hop layout),
  on the native `calculate_pre_fee_amount` (as on the parent's native `calculate_fee`) and on `claim_cashback`;
  `amm_hop` and `apply_hop_fees` keep the parent's. No `#[inline(always)]` was added.

`source-changes.json` lists per changed file the blank/comment/doc/inline/long-line counts before and after.

## Builds (`builds/`)

`tools/lbuild.sh` runs the parent packet's recorded Linux recipe: the same pinned
`solanafoundation/solana-verifiable-build@sha256:6c73adc7…` image, container mount points, environment and
`cargo build --release --target sbpf-solana-solana --locked --offline` command, with the staged workspace mounted
read-only. Run on the parent's own source it reproduces the parent's artifacts exactly (`builds/recipe.json`,
`parent_reproduction`). Two builds of this tree (`builds/a`, `builds/b`) are byte-identical; each recompiled only
the two workspace crates (181 dependency crates fresh). The pre-existing `admin_update_token_incentives`
stack-frame diagnostic is unchanged; no new one appears.

## Runtime (`runtime/`)

The maintained 25-suite corpus, run with the unchanged replay driver (`runtime/replay_parallel.py`, sha
`0a740623…`, the driver used for the c726 composition) against `builds/a/candidate.so`:
**25 suites, 17,462 cases, 35,074 transactions, 35,418 verified signatures, 0 mismatches.** `runtime/suites.json`
holds each suite's receipt and transaction-sidecar sha256; the receipts themselves (340 MB) are not included.

## Verify

```sh
python3 -I -B research/claude-amm-union-20261028/verify.py
```

Standard library only; it checks exact packet membership and hashes, rebuilds `source.patch` from the parent
packet's archive, checks both builds, recomputes the window measurement of this candidate and of the parent
packet's candidate against `evidence/original/pump_amm/deployed.so`, and checks the runtime summary against the
repository's harness, observer and driver hashes. It does not rebuild or execute the program.

To rebuild: extract `sources/candidate.tar.gz` and run `tools/lbuild.sh <dir> <out>` with podman, the v1.44 SDK
and an offline cargo home at the paths named in the script.

## Limits

Whole-ELF identity, the 30 unmatched windows (largest: legacy buy/sell handlers, trade_v2 handlers, `amm_hop`,
`curve_run`, `execute`, create_pool) and the historical source organization remain open. The positioning devices
above reproduce original line numbers; they are not claims about the original file layout.
