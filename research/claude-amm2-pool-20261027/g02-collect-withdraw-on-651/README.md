# g02 — g01 rebased onto main 651, plus collect_coin_creator_fee and withdraw handlers (PumpSwap AMM, +21 normalized)

Base: main checkpoint `repro/pump_amm/optional-context-recovery-20261027` (candidate `97bd5553c199cd24fb2d07034c365527bee5b138bf5dd7a0aa3099186aad2643`),
canonical source `repro/pump_amm/optional-context-recovery-20261027/results/canonical-source/programs/pump-amm`.

| build | normalized | raw | unmatched | candidate sha256 |
| --- | --- | --- | --- | --- |
| base (main, Linux v1.44) | 651 | 148 | 134 | `97bd5553…` |
| g01 rebased (Linux, two identical builds) | 670 | 148 | 115 | `214f22b5985413f44c841ab7df9100c03aef21bce17414a04c869ff88e0bf237` |
| **g02 (Linux v1.44, two identical builds)** | **672** | **148** | **113** | `eb7cf18a080a587de1ecc5254443ef4f80a55704649398c4969b27d434609dde` |

Windows gained vs base: 21 (0x1ecd8 0x22c80 0x22e88 0x2e260 0x2e468 0x31710 0x31918 0x31b20 0x31d28 0x31f30 0x32138 0x32340 0x32548 0x32750 0x34370 0x34578 0x34780 0x34988 0x34b90 0x34d98 0x34fa0); **0 lost** (normalized and raw) — `cmpm-vs-base.txt`.
Runtime (optional-context-recovery `replay_parallel.py`, Linux candidate): 25 suites / 17462 cases / 35074 transactions / 0 mismatches (`runtime/summary.json`, `runtime/suites.json`).

## New in g02 (beyond g01's 19 windows, which are unchanged; see ../g01-liquidity-boost-create-placement/README.md)

| window | bytes | what | kind of recovery |
| --- | --- | --- | --- |
| 0x22e88 | 4,024 | collect_coin_creator_fee handler | **code shape + module path**: signer seeds passed as statement temporaries inside the CPI call (`&[&[b"creator_vault", creator.as_ref(), &[ctx.bumps.coin_creator_vault_authority]]]` instead of `let bump` / `let seeds` living to the end of the function), file moved to the evidenced `instructions/coin_creator/collect_coin_creator_fee.rs`, 6048 check placed at line 68 |
| 0x32750 | 7,200 | withdraw handler | **code shape**: `pub use instructions::{admin, liquidity}` (handler keeps its own function), reserve reads user_base → user_quote → pool_base → pool_quote, Token-program key reference compare (`mint.to_account_info().owner == a.token_program.key`), and the boost adjustment as ONE statement `ceil_div(u128::try_from(liquidity_effective_virtual(&a.pool)?).map_err(…)?.checked_mul(…).ok_or_else(…)?, old_supply as u128)?` |

Why the withdraw/collect shapes matter (general rule, also in SP/shared/findings.md): the original keeps values as statement
temporaries. A `let` that lives to the end of the scope keeps its stack slot alive, so LLVM stack colouring assigns different r10
offsets (collect) — or lets two `Result` temporaries share one slot, which made the `ceil_div` Err block tail-merge with the
`total_virtual_quote_reserves` Err block and changed block placement (withdraw).

Also included (closer, not yet matched; no window lost):
- deposit 0x2fb38: same liquidity recipe → 7,128 B = original, 1 unequal slot pair (Box pointer load vs `__udivti3` quotient low word).
- init_boost 0x1ef90: `&a.quote_token_program.to_account_info()` + inline pool signer seeds for `utils::token::transfer_checked`,
  `emit!(event); emit_cpi!(event);` (no clone), and `let is_pool_authority = a.creator.key() == Pubkey::find_program_address(..).0;`
  (no long-lived `creator`): 3,856 B vs 3,912, ratio .39 → .96.

## Source changes
- `source.patch`: base → g02 (apply from the tree root with `patch -p1 -E`; deletes `boost_burn.rs` and `collect.rs`).
- `placement/step1-g01-rebased-on-651.patch`: base → g01-on-651 (g01's placement proofs apply unchanged; the only rebase conflict was the
  `mod boost_burn;` line next to main's new `pub use instructions::{boost, swap::trade_v2};`).
- `placement/step2-code-on-g01.patch`: g01-on-651 → g02. Every edit to an already placed file (deposit.rs, withdraw.rs, boost.rs, lib.rs)
  keeps its line count, so g01's placed Source lines are untouched.
- New file `instructions/coin_creator/collect_coin_creator_fee.rs` (+ `instructions/coin_creator/mod.rs`, `pub mod coin_creator;` in
  `instructions/mod.rs`); `lib.rs` line 30 `mod collect;` → `use instructions::coin_creator::collect_coin_creator_fee as collect;` (same line count).

### Placement framing (as repro/donation-relay/source-location-recovery)
- These source layouts reproduce measured coordinates, not the unknown historical comments, whitespace or exact source organization.
- No original executable bytes enter the compiler; no generated executable is patched.
- Token-stream proof for the newly placed file: `placement/tokproof-collect.json` (29 blank lines put the 6048 `require!` on line 68; the
  unplaced file is `placement/collect_coin_creator_fee.unplaced.rs`); `placement/verify.sh <base canonical-source root>` re-checks
  everything. Coordinate provenance: original Source record `collect_coin_creator_fee.rs:68` at text 0x233d0 (window 0x22e88).
- Placement-dependent count: of the 21 windows, 17 are placement-only (from g01), 4 need code/structure changes (0x22c80, 0x2e260 from g01;
  0x22e88 and 0x32750 here; 0x22e88 also needs the line-68 placement).

## Rebuild
```
cp -R <repo>/repro/pump_amm/optional-context-recovery-20261027/results/canonical-source/programs .
patch -p1 -E < source.patch
find programs/pump-amm/src -name '*.rs' -exec touch {} +
RECIPE=<repo>/repro/pump_amm/optional-context-recovery-20261027/workspace_recipe_v2.py LANE=pool python3 SP/shared/tools/linux_build.py --source-root . --output <out>
python3 repro/pump_amm/focused-diagnostics-20261026/measure.py --candidate <out>/candidate.so --symbols <out>/unstripped.so --output <out>/measure.json
PYTHONDONTWRITEBYTECODE=1 work/test-env/bin/python -B repro/pump_amm/optional-context-recovery-20261027/replay_parallel.py --candidate <out>/candidate.so --output <rt>
```
Files: `build-a/`, `build-b/` (build-record.json, build.log.gz), `candidate.so.gz`, `unstripped.so.gz`, `measure.json.gz`, `SHA256SUMS`,
`cmpm-vs-base.txt`, `runtime/`. Native check (macOS v1.44): base 646/139 → 667/139, the same 21 windows.
