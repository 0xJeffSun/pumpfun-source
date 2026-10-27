# amm2 lane `placement` — progress / continuation notes

Systematic, re-runnable source-coordinate placement solver for the PumpSwap AMM (`pump_amm`).
SP = the amm2 session scratchpad (see LANE-RULES.md). Lane scratch: `SP/lanes/placement/out`.

## Base
- main `repro/pump_amm/event-decoder-recovery-20261027`, candidate `0881a95d…`, Linux 647/148/138.
- Native baseline of that source: 642 normalized / 139 raw / 143 unmatched (`SP/lanes/multihop/out/nb-base647`,
  inputs verified equal to the canonical source; copy in `out/native-base647-measure.json`).

## Solver (tools/, also SP/shared/tools/placement/)
`solve.py --tree <root> --symbols <unstripped.so of that tree> --output <dir> [--only-files|--exclude-files]`
= pair.py (window/site pairing, incl. call-graph pairing of identical error closures) → placer.py dry run →
reorder.py (whole-fn moves among same-type impl blocks for order-impossible sites; L sites and original
text order as keys) → placer.py (whitespace-only) → proofs (rlex token stream, whitespace-squeezed text,
item-permutation) → `placed/`, `source.patch`, `solve-report.json`. Prediction was exact on 647 (26/26, 32/32).

## Status (12:25)
- Native ladder (base 642/139/143): g01 whitespace only 668/139 (+26, exact prediction) → g02 + impl-fn reorder
  674/138 (raw LOST 0x6c248 can_boost: negative control) → g04 = reorder with original-text-order keys + `base_for_buy`
  copy 675/139 → g05 = g04 + call-graph closure pairing in multi_hop_swap.rs 679/139/106 (+37, 0 lost).
- g06 = g05 + Location-line placement (`--levels hard,loc`: split_buyback expects at :388/:391, utils/math.rs
  construct_uint! at :14; L records only). Linux A/B builds running: `out/lx-g06-{a,b}` (target/linux, target/linux2).
  Packet `g01-line-placement/` drafted from g06 (source/, source.patch verified with patch -p1, solve-report.json,
  base-for-buy-copy.patch); counts/sha/runtime placeholders to fill after Linux + replay.
- Experiment s1 (next gain): legacy_sell.rs merged into instructions/swap/sell.rs (lib.rs `use instructions::swap::sell
  as legacy_sell;` keeps every path), native build `out/nb-s1` running. Pairing caveat: original handler 0x49b50 calls 4
  family closures (:167/:179/:183/:196) but candidate `execute` has 5 (:107/:131/:136/:141/:150) → zip refused;
  the closures are byte-interchangeable, so any 4 placed on those lines suffice (manual assignment or DP).

## File selection for the first packet
Included: state/{global_config,pool,volume_accumulator}.rs, instructions/create_pool.rs, curve/{constant_product,fees}.rs,
instructions/swap/{trade_v2,sell,multi_hop_swap}.rs. Excluded (pending older-lane packets that integrate composes):
deposit.rs/withdraw.rs (amm-lo, 15 windows — the solver reproduces them), utils/transfer_fee.rs 0x74900 (amm-hi),
instructions/boost.rs 0x1ecd8 (pool lane merges boost files first).

## Residuals (647) and the move each implies
- multi_hop_swap.rs 0x446a0 0x448a8 0x44cc8 0x44ed0 0x450d8: call-graph pairing puts them on amm_hop's closures
  (cand 569/574/584/592/595 → orig 579/586/636/671/718), but amm_hop's tail (254 lines after its last site) cannot fit
  before vault_for_mint (orig 772): the original's amm_hop is shorter after 718 (curve-run code is the separate
  executor 0x45940 at 838..941). Code move → multihop lane. 0xb92c8 (941) belongs to that executor. 0x3d8d0 needs
  is_curve_hop before program_for (orig 233 < 414) — whole-fn top-level move, blocked by the same restructure.
- 0x57e20 (trade_v2.rs:913, caller sell_v2 0x56710) pairs with trade.rs:329 (`trade::execute_sell`): code must move
  into trade_v2.rs (v2 lane).
- legacy sell 0x4bf30 0x4c138 0x4c340 0x4c548 (sell.rs:167/179/183/196): legacy_sell.rs must become
  instructions/swap/sell.rs (validate_pool_v2 at 520/526 already placed there).
- 0x123a0 (constant_product.rs:85/87): one candidate site serves two original copies (0x11e70 at 45/47 and 0x123a0)
  → needs a source duplicate (math).
- legacy buy 0x37150 0x39d80 0x39f88 0x3a190 0x3a398 0xaf3b0 0xb3460, toggles 0x1b510 0x1b7c0 0x1bb00: module moves
  done in amm-lo's packet (integrate composes; rerun solve.py afterwards).
