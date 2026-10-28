# mg-M-o83a PROGRESS (O0083 = buy_v2 handler, orig 140512, 18648 B)
Work dir: WM/mega/mg-M-o83a (roots/, tools/, logs/, ir/, llc/, exp/, notes/), WM=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
Base: parent-439 (roots/base439, chmod u+w copy); measure vs WM/mayhem-b/out/builds/mgMint-p439-clean/symbols.so
Tools: tools/b9.sh NAME ROOT [ir] (rbuild recipe; ir->rbuild_ir.py emits llvm-ir to ir/NAME.ll); tools/sc.py / rs.py (region masked slots);
  tools/ire.py (split module handler, llc an edited handler, score); tools/llc83.py; tools/hob.py (numeric hunks of a .bin); tools/winreport.py (O0081/83 added).

## BEST-partial = r5b_clean (adopted from sibling mg-M-o83b r5), label mg-M-o83a-r5bclean
- symbols sha 1c208134eb72b34c... = byte-identical to o83b's verified r5. O0083 18632 B, winreport 168 slots, 19 reg-masked (C=8,E=11),
  57 stackmasked. 439 matched, raw 141, no_losses, O0081/O0082 norm_eq, no stack warn. NOT norm_eq (not a win).
- Mechanism: state.rs TradeCap trait (early/late cap hooks): &u64=late-only (legacy max-first), QuoteCap{gp,quote_mint}=early-only
  (v2 cap-first), buy_amounts<C>/sell_amounts<C>; QuoteCap::early uses native_mint::id(); buy_v2 event = per-field scalar lets (O0079 order).

## IR work (confirms source floor)
- exp/e6.py e6a: sink `10000-retained` sub into cap join -> cap region 8->4 masked (total 19->15). SOURCE-BLOCKED (shared generic monomorph;
  llc hoists v2's sub due to heavier cap region; moving it needs non-original ops or moves the pinned state.rs:321 Source record).
- exp/e7.py: O0079 lifetime.start(event)-at-arms edit has NO effect on buy_v2 (event built in join block). Event E=11 is arm-load ILP scheduling.
- My earlier non-generic forms: s2c9 65 masked, g2 (generic cap()->&u64) 46 (ptr-select not phi-offset). r5b (o83b trait, early/late) is best.

## Dead ends (mine + relayed from o83b)
- cap: bool-bound / De-Morgan / unconditional-min all fold to identical IR; inline select in shared #[inline] ito hits 14 but loses O0081/O0082.
- event: block-let, QF-tuple-on-buy (557), lifetime-at-arms — no help.
- computing retained inside initial_trade_output moves pinned Source record (breaks O0081/82/94/95).

## Next ideas
- Frame/alloca-order angle: the 143 stack-offset-only slots (winreport 168 - 19 structural). If the v2 frame layout (alloca order /
  lifetime markers for the key temps + event + cap) matched the original's, the scheduler pressure that hoists the cap sub might ease.
  Try: llc -stop-after=prologepilog on ir/r5b.ll to list the v2 frame vs orig (tools from r436/o0083-port-r1/tools/frame.py), then source
  forms (let-binding the quote_mint/key temps, event block-let) that reorder allocas to match. This is the remaining unexplored lever.
- Otherwise O0083 is at its source floor from parent-439; revisit if a new base (frame-affecting) lands.
