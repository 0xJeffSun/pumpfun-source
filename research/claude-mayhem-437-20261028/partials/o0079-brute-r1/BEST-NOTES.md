# O0079 (sell_pump_swap handler, original 95848 / 17312 B) — CLOSED

Build: `mayhem-b/out/builds/o0079-brute-r1-e1` (incremental, lane target r436-o0079-brute-r1)
- candidate.so 4bfd62f2550fdcf75d3e40c2ee0e11a2fe92df66bff2a4c2a08018f97755413f
- symbols.so   ea28cd4809fb93df5403ae56ed9b6c767bcf3f0412d684261de97a813145b00e
- winreport O0079: cand 17312, norm_eq=True, diffslots 0
- measure.py vs 436 base (pl-o82-final2-434): matched 436 -> 437, gains [O0079], no_losses true; no stack-offset warning.
- Clean rebuild: stripped candidate.so identical (4bfd62f2...), plain symbols.so 847485d3..., see clean-build.txt / measure-clean.json.

## Source (one file: programs/mayhem/src/instructions/sell_pump_swap.rs; diff in source.patch)
Base handler = lane mayhem-o79 g5n3 (effective_quote/price_check #[inline(always)] helpers, to_account_info Sell
literal in original order, native computed after sell_quote, inline signer seeds) with side:true for parent-436.
Event (line 85), all conditional fields let-bound in this order, quote_mint let last, literal with quote_mint LAST:
```
let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_vault.amount};
let state_quote_deployed=a.mayhem_state.field_56;
let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};
let virtual_quote=a.pool_quote_token_account.amount; let real_quote=a.pool_quote_token_account.amount;
let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};
let sol_amount=if native{sol}else{0}; let sol_vault_balance=if native{quote_vault_balance}else{0};
let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};
let virtual_sol=if native{..pool quote amount..}else{0}; let real_sol=if native{..}else{0};
let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
let event=SellEvent{side:true,<the locals>,sol_vault:a.sol_vault.key(),mint:a.mint.key(),token_amount:tokens,
  token_vault_balance,state_token_net,virtual_tokens,end_timestamp,timestamp:Clock::get()?.unix_timestamp,
  real_tokens,version,retained_reserve_bps,quote_amount:sol,quote_mint};
```

## Mechanism (proved with llc first, then source)
1. quote_mint copy FIRST in the event block: a let-bound Copy local used in the literal after the `Clock::get()?`
   operand gets a MIR temp `_t = copy quote_mint` just before the Aggregate; MemCpyOpt forwards it, so the
   event+256 memcpy is emitted before the side/sol_vault stores (rt/t3.rs reproduces it in 20 lines). Putting it
   last in the literal also places it after the real_tokens/version loads, as in the original.
2. quote_mint's let must come after the other conditional lets so its key copy is LAST in the non-native arm.
3. JumpThreading merges all `if native` into one diamond; arm load order = source order (native arm must load
   state.field_56 before gp.sol_deployed); bb50 phi order = let order (duplicate pool phis take the later slot).
   Phi order sets spill slots and the native-arm tail merge that saves 8 B. Exact phi orders found by llc search
   (lane specs/x12-x13.py); e1 and e2 are two of them.
