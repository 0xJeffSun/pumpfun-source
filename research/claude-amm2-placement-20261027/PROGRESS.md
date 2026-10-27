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

## Status (12:45)
- g01 (647): Linux ×2 418c2ea3… = 684/148/101 (+37), runtime 17,462/0. PR #315.
- g02 (651 = new main, optional-context-recovery-20261027): solver rerun on 651 (+0x57e20, now placeable) + base_for_buy
  copy + legacy_sell.rs merged into instructions/swap/sell.rs (+4 closures) → Linux ×2 69979ad3… = 693/148/92 (+42 vs 651,
  0 lost), runtime 17,462/0. Pushed to the same branch (updates PR #315).
- Native ladder on 647 (base 642/139/143): whitespace only 668/139 (+26, exact prediction) → + impl-fn reorder 674/138
  (raw LOST 0x6c248 can_boost: negative control) → reorder with original-text-order keys + `base_for_buy` copy 675/139
  → + call-graph closure pairing in multi_hop_swap.rs 679/139/106; legacy sell move alone 679 → 679.

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
- 0x57e20: CLOSED in g02 (651 moved the sell_v2 body into trade_v2.rs).
- legacy sell closures: CLOSED in g02. Handler 0x49b50 / cashback 0x4c750 stay code-level (site counts differ).
- 0x123a0 (constant_product.rs:85/87): one candidate site serves two original copies (0x11e70 at 45/47 and 0x123a0)
  → needs a source duplicate (math).
- legacy buy 0x37150 0x39d80 0x39f88 0x3a190 0x3a398 0xaf3b0 0xb3460, toggles 0x1b510 0x1b7c0 0x1bb00: module moves
  done in amm-lo's packet (integrate composes; rerun solve.py afterwards).
