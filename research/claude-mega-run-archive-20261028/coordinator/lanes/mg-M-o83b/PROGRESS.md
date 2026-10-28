# mg-M-o83b PROGRESS (O0083 buy_v2_handler, orig 140512..159160, 18648 B)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83b (roots/, tools/, logs/, ir/)
Base: mayhem-env/parent-438 (symbols mayhem-b/out/builds/o0077-ir-r1-v1/symbols.so)
Scorer: tools/sc.py (win|mv|diff); slots = winreport diffslots, mstk = reg+stack+jump masked (= port-r1 m3)

## Status
- 02:0x start. r0 = parent-438 + o0083-port-r1 q1 files (buy_v2.rs, pump_interface{,_v2}.rs, lib.rs, state.rs).
  q1 on 436: O0083 18592 B, slots 2248, mstk 94, O0081/82 kept.

## 02:01 r1 = TradeCap trait (best so far)
- r1 (parent-438) and r1p439 (parent-439) identical: O0083 18656B, slots 1917, mstk 52, O0081/82 norm_eq, no_losses.
  Mechanism: state.rs TradeCap trait from o0084-ir-r1/v22 (early/late cap hooks); &u64=late (legacy max-first kept),
  QuoteCap=early (v2 cap-first). buy_amounts/sell_amounts generic. v2 buy&sell pass QuoteCap; legacy pass &field_2.
- BEST-partial = r1p439 (measured vs mgMint-p439-clean). IR proxy = ir/r1.ll (438; buy_v2_handler source identical).
- Build on 439: tools/b439.sh NAME ROOT (rbuild.py). Build on 438 for IR: tools/b.sh NAME ROOT ir.
- Remaining 52 masked: cap tail 2184-3224 (7 hunks), cpi 9240-9472 (3), BuyEvent arm scheduling 15912-17032 (15).
- Next: r2 = tuple event -> per-field scalar lets (O0079 BEST form) to fix the 15 event-arm hunks.

## 02:14 BEST = r5 (15 masked, no_losses, 439) — source levers exhausted
Chain on parent-439 (build tools/b439.sh NAME ROOT; IR proxy on 438 = tools/b.sh NAME ROOT ir):
- r1 TradeCap trait (o84 v22) + generic buy_amounts + QuoteCap: slots 1917, masked 52.
- r2 event tuple -> per-field scalar lets (O0079 order): slots 181, masked 19.  <-- biggest jump
- r5 = r2 + native_mint::id() in QuoteCap::early (o84b finding): slots 168, masked 15.  BEST. sha 1c208134 (re-verified fresh).
Dead ends (all 439, no_losses unless noted): r3 bool-bound cap, r4 De-Morgan inverted cap, r9 unconditional-min cap -> all
  fold to identical IR (15). r8 block-let event -> no change (15). r6 QF-tuple event -> slots 557 (buy wants scalar-lets).
  r7 retained computed inside initial_trade_output -> moves pinned Source record, breaks O0081/82/94/95 + 32 source losses. DISCARD.
Remaining 15 masked = cap/retained-sub llc scheduling (~8) + event-arm scheduling (~7); 143 frame slots cascade from them.
IR proxy ir/r2_438.ll is faithful (llc buy_v2_handler == real build norm_eq); irlc.py loop available but metric fuzzy (base 45).
Next: IR-level retained-sub CFG placement + event phi order (O0079/O0077 playbook), then map to source. Coordinate shared state.rs w/ o84b.
