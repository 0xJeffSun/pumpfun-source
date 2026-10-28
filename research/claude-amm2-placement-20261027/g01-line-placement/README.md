# g01 — systematic source-coordinate placement (PumpSwap AMM)

Base: main checkpoint `repro/pump_amm/event-decoder-recovery-20261027`, candidate
`0881a95dafe465623c7220fb3da84b3f9c7d9b0094d572f62487f05cbd80a07c` (Linux v1.44: 647 normalized / 148 raw / 138 unmatched).

| build | normalized | raw | unmatched | candidate sha256 |
| --- | --- | --- | --- | --- |
| base, Linux (checkpoint) | 647 | 148 | 138 | 0881a95d… |
| base, native (`SP/lanes/multihop/out/nb-base647`, inputs = canonical source) | 642 | 139 | 143 | c4ab6fdd… |
| g01, native (`SP/lanes/placement/out/nb-g05` + Location lines) | 679 | 139 | 106 | — |
| **g01, Linux ×2** | **684** | **148** | **101** | `418c2ea31b4ac8e53f7bb4e565b6397dacb2793be3b5a6a808d65f26ccbc1149` |

No normalized or raw window is lost (`cmpm.txt`: checkpoint measurement → g01 Linux). Matched text bytes 810,544 → 854,472
(+43,928). Unstripped sha256 `3d6b9eddd359dc6edc8a8596c6b3fafb601ca44fb9665b6efaa2aa1ada6a4ed4`.
Runtime: full 25-suite replay (`replay_parallel.py`), 17,462 cases / 35,074 transactions, 0 mismatches (`runtime-summary.json`).

## Newly matched windows (37)
0x11e70 0x123a0 0x12840 0x12b08 0x13190 0x13d30 0x2e468 0x3d8d0 0x446a0 0x448a8 0x44cc8 0x44ed0 0x450d8 0x4ea90 0x4efb8 0x4f1d8 0x4ff18 0x50ca8 0x516e0 0x52070 0x61630 0x61898 0x61b00 0x61d68 0x62688 0x62c40 0x62e68 0x63778 0x6b780 0x6ba68 0x6bcd0 0x6bf50 0x6c328 0x6c768 0x6d128 0xd44e0 0xd4f90

By file (original path = candidate path for all of them):
- `state/global_config.rs` (8): 0x61630 :220, 0x61898 :230, 0x61b00 :243, 0x61d68 :256/:263, 0x62688 :292/:297,
  0x62c40 :306, 0x62e68 :321/:326/:336, 0x63778 :347/:357
- `state/pool.rs` (7): 0x6b780 :386, 0x6ba68 :408, 0x6bcd0 :417, 0x6bf50 :426, 0x6c328 :439/:440, 0x6c768 :458..:469, 0x6d128 :484
- `state/volume_accumulator.rs` (2): 0xd44e0 :8, 0xd4f90 :25 (`#[account]` lines)
- `instructions/swap/trade_v2.rs` (6): 0x4efb8 :103, 0x4f1d8 :138/:146, 0x4ff18 :241, 0x50ca8 :302, 0x516e0 :376/:377/:385, 0x52070 :515
- `instructions/swap/sell.rs` (1): 0x4ea90 :520/:526 (validate_pool_v2)
- `instructions/swap/multi_hop_swap.rs` (6): 0x3d8d0 :233/:239, 0x446a0 :579, 0x448a8 :586, 0x44cc8 :636, 0x44ed0 :671, 0x450d8 :718
- `curve/constant_product.rs` (3): 0x11e70 :45/:47, 0x123a0 :85/:87, 0x12840 :112
- `curve/fees.rs` (3): 0x12b08 :17/:19/:21, 0x13190 :32, 0x13d30 :160
- `instructions/create_pool.rs` (1): 0x2e468 :339

## What changed (10 files, `source.patch`, `source/`)
1. Whitespace only (rlex token stream identical, comments included, and identical after deleting all whitespace):
   blank lines at item/statement boundaries, line splits before `.method(`, line joins at token boundaries.
2. Whole-item moves (`reorder.py`, item-permutation proof: skeleton token stream and item multiset identical):
   `state/global_config.rs` and `state/pool.rs` reorder their `impl GlobalConfig` / `impl Pool` fns into the original
   order (constrained by original lines; `split_buyback` by its Location line 388; `Pool::can_boost`, which has no
   coordinate, by ORIGINAL TEXT ORDER: original 0x6c248 lies between 0x6bf50 (:426) and 0x6c328 (:439)). Without the
   text-order key can_boost lost its raw match (call distance) — negative control `SP/lanes/placement/out/nb-g02`.
