# Lane o0077-ir-r1 (IR-first) — O0077 buy_pump_swap handler (85600, 9736 B)

## Tools (tools/)
- llx.py reduce FULL.ll OUT.ll : keep only the handler body, other defines->declares (llc in ~0.2 s)
- ex.py (Exp class: alloca move, lifetime edits, run llc + score), p2base.py (edit recipes on port-r1 p2 IR)
- posdiff.py (positional, unmasked except call targets/lddw imm), stackmap.py (orig->cand stack offset map),
  frame.py (surviving frame objects after PEI), sbs.py (side-by-side differing lines), perm_seeds.py

## Start point
port-r1 p2 (9736 B, 2 masked slots; only frame layout left). IR = ir/p2.ll (copied from o0077-port-r1/ir/p2.ll).
llc of reduced p2 reproduces the rustc build (objcand True). posdiff 383.

## IR PROOF: ir/exact-e10b.ll = llc posdiff 0 (all 1181 insns equal, call/lddw imm masked)
Edits vs p2 IR (each verified incrementally, posdiff 383->380->352->196->110->78->45->6->0):
1. %bump alloca moved right after %authority_info (frame index order => orig bump at r10-169).
2. %mint and %sol_vault (32 B key temps, no markers in p2 => own slots) get lifetime.start before their fill memcpy
   and lifetime.end at the END of event construction (before Event::data); ending right after the event memcpy
   instead pins the memcpy order (worse).
3. %_132 (1176 B buy() by-value arg copy) alloca AFTER %cpi_ctx (orig: cpi_ctx slot at -1880, _132 slot at -3056).
4. lifetime.start(%seeds), lifetime.start(%signer_seeds) moved from before cpi_ctx/clones to AFTER the clone
   lifetime.ends and BEFORE the ctx.bumps load (=> they merge into the 48B clone slots -224/-272; and the
   bump-store scheduling order matches: seeds ptr stores before stxb bump).
5. lifetime.start(%event) at the start of both native/non-native arms (same as O0079 finding #1).
6. bb59 phi order = O0079 order: vquote, global_sol, global_quote, sol_amount, state_quote, state_ptr, qvb, svb, state_sol, vsol.
Final frame: _253 -48, _233 -96, inner_data -120, authority_info -168, bump -169, _105 -224, _104 -272,
9x48 clones -320..-704, cpi_ctx -1880 (1176), _132 -3056 (1176), 18 spills.

## Source mapping hypotheses
1/4: bump bound AFTER the Buy accounts literal temps (higher MIR local index than clone temps), seeds/signer_seeds
   StorageLive after the literal statement ends (i.e. not `let seeds;` declared before CpiContext::new_with_signer).
2: Pubkey temps for sol_vault/mint keep StorageLive/Dead (inline `a.sol_vault.key()` in the literal / a scoped temp,
   not a copy-propagated plain `let`), dying at end of the event statement.
3: cpi_ctx declared before the by-value copy temp: `let mut cpi_ctx=...; cpi_ctx.remaining_accounts=..; buy(cpi_ctx,..)`
   keeps _132 created later; orig needs _132 local index LOWER than cpi_ctx? (allocas are in DESCENDING MIR local order)
5/6: O0079 BEST event form.

## r3 check (port-r1 r3 = plain CPI + block-let event; IR from port-r1 Bb2 handler_v2)
llc r3 = posdiff 383 (frame shifted by mint/sol_vault unmerged 32B slots). + key lifetimes (tools/r3base.keys) -> 36;
+ O79 phi order -> 0. So only (A) key temps with markers and (B) phi order remain at source level.
v1 = r3 + O0079 BEST event statement verbatim (side:false), base parent-437 (building).
