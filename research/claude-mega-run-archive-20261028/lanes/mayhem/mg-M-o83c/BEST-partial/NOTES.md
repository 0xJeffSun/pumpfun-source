# BEST-partial g01 (mg-M-o83c) — O0083 buy_v2_handler (+ composes mg-M-o84c c4 sell_v2), base parent-439, rbuild.py
O0083 18640 B (orig 18648), winreport 129 slots, 3 reg-masked / 33 reg-exact / 55 full-slot (tools/sc3.py), all in the BuyEvent arms.
O0084 = mg-M-o84c c4 unchanged (18096 B, 4 masked, winreport 73). measure vs mgMint-p439-clean: 439, raw 141, no_losses,
O0081/O0082 norm_eq, no Stack-offset warning. NOT a win. Build label mg-M-o83c-g01 (plain rbuild).
Files vs parent-439: state.rs (= o84c c4 state.rs + buy_amounts<C:TradeCap>), pump_interface_v2.rs (my buy_v2 region lines 1-537
+ 6 blank lines + o84c c4 from sell_v2_handler at line 544 on, so sell_v2's Source records stay at 591/592 like the orig),
buy_v2.rs (old handler blanked, line-neutral; from o83b r5), lib.rs (buy_v2 routed to pump_interface_v2::buy_v2_handler).
NB: o83b r5 / my earlier c1..f01 trees shifted sell_v2 by -6 lines (records 585/586 vs orig 591/592) -> do not compose those.
Mechanism (O0083): o83b r5 (TradeCap trait, QuoteCap early, scalar-let event) + o84c shared state.rs (lazy retained after
cap.early, real_sol_reserves let before cap.early) -> cap region exact; event literal with end_timestamp BEFORE virtual_tokens
(virtual_tokens in r8 across Clock::get like the orig); per-field let order qvb,sqd,vq,rq,gqd,sa,svb,gsd,ssd,vs,rs,qm
(let order == event-join phi order; global_sol_deployed after sol_vault_balance).
