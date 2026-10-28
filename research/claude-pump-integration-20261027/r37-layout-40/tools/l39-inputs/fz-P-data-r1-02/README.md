# fz-P-data-r1-02: log parity on L38 (all 17 filename-only differences, 7 panic coordinates, 2 sell coordinates)

Cumulative: = fz-P-data-r1-01 (11 panic Location records on the original line:col) + the code side of the 17 filename-only
log differences + the two v3-sell AnchorError coordinates. Base `W/base/L38` (1018/1035, raw 168; layout 293; unstripped 6cf9da7f).

Result: **1018/1035 normalized, 168 raw source-only, 0 normalized / 0 raw losses**, runtime valid, no stack warnings
(68 warnings; the set is L38's minus the dead-code warning of the removed `net_quote`). Layout check (pgen ordered.ld regenerated
for this exact tree, link-only relink): 1018 / raw 293 (= the L38+layout raw set, 0 losses), raw-ready **997 -> 1002 / 1018**
(+0x18678 +0x34558 +0x567d8 +0x7bfd8 from -01, +0x89ec8 `fee_math::get_fees` here: its merged constant pieces now sit in the
original order because the sell and hop reach them through get_fees as the original does; merge_order 14 -> 13 windows, cst4 shards
differing 9 -> 8).
Panic Locations (raw-r2 `locs.py`): 368 equal / 0 differing. `.text` 13,080 B smaller (candidate-only helpers removed).
Synthetic layout: yes (line-neutral; removed helpers become blank / `// layout-pad` lines; every Source site keeps its line
except the two v3-sell sites moved to the original's lines).

## What changed (beyond -01)
1. **v3 sell fee path** (`trade_v3.rs`, `trade::sell`, unmatched 0x14a8a8): the private `read_config` + `selected` + `fee` path is
   replaced by `let fees=v3_trade_fees(a,quote)?;` - the helper the v3 buys already use (`fee_math::get_fees` ->
   `calculate_fee_tier`, `fee`), which is where the original's log text puts these errors: `util/fee.rs:34` Truncation (12 cases),
   `:162` FeeTiersEmpty (1), `:183` FeeConfigTooShort (1). Same checks in the same order: market cap, length >= 2512, tier choice
   (SOL/WSOL/second SOL quote -> fee_tiers; USDC -> stable tiers only above 4072 bytes; exotic flat fees only above 4096 bytes and
   when non-zero), creator-fee override, protocol fee, creator fee (0 for a default creator); the event keeps
   `(protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps)`. `read_config`'s own decode errors were unreachable (the account
   is already decoded as `Account<RouteFeeConfig>` during validation). The sell-only helpers (`selected`, `read_config`, `fee`,
   `narrow`, the already-dead `net_quote`, `QUOTE_2`, `USDC`) are removed (blank lines). `trade::sell` 8,160 -> 6,696 B (original 6,032 B).
2. **hop body** (`multi_hop_curve_swap.rs`, `swap_hop`, unmatched 0x5b3b0): `buy_budget` -> `crate::trade::net_quote_for_budget`
   (made `pub(crate)`; still byte-matched as 0x806c8), `select_fees` -> `fee_math::get_fees`, the inline reserve updates ->
   `BondingCurve::apply_buy` / `apply_sell` (same four checked operations in the same order). The original's log text names exactly
   these: `trade_v3.rs:317` BuyNotEnoughSolToCoverFees, `:326` BuySlippageBelowMinTokensOut, `lib.rs:2535` Overflow (3 cases).
   Dead `tier`, `SelectedFees`, `select_fees`, `buy_budget`, `n`, local `fee`, `QUOTE_1/2/STABLE` become blank lines.
3. **v3 sell Source sites** to the original's lines (site list of 0x14a8a8 is 1126/1127/1148): `NotEnoughTokensToSell` 1129 -> 1127
   (`check_quote` joins line 1126, `quote_decimals` line 1127), `TooLittleSolReceived` 1155 -> 1148; statement order unchanged; the
   byte-matched closures 0x87ca0 (line 1140) and 0x87ea8 (line 1155) keep their lines.

## Runtime / log parity (suites run straight from W/full with the captured loader on this candidate.so; `runtime/`)
See `runtime/logparity.txt` and `runtime/run.txt`: every suite except quote_control (its harness needs the candidate inside W/full)
plus the frozen tokenkeg two-curve fixture (20/20). Log parity vs the original (compute lines excluded):
filename-only differences **17 -> 0**; non-original volume_accumulator panic coordinates **7 -> 0**; v3 sell coordinates 2 -> 0.
Still differing: 83 coordinate-only AnchorError lines of other unmatched handlers (create_v2 / create_control / nested_create
handler sites at 56-100 vs original 541-778; admin_cto 284-332 vs 289-338).

Files: `src/`, `patch.diff` (diff -ruN W/base/L38/pump src), `unstripped.so`, `candidate.so`, `build.log`, `score.json`, `result.json`,
`layout-check/`, `runtime/`. Edit scripts: `WP/lanes/fz-P-data-r1/ed/{edit_locs,edit_v3sell,edit_hop,edit_sellsites}.py`.
