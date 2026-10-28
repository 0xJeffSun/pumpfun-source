# BEST-partial r5 (O0083 buy_v2_handler) — 15 masked slots, no_losses, parent-439
Base: parent-439 (measure vs mayhem-b/out/builds/mgMint-p439-clean/symbols.so).
Build: tools/b439.sh r5 roots/r5 (rbuild.py). Deterministic: symbols sha 1c208134...eaa0a (re-verified fresh).
Result: O0083 18632 B (orig 18648), winreport slots 168, masked(reg+stk+jump) 15; O0081/O0082 norm_eq;
        matched 439, raw 141, no_losses, no Stack-offset warning. NOT norm_eq yet (not a WIN).

## Mechanism (all in the 5 changed files vs parent-439)
1. state.rs TradeCap trait (from o0084-ir-r1/v22; SHARED with O0084 lane, identical except buy_amounts):
   initial_trade_output<C:TradeCap> does `output=cap.early(output); let max=..; output=cap.late(output); output.min(max)`.
   `impl TradeCap for &u64` = late-only (legacy O0081/O0082 keep max-first, untouched).
   `QuoteCap{global_params,quote_mint}` = early-only (v2 gets the cap-first schedule).
   buy_amounts<C:TradeCap> (MY change; o84 keeps buy_amounts non-generic as it only needs sell_amounts). sell_amounts<C:TradeCap>.
   QuoteCap::early uses `native_mint::id()` (fn call, not ::ID const) — o84b finding, ~4 slots.
2. Callers: v2 buy (pump_interface_v2::buy_v2_handler) & v2 sell pass QuoteCap{gp,quote_mint}; legacy buy/sell pass &field_2.
   lib.rs routes buy_v2 -> pump_interface_v2::buy_v2_handler.
3. buy_v2 event: per-field scalar lets in O0079 BEST order (NOT the tuple). This collapsed the event-arm cluster AND
   the frame cascade (slots 1917->181, masked 52->19). NB: buy_v2 prefers scalar-let; sell_v2 prefers QF-tuple (r6
   test: QF-tuple on buy = slots 557, much worse). They are separate functions, so no conflict.

## Remaining 15 masked slots (buy-specific; source-exhausted)
- Cap/retained region ~2376-2432 (~8): orig computes `retained=10000-retained_bps` AFTER the `if cap!=0` guard;
  cand schedules the sub before it. retained_basis_points is pinned by a Source record (moving it = source losses, r7).
  All source cap forms (bool-bound r3, De-Morgan inverted r4, unconditional-min r9) fold to identical IR. llc-scheduling-bound.
- Event residue ~15800-16904 (~7): native/non-native arm scheduling; block-let (r8) no change; load order ILP-resorted.
- 168 total slots - 15 masked = ~143 are pure stack-offset (frame) diffs that should collapse once the structural 15 close.

## Integration (for mg-M-int): merged state.rs = o84b BEST state.rs + `buy_amounts<C:TradeCap>` (cap:C). Fully compatible.

## Next idea: IR surgery (llc faithful: llc of ir/r2_438.ll buy_v2_handler == real build, norm_eq). Try the retained-sub
   CFG placement (force it into a block after the cap guard) and event-arm phi order, per O0079/O0077 playbook, then map to source.