3. One code duplicate (`base-for-buy-copy.patch`, constant_product.rs): the original `base_for_quote` (0x12310) calls
   its OWN #[inline(never)] copy of the constant-product quotient (0x123a0, :85/:87), while `quote_for_sell` (0x11e70,
   :45/:47) serves amm_hop, legacy sell and sell_v2. The candidate shared one body; `base_for_buy` restores the
   separate copy (same arithmetic, arguments named for the buy direction). Native 674+0 → 675, 0 lost.
4. Location records (raw/whole-ELF only): the solver also places `core::panic::Location` lines where order allows
   (`split_buyback` expects at :388/:391, `uint::construct_uint!` at utils/math.rs:14). Program-crate Location records
   exact: 20 → 31 of 38 (predicted by the token mapping in `solve-report.json` `location_records`; confirmed by pair.py on
   the Linux unstripped build).

## Build records
- `build-a/` (target cache `target/linux`) and `build-b/` (independent clone `target/linux2`): authenticated Linux v1.44
  podman builds of the same staged tree; both produce candidate `418c2ea3…` and unstripped `3d6b9edd…`, identical
  `measure.json` (`sha256.txt`). `dependencies_unchanged: false` in both records only means the lane caches were warmed
  for the 647 dependency pins during the build (compiled dependency artifacts added; none changed or removed).
- `candidate.so.gz`, `unstripped.so.gz`, `measure.json.gz` are from build B (byte-identical to A).

## Rebuild
```
# from a pumpfun-source checkout with repro/pump_amm/event-decoder-recovery-20261027 checked out
B=repro/pump_amm/event-decoder-recovery-20261027/results
python3 research/claude-amm2-placement-20261027/tools/solve.py --tree $B/canonical-source --symbols $B/build/unstripped.so \
  --output /tmp/solve --only-files state/global_config.rs,state/pool.rs,state/volume_accumulator.rs,instructions/create_pool.rs,curve/constant_product.rs,curve/fees.rs,instructions/swap/trade_v2.rs,instructions/swap/sell.rs,instructions/swap/multi_hop_swap.rs,utils/math.rs
(cd /tmp/solve/placed && patch -p1 < .../g01-line-placement/base-for-buy-copy.patch)
# == patch -p1 < g01-line-placement/source.patch applied to $B/canonical-source
LANE=<lane> python3 SP/shared/tools/linux_build.py --source-root /tmp/solve/placed --output <dir>
python3 repro/pump_amm/focused-diagnostics-20261026/measure.py --candidate <dir>/candidate.so --symbols <dir>/unstripped.so --output m.json
```

## Residuals worked but not closed (647 coordinate-only windows outside this packet)
- deposit.rs 0x31710..0x32548 (8), withdraw.rs 0x34370..0x34fa0 (7), toggles 0x1b510/0x1b7c0/0x1bb00, legacy buy
  0x37150 0x39d80 0x39f88 0x3a190 0x3a398 0xaf3b0: closed by amm-lo's packet (integrate composes); the solver reproduces
  deposit/withdraw on 647 (predicted, `--only-files instructions/liquidity/deposit.rs,...`). transfer_fee.rs 0x74900:
  amm-hi's packet. boost.rs 0x1ecd8: pool lane merges boost.rs/boost_burn.rs first (rerun solve.py after).
- multi_hop_swap.rs 0x40308 (:414 program_for) and 0x452e0 (:772..:777 vault_for_mint): incompatible with the amm_hop
  closure chain: amm_hop holds the sites for :579..:718 but 254 more candidate lines follow its last site, while the
  original reaches vault_for_mint at :772 (its curve-run code is the separate executor 0x45940 at :838..:941).
  Needs the multihop restructure (split amm_hop), then rerun the solver. 0xb92c8 (:941) belongs to that executor.
- 0x57e20 (trade_v2.rs:913, called by sell_v2 0x56710): its body is the candidate's trade.rs:329 closure in
  `trade::execute_sell` — that code must live in trade_v2.rs (v2 lane).
- legacy sell 0x4bf30 0x4c138 0x4c340 0x4c548 (sell.rs:167/179/183/196): legacy_sell.rs must become
  instructions/swap/sell.rs (next gain of this lane).
- Location records still off: split_buyback :388 col 45 (ours col 10: needs a token change, not whitespace);
  accrue_fees' inlined split_buyback (original records point at global_config.rs:388/391 → accrue_fees should call
  `global_config.split_buyback`); vault_for_mint (above).
