# g01 — liquidity closures, boost module merge, create_pool closure (PumpSwap AMM, +19 normalized)

Base: main checkpoint `repro/pump_amm/event-decoder-recovery-20261027` (candidate `0881a95dafe465623c7220fb3da84b3f9c7d9b0094d572f62487f05cbd80a07c`),
canonical source `repro/pump_amm/event-decoder-recovery-20261027/results/canonical-source/programs/pump-amm`.

| build | normalized | raw | unmatched | candidate sha256 |
| --- | --- | --- | --- | --- |
| base (main, Linux v1.44) | 647 | 148 | 138 | `0881a95d…` |
| **g01 (Linux v1.44, two identical builds)** | **666** | **148** | **119** | `1d0c282fac5db169702f774b3e586a2959b53e605e1d2094a4c778427033fe15` |

19 windows gained, **0 lost** (normalized and raw); see `cmpm-vs-base.txt`. Normalized-matched text bytes +10,232 (17 × 520 + 2 × 696).
Runtime: `replay_parallel.py` (event-decoder-recovery driver) on the g01 Linux candidate: 25 suites / 17,462 cases / 35,074 transactions / **0 mismatches**
(`runtime/summary.json`).

## Newly matched windows

| window | bytes | what | kind of recovery |
| --- | --- | --- | --- |
| 0x31710 0x31918 0x31b20 0x31d28 0x31f30 0x32138 0x32340 0x32548 | 8 × 520 | deposit error closures (deposit.rs 91/99/143/152/154/156/160/162) | placement only (amm-lo's whitespace placement, re-applied unchanged: 623 → 647 left deposit.rs untouched) |
| 0x34370 0x34578 0x34780 0x34988 0x34b90 0x34d98 0x34fa0 | 7 × 520 | withdraw error closures (withdraw.rs 98/106/150/160/162/166/170) | placement only (amm-lo, unchanged) |
| 0x1ecd8 | 696 | `calculate_virtual_quote_reserves` Truncation site at `instructions/boost.rs:22` | placement only |
| 0x2e468 | 696 | `initial_liquidity` Truncation site at `instructions/create_pool.rs:339` | placement only (+ item order: `CreatePoolEvent` moved below it, tail statements joined — whitespace) |
| 0x22c80 | 520 | boost_buy_and_burn Overflow closure at `instructions/boost.rs:258` | **module structure** (boost_burn.rs merged into the evidenced file `instructions/boost.rs`) + placement |
| 0x2e260 | 520 | create_pool TooLittlePoolTokenLiquidity closure at `instructions/create_pool.rs:290` | **code shape**: `liquidity.checked_sub(100).ok_or_else(\|\| error!(…))?` (original has a closure; candidate had an inline `require!(liquidity >= 100)` + `liquidity - 100`) + placement |

Placement-dependent windows are counted separately from code/structure recoveries: 17 depend on placement alone, 2 need a code or
module-structure change plus placement.

## Source changes (against the base canonical source; `source.patch`, apply with `patch -p1 -E` from the tree root)
1. `instructions/liquidity/{deposit,withdraw}.rs`: amm-lo's whitespace-only placement (older lane `amm-lo` @ dda784ddc, `research/claude-amm-lo-20261027`),
   re-applied verbatim (`placement/amm-lo-liquidity-placement.patch`).
2. `boost_burn.rs` → `instructions/boost.rs`: the `BoostBuyAndBurn` accounts struct, handler (`boost::buy_and_burn`, was `boost_burn::execute`) and
   `BoostBuyAndBurnEvent` move into the original module file `programs/pump-amm/src/instructions/boost.rs` (path evidenced by the original's
   Source records). `calculate_virtual_quote_reserves` is first in the file; imports merged. `lib.rs`: `mod boost_burn;` / `use boost_burn::*;`
   become blank lines (keeps lib.rs Source lines 22/23/36), the program fn calls `boost::buy_and_burn`.
3. `instructions/create_pool.rs`: the TooLittlePoolTokenLiquidity check becomes `checked_sub(100).ok_or_else(|| error!(…))?` (same behavior: error iff
   liquidity < 100, output = liquidity − 100); `CreatePoolEvent` moved below `initial_liquidity`; one `require!` and a few statements joined onto one line.
4. Whitespace-only placement (`placement/`): Source sites moved to the original coordinates — boost.rs 22, 238, 240, 245, 250, 255, 258, 273, 274, 280, 403;
   create_pool.rs 171, 177, 183, 189, 193, 198, 199, 201, 215, 217, 279, 290, 339.

### Placement framing (same as repro/donation-relay/source-location-recovery)
- These source layouts reproduce measured coordinates, not the unknown historical comments, whitespace or exact source organization.
- No original executable bytes enter the compiler; no generated executable is patched.
- Token-stream equality proof for every placed file: `placement/tokproof.json` (Rust-style lexer: comments, strings, chars, lifetimes, identifiers,
  numbers, delimiters, punctuation with joint/alone spacing), re-run with `placement/verify.sh <base canonical-source root>`; the placed
  `boost.rs`/`create_pool.rs` regenerate byte-for-byte from `placement/*.unplaced.rs` + `placement/*.json` with `placement/placeto.py`.
  (`*.unplaced.rs` = the file after the code/structure steps 2–3 and before placement; diff it against the base to see the code changes.)
- Provenance of every coordinate: `placement/coordinates-provenance.json` (each original Anchor `Source{filename,line}` record: text address of the
  line immediate, decoded with SP/shared/tools/coords.py, and the window it belongs to).

## Residual diagnosis for windows worked but not closed (see ../PROGRESS.md for the running log)
- 0x2ba60 create_pool handler (10,240 B; candidate 11,104 B, ratio .28): structurally different; error order matches (171 6041, 177 6042, 183 6049,
  189 6050, 193 6017, 198/199 6001/6002, 201/215/217 6006/6007/6022, 279 6028). Only 48 source lines fit between the :290 closure and
  `initial_liquidity` (:339), so the original handler tail (pool init, LP mint, event) is much more compact than ours.
- 0x2fb38 deposit handler: with amm-lo's near-miss changes (pub `liquidity` re-export, Token-program key reference compare, reserve read order)
  7,128 B = original, 1 unequal slot pair (pool Box pointer load vs quotient low-word load order after `__udivti3`). Variants in progress.
- 0x32750 withdraw handler: same recipe → 7,176 B (orig 7,200), ratio .967 (30 unequal).
- 0x1ef90 init_boost (3,912 B): passing `&a.quote_token_program.to_account_info()` and inline signer seeds to `utils::token::transfer_checked`
  (plus `let clock = Clock::get()?`) gives 4,112 B, ratio .39 → .52, with every call at the original's relative offset up to the event;
  remaining: the event is built through temporaries and cloned for `emit!` (original: one in-place event passed to both `Event::data` calls).
- 0x1fed8 boost_buy_and_burn (11,688 B): the original calls `Pool::can_boost` (twice), two other Pool methods (orig 0x6bcd0 pool.rs:417,
  0x6c328 pool.rs:439/440), a constant_product helper (0x12310), `utils::token::transfer_checked`, and the boost harvest helper 0x74e30;
  the candidate inlines its own checked math (five closures vs one). Needs the state/pool.rs methods first.
- 0x22e88 collect_coin_creator_fee (4,024 B, same size, ratio .79): stack-slot layout only (signer seeds, bump and `&[seeds]` slots);
  the original file is `instructions/coin_creator/collect_coin_creator_fee.rs` with the 6048 check on line 68.

## Rebuild
```
# from a checkout with the base checkpoint, in an empty dir:
cp -R <repo>/repro/pump_amm/event-decoder-recovery-20261027/results/canonical-source/programs .
patch -p1 -E < source.patch          # or copy source/programs over the tree
find programs/pump-amm/src -name '*.rs' -exec touch {} +   # staging uses shutil.copy2; avoid stale cargo fingerprints
LANE=pool python3 SP/shared/tools/linux_build.py --source-root . --output <out>   # authenticated Linux v1.44 build (recipe: event-decoder-recovery workspace_recipe_v2.py)
python3 repro/pump_amm/focused-diagnostics-20261026/measure.py --candidate <out>/candidate.so --symbols <out>/unstripped.so --output <out>/measure.json
PYTHONDONTWRITEBYTECODE=1 work/test-env/bin/python -B repro/pump_amm/event-decoder-recovery-20261027/replay_parallel.py --candidate <out>/candidate.so --output <rt>
```
Files: `build-a/`, `build-b/` (build-record.json, build.log.gz), `candidate.so.gz`, `unstripped.so.gz`, `measure.json.gz`, `SHA256SUMS`,
`cmpm-vs-base.txt`, `runtime/summary.json` (driver summary line), `runtime/suites.json` (per-suite cases/mismatches/receipts).
Native check (macOS v1.44, `SP/shared/tools/native_build.sh`): base 642/139 → 661/139, the same 19 windows.
