# Lane o0079-brute-r1 (O0079 sell_pump_swap handler, 95848 / 17312 B)

## Setup
- root0 = parent-436 + mayhem-o79 g5n3 handler (side:true). Build o0079-brute-r1-g5n3port: 17320 B, 196 winreport slots, no_losses (436).
- Tools: tools/bb.py (batch build+score, IR emission with "ir":true), tools/gen.py (variant generator),
  tools/llc79.py + tools/llcpar.py (parallel llc IR experiments), tools/bdiff.py (exact diff vs original), tools/wd.py, tools/lst.py.

## IR proof (llc, g5n3port IR = ir/g5n3port-ir.ll; specs/x4-x6.py)
x6_9123604578 = EXACT O0079 (0 slots, 17312 B). Edits relative to g5n3port IR:
1. bb52: quote_mint memcpy into event+256 moved BEFORE the side store / sol_vault memcpy.
2. bb48 (native arm) load order: lamports, state.field_56(state+40), gp.sol_deployed(gp+72), pool_quote.amount.
3. bb49 (non-native arm) order: gp.stable_deployed(gp+88), mayhem_quote_vault.amount, state.field_56, pool_quote.amount, quote_mint key memcpy.
4. bb50 phi order: vquote[pool,pool], global_sol[gp.sol,0], global_quote[gp.sol,gp.stable], sol_amount[sol,0],
   state_quote[f56,f56], state_ptr, qvb[lamports,qv], svb[lamports,0], state_sol[f56,0], vsol[pool,0].
   (other orders reach 13 slots; phi order sets spill slots + the native-arm tail merge that saves 8 B)
NB in IR: %2 = a+8 = global_params, %1 = a+16 = mayhem_state.

## Arm/phi flexibility (llc, specs/x8-x10)
- With qm-first + phi order P: native arm must load state before gp (LSGP/LSPG/LPSG ok; LGSP = 6 slots);
  non-native arm: many orders OK as long as the quote_mint key copy is last.
- phi order is the sensitive part (spill slots + native-arm tail merge): several orders give 0
  (e.g. vq,gsol,gq,sol,qvb,stptr,sq,svb,ssol,vsol). o0079-ir-r1 found another exact set from g5n6 IR.
## Source-level leads (00:0x)
- o0079-port-r1: Codex "phased" event block (all fields let-bound, literal in emission order qm,sv,side,...)
  reproduces the original store order exactly; only stack offsets differ (frame 32 B larger). => brute-force
  the phased family (which lets are inline, scope block or not) to fix the frame: batch specs/t3.json (p1-p8).
- O0084 tuple-form builds also put the qm copy first.

## Mechanism found (00:1x): qm-first
- rt/t3.rs: a let-bound Copy local listed in the literal AFTER the `Clock::get()?` operand gets `_t = copy local`
  right before the Aggregate; MemCpyOpt forwards it so its event memcpy is first. => `let quote_mint=...;` +
  `...,timestamp:Clock::get()?.unix_timestamp,quote_mint,...`.
## Phi-order model (llc on g5n3port IR, specs/x12-x13)
- phi order = [state_ptr] + literal order of the if-native temps (duplicate pool phis take the LATER position);
  native-arm load order = first S-field vs first G-field in literal (need S before G), L first when qvb is a let.
- Exact phi orders (with qm-first + LSGP): st + {sq gsol qvb vq gq | qvb sq gsol vq gq | sq gsol gq qvb vq | ...} + sol svb ssol vsol.
- Source candidates c1/c2 queued in specs/t6.json.

## CLOSED 00:4x: e1 (and e2) = O0079 normalized-equal, matched 437, no_losses. BEST/ written.
