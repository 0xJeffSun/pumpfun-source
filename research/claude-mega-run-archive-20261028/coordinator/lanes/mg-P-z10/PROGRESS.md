# mg-P-z10 PROGRESS (mega run, Pump main, base L17 = 975/1035, 165 raw)
Windows: 0x14a8a8 0x14c038 0x14f4e0 0x152888 0x1557e8 0x17bc48
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10 (src/, work/, out/, logs/)
Prior round: lanes/r5-z10/PROGRESS.md (0x1557e8 best partial i18 = 5704 B, 12 diff lines; 0x17bc48 1184 vs 1192 B block placement).

## Log
- 02:31 lane started; src = cp of base/L17/pump; baseline build b00 running.
- 02:33 b00 = unmodified L17 build: 975/165, sha 93748494 (= L17). Build ~29 s.
- 02:35 i18 (r5-z10 best partial ported to L17): 975/165, 0x1557e8 5704 B ratio .9912 (6 reordered insns = authority copy order).
- 02:40 IR loop (tools/irbuild.py -> llx/i18.ll, xfn.py extract, lle.py edit+llc+sacmp 0.1 s): default sched = list-ilp; mini
  reproducer (llx/mini) shows the 32-B memcpy is DESCENDING unless an llvm.lifetime.start follows it in the same block.
  Real IR: lifetime.start(_87 = &mut [u8] writer temp of try_serialize) right after the memcpy. Moving it below the borrow
  check in IR -> MATCH (ratio 1.0).
- 02:43 j1 `{let mut data=account.data.borrow_mut();header.try_serialize(&mut &mut data[..])?;}` (line 94) -> 976/165 +0x1557e8,
  no losses, rv. j2 (let + drop(data) same line) also wins (different raw bytes: rodata Location col). DELIVERED j1 as
  deliveries/mg-P-z10-01. Lane src = j1.
- 02:50 0x17bc48: standalone probe (tools/qp.sh = hybrid144 rustc, crate profile flags; base.rs reproduces 1184 B/0.6397).
  llc on its IR: moving the return block bb37 to the END of the function -> MATCH (only the last position works).
  Source sweeps (loop forms, break-values, labeled block, bool expression, closures) all converge to the same IR order.
  o2 = `pub fn quote_extensions_supported(..)->bool{tlv_check(data,allow).is_some()}` + private `fn tlv_check(..)->Option<()>`
  (len==82 Some, header checks None, `tlv.get(offset..)?`, `checked_add(size+4)?`) -> MATCH (inlined callee's merge block
  is appended last). Full build q1 = 977/166, +0x1557e8 +0x17bc48 (raw +0x17bc48), no losses -> DELIVERED mg-P-z10-02.
  Lane src = q1.
- 03:05 Big handlers surveyed with tools/cseq.py (call-sequence diff) + tools/skel.py (calls/error codes/lines):
  * 0x14c038 legacy buy (10880 B, L17 cand 12296 B, .214): most tractable - every original callee except 0x3cd50/0x89258
    is already a matched helper. Decoded flow (slots in logs/o14c038.txt): prepare -> validate_fee_recipient ->
    buyback_fee_recipient(rem,global,1) -> 608 complete -> amount=partial?min(amount,rtr):amount -> 617 gt0 -> 619 gte ->
    buy_quote + 629 closure -> trade_fees -> whitelist zero-fee select (global.whitelist_pda==user.key()) -> 654 require_gte
    with 664/666 closures -> reserves updated IN PLACE on the curve (674/679/684/689 closures) -> transfer_curve_tokens_ref ->
    whitelist reload/sync block -> uva.user default init -> mint key staged -> creator-fee branch (cf!=0: bonding-curve-v2
    check, cashback vs creator-vault paths, line 747 = eager ok_or(error!(Overflow)) on cashback_earned) -> curve quote
    payment -> protocol/buyback split (only when pf!=0) -> Clock::get once -> TradeEvent (no clone) -> if rtr==0 {complete=true;
    CompleteEvent with the same timestamp}. Not yet rewritten in source.
  * 0x14f4e0 buy_exact_sol_in: same payment tail as legacy buy (do it after 0x14c038).
  * 0x152888 legacy sell: needs sell.rs helper 0x6cd78 (8544 B, mg-P-z06) as a separate fn.
  * 0x14a8a8 v3 sell: thin handler over matched helpers + 0x8bbd0 TradeEvent builder (mg-P-z08 owns it).
- STOPPED here (lane ended). Best state: lane src = q1 = deliveries/mg-P-z10-02 (977/166 on L17).
