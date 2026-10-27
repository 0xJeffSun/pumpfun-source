# Lane amm-lo progress (PumpSwap, original windows 0x2288 .. 0x3a5a0)

Continuation notes for another agent. Newest entries last.

## Setup
- Worktree: `SP/lanes/amm-lo/wt` (branch `claude/amm-lo-20261027`), SP = scratchpad root in LANE-RULES.md.
- Baseline frontier: `repro/pump_amm/native-fee-cpi-recovery-20261027`, candidate `a4b978ee…`,
  599/785 normalized, 125 raw, 186 unmatched (Linux v1.44 SBPF). My range had 65 unmatched windows.
- Native fast loop: `SP/lanes/amm-lo/out/tools/native_build.sh <src-root> <new-out-dir>`
  (macOS platform-tools v1.44, sbpf-solana-solana, frontier workspace recipe; ~20 s root rebuild).
  Native baseline = 594 normalized / 118 raw. The only normalized differences from Linux are the five
  TypeId windows 0xa9b0, 0xf8ca0, 0x1016a8, 0x10efd8, 0x111b38 (sysroot-owned); none in this range.
- Linux confirmation: `SP/lanes/amm-lo/out/tools/linux_build.py --source-root <tree> --output <dir>`
  (holds sbf + podman locks, 2 CPU / 3 GB, lane-owned clones of the frontier cargo home and target cache
  mounted at the frontier's container paths so all 732 dependency artifacts stay fresh).
- Measurement: `repro/pump_amm/focused-diagnostics-20261026/measure.py` (needs sparse dir
  `repro/pump_amm/claim-self-transfer-v144`). Diff two measurements with `out/tools/cmpm.py`.
- Codex in-flight (skip): curve math 0x11e70/0x123a0/0x13190 etc. (amm-curve-math-next), create handler
  (amm-mint-order-audit), legacy sell/pool-v2 lookup (amm-pool-v2-lookup-next), V2 trade (buyback validator),
  incentives. Codex's next integration (amm-account-fee-final, 612) already gains 0x18530, 0x1bdb0, 0x89d0.

## Gains (all confirmed by the authenticated Linux build `results/linux-set2`, candidate 03acb5d0…)
Frontier 599/125/186 -> 624/125/161 (normalized/raw/unmatched); no normalized or raw loss.
1. Admin toggles 0x1b510, 0x1b7c0, 0x1bb00: bodies moved unchanged into
   `instructions/admin/toggle_{cashback_enabled,boost,mayhem_mode}.rs`; guards on lines 21/14/17.
2. Liquidity closures 0x31710..0x32548 (8) and 0x34370..0x34fa0 (7): whitespace-only placement
   (`tools/place.py` + `tools/{deposit,withdraw}.json`; token stream verified unchanged).
3. disable 0x17960: per-field flag updates via `let global_config = &mut ctx.accounts.global_config;`
   and `emit!(event)` instead of `emit!(event.clone())`.
4. Legacy buy: `legacy_buy.rs` renamed to `instructions/swap/buy.rs` (lib.rs:
   `use instructions::swap::buy as legacy_buy;`), `get_buyback_accounts` moved in (lines 116/121),
   derive at 133, closures at 387/391/395/404 -> 0x37150, 0x39d80, 0x39f88, 0x3a190, 0x3a398 and
   (amm-hi range) 0xaf3b0.

## Status / next
- Runtime: 25-suite replay of 03acb5d0 running/complete -> see results/runtime-summary.json.
- Not closed (see README residuals): update_buyback_config 0x1c890 (stack-slot order only; file/line fix kept in
  results/update_buyback_config.rs.research), 0x22c80 boost closure (needs boost.rs+boost_burn.rs merge into
  instructions/boost.rs), create_pool 0x2e260/0x2e468 (Codex create work in flight), set_reserved_fee_recipients
  0x19138 + helpers 0x2288/0xc5d0 (original does per-recipient rent checks the reconstruction lacks).
