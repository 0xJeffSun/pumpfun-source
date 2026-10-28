# r5-coord PROGRESS (base L12 907/165)
Windows: 0x178e0 0x57c38 0x60670 0x60878 0x84970 0x84b78 0x857a8 0x14eec8 (all 520B `error!` closures, body == sibling, only Source line differs)
Tools: tools/clos.py (every 520B error closure orig vs cand: code + file:line), tools/callers.py (call-site finder on objdump output),
tools/deliver.py, tools/v1.py + tools/v2.py (the edit scripts), orig.dis (objdump of base/original.so).

## Deliveries
- r5-coord-01: 912/165 (+5). superseded.
- r5-coord-02: 914/165 (+7: all but 0x178e0). genuine-op placements only.
- r5-coord-03: 915/165 (+8: ALL windows). = 02 + buy_v2.rs:983 placement on an inlined copy of the creator ceil_fee (caveat in README).

## Window status (all MATCHED in r5-coord-03)
- 0x14eec8 lib.rs:679: amount=if partial{min}else{computed} (same value) keeps the rb checked_sub edge; before, real-min(x,real) was proven safe.
- 0x57c38 multi_hop:259: closure bound on loop-header line, used by total_buyback accumulation (orig: loop accumulation edge in hop-loop fn 0x567d8).
- 0x60670 multi_hop:736: paid_buyback=b1+b2 checked_add, closure on 736.
- 0x60878 multi_hop:744: aligned to original R=post_fee(paid), P=post_fee(post_raw), first=R-P checked on line 744 (behaviour alignment; see README-02).
- 0x84970 trade_v3:721: closure on pad line 721 in v3 buy, used by total_buyback add (orig r6+r2 of two accrue_fees results).
- 0x84b78 trade_v3:767: closure on pad line 767, used by buyback_received checked_sub.
- 0x857a8 trade_v3:997: nested #[inline(always)] fn narrow_post on line 997, used by post_base narrowing (orig: try_from(tokens_for_quote(..,remaining))).
- 0x178e0 buy_v2:983: PLACEMENT (r5-coord-03 only): nested inline(always) ceil_fee_983 on line 983 used for cf at line 960.
  Genuine fix would implement the original's second tokens_for_quote fill between the 979/986 BuySlippage checks (orig 0x141e40-0x141f88:
  x = r3.saturating_sub([-0x898]); require [-0x870] >= x (err 0x29); rem=[-0x870]-x; rem==0 -> 979 BuySlippage; tokens_for_quote(curve,rem) -> 983).

## Tried / negative
- buy_v2 983 via nested narrow on raw_quote (line 878): NO closure emitted - LLVM proves available*10000/(10000+bps) fits u64.

## Leads
- v3 buy (trade_v3 844) and buy_exact_quote (984): original receipt split is post_fee(total)-post_fee(post) (0x83c00 @0x84858/0x848a0); ours post_fee(buyback_fee).
