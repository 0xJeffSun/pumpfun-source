# Lane o0079-ir-r1 (IR-first) — O0079 sell_pump_swap handler (95848, 17312 B)

## Setup
- roots/a = parent-436 + mayhem-o79 g5n6 handler (side:true). Build o0079-ir-r1-a: 436 kept, no_losses, O0079 17312 B, 136 diffslots (ratio .9577).
- IR: out/ir/a.ll (--emit=llvm-ir,link). llc (v1.54, -O3 default sched = list-ilp) reproduces the built handler normalized-identically.
- Remaining diff is ONLY the SellEvent construction tail (14744..16128): native-branch phi register/spill-slot assignment,
  which values (tvb/vt vs state_token_net) stay in r8/r9 across Clock::get, and the store order in the final event block.

## IR result (llc, normalized-equal to original O0079)
out/ir/exact.ll = a.ll + 3 edits (each found by llc search; load order inside blocks is irrelevant, ILP re-sorts):
1. lifetime.start(%event) at the start of both native/non-native arms (before lamports / qvb load) => StorageLive(event) precedes the quote_vault_balance computation (a.ll: 59 -> 53 nd).
2. Event field stores: quote_mint memcpy first in bb52 (evsearch: event store sequence distance 48 -> 0).
3. Phi order in bb50: global_sol_deployed phi right after quote_vault_balance phi (lsearch: 52 -> 0 nd, posdiff 0).
Next: find source forms (literal order / block-expression let / quote_mint binding) that reproduce 1-3.

## Source results (real builds, all 436 kept, no_losses)
- a  (g5n6 port): O0079 136 slots, handler regdiff 59.
- v1 (= a + `let event={let quote_vault_balance=...; SellEvent{...}};`): 123 slots, regdiff 53 = exactly IR edit 1 (StorageLive(event) before qvb).
- v2..v6 queued builds were stopped: O0079 was CLOSED by o0079-brute-r1 (e1, 437, coordinator base parent-437) with let-bound locals; its mechanism for edit 2 (quote_mint memcpy first = let-bound Copy local used after the `Clock::get()?` operand -> MemCpyOpt forwards it to the front) matches this lane's IR edit 2, and its let order gives the phi order (edit 3).
- BEST/ = v1 (meaningful partial, superseded by the peer close).

## Source results (real builds; 436 kept, no_losses in all)
- a (g5n6 port): O0079 has 136 slots; handler regdiff is 59.
- v1 (a + `let event={let quote_vault_balance=...; SellEvent{...}};`): 123 slots, regdiff 53. This is exactly IR edit 1 (StorageLive(event) before qvb).
- I stopped the queued v2..v6 builds. O0079 was CLOSED by o0079-brute-r1 (e1, 437; coordinator base parent-437) with let-bound locals.
  Its mechanism for edit 2 matches this lane's IR edit 2: a let-bound Copy quote_mint used after the Clock::get()? operand, which MemCpyOpt forwards to the front. Its let order supplies the phi order (edit 3).
- BEST/ = v1. It is a meaningful partial, superseded by the peer close.
