# mg-A-6 progress (AMM trade_v2 windows)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-6 (src = copy of mg-base733, warm target). Baseline native build = 728/139, no gains/losses (out-base.json, base733-native.so).
Tools: L/tools/{syms.py (cand symbols), calls.py (call seq; orig names from L/out-base-rows.json), lines.py (error line pairs), rdiff.py SO ADDR NAME [ctx] [max]}

## Window map (orig -> cand fn; orig error lines vs cand)
- 0x50598 1808 calculate_buy_result (cand 1776): orig lines 283,294; cand 266,269
- 0x50f00 2016 estimate_buy_quote (cand 1952): orig 328,346; cand 576,583
- 0x51d08 872 trade::buy_transfers (cand 880): only diff jne vs jeq+ja on accumulator default-key check (memcmp r0)
- 0x53350 5840 execute_buy (cand 5440): orig 660,671,672,706
- 0x54a20 7112 execute_buy_exact_quote (cand 6368): orig 740,752,753,770,804,816,821
- 0x56710 5904 execute_sell (cand 6792): orig 865,876,906 (+closure 913, matched)
Orig .text order: ... total_user_quote, 0x50f00, calc_sell_quote, 0x51d08(buy_transfers), create_buy_event, create_sell_event, exec_buy, exec_exact, preview_total_quote, exec_sell, sell closure.

## Structural facts from call sequences (orig executors)
- prepare() is INLINED in orig (validate_cashback_coin + prepare_pool called directly); cand calls trade::prepare.
- from_mint preceded by AccountInfo::clone => from_mint(&a.quote_mint.to_account_info()).
- no Event::clone: emit!(event); emit_cpi!(event);
- error blocks (disable/zero checks/unwrap_failed) laid out right after effective_quote_reserves in orig.

## WIN 01 (02:3x): 0x51d08 buy_transfers -> 729/139, no losses. shared/wins/mg-A-6-01.patch (+json)
- last call `if let Err(e) = transfer_checked_to_account_info(..) { return Err(e); }` (trade.rs). Mechanism: block creation order.
- IR loop: tools/ir.sh OUT.ll (cargo rustc --emit=llvm-ir, target-ir, ~15 s), tools/llc.sh, tools/ostat.py OBJ (scores 6 windows), tools/one.sh TAG.
- CAUTION multiplex: MergeFunctions merges CFG-equal variants (aliases) -> measured body is another variant's. Use single builds to confirm.
## REBASED onto u744 (02:12): L/src = u744 + win01 change; old tree in L/src733. WIN 02 = port: 745/150, +0x51d08, mg-A-6-02.patch (vs u744).
Measure: MEASURE_FRONTIER=$HOME/amm100-run/shared/frontier/matched-union-744n.json nbuild.sh L. trade.rs/trade_v2.rs/global_config.rs identical in u744 and 733.
## WIN 03 (~02:40): 0x50598 calculate_buy_result -> 746/150 (cumulative mg-A-6-03.patch vs u744). Files: trade_v2.win03.rs, global_config.win03.rs
- helper GlobalConfig::split_buyback_fee (gen/h1.rs) appended inside last impl of global_config.rs; variant gen/cbr7.rs (inner block amounts).
- tools: tools/region.py BASE OUT START END VARIANT (//@N line markers), tools/cbr.sh VARIANT (IR-test calc_buy_result), tools/gcv.py HELPER.
- orig Locations: buyback expects at state/global_config.rs 388:45 and 391:14 (shared by split_buyback 0x64cd8, accrue_fees, calc_buy_result).
- global_config.win03b.rs: split_buyback delegates to split_buyback_fee (nbuild 746/150, no loss) -> adopt in next win.
## 0x50f00 estimate_buy_quote (in progress)
- orig error lines 328 (BuyNotEnough 6039) / 346 (BuySlippage 6040). Needs preview_total_quote+BuyPreviewContext moved out of 306-330 (gen/preview.rs appended at end for now); tools/ebq.sh VARIANT.
- ebq2 (protocol_fee_bps.saturating_add(lp_fee_bps) order) 158->130. ebq6 (+ 'else if available == 0 { 0 }') gives orig CFG for zero checks (135, RA diffs).
- orig tail: branch 'required > available' before the saturating sub (jump-threaded), then quote>0 check; Ok block stores fees from spills.
- ebq7/8 (explicit if-sub) 193-200; ebq10/11 (if required>available { ..saturating_sub.. }) 150-152: tail threading shape like orig but block layout shifts. Parked; best ebq6 (135) / ebq2 (130).
## Executor restructure groundwork (trade_v2.exec1.rs; nbuild 746/150 no loss, keeps both wins)
- execute_buy/exact/sell: inline prepare (validate_cashback_coin + prepare_pool), from_mint(&quote_mint.to_account_info()), emit!(event); emit_cpi!(event) (no clone), error lines aligned, require_gte!(b,out,TooLittle)@821 added for exact.
- Cuts diffs: sell 1279->458, buy 898->656, exact 1072->741. preview_total_quote(0x565e8) & sell closure(0x57e20) still matched. Build tools/ex.sh EST EXEC.

## REBASED onto union-751 (02:3x): both wins (0x50598,0x51d08) are COMPOSED in u751 base already. Lane src = u751 + executor/estimate groundwork = best-u751-src (nbuild 751/150, 0 loss). Remaining targets: 0x50f00, 0x53350, 0x54a20, 0x56710.
- Real-build partials (u751-exec1.so): estimate 0x50f00 diff 141 (ebq6; ebq2 order=130 on IR), buy 0x53350 656 (size 5840==5840), exact 0x54a20 743, sell 0x56710 464 (size 5904 vs 5936).
- All 4 remaining diffs are register-allocation/instruction-scheduling spread across the whole (large) fn, NOT one movable block (estimate = 12 hunks lines 14-227). First sell divergence: orig keeps transfer Result tag in r9, cand in r8 (one extra value live across transfers), and cand's error-cleanup paths are larger (branch +0x76 vs +0xab).
- NEXT IDEAS: (1) match error-origin Location/size so error blocks are identical length -> fixes branch distances; check Overflow/error block duplication. (2) find the value orig pins in r9 across all 4 transfers (likely accounts ptr / quote_fee_data kept in reg vs stack). (3) estimate: the fee_bps add-order (protocol+lp) is already orig; remaining is RA from the fee() call results.
