# mg-M-o84c PROGRESS (O0084 sell_v2_handler, orig 159160, 18096 B)
Work dir: WM/mega/mg-M-o84c (roots/, tools/, logs/, out/, exps/), WM=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
Base: parent-439 (439/441); measure vs WM/mayhem-b/out/builds/mgMint-p439-clean/symbols.so
Start point: WM/mega/mg-M-o84b/BEST-partial (r3: 7 masked lines, 18088 B, no_losses, O0081/O0082 kept).
## 02:30 start
- Read RULES/TASK/FINDINGS/TECHNIQUES/o84b+o83a+o83b PROGRESS. Copied o84b tools into my tools/ (paths repointed).
- Plan: reproduce r3 IR via llc; test alias metadata / attributes / value types / block structure on the residue (TASK strategy).
## 02:35 WIN-partial c1 = 3 masked lines (BEST-partial/)
- IR test (exps/e1.py, e2.py on r3.ll): moving the max operand load (curve+96, real_sol_reserves) out of the cap-join block into
  the raw_quote block or the pre-compare block = llc 7->3 (C4->0). So the cap cluster is NOT scheduler-bound.
- Source: state.rs ito line 351 (line-neutral): let real_sol_reserves=c.real_sol_reserves; BEFORE output=cap.early(output).
  Real build mg-M-o84c-c1: O0084 3 masked (A3), 18088 B, 439 no_losses, O0081/O0082 norm_eq, no stackwarn. Saved BEST-partial/.
- FINDINGS line posted (transfers to O0083 cap residue).
- NOTE: work numerically only (scores/counts); no instruction listings in context.
## Next: A3 (event arm region): phi order of the event join block, constant-typed phi inputs, arm load order -> IR exps, numeric scores.

## 02:55 BEST-partial = c4 (4 masked, diffslots 73, len 18096=orig) — improved from o84b r3 (7 masked, diffslots 159)
Two source levers on parent-439 (state.rs + pump_interface_v2.rs only; O0081/O0082 norm_eq; 439 no_losses; clean sha 9f1f17d5):
- c1 (shared state.rs ito line 351, LINE-NEUTRAL): `let real_sol_reserves=c.real_sol_reserves;` read BEFORE `output=cap.early(output);`
  so the max operand load is NOT in the cap-join block -> cap region C4->C0 (7->3). IR-PROVEN (exps/e1.py,e2.py on r3.ll;
  moving the curve+96 load out of the join block = llc 7->3). DISPROVES o84b/o83a "cap is scheduler-bound": it was a source-movable load.
  Composes with mg-M-o83b buy side (shared ito). Posted FINDINGS 02:35.
- c4 (pump_interface_v2.rs line 594 let order, LINE-NEUTRAL): compute `global_quote_deployed` BEFORE `real_quote`
  -> recovers orig instruction count (18088->18096) and drops diffslots 149->73.
Residual A4 = post-ISel RA/scheduler (confirmed exhausted):
  quote_vault_balance spill-reload scheduled 64B early (O+15392 vs orig O+15456) + one zero-materialization mov (O+15720 vs orig O+15768).
Levers tested & DEAD (all real builds on parent-439 unless noted):
  - let order: moving the (quote_vault_balance,sol_vault_balance) pair anywhere worsens (breaks the shared-value dep); swap4-5 (global_quote<->real_quote) is the only improving swap. All other adjacent swaps >= base.
  - literal field order: fully NEUTRAL (all 24 adjacent swaps identical; MemCpyOpt/SROA normalizes store order). Confirms o84b.
  - IR event-join phi permutation (exps/p1-p3.py): floor = 1 masked (end2 = quote_vault_balance phi last), BUT does not map to source
    (c2/c3/c5: any let move that reorders the phi also changes the lamports() sharing -> 18056/18120/18144, worse). Spill reload is post-RA, not an IR load.
  - reference rebind of bonding_curve via `c` after reload(): borrow-checker blocked (reload needs &mut).
  - sol_vault_balance recompute lamports (c2/c5): worse (2nd call). lamports() is a call (0x678c8), not a CSE-able load.
Roots kept: roots/{r3(o84b start), c1(cap-only), c4(BEST)}. Builds mg-M-o84c-{c1,c4,c4v,vlit,vlit2,vlit3}. BEST-partial/ = c4.
NEXT IDEA (most promising, untried): the spill reload is driven by register pressure across the if-native event diamond. A LOWER-pressure
form of the whole event block (fewer simultaneously-live event locals) could let RA keep quote_vault_balance in a reg and place the single
read at orig's O+15456 + materialize the 2nd zero where orig does. Try: build the event struct field-by-field with direct stores to a
stack SellEvent (no per-field let), OR a frame/alloca-order match (llc -stop-after=prologepilog vs orig) per o83a's unexplored lever.

## 03:22 FINAL — lane stopped (coordinator): O0084 CLOSED by mg-M-o83c (441/441, built on my c4 state.rs + sell_v2)
o83c's close = my c4 (cap load-hoist + let swap) + the 11 event locals declared first and assigned in ONE
`if native {...} else {...}` (fixes the join phi order) + end_timestamp before virtual_tokens in the literal.
Continuation work (03:00-03:20), recorded for reuse:
- The true norm metric is irx `pos`: norm_eq masks only call/lddw immediates, so registers and stack offsets count.
  c4 = pos 49 (5 reg-only in the native arm, the reload/mov moves, 7+13 offset-only).
- The offset diffs were a permutation of the event phis' spill slots (-1784..-1912), so they follow the phi order.
- An IR phi permutation of the event join block is a faithful proxy for a let reorder (the c1.ll phi swap 6<->7 equals the real c4
  build exactly, 18096/49/4). Phi order = let order. The IR floor reached with the per-let form was 1 masked (quote_vault_balance phi last).
- Dead ends (real multi-variant builds on c4): reversed dependency quote_vault_balance:=if native{sol_vault_balance} adds an
  instruction (len 18104, pos 336+) at every position; block-let neutral; quote_mint let before the lets worse (56);
  let-bound scalars are position-neutral in the literal, but inline field reads crossing Clock::get()? (sw11) and the
  sol_vault/mint key-temp order (sw1) are not.
Lane state: BEST-partial/ = c4 (4 masked, pos 49, clean sha 9f1f17d5). Roots r3/c1/c4 kept. No background jobs left.
