# o0076-port-r1 — O0076 sweep_fees (77200, 8400 B)

Base: parent-436 (copied to roots/base). Base O0076 = 8464 B, ratio .2817 (winreport), masked-regs .815 (tools/h76.py regs).
No prior lane had a better *source* state for O0076 than parent-436 (mayhem-b / mayhem-o76 only had IR results;
Codex mayhem-priority sweep work predates O0075 close). So "port best" = parent-436 itself.

## Tools
- tools/h76.py SYMBOLS.so|X.bin [regs] [full] — masked hunks vs original O0076.
- tools/trace.py PRE.ll — opt O3 print-after-all on trader sweep fns; shows where limit phi/select form changes.
- mini/mk.py VARIANTS.py — compile tiny no_std Rust snippets with the lane rustc (sbpf target) in 0.3 s and report the
  limit form (select vs br+phi). No anchor, so only qualitative.
- specs/q*.py — preopt.py (mayhem-o76) experiments on base-noopt.ll; specs/x*.py — irx.py llc experiments on post-opt IR.

## Results (IR)
1. Original = flattened (select-chain) key compare + REAL branch on native with phi(176,232) off accounts+344 + one load in
   the join (mayhem-b). Only site of this idiom in the whole original binary (scanned all 441 windows).
2. llc on post-opt IR: branch+phi(176/232) in its own join (x1-br) = 8392 B, 40 masked slots; with load order T,L,A,P,G
   in the join (mayhem-o76 e2b-TLAPG) ~6 real slot diffs. So branch form is the target.
3. Branch weights on `br native` (pre-opt) do NOT survive: early SimplifyCFG/InstCombine fold anyway (q1).
4. Helper CALLS in both arms (LLVM-inlined later) -> select of two loaded values + GVN specialises the second sweepable
   (inside if native) to the sol value -> 8400 B, 379 slots, masked .96. llc confirms: value-select alone = 948 slots, value
   select + native-arm specialisation = 379 slots (x3). Not the original form (two loads), but shows the layout lever.
5. Pipeline facts: SBF inserts expand-memcmp after each instcombine in function simplification. With the key COPIED
   (`key()` by value, as now) ExpandMemCmp loads come from an alloca -> speculatable -> SimplifyCFG flattens the chain and
   the limit becomes select. With the compare on the key REFERENCE (`*info.key == ID`), the chain stays branchy and
   InstCombine unfolds the limit select into br+phi of offsets (mini m_ref) — but then the compare is short-circuit,
   which the original is not.
6. Unconditional block splits around the select do nothing at llc (x2).
7. **Mechanism proven (pre-opt IR, full O3 + llc):** a non-speculatable, codeless instruction in the limit arms keeps the
   branch. noalias.scope.decl in BOTH arms (scopes kept alive) -> diamond (jeq/mov 520/ja/mov 576), 42 masked slots.
   llvm.sideeffect in the STABLE (else) arm only (q6-se2) -> triangle `mov r2,520 ; jne native ; mov r2,576` = exactly the
   original branch shape, 8384 B, 39 masked slots. In the native arm only -> select-like/bad. Remaining after q6-se2:
   (a) base: orig offsets 176/232 off accounts+344 (we get 520/576 off accounts); (b) join load order (orig 616,160,(352),600,limit);
   (c) 4 loop reg slots at 1328/3472/4744/4936 (shared by every branch variant incl. mayhem-o76 e2b).
   => need ordinary source that leaves a codeless side-effecting instruction in the else arm only.
8. **Source mechanism (IR-verified, q8):** native computed in handler and passed into sweep -> after inlining, the handler's
   ExpandMemCmp endblock phi i1 is the select condition; JumpThreading (CGSCC, after the inliner) unfolds the select and
   threads, cloning sweep's inlined noalias.scope.decl into the true path (clone dead) while the stable path keeps the live
   decl -> triangle survives to codegen. q8-nathandler = 8384 B, rratio .989, prefix 85 (same as q6-se2).
   Base build reproduced e93b60f1/49d70dc7 (o0076-port-r1-base).
9. **REAL BUILD a3-nat-gp-vs** (native computed in handler; sweep(&self, global_params: &Account<GlobalParams>, native, rem);
   limit + validate_sweep use the global_params param): O0076 winreport ratio .2817 -> .8203, 8384 B, h76 masked 14 slots,
   no_losses true, 0 stack warnings. Remaining: (i) my spec bug put require! on line 432 (stw 431->432) — fix;
   (ii) join load order (needs IR order trader(600), ata(160), token_program(616) before gp(352) — x5: T<A<P<G);
   (iii) 4 loop register-assignment spots (IV r8 vs reload) seen in every branch variant.
10. c-batch (on b3 + require! line fix): c0-fix = 8392 B, 7 masked slots, no_losses -> BEST/ (meaningful partial).
    `let accounts = &*ctx.accounts;` (c1) and param order native-first (c2): identical. a4 (native computed BEFORE require!):
    worse (154 slots). Remaining 7 slots = loop callee-saved permutation (IV r8/ata-info r6/amount r7 in orig vs r7/r8/r6).
    llc sensitivity on real c0 IR: single-branch weight perturbations (y2, 100 runs) and phi-order (x7) never fix it.
    NOTE: earlier IR artifacts that preopt/irx wrote into mayhem-o76/llc were moved to r436/o0076-port-r1/llc/from-o76.
