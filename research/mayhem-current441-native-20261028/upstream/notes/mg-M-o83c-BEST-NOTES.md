# BEST (mg-M-o83c) — Mayhem 441/441: O0083 buy_v2_handler AND O0084 sell_v2_handler normalized-equal. Base parent-439, rbuild.py
Build mg-M-o83c-x01c (plain rbuild.py from a fresh source copy; identical to x01): stripped 44e4f5400f18b366..., symbols 7d0334736599...
measure.py vs mgMint-p439-clean/symbols.so: matched 439 -> 441 (unmatched_ids []), gains [O0083, O0084], no_losses true,
raw 141 -> 223, edges 4670 -> 4768, Source 505 -> 519. No Stack-offset warning. O0081/O0082 norm_eq.
O0083 18648 B / O0084 18096 B, both winreport norm_eq diffslots 0.
Files vs parent-439 (source.patch): state.rs, pump_interface_v2.rs, buy_v2.rs, lib.rs (line-neutral where Source records pin
lines: buy_v2 393:25/394:26, sell_v2 handler at 544 with records 591/592 = orig).
Lineage: o83b r5 (buy_v2 handler, TradeCap) + mg-M-o84c c4 (shared state.rs cap fix + sell_v2 handler, credit o84b/o84c)
+ this lane: buy_v2 literal end_timestamp before virtual_tokens, and the DEFERRED-INITIALIZATION event block on BOTH handlers
(pump_interface_v2.rs line 396 buy_v2, line 594 sell_v2; same text). O0083-only variant: ../BEST-o0083only (440).

## The closing mechanism (event-join phi order)
Orig needs the event-join phis in order real_sol, global_sol_deployed, virtual_sol, state_sol_deployed, sol_vault_balance,
sol_amount, real_quote, global_quote_deployed, virtual_quote, state_quote_deployed, quote_vault_balance (IR-proven: llc on
our IR with only that phi order changed = 0 diff). In each arm, PHI copies are emitted in phi order and the first phi of a
value pair is coalesced with the load, so: sol phis first (orig 4-access spill slots = global_sol_deployed.hi, sol_vault_balance),
sol_amount after the other sol phis (its non-native zero is the last rematerialized mov = orig's 'fresh mov64 r2,0'), quote
copies in rq,gqd,vq,sqd,qvb order. Source that yields it while keeping the single lamports() call first in the native arm:
  let quote_vault_balance;let state_quote_deployed;let virtual_quote;let global_quote_deployed;let real_quote;
  let sol_amount;let sol_vault_balance;let state_sol_deployed;let virtual_sol;let global_sol_deployed;let real_sol;
  if native{sol_amount=sol;sol_vault_balance=a.sol_vault.lamports();state_sol_deployed=a.mayhem_state.field_56;
    virtual_sol=a.bonding_curve.virtual_sol_reserves;global_sol_deployed=a.global_params.sol_deployed;
    real_sol=a.bonding_curve.real_sol_reserves;quote_vault_balance=sol_vault_balance;state_quote_deployed=state_sol_deployed;
    virtual_quote=virtual_sol;global_quote_deployed=global_sol_deployed;real_quote=real_sol;}
  else{sol_amount=0;sol_vault_balance=0;state_sol_deployed=0;virtual_sol=0;global_sol_deployed=0;real_sol=0;
    quote_vault_balance=a.mayhem_quote_token_vault.amount;state_quote_deployed=a.mayhem_state.field_56;
    virtual_quote=a.bonding_curve.virtual_sol_reserves;global_quote_deployed=a.global_params.stable_deployed;
    real_quote=a.bonding_curve.real_sol_reserves;}
Deferred `let x;` + one if/else => phi order = REVERSE of declaration order, independent of assignment order. (Per-field
`let x=if native{..}` => let order; 6-tuple destructuring => elements 4,3,2,1,5,6.) Values per arm are identical to the
previous per-field form (one lamports() call, native only), so events/errors/CPI order are unchanged.
