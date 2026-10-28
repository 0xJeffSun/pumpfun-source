# mg-M-o83c PROGRESS (O0083 buy_v2_handler, orig 140512, 18648 B)
Work dir: WM/mega/mg-M-o83c (roots/, tools/, logs/, ir/, llc/, exp/), WM=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
Base: parent-439; measure vs WM/mayhem-b/out/builds/mgMint-p439-clean/symbols.so
Start: roots/r5 = o83b BEST-partial r5 (19 reg-masked: C=8 cap, E=11 event; 168 winreport slots)
Tools: tools/b9.sh NAME ROOT [ir] (rbuild; ir -> ir/NAME.ll), sc.py, rs.py (region masked), hk.py (hunks), ctx.py (side-by-side range), grepw.py

## Log
- 02:3x analysis: cap residue = 10000-sub placement. MachineSink model: sub in early IR block sinks A->B->J->L (top of L), stops
  (L2 post-dominates L and holds the use). Orig has mov+sub at top of L2 => sub must be IN the IR join block (DAG-scheduled).
  o84b r3 'lazy retained' (initial_trade_output takes retained_bps, recomputes after cap.early; early call keeps the check)
  + o84c 02:35 real_sol_reserves let-bound before cap.early: O0084 cap C4->C0. Not yet tried on O0083 by o83a/o83b.
- c1 = r5 + o84c BEST state.rs + generic buy_amounts<C> (retained_bps passed through): building.
- 02:37 c1 = r5 + o84c state.rs + generic buy_amounts: cap region EXACT (C 8->0), 11 masked (E only). BEST-partial (c1v).
- 02:4x IR phi-order greedy search on c1 bb66 (13 phis): best (13 masked,36 regexact) -> phi order alone is not the lever.
  Confirmed: DAG scheduler = list-ilp (default); -enable-misched/-post-RA-scheduler off = identical output.
- 02:5x sweep1 (24 perms of pre-Clock literal loads tvb/stn/vt/et): every order with et BEFORE vt -> identical bytes,
  masked 11->5 (orig keeps virtual_tokens in r8 across Clock::get, spills end_timestamp). d1 = BEST-partial now
  (5 masked / 39 regexact / 77 full-slot; winreport 152; 439 no_losses). Literal order itself irrelevant otherwise.
- Frame: spill slots laid out in FI order (8 B each from -1840); StackSlotColoring renumbers by weight (stable), so slot
  offsets = weight order with ties by RA spill creation order. orig has 2 four-access slots (gp.sol_deployed hi spilled at
  def + sol_vault_balance), cand only 1 (quote_vault_balance).
- Remaining 5 masked: native arm (gp.hi spill-at-def, sol reload position, lamports reload) + non-native fresh mov64 r2,0.
- 03:0x g01 = f01 composed with o84c c4 sell_v2 (sell_v2 kept at line 544; o83b r5 file had shifted it -6 lines). BEST-partial g01.
- 03:1x IR-EXACT: g01 IR + phi order of bb66 = _257,_255,rs,gsd,vs,ssd,svb,sa,rq,gqd,vq,sqd,qvb -> llc (0,0,0) 18648 B.
  Mechanism (from post-coalescer MIR): per arm, PHI copies are inserted in PHI order; the first phi of a value pair is
  coalesced with the load (primary), the later one becomes a copy; in bb65 the zero phis are the ISel MOV (first zero
  phi) + rematerialized MOV_ri at each later copy position. Orig: sol phis primary, sa after them, quote copies rq,gqd,vq,sqd,qvb.
  Now mapping to a source let order/form that yields this phi order.
- 03:3x WIN O0083 CLOSED: w01/w01c (identical, fresh copies): norm_eq, 440/441, raw 141->223, no_losses, O0081/82 kept,
  O0084 = o84c c4. BEST/ written (root, source.patch vs parent-439, measure.json, NOTES.md). EVENTS WIN line appended.
  Close = deferred-init event (let x; ... if native{assign sol fields (lamports first), quote=copies}else{...}),
  declaration order qvb,sqd,vq,gqd,rq,sa,svb,ssd,vs,gsd,rs -> phi order = reverse declaration = rs,gsd,vs,ssd,svb,sa,rq,gqd,vq,sqd,qvb.
  Dead ends on the way: tuple form (t01..t06: 6-tuple phi perm 4,3,2,1,5,6), per-field lets in target order (h01: loads before
  lamports call -> hoisted/duplicated loads), phi-only greedy search (local minimum 3 masked).
- 03:2x O0084 ALSO CLOSED with the same deferred-init block on sell_v2 (line 594, on o84c c4): x01/x01c identical,
  441/441 (unmatched none), raw 223, edges 4768, Source 519, no_losses, no stack warning. BEST/ = 441 tree (x01c);
  BEST-o0083only/ = 440 tree (w01c). EVENTS WIN lines for +O0083 and +O0084 appended; FINDINGS lines posted.
## STATUS: DONE. O0083 closed (and O0084). Next for the contract: integrator composes BEST (parent-439 + 4 files) into a
   new base / PR; whole-ELF raw identity is mg-M-raw's job (raw 223 here).
