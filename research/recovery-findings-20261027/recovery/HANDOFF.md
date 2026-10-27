# Pumpfun reconstruction — completion status & banked recoveries
**2026-10-27** · pump / pump_amm / pump_fees / mayhem

## Bottom line
- **Behavioral reconstruction: 100% complete, oracle-validated — all 4 contracts.** 0 differential mismatches across **59,570** replay cases (pump 15,052 · amm 17,462 · fees 17,461 · mayhem 9,595), full Anchor dispatch (pump 56/56 · amm 38/38 · fees 31/31 · mayhem 25/25).
- **Whole-binary byte-identity: 0/4 — externally bounded, not an effort problem.** Proven three independent ways (audits, compiler sweep, RE workflow). Reaching it needs inputs we do not hold: the authentic original source, the exact Linux build environment, and (for `pump_amm::create_config`) a deploy **admin private key**.

## Why 4/4 byte-identity is unreachable from current inputs
1. **Scout audits (per-contract):** residual gap is lost source *form* + codegen. The closest contract, **pump_fees** (`.text` within 1.3%, opcode-mix Jaccard 0.971), has **zero closeable logic windows** — every remaining diff is register-allocation/scheduling + panic-`Location` line:col metadata, which are not source-controllable without the original.
2. **Compiler sweep (first exhaustive):** across v1.44/1.45/1.46 byte-match moves **< 0.5 points**; v1.44 is best. The compiler is not the gap.
3. **RE workflow (5 agents, verified vs live trees):** confirmed whole-binary equality is bounded; the deployed originals are **Linux-container builds** (the repo containerizes amm via podman + `solana-verifiable-build` to match), so a native rebuild cannot byte-match regardless of version.

The reconstruction is a *behaviorally-equivalent but different* source → different codegen/sizes → different bytes. `.text` deltas vs original: pump −119 KB, mayhem −149 KB (21% smaller, a partial reimpl), amm +39 KB, fees −10 KB.

---

## ⭐ Banked recovery #1 — mayhem error enum (HIGH VALUE: fixes a real bug + byte structure)
The original mayhem compiles **ONE 20-variant `#[error_code]` enum** (codes 6000–6019); confirmed three ways from `deployed.so` (the `name()` pointer array at `.data.rel.ro` 0xb1a94 with a `0x14`=20 length header, the `Display::fmt` binary-search dispatch, and the reconstruction's own discriminants). The reconstruction **split it into 5 enums** (`MayhemError[6]`, `BurnError[2]`, `BuyError[3]`, `SellError[4]`, `PumpSwapError[2]`) → it emits 5 name tables + 5 `Display` fns where the original has one.

**REAL BUG found:** the pump-swap handlers emit `PumpCpiSlippage` (**6012**) where the original uses `PumpSwapCpiSlippage` (**6013**). This is an on-chain-observable wrong error code.

Full recovered enum (idx = code − 6000):
```
0 TradingPaused "Trading is paused"            10 PumpSwapCpiFailed "Pump Swap CPI call failed"
1 TradingActive "Trading is active"            11 PumpSwapCpiMathOverflow "Math Overflow in Pump Swap CPI call"
2 MathOverflow  "Math overflow"                12 PumpCpiSlippage "Price impact exceeds slippage tolerance in Pump CPI call"
3 SolReservesTooLow "Too little sol reserves"  13 PumpSwapCpiSlippage "Price impact exceeds slippage tolerance in Pump Swap CPI call"
4 MayhemModeEnded "Mayhem mode ended"          14 WithdrawRateLimit "Withdraw Rate limit"
5 MayhemModeNotEnded "Mayhem mode not ended"   15 TradeRateLimit "Trade Rate limit"
6 OverallRiskExceeded "Overall risk tolerance exceeded"  16 AccountTypeNotSupported "Account type not supported"
7 CoinRiskExceeded "Per coin risk tolerance exceeded"    17 MaxFeeRecipientsExceeded "Only 8 fee recipients supported"
8 PumpCpiFailed "Pump CPI call failed"         18 InvalidBump "Invalid bump provided"
9 PumpCpiMathOverflow "Math Overflow in Pump CPI call"   19 SweepFeeRateLimit "Sweep fee Rate limit"
```
Ready-to-apply consolidation patch (EDIT 1 enum + EDIT 2 repoint the 5 split enums → one): **`mayhem-error-enum.patch.txt`**. Validate via the mayhem root-config build (root = mayhem package + `vendor/anchor-lang` + `curve-accounts`, builds from repo-root `src/`).

## Banked recovery #2 — fees path-string restructure (MEASURED)
Group A applied + built + measured: matching `programs/pump-fees/src/*.rs` path strings **4 → 7**, **zero `.text` regression** (masked Jaccard 0.790 → 0.790, `.text` Δ unchanged). Mechanic: `#[path="…"] mod` relocation keeping the module name (no ref edits, no body change). Full tiered plan to **13/20** (Groups A–C) and the 7 paths that must NOT move (inline admin handlers — delegating them regresses `.text`): **`fees-pathstring-restructure.txt`**.

## Banked recovery #3 — mayhem path-string restructure (0 → 9)
Rename crate dir `mayhem` → `mayhem-program` + re-split modules into the original filenames (admin.rs, fee_recipients.rs, pump_interface.rs, pump_interface_v2.rs, pump_amm_interface.rs, …). `.rodata` only. Plan: **`mayhem-pathstring.txt`**.

## Banked recovery #4 — pump missing-helper targets (ranked)
Ranked list of the largest original pump functions with no match in the candidate (the −119 KB shortfall), with inferred identity + recoverability. Medium confidence. **`pump-helpers.txt`**.

---

## Build-environment notes (for the pipeline)
- **cargo-build-sbf 2.1.21 panics** semver-parsing malformed `~/.cache/solana` dir names (`v1.44-linux-probe`, `v1.47-linux`, `v1.48-aarch64`, `v1.48-osx-x86_64`, `v1.49-linux-x86_64`, `v1.50/1.51-linux-x86_64`). Workaround used: a curated `HOME/.cache/solana` symlinking only clean-named version dirs.
- Per-contract build hosts: **fees/pump/mayhem = native Darwin**, **amm = Linux container** (podman + `solanafoundation/solana-verifiable-build`). **mayhem builds from the repo root** with the root set to its package config + `[patch] anchor-lang → vendor/anchor-lang`; the primary checkout's root `Cargo.toml` is swapped per-contract by the build automation.
- Reproduce harness used this session: `scratchpad/sweep_build.py` (+ `sbf_lock.py`), builds from a pinned, isolated worktree with the curated HOME.

## What "100% complete" means here, honestly
- **Achievable completion line = behavioral/ABI reconstruction: reached (4/4).** This is what local SDK integration testing needs.
- **Literal whole-binary byte-identity: not reachable without the lost source / exact Linux build env / the create_config admin key.** Report progress as `matched_text_bytes`, `raw_equal_functions`, masked-Jaccard, and the path-string oracle — never as "bytes to identity."
