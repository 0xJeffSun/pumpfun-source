# amm2 lane `pool` — progress / continuation notes

Scope: PumpSwap AMM pool lifecycle windows — create_pool (0x2ba60 0x2e260 0x2e468 0xe31a0), extend_account 0x2e720,
liquidity deposit/withdraw (0x2fb38 + closures 0x31710..0x32548, 0x32750 + closures 0x34370..0x34fa0, 0x351a8),
boost (0x1ecd8 0x1ef90 0x1fed8 0x22c80), coin_creator (0x22e88 0x23e40 0x24fd8).
SP = /private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad;
lane scratch = SP/lanes/pool/out (variant trees in out/src/<v>, native builds out/nb-<v>, Linux builds out/lx-<v>).

## Base
- main `repro/pump_amm/event-decoder-recovery-20261027` (candidate 0881a95d…): Linux 647 normalized / 148 raw / 138 unmatched.
- Native build of its canonical source (out/nb-base647): 642 / 139 / 143 (5 normalized + 9 raw sysroot-only gaps, as before).
- Builds need 12 extra registry crates seeded into the lane cargo-home (see SP/shared/findings.md 12:10).

## Round 0 (restart, 11:46–)
- w3 = base647 + (1) amm-lo whitespace placement of instructions/liquidity/{deposit,withdraw}.rs (files unchanged 623→647, patch applies
  as-is), (2) boost_burn.rs merged into instructions/boost.rs (original module path; one Overflow closure placed at boost.rs:258,
  calculate_virtual_quote_reserves error at boost.rs:22, body Sources at the original 238..403), (3) create_pool.rs:
  `liquidity.checked_sub(100).ok_or_else(|| error!(TooLittlePoolTokenLiquidity))?` closure at :290 (was inline require!), handler
  Sources placed at the original 171..280, initial_liquidity error at :339 (CreatePoolEvent moved below it, tail lines joined).
  Native: 642 → 661 (+19: 0x1ecd8 0x22c80 0x2e260 0x2e468 + 15 liquidity closures), 0 lost, raw 139 → 139.
- Linux confirmation + runtime + packet g01: in progress.

## Negative controls / notes
- (none yet this round)
