# amm-mid progress log

Lane range: original windows 0x3d828 … 0x724a0. Frontier at start of this log:
`repro/pump_amm/native-fee-cpi-recovery-20261027` (a4b978ee, 599 normalized / 125 raw / 186 unmatched;
64 unmatched windows / 166,368 bytes in range).

## Current state

- Cumulative candidate: `5e853b8419b7836af219551b3277040e584c9bae50c2222efcf8a9447337086e`
  (Linux v1.44 recipe), **600 normalized / 125 raw / 185 unmatched**, no losses.
- Cumulative source: `source.patch` (applies to frontier canonical source = maintained `programs/pump-amm`).
- Files changed (packet copies only; maintained source untouched because CI binds it to the frontier):
  - `programs/pump-amm/src/instructions/swap/trade_v2.rs` (create_sell_event, create_buy_event captures)

## Verified gains

| # | Window | Change | Linux candidate | Runtime |
| --- | --- | --- | --- | --- |
| 1 | 0x52c58 create_sell_event | capture `context.user*` before `Clock::get()?` (and same captures in create_buy_event) | 5e853b84 600/125 | trade_v2 870/0, buyback 369/0, cashback 146/0, sell events 10/0, buy events 16/0 |

## How to resume

1. Lane scratch: `SP/lanes/amm-mid/{stage,out,target,cargo-home,ir}`; tools mirrored in `tools/`.
2. Native iteration: `tools/variant.sh <name> <patch> [base-stage] [compare-measure]`
   (uses `SP/lanes/amm-mid/stage/base` = recipe-staged frontier; compare = native base 594/118).
3. IR experiments: emit `--emit=llvm-ir` for the root crate (see README), edit one function with
   `tools/irexp.py`, compile with `llc -march=sbf -mattr=+store-imm,+jmp-ext -O3 -relocation-model=pic -function-sections`,
   and compare with `tools/objcmp.py <obj> <mangled> orig <window>`.
4. Confirm with `tools/linux_build.py --source <stage> --output <dir>` (holds sbf + podman locks), measure with
   `repro/pump_amm/focused-diagnostics-20261026/measure.py`, run relevant suites with `work/test-env/bin/python`.

## Window status (range)

- matched by this lane: 0x52c58
- line-immediate-only residual (blocked without original file contents): 0x40100 0x446a0 0x448a8 0x44cc8 0x44ed0
  0x450d8 0x4bf30 0x4c138 0x4c340 0x4c548 0x57e20 0x50ca8 0x516e0 0x52070 0x61d68 0x62c40 0x63778 0x6b780 0x6ba68
  0x6bf50 0x6c328 0x6c768 0x6d128 0x6f608
- Codex in flight (skip): 0x58028 0x4efb8 0x4f1d8 0x62e68 0x6db20 0x6f3c8 0x44ab0
- next candidates (code-level, no line sites): 0x51d08 (872 vs buy_transfers 880, 6 diffs), 0x6f4b0 (344 vs
  OptionBool deserialize_reader 368), 0x5c590 / 0x5dc20 (volume accumulator close/sync), 0x6f898, 0x724a0, 0x70b60,
  0x5a570
