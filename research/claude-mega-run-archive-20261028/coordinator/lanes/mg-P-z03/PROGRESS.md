# mg-P-z03 PROGRESS (mega run)
Start: deliveries/r5-z03-07 (914/165). Baseline for scoring: deliveries/r5-z03-07/score.json.
Work dir: claude-pump-work/lanes/mg-P-z03/{src,work,runs,try.sh}.
Windows: 0x3cd50 prepare_bonding_curve, 0x3e550 fee_recipient helper, 0x3fb70 migrate::execute, 0x45fa0 boost, 0x49888 (?)

## Log
- 01:5x set up lane dir, baseline build b00 running.
- 01:53 b00 = 914/165, sha c06164f8 (= start delivery), 37 s build. Ratios at start: 0x3cd50 0.9245, 0x3e550 none (z08 lane
  r5-z08 has a set_fee_recipients validator at 0.399), 0x3fb70 0.8672, 0x45fa0 0.262 (bW 0.277 not in tree), 0x49888 =
  ORIGINAL migrate_v2::execute (migrate_v2.rs 243/249/335) calling z04's helpers; ours is monolithic 28 KB -> needs the
  migrate_v2 split (r5-z04 deliveries + mg-P-z04 helpers).
- 0x3cd50 diff = only branch order: orig tests fund tag first (jne r8,2; mov r8,2; jgt size,165), ours size first.
- 02:15 REBASED onto L13 (962/165; src_r5 = old start). try.sh now uses tools/nbuild.py + L13 baseline.
- 0x3cd50: multiplex (tools/mx_prep.py + prep_v*.py) found form a2 = 0.9937 (1 insn):
  `let funding=fund(..); if funding.is_err(){return funding;} if current_size>=166 {return funding;}
   curve.to_account_info().realloc(166,false)?; Ok(())` (two separate `return funding` => CVP puts tag=2 into the 2nd
  phi incoming => SimplifyCFG cannot merge the two tests => tag tested first, as orig). Residual: load order after the
  realloc-error From call (orig payload,dataRc,tag; ours dataRc,payload,tag). llc proof (tools/irt2.sh): moving
  `%_29.1 = extractvalue` (From payload) after the `%_14.val1` load => byte MATCH. Base form had that order because
  its return phi was an aggregate phi (InstCombine phi-of-extractvalue fold); a2's payload phi has an undef (Ok(())) incoming.
- 02:25 REBASED onto L15 (972/165; L15 has 0x43ea0 create_pool matched via a seeds closure). src = L15 + prepare a2
  (6 lines, line-neutral). m02 = 972, 0 losses. Old trees: src_r5 (r5 start), src_l13.
- IR finding 0x3cd50: llc match also when `%_29.1 = extractvalue %41,1` sits at the END of the From block or in the
  next block (exit.i39) -> original's payload extract/export happens after the drop_in_place promoted loads.
  Tried (all 0.9937 or worse): map_err forms (1232 B), match/if-let forms, nested inline(always) helper, closure, return Ok.
- 02:45 0x3fb70 execute: multiplex tool tools/mx_exec.py (+ex_v1.py): `return Ok(())` tail, `let c=&a.bonding_curve`,
  `if let (0,0,0,0)` -> all 0.861-0.866 (no gain). Main residual: sret ptr handling: orig exit block (function end) reloads
  r6 from [r10-0x3a0] once; ours reloads r6 on ~11 incoming error paths and the exit sits mid-function (+9 slots).
  IR weights on the already-migrated branch (tools/irt4.sh) did not help.
- 02:31 WIN 0x45fa0 (boost) -> deliveries/mg-P-z03-01 (973/165 on L15, 0 losses). Steps: seeds closure 0.94, let-else
  require-first 0.966, `let bump` before closure 0.9989, function moved so require is on line 527 (pad 337-522) -> MATCH.
  Tools: tools/mx_fn.py (generic multiplex: FILE/START/NAME/CALLER_FILE/CALL/COND + VARIANTS), bo_v*.py.
- 02:5x 0x3cd50 PARKED at 0.9937 (1 insn): forms returning `funding` (aggregate return phi) always test size first
  (SimplifyCFG merges the and) = 0.9245; the two-`return funding`+`Ok(())` form tests fund-tag first = 0.9937 but then the
  realloc-error `From` payload extract is scheduled one slot early vs orig. llc proof: moving `%_29.1=extractvalue` after the
  drop-loads = byte MATCH, but no source form produces that (base's aggregate phi needs size-first). Tried ~25 forms
  (prep_v1..v6: match, if-let, map, and_then, nested if, new_size var, map_err, closures, helper, inline). Best partial kept.

## FINAL (02:48)
WIN: 0x45fa0 -> deliveries/mg-P-z03-01 (973/165 on L15, composed into L19; base now L22=980). My src tree = L15 + prepare a2
  + boost match (best partial; lives at claude-pump-work/lanes/mg-P-z03/src).
Partials (all diagnosed, not matched):
 - 0x3cd50 prepare_bonding_curve 0.9937 (1 insn, scheduling wall; a2 form in src, carried in L19+). ~30 forms tried.
 - 0x3fb70 migrate::execute 0.867 (body byte-identical; pure MachineBlockPlacement; weights don't help).
 - 0x3e550 set_fee_recipients validator 0.39 (co-owned with mg-P-z08 who holds the set_params/0x1367c0 context).
 - 0x49888 migrate_v2::execute (monolith; needs the full migrate_v2 helper split that mg-P-z04 is building).
Tools added (reusable): tools/mx_prep.py, tools/mx_fn.py (generic single-fn multiplex via lib.rs match dispatch),
  tools/mx_exec.py, tools/ocalls.py / ccalls.py (orig/cand call lists), tools/callers.py, tools/irt*.sh +
  tools/irmove.py/irsub.py/irprof.py/irw.py (llc IR perturbation: reorder/sub/branch-weights, ~3s each, no build slot),
  tools/nbuild.py (+nbuild_ir.py for BFI/IR on the nested-crate L13+ trees). try.sh builds + scores vs L15.
Most promising next idea: 0x49888 — apply the migrate v1 helper decomposition (already in migrate.rs) to migrate_v2::execute
  once mg-P-z04 lands its migrate_v2 helper windows (create_associated_account/transfer/fund/create_pool/boost/burn/close);
  the v1 execute is byte-identical in body, so the v2 handler should match too once its callees are split out.
