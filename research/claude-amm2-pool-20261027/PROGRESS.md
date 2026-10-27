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
- **g01 banked**: Linux ×2 identical (`1d0c282f…`) 647/148/138 → 666/148/119, 0 lost; runtime 25 suites / 17,462 / 0 mismatches.
  Source tree for further work: SP/lanes/pool/out/src/w3 (== g01 source).

## Work in flight / next (all on top of w3 unless noted)
- deposit 0x2fb38: e1 (= w2 + withdraw recipe) has deposit 7,128 B with ONE swapped load pair (orig loads `a.pool` Box ptr `[r8+0]`
  before the `__udivti3` quotient low word `[r10-832]`). MachineSink argument: the original's box-ptr load must sit in the udiv block
  BEFORE the lo load (sunk order is preserved). Variants: d5 (receiver-first: try_from inside checked_add arg), d7 (`let pool: &mut Pool
  = &mut a.pool;` at line 157) queued. If neither: LLVM-IR experiment (amm-mid tools/native_ir.sh).
- withdraw 0x32750: e1 recipe (pub `liquidity` re-export + reserve read order user_base,user_quote,pool_base,pool_quote + Token key ref
  compare) → 7,176 B, ratio .967, 30 unequal: remaining = block placement of the line-160 try_from error block (candidate lays it out as
  fallthrough after `jsgt r2,-1`; original jumps to it later) and the ceil_div `?` Err block (candidate jumps back to a shared block),
  plus ceil_div result slot (-208 vs -608).
- init_boost 0x1ef90: b2 (`&a.quote_token_program.to_account_info()` + inline seeds + `let clock = Clock::get()?`) 4,112 B ratio .52, call
  skeleton identical; b3/b4 = b1/b2 + `emit!(event)` without clone (original passes the same event to both Event::data calls).
- collect 0x22e88: frame layout only (see g01 README).
- boost_buy_and_burn 0x1fed8 / create_pool 0x2ba60 / extend_account 0x2e720 / 0xe31a0: structural (see g01 README residuals).

## Negative controls / notes
- d3: `change.checked_add(a.pool.virtual_quote_reserves)` (swapped operands) → deposit 12 positional diffs (worse than 2).
- b2 (init_boost): moving the timestamp into `let clock = Clock::get()?` keeps the event built through temporaries (not in place).
- Cancelled (not run, low value): d1 `let pool = &mut a.pool` (no Box deref), d2 `let reserves = vqr` before try_from, d4 pool binding
  for the whole lp_supply/boost block, e2 key-compare without read order.
- Build hygiene: recipe staging uses shutil.copy2 and APFS `cp -R` clones keep mtimes → touch sources before every build (findings.md).
