# BEST (mg-M-o83c) — O0083 buy_v2_handler CLOSED (normalized-equal), base parent-439, rbuild.py recipe
Build: mg-M-o83c-w01c (plain rbuild.py from a fresh source copy; identical to w01): stripped 58e30666b120276b..., symbols 0915fa26879b7c45...
O0083 18648 B = orig, winreport norm_eq=True diffslots 0. measure.py vs mgMint-p439-clean/symbols.so: matched 439 -> 440,
gains [O0083], no_losses true (no body/raw/edge/source/profile losses), raw 141 -> 223 (+82 raw gains: later functions
realign), edges 4670 -> 4719, Source 505 -> 512. No Stack-offset warning. O0081/O0082 norm_eq. O0084 = mg-M-o84c c4 (73 diffslots).
Files vs parent-439 (source.patch): state.rs, pump_interface_v2.rs, buy_v2.rs, lib.rs. Line-neutral where it matters:
buy_v2 Source records 393:25/394:26 (= orig), sell_v2 stays at line 544 (records 591/592 = orig).

## Mechanism (all ordinary Rust, behavior identical)
1. (o83b r5) state.rs TradeCap trait: legacy &u64 = late cap (O0081/O0082 untouched), QuoteCap{global_params,quote_mint} =
   early cap with native_mint::id(); buy_amounts<C:TradeCap>/sell_amounts<C>; handler moved to pump_interface_v2.rs (lib.rs
   route, buy_v2.rs old handler blanked line-neutrally).
2. (o84b/o84c, shared state.rs = mg-M-o84c c4 + generic buy_amounts) initial_trade_output takes retained_bps and recomputes
   retained_basis_points after cap.early (10000-sub lands in the cap-join block; early call in buy_amounts keeps the
   overflow check before raw_quote) and `let real_sol_reserves=c.real_sol_reserves;` before cap.early -> cap region exact.
3. (this lane) BuyEvent: literal with end_timestamp before virtual_tokens (virtual_tokens kept in r8 across Clock::get).
4. (this lane, the close) event values by DEFERRED INITIALIZATION in one if/else (line 396, line-neutral):
     let quote_vault_balance; let state_quote_deployed; let virtual_quote; let global_quote_deployed; let real_quote;
     let sol_amount; let sol_vault_balance; let state_sol_deployed; let virtual_sol; let global_sol_deployed; let real_sol;
     if native { sol_amount=sol; sol_vault_balance=a.sol_vault.lamports(); state_sol_deployed=field_56; virtual_sol=..;
                 global_sol_deployed=..; real_sol=..; quote_vault_balance=sol_vault_balance; state_quote_deployed=state_sol_deployed;
                 virtual_quote=virtual_sol; global_quote_deployed=global_sol_deployed; real_quote=real_sol; }
     else { sol fields = 0; quote fields = quote vault amount, field_56, virtual_sol_reserves, stable_deployed, real_sol_reserves; }
   Why: llc-exact needs event-join phi order rs,gsd,vs,ssd,svb,sa,rq,gqd,vq,sqd,qvb (IR proof: g01 IR with only the phi order
   changed -> llc 0/0/0). Per-arm PHI copies are emitted in phi order and the FIRST phi of a value pair is coalesced with the load,
   so the sol phis must precede their quote twins (orig 4-access slots = gsd.hi and svb), sa must follow the other sol phis (its
   bb65 zero is the last rematerialized mov = orig 'fresh mov64 r2,0'), quote copies in rq,gqd,vq,sqd,qvb order. Rules found:
   per-field `let x = if native{..}` -> phi order = let order (but lamports must be called before the loads, so impossible);
   6-tuple destructuring -> phis in element order 4,3,2,1,5,6; deferred `let x;` + assignment -> phi order = REVERSE
   declaration order, independent of assignment order (assignments keep the lamports call first in the native arm).
