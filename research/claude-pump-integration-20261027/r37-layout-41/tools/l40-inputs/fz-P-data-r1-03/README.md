# fz-P-data-r1-03: raw-ready 1005/1018 on L38 (no wrong_call left), all 54 original panic Locations present, on top of -02

Cumulative: = fz-P-data-r1-02 (Location records + log parity) + (a) the IDL fee-config account type for the v3 and multi-hop
contexts + (b) the already-delivered fz-P-srf-r3-02 rent-path idiom (L38 composed fz-P-srf-r3-01; -02 superseded it) + (c) two
panic Locations of the unmatched process_cashback (0x6cd78) on the original line:col.
Base `W/base/L38` (1018/1035, raw 168; layout 293; raw-ready 997; unstripped 6cf9da7f).

Result: **1018/1035 normalized, 168 raw source-only, 0 normalized / 0 raw losses**, runtime valid, no stack warnings (68 warnings,
same set as -02). Two builds identical (unstripped 30b72451, candidate d00b51e9). Layout check (pgen ordered.ld for this exact tree, link-only relink): 1018 / raw 293 (= L38+layout raw set,
0 losses), **raw-ready 997 -> 1005 / 1018**; the only not-ready class left is merge_order (13 windows), whose misplaced cst4 pieces
are first used by unmatched windows (admin_cto 0x22a10, create_v2 execute 0x1e7c0, hop 0x5b3b0, cashback 0x6cd78, buy_v2 handlers
0x13b9b8/0x13f630, sell_v2 0x144508; `tools/fu2.py <build>/p1 4`). Locations 368/368 equal. Synthetic layout: yes (line-neutral).

## Changes beyond -02
1. `SellV3` (trade_v3.rs:65-66) and `MultiHopCurve` (multi_hop_curve_swap.rs:14) take `fee_config: Box<Account<'info,
   crate::legacy_sell::LegacyFeeConfig>>` (= `pump_fees::accounts::FeeConfig` from `declare_program!(pump_fees)`, the type BuyV2,
   SellV2, LegacyBuy and LegacySell already use; same fields, same discriminator, owner pfeeUx...) instead of the private
   `RouteFeeConfig` newtype; `bump=fee_config.bump`; `fee_math::get_fees` / `get_fee_basis_points` and the hop's `complete_fill`
   take the IDL `FeeConfig` (identical layout; 0x89ec8 and 0x57e40 stay byte-matched). Evidence: prawready `wrong_call` in
   0x3cc8 (`Box<T>::try_accounts`) and 0xdb958 (`MultiHopCurve::try_accounts`): the original calls the same
   `Account<T>::try_accounts` (window 0x133e0) that our BuyV2/SellV2/LegacyBuy/LegacySell contexts call; both are raw-ready now,
   and the candidate-only cst4 pieces 3001/3003 (RouteFeeConfig's own discriminator errors) are gone (cst4 pieces 122 -> 120 = original).
   `RouteFeeConfig`, its impls and `trade_types::FeeConfig` become blank lines. Behaviour: same owner/discriminator/Borsh decode at
   account validation; only the malformed-account error text follows the IDL type (as in the original). `.text` -4,312 B.
2. `set_reserved_fee_recipients.rs` = fz-P-srf-r3-02's file (`if unlikely(!rent.is_exempt(..))` + `cold`/`unlikely` helpers at the
   file end; the srf lane's -02 superseded -01, which is the version in L38): 0x6fef8 raw-ready (rent path calls the out-of-line
   `alloc::fmt::format` as in the original).
3. `sell.rs` `process_cashback` (unmatched 0x6cd78): `let mut data = ..try_borrow_mut_data()?;` and the two `copy_from_slice`
   writes moved down inside the following pad block, so `data[..8]` / `data[8..40]` sit on 76:13 / 77:13 (the original's Location
   records; ours were 60:13 / 61:13). Binary difference vs the tree without it: 2 bytes of .data.rel.ro (the two line numbers).
   Whole-ELF Location set (ana/locset.py, every `{&str, line, col}` record with a programs/pump path): all 54 original records are
   present (L38: 13 missing); 8 candidate-only records remain, all in unmatched windows' code: buy_v2.rs 465:34/465:89 (plain u128
   `-` and `/` in 0x13b9b8), multi_hop_curve_swap.rs 725/727/730/732 (hop asserts; fz-P-hop-r3's call list has the original splitting through accrue_fees),
   trade_v3.rs 82:10/84:10 (`v3_buyback_split`, used by `v3_buy_costs` and the v3 sell; the original's records are lib.rs
   1936:45/1939:14 of `protocol_fee_split`).

## Runtime
`runtime/runtime-summary.txt`: 42 suites (all except quote_control, whose harness needs the candidate inside W/full) + the frozen
tokenkeg two-curve fixture, run on the candidate without change 3 (identical except those 2 .data.rel.ro bytes), plus the
cashback-path suites on this candidate.so: 9,941 pairs (b6) 0 mismatches, 0 state differences, two-curve 20/20; cashback 283,
legacy_cashback 14, earned_cashback 61, legacy_sell 115, legacy_buy 284 (b7) 0 mismatches. Log parity unchanged from -02: 26 pairs
changed vs the L38 corpus, all now equal to the original; 83 coordinate-only AnchorError lines of unmatched handlers remain.

Files: `src/`, `patch.diff` (diff -ruN W/base/L38/pump src), `unstripped.so`, `candidate.so`, `build.log`, `score.json`,
`result.json`, `layout-check/`, `runtime/`. Edit scripts: `WP/lanes/fz-P-data-r1/ed/{edit_locs,edit_v3sell,edit_hop,edit_sellsites,
edit_feeconfig,edit_cashback}.py` + copy of `deliveries/fz-P-srf-r3-02/src/src/set_reserved_fee_recipients.rs`.
