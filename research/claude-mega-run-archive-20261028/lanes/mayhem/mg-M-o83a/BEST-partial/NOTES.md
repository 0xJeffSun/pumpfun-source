# BEST-partial = r5b (adopted from sibling mg-M-o83b r5), base parent-439, rbuild.py recipe
O0083 18632 B (orig 18648), winreport 168 slots, sc.py 19 reg-masked / 57 stackmasked; O0081/O0082 norm_eq;
measure vs mgMint-p439-clean: 439 matched, raw 141, no_losses, no stack warn. NOT norm_eq (not a win yet).
Mechanism: state.rs TradeCap trait (early/late cap hooks): &u64=late-only (legacy max-first), QuoteCap{gp,quote_mint}=early-only (v2 cap-first),
buy_amounts<C>/sell_amounts<C> generic; QuoteCap::early uses native_mint::id(); buy_v2 event = per-field scalar lets in O0079 order.
Remaining ~15-19 masked: (a) cap/retained ~2376-2432: orig does `10000-retained` sub AFTER the `if cap!=0` guard, cand before (llc schedule);
(b) event-arm ~15800-16904: native/non-native arm scheduling (shared O0079/O0084 problem). IR proof (my e5): sinking the sub into the cap join block -> cap region 4 masked.

## Clean/deterministic
Clean rebuild (fresh source copy, rbuild.py) root = roots/r5b_clean, label mg-M-o83a-r5bclean, symbols sha 1c208134eb72b34c...
= byte-identical to sibling mg-M-o83b's verified r5 build. Measure: 439 matched, raw 141, no_losses, no stack warn. O0081/O0082 norm_eq.
O0083 18632 B, winreport 168 slots, 19 reg-masked (C=8,E=11) / 57 stackmasked.

## IR floor (my independent confirmation, tools/ire.py + exp/e6.py,e7.py)
- cap region 8->4: sink the `10000-retained_bps` sub into the cap join block (exp e6a). SOURCE-BLOCKED: the sub lives in the
  shared generic initial_trade_output<C>; legacy (C=&u64) and v2 (C=QuoteCap) are separate monomorphs. Legacy already schedules
  it late and matches (Source record state.rs:321 is late in BOTH orig O0081 and orig O0083); v2's heavier key-compare cap region
  makes llc hoist the sub early. No source edit steers only v2's schedule without adding non-original ops (admission bar) or moving
  the pinned state.rs:321 Source record (breaks O0081/82/94/95). => llc-scheduling-bound.
- event region E=11: native(bb64)/non-native(bb65) arm LOAD scheduling + bb66 phi order. O0079 edit (lifetime.start(event) at both
  arm starts) has NO effect here (exp e7: buy_v2 builds the event in the join bb68, not the arms). ILP-scheduler-bound.
=> O0083 is at its source floor from parent-439 (confirmed by two lanes). A normalized-equal WIN needs frame/schedule control
   beyond ordinary source from this base.
