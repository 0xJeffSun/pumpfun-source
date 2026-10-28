# mg-A-sp1 progress (AMM sell / trade_v2 near-misses)
Targets: 0x4c750 (sell cashback helper, 9024 B), 0x56710 (execute_sell 5904), 0x53350 (execute_buy 5840), 0x54a20 (execute_buy_exact_quote 7112)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-sp1 (src = u753 copy, target = mg-base733 warm clone)
## 03:0x setup done; reading prior lanes (mg-A-5, mg-A-6)
## 03:25 state
- Base build (u753 copy) = 753/150 no gains/losses. Ported mg-A-6 executor groundwork (trade_v2.rs from mg-A-6/best-u751-src; u753 trade_v2 == u751) = gen/trade_v2.a6best.rs: still 753/150, buy 656, exact 741, sell 458 (normalized diff lines), cashback 376 (u753 already has mg-A-5 cb_v16).
- KEY STRUCTURAL FIX (executors): orig executors call the existing `trade_v2::quote_reserves(&a.pool, raw)?` helper WITHOUT #[inline(never)]; LLVM inlines it into buy/exact/sell (callee blocks placed right after the call: [available, effective, shared err] then curve far away = orig layout) but keeps it out of line for multi_hop amm_hop (0x4fac0 stays a window). gen/trade_v2.qr3.rs (line-neutral: blank lines replace removed lines) -> real build 753/150 no losses; buy 656->144, exact 741->563, sell 458->168.
- Cashback 0x4c750: IR block moves (bb60>bb59, bb69>bb137, bb87>bb37, bb152>bb151) give identical block skeleton but RA permutation remains (diff 376->~248 lines). MIR codegen-order simulator tools/mirsim.py reproduces rustc's LLVM block creation order exactly (RPO + lazy creation + succ merging): orig needs a NON-EMPTY join block after try_borrow_data (cand's bb86 = StorageDead(if-cond bool) is empty -> removed). Source scoping variants (b1-b3 batches) all worse.
- Tools: tools/irx.sh (IR from srcx), tools/irone.py (single-fn module, llc in 0.1 s), tools/vscore.py (mux variants), gen/mux.py (cashback multiplexer), tools/ex3.sh (score executors from IR), tools/blk.py (block skeleton cmp), tools/bsearch.py (IR block-order local search), tools/mirx.sh + mirsim.py.
## 03:48 WIN 01: +0x56710 (execute_sell) -> 754/150 on u753, 0 losses. shared/wins/mg-A-sp1-01.{patch,json}; file gen/trade_v2.win01.rs (only trade_v2.rs changed)
- Steps that closed it (IR-level score after each): quote_reserves inlined helper (458->168), amount_after_fee moved into create_sell_event args (->28),
  `let user: &AccountInfo = a.user.as_ref()` before the accumulator if (->5), that if moved into an #[inline(always)] helper fn
  set_accumulator_user (its blocks land right after the call; the transfer_from_pool_to_raw `?` err stub no longer sits between the memcmp block and the then-block) (->2),
  TradeEventContext literal order pool,gc,base_supply,user,uva,... (->1), TradeEventContext DECLARATION order base_supply before user_volume_accumulator (store order; layout unchanged, create_*_event still exact) (->0).
- 03:50 REBASED onto union-758 (src753 = old tree): src = u758 + win01 trade_v2.rs -> 759/151, gains [0x56710], 0 losses (nb.sh now uses matched-union-758n.json). srcx (IR tree) = same.
- Remaining: buy 0x53350 104 lines (structure same; event-context/ZST slot diffs), exact 0x54a20 537 (preview `?` err stub sits between cmp and join; 816/821 order), cashback 0x4c750 376.
