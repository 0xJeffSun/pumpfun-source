# g02 — placement solver rerun on 651 + legacy sell module path (PumpSwap AMM)

Base: main checkpoint `repro/pump_amm/optional-context-recovery-20261027`, candidate
`97bd5553c199cd24…` (Linux v1.44: 651 normalized / 148 raw / 134 unmatched). This packet supersedes g01 (which was
built on 647): it is g01's transformation re-derived by the solver on 651, plus five more windows.

| build | normalized | raw | unmatched | candidate sha256 |
| --- | --- | --- | --- | --- |
| base, Linux (checkpoint measurement) | 651 | 148 | 134 | 97bd5553… |
| **g02, Linux ×2** (`build-a/`, `build-b/`, identical) | **693** | **148** | **92** | `69979ad372c77c27f8c81f4443e000b3cf9ed17bd1db7cbba48d6ab20a16355c` |

Unstripped `8103d8f1a6ae22041254007a271244700def3a5f8578ca99e3682e19c69f2b96`. No normalized or raw window lost
(`cmpm.txt`). Matched text bytes 816,800 → 863,328 (+46,528). Runtime: full 25-suite replay
(`replay_parallel.py` of the 651 checkpoint), 17,462 cases / 35,074 transactions, 0 mismatches (`runtime-summary.json`).
Program-crate Location records exact: 20 → 31 of 38.

## Newly matched windows (42)
0x11e70 0x123a0 0x12840 0x12b08 0x13190 0x13d30 0x2e468 0x3d8d0 0x446a0 0x448a8 0x44cc8 0x44ed0 0x450d8 0x4bf30 0x4c138
0x4c340 0x4c548 0x4ea90 0x4efb8 0x4f1d8 0x4ff18 0x50ca8 0x516e0 0x52070 0x57e20 0x61630 0x61898 0x61b00 0x61d68 0x62688
0x62c40 0x62e68 0x63778 0x6b780 0x6ba68 0x6bcd0 0x6bf50 0x6c328 0x6c768 0x6d128 0xd44e0 0xd4f90

Beyond g01's 37: `0x57e20` (trade_v2.rs:913 — placeable on 651 because the checkpoint moved the sell_v2 body into
trade_v2.rs) and the legacy sell error closures `0x4bf30 0x4c138 0x4c340 0x4c548` (sell.rs:167/179/183/196).

## Changes (`source.patch`, git-style, `git apply` on the checkpoint's canonical source reproduces the built tree)
1. `tools/solve.py` on the 651 canonical source + 651 unstripped build, `--only-files` = g01's ten files
   (`solve-report.json`): whitespace-only placement, impl-fn reorder of global_config.rs / pool.rs (original lines +
   original text order), Location-record lines. 37 predicted, 37 built.
2. `base-for-buy-copy.patch` (as in g01): `base_for_quote` calls its own `#[inline(never)] base_for_buy` copy (0x123a0).
3. Legacy sell module path: the original's legacy sell handler, its closures and `validate_pool_v2` all live in
   `instructions/swap/sell.rs` (path strings; validate_pool_v2 at :520/:526 below the handler). `legacy_sell.rs` is merged
   into `instructions/swap/sell.rs` above validate_pool_v2 and deleted; lib.rs `mod legacy_sell;` becomes
   `use instructions::swap::sell as legacy_sell;` so every existing path (`legacy_sell::…`, `crate::legacy_sell::…`, the
   `use legacy_sell::*` glob that Anchor's `#[program]` needs) still resolves. Native: 679 → 679 (0 lost) before placement.
   Then `solve.py --tree <moved tree> --symbols <its unstripped build> --only-files instructions/swap/sell.rs`
   (`solve-report-sell.json`): the four closures are paired through the call graph (original caller 0x49b50 ↔ candidate
   `sell`, file-aware votes) and, because the candidate's `execute` has five identical closures for the original's
   four, by an order-preserving subset that best matches the original line gaps (:131/:136/:141/:150 →
   :167/:179/:183/:196; the members are byte-interchangeable, so any placed subset matches the same four windows).

## Rebuild
```
B=repro/pump_amm/optional-context-recovery-20261027/results
cp -R $B/canonical-source /tmp/g02 && (cd /tmp/g02 && git init -q && git apply .../g02-rebase-651-legacy-sell/source.patch)
LANE=<lane> python3 SP/shared/tools/linux_build.py --source-root /tmp/g02 --output <dir>
python3 repro/pump_amm/focused-diagnostics-20261026/measure.py --candidate <dir>/candidate.so --symbols <dir>/unstripped.so --output m.json
# derivation: solve.py (step 1) -> base-for-buy-copy.patch -> legacy sell merge (step 3) -> build -> solve.py on sell.rs
```

## Residuals
As in g01 (`../g01-line-placement/README.md`), minus 0x57e20 and the legacy sell closures. The legacy sell handler
0x49b50 (S :101/:110/:171/:189) and its cashback 0x4c750 (S :378..:502, L :439/:440) remain code-level: the candidate
handler has 5 direct sites + 5 closures where the original has 4 + 4, and cashback has 8 sites for the original's 10.
After a code fix there, rerun `solve.py --only-files instructions/swap/sell.rs`.
