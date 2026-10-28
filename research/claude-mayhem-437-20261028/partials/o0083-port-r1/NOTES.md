# o0083-port-r1 notes (O0083 = BuyV2 handler, orig 140512..159160, 18648 B)
- Base 436 candidate: buy_v2::handler 7640 B (to_account_info clones outlined) -> structurally wrong.
- Original O0083 has the same shape as O0084 (sell_v2_handler): inline AccountInfo clones block (~11.6 KB) then call buy_v2_recovered.
- Original O0083 price-check region (208..1960) is insn-identical (reg+offset masked) to original O0081 (legacy buy, closed in 436)
  -> port legacy buy's closure price check verbatim (let Some(price)=...checked_div first).
- Tools: tools/wdiff.py (orig window vs cand fn; --mask regs, --mask3 regs+stack offsets+jump targets), tools/oo.py (orig vs orig), tools/bm.sh (build+measure+diff).
## Builds
- v1: sell_v2-style port (closure w/ ok_or, cap by value, is_ok()/cpi_result, tuple event). (pending)
- v2: legacy-buy price closure + `let vt` rebind + cap by ref select + map_err CPI w/ inline seeds + tuple event. (pending)
- (00:0x) Killed v1/v2 (build queue ~30+ min; other lanes already had same port). Rebased on o0083-ir-r1/r3 (436, no losses, m3 140 slots) = roots/p3; p4 = p3 + legacy let-else price closure (lines kept: 376 error!, 393/394 subs). Both queued with IR emission.
- brute-r1 v0 (legacy closure) has NO masked diffs before 1904 -> legacy closure fixes the price region; ir-r1's price_check fn diverges at 616.
- llc loop on ir-r1 v3.ll (== ir-r1-3 build, 146 llcd-m3 slots). tools/llcd.py, irexp.py, phigreedy.py, stgreedy.py, ev1.py.
  - O0079-ir-r1 insight ported: moving quote_mint memcpy into event BEFORE the side store: 146 -> 132 (e_qs). lifetime.start(event) move alone: no change.
  - phi order in event join bb73: move %_417 (sol_vault_balance) after %_424 (global_quote): 132 -> 126 (e_qsp).
  - stgreedy (event field store order in bb75) running on e_qsp.
- Event store emission order of orig O0083 = O0084 = O0079: qm sv side sa ta svb tvb vs vt ts et rs rt rrb ver gsd stn ssd mint gqd sqd rq vq qvb qa (tools/evo.py). llc e_qsp already reproduces it; orig event at -1832, cand -1856 (frame 24 B bigger).
- Remaining event-region diff = if-native arms scheduling: orig native arm loads in source order gp.sol_deployed, state.field_56, curve real(+96), virtual(+80), then zero qm; non-native: gp.stable, qv.amount, state, curve, mint copy -> exactly IR order; llc reorders (state first). Same shape in orig O0084 -> shared problem with O0084 lanes.
- q1 = p4 + o0084-port-r1 d1 shared state.rs (cap select inside initial_trade_output, gp+quote_mint args; legacy passes Pubkey::default()) + buy_amounts(vt,c,&a.global_params,a.quote_mint.key(),..) in buy_v2_handler; sell_v2 call updated. queued (target c).
- p4 built: 436 matched, no_losses, m3 152 (price region now only 7 single-slot reload diffs; cap/buy_amounts region 1904-3224 larger).
- llc frame analysis (tools/frame.py = llc -stop-after=prologepilog stack listing): cand frame is 24 B larger than orig (event/_50 at -1856 vs -1832).
  Orig layout = cand minus the 24-byte inlined MayhemError::name temp (%_4.i569) at the top, with the quote_mint tuple temp %_422 placed right after %_178 (sv key) instead of at the top.
  Moving %_422 alloca after %_178 (e_a2) puts it at the orig position; the remaining 24 B is %_4.i569 (error-name path of one inlined error! site).
