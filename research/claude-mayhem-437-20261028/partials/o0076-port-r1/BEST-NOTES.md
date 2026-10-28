# BEST (meaningful partial) — O0076 sweep_fees, lane o0076-port-r1

Build: mayhem-b/out/builds/o0076-port-r1-c0-fix (root = BEST/root, patch = BEST/source.patch vs parent-436).
measure.py vs 436 base: matched 436 -> 436, no_losses true, 0 stack warnings.
O0076: winreport ratio .2817 -> .8088 (8392 B vs 8400), masked (stack+regs) 7 slots (r436/o0076-port-r1/tools/h76.py regs).

## Mechanism
1. `native` is computed in the handler `sweep_fees` (after the require!) and passed to `SweepFees::sweep(&self,
   global_params: &Account<'info, GlobalParams>, native: bool, remaining)`; sweep computes `limit` from the param first.
   Why: the handler's key compare is memcmp-expanded (SBF expand-memcmp after instcombine) into a res_block/endblock
   phi i1. Once sweep is inlined, the limit select's condition is that phi; JumpThreading unfolds the select and threads
   it, cloning sweep's inlined noalias.scope.decl into the true path (dead clone, removed) while the false (stable) path
   keeps the live decl. That arm is non-speculatable, so SimplifyCFG can't fold the triangle back into a select; the decl
   emits no code -> original `mov r2,176 ; jne native ; mov r2,232` + `ldxdw [accounts+r2+344]` (offsets 176/232 come
   from indexing the &Account<GlobalParams> param = accounts+344).
2. O0075-style bindings after the limit: `let mut total = 0u64; let trader = self.trader.as_ref(); let trader_quote_ata =
   ...; let token_program = ...;` (used in the loop) give the preheader load order 600/160/616 then 352.
3. require! stays on line 431, native+sweep call on line 432 (panic/AnchorError line numbers preserved).

## Remaining (7 masked slots)
Loop callee-saved register permutation: original keeps the loop IV (pair offset, +96, ==768) in r8 and reloads it before
is_closed; ours reloads at the latch (r7). Not affected by phi order, ata load order, param order, `let accounts = &*ctx.accounts`.
