# mg-A-7 progress (AMM windows 0x6d408 0x6db20 0x74b80 0xf28b8 0xf31d8)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-7 (src/ = 733 base copy, target/ warm). Baseline native 728/139 confirmed.
Tools: L/tools/dis2.py (fixed call decode), L/tools/otgt.py ADDR (orig call targets + 733 match names).

## Window identities (733 base)
- 0x74b80 (688) = utils::transfer_fee::amount_before_fee; orig calls 0xf2ed0 = native calculate_pre_fee_amount (cross-crate,
  self passed via 24-byte stack copy: ldxdw [r2+0x18/0x10/0x8]). 733 cand calls spl TransferFee::calculate_pre_fee_amount (spl_fee()).
  Fix idea: add calculate_pre_fee_amount(self,..) to crates/native-transfer-fee (utilmath-r1 matched 0xf2ed0 in-crate).
- 0xf28b8 (1192) native crate fn called by 0x73ef0 (Codex-only window); calls __multi3/__udivti3.
- 0xf31d8 (664) native crate fn called by from_mint 0x74128 = decoder (utilmath-r1 best 38 difflines).
- 0x6d408 (1816) updater, only caller claim 0x5a570; 733 base has it inlined in incentives::claim (no separate fn).
- 0x6db20 (6312) update_token_incentives, caller 0x16128 (admin handler); 733 cand fn is 5760 B.
## Log
- 01:55 WIN mg-A-7-01 (733 base): +0x74b80 +0xf2ed0 -> 730/150. native calculate_pre_fee_amount(&self) + `match *data` in amount_before_fee.
- 02:12 BASE moved to union-744n (WA/lanes/mg-union/u744/src). src-733 kept as $L/src-733. WIN mg-A-7-02 (u744): +0x74b80 -> 745/150
  (u744 already had 0xf2ed0 with `self` by value; switching to &self keeps 0xf2ed0 and gains 0x74b80).
- 0xf31d8 decoder: harness $L/h (build.sh 0.2 s rustc no_std crate, cmp.py difflines; ir.sh/llc.sh reproduce exactly).
  Source sweeps gdec.py/gdec2.py (~1000 variants): best 40 difflines (nested `if len != 82 {..} Ok(None)` forms).
  IR surgery (irmove.py/irsearch.py on t0.ll) -> 10 difflines with 3 block moves: OkNone block after zero-loop Err,
  Err(entry_size) block right after the check, advance(bb29)+get-check(bb47) before the kind==1 body. Residual: offset/fees
  init order (phi order) + `fees.is_some()||length<108` split polarity. MODEL: BPF analyzeBranch can't handle cond branches,
  so layout ~= IR block order at ISel; rustc creates LLVM blocks in first-reference order; SimplifyComparisonIntegral makes
  `x==C` put the then-block first, `<`/`>` put the continuation first.
- 02:35 0xf31d8 decoder (native crate; harness h/): best SOURCE variants
  h/dec/tl_kb0p0e3k0.rs = 20 difflines/648 B; h/dec/tl_kb1p0e3k1.rs = 33/656 B whose IR needs ONE block move
  (h/irmove.py kb1k1.ll "bb49>bb30": loop latch get-check block right after the ADV block) -> 0 difflines/664 B (exact).
  Source idioms that moved bytes: head `if len != 82 && len < 167 {Err}; if len == 82 {Ok(None)}` (OkNone block created late;
  plain `if len==82 {return Ok(None)}` makes SimplifyComparisonIntegral create OkNone first); `let mut fees` declared before
  `offset` (phi order r8/r4); entry check as `match remaining.get(4..entry_size) {Some(v)=>v, None=>return Err(())}` (match lists
  None first -> Err block created first; let-else lists Some first); `let is_fee_config = kind == 1;` computed right after
  reading kind (cmp in another MIR block -> no SimplifyComparisonIntegral -> ADV block created before K1); separate
  `if fees.is_some() {Err}` / `if length < 108 {Err}`. Unsolved: latch block (offset=next; goto head) is always created after
  K1's blocks (RPO join). Tried: Option offset, ADV at loop top, overflowing_add, pre-computed next, match/continue dispatch.
- Panic Locations (rodata) decode orig source layout: L/tools/plocs.py orig ADDR. volume_accumulator.rs orig: end_day expect @54,
  updater index @79, Truncation @104, expect @109, helper @391/393, to_usize @398; update_token_incentives errors 251..352.
- 0x6db20: ported poolstate uti6 helpers into u744 + padded error lines to orig (all 9 line imms now equal) -> 6320 vs 6312 B,
  multiset diff 12/13 (spill of token_supply arg, block order). gen/va.p2 = current file.
- 03:2x 0x6d408 updater (u744 tree): helper `fn roll_over(&self, user, current_day, now) -> Result<()>` containing the WHOLE previous-day
  logic (if let Some(last)=day_index(..) { let end_day=self.end_day(); if chain { reward; let Ok(t)=u64::try_from(..) else {return
  err!(Truncation)} @104 } }) called as `self.roll_over(user, current_day, now)?;` => LLVM inlines it at the call site so the TODAY
  block is created after the reward chain (orig order). 225 -> 114 difflines (gen/upd_u2.rs; tools/tryupd.sh NAME builds gen/upd_NAME.rs).
  No effect: mul operand order, nested ifs, `?` vs if-let/match, let-else vs match early return. Residual: orig spills the Result tag 2
  ([r10-0x150]) at entry and keeps current_day in r6 (cand spills current_day); orig shares base r8=self+day*8 for sol_volumes and
  total_token_supply loads (cand recomputes); llvm.bpf.passthrough + select in cand's && chain. Orig panic lines say TODAY code is in
  helpers at ~54 (user expect) and ~391/393 (global) -> try TODAY as two inlined helper methods next.
- IR tools: tools/nbuild-ir.sh $L (slot-locked cargo rustc --emit=llvm-ir into target-ir/ -> out/crate.ll, 20 s), h/ironly.py (one-function
  module, llc 0.05 s), h/irs2.py (greedy block-move search; renames %N values).
- 03:4x 0x6d408: TODAY split into two inlined helpers (UserVolumeAccumulator::add_sol_volume + GlobalVolumeAccumulator::add_sol_volume,
  matching orig panic lines 54 / 391,393) -> 103; plus `needs_claim` assigned before `last_update_timestamp` in both roll_over and the
  user helper -> 99 (gen/upd_u10.rs; partial patch partials/va-u10.patch vs u744, 0 losses, not a win). Left: tag-2 spill vs current_day
  spill, GEP base sharing.
- Partials: partials/decoder-20.rs, partials/decoder-33-ir-one-move.rs (native-crate decoder sources for the harness).
- 03:2x(clock) 0x6d408 u11: SIZE NOW EQUAL (1816 B), multiset 4/4, 78-80 difflines. Key idiom (found with a 0.2 s harness probe
  h/gep/g3.py): read both day values BEFORE the checks and use an early return for the user check:
  `if last<cur && last<=end { let sol_volume = self.sol_volumes[d]; let token_supply = self.total_token_supply[d];
   if sol_volume > 0 { if user.current_sol_volume == 0 { return Ok(()); } reward } }` -> no select/passthrough merge, shared base
  reg for both arrays, cur_vol first __multi3 operand (all as orig). partials/va-u11.patch (vs u744, 0 losses), gen/upd_u11.rs.
  Residual = register allocation only: orig spills the Result tag (2 at entry, err tag on error path) to [r10-0x150] and keeps
  current_day in r6; cand rematerializes 2 and spills current_day; orig `?` check is `jeq r0,2,+1; ja ERR` (TODAY not IR-next).
- 03:1x 0x6d408 further: u12-u19 (if-let Err / match / is_err, map_err closure, ok_or_else, match try_from, if-let current_day,
  early return for end_time) -> no change (80) or worse. IR experiments on u11: block moves (irs2) 78->72 only; branch_weights on every
  branch (h/irprof.py) no change; splitting the error-return edge no change. => residual is greedy-RA split/remat of the Result tag
  (orig: tag vreg spilled once at entry -> single shared exit block; cand: tag remat'd, current_day spilled, exit tail-merged).
- 03:1x 0xf31d8 more loop skeletons (while-let, while offset<=len, break forms): plateaus at 20 / 33 again.
- 0x6db20: error-block order in orig = 327,251,329,263,331,291,292,313,352 (interleaved time-range/supply), cand 251,327,329,331,263,
  291,313,292,352; plus token_supply arg spilled at entry in orig. require! form variants (S0..S5) ~no change.
- NOTE u750 changed the u744 updater condition order (end_day before current-day compare, runtime-suite fix). My roll_over calls
  `let end_day = self.end_day();` before both compares -> same panic behavior as orig (asm: end_day call precedes compares).
## STATUS (03:3x)
- Wins: mg-A-7-01 (733 base: +0x74b80 +0xf2ed0), mg-A-7-02 (u744: +0x74b80; composed into u750).
- Lane tree $L/src = u744 + win02 + partial volume_accumulator.rs (gen/va.u11): 745/150, 0 losses, clean.
- Best partials: 0x6d408 u11 (equal size, RA-only residual, 72-80 lines); 0xf31d8 decoder 20 lines (one IR block position from
  exact: latch block after ADV); 0x6db20 6320/6312 B with all 9 error lines matched; 0xf28b8 scanner ~157-182 lines.
- Next ideas: (a) decoder: find a source shape where the loop latch block (offset=next; goto head) is created before K1's blocks
  (rustc creates it after K1 because ADV is a join); (b) updater: RA flips if the Result-tag phi gets one long live range
  (spilled) instead of rematerialized 2s - try shapes that change PHI elimination (e.g. early returns funnelled through one block);
  (c) 0x6db20: orig error-block order 327,251,329,263,331,291,292,313,352 hints that time-range/supply checks interleave in IR.
- 03:2x 0x6d408 result-flow variants: returning the roll_over `result` at the end (u21/u24/u27: `let result = roll_over(..);
  if result.is_err() { return result; } TODAY; result` or `.map(|()| TODAY)`) -> 68 difflines (1800 B) with current_day kept in r6
  like orig but tag/payload roles swapped (payload spilled, tag in r8, user spilled). `?`/Ok(()) family stays at 80 (1816 B).
  mutable result local (u29) 114, combined early return (u30) 105. IR tests: opaque single "2" value, phi incoming order,
  payload extract on error edge -> no RA flip.
- 03:2x stopped: no further win found. Lane tree left at best partial (gen/va.u11 in $L/src, 745/150, 0 losses).
  Files: partials/{va-u11.patch, upd_u11.rs, decoder-20.rs, decoder-33-ir-one-move.rs}; tools/{tryupd.sh,tryuti.sh,mkva.py,
  nbuild-ir.sh,dstat.sh,plocs.py,otgt.py}; h/{gdec*.py,gtail.py,gscan.py,irs2.py,irmove.py,irprof.py,phiperm.py,gep/g3.py}.
- 03:3x decoder new near-misses (harness): h/dec/k8_k8e.rs (20 diffs, 83/83 insns: `if is_fee_config { if fees.is_some() {Err}
  if length < 108 {Err} } if is_fee_config { fees = .. }`) -> exact with 2 IR moves (ADV block right after dispatch + an Err block
  after K1's length check); h/dec/k9_k9a.rs (34 diffs: `if length >= 108 { fees = .. } else { return Err(()) }`) -> exact with 2
  IR moves of identical Err blocks only (head len<167 Err placed after the OkNone block; K1 length Err placed in the head region)
  => remaining gap is purely which identical `return Err(())` block BranchFolding keeps (tail-merge survivor) - controlled by
  Err-block creation order. Updater batch (24 builds, gen/runall.log): plateaus 68 (return-result family) / 80 (`?` family).
- 03:34 WIN mg-A-7-03 (u744, cumulative with 02): +0xf31d8 (raw-equal too) -> 746/151, 0 losses. Decoder moved to native crate with
  the kb1k1 loop + head `let is_mint = data.len() == 82; if !is_mint && data.len() < 167 {Err} if is_mint {Ok(None)}`. Found via
  h/errsearch.py (ERR-block-only IR moves: moving the head's len<167 Err block anywhere else gave 0) then h/ghead2.py variant 'i'.
  Lane src now = u744 + win03 (volume_accumulator.rs back to u744; the 0x6d408 partial lives in gen/va.u11 / partials/va-u11.patch).
- 03:4x 0xf28b8 scanner with decoder idioms (h/gscan2.py, 192 variants): stuck at 182 / 145 insns (orig 149). IR shows
  SimplifyCFG folds `entry_size > len` and `kind > 26` into one or.cond (cand emits kind check first, before the length load);
  orig keeps entry check then kind check, spills allow_extensions at entry, MERGE (overflow+seen|=bit+get check) at loop top,
  single shared `exit`. Next: find a kind>26 form that is not folded (enum try_from / match range / table get), then reuse the
  decoder's errsearch workflow (here returns are phi'd bools, so check which return-false edges must stay separate).
- 03:4x scanner: `let Some(bit) = 1u64.checked_shl(kind as u32).filter(|_| kind <= 26) else {false}` -> 167 (150 insns);
  IR block moves alone take it to 86 (h/s3.ll) -> block-creation-order work like the decoder is the way forward.
## FINAL (03:4x): wins mg-A-7-01 (733), -02 (u744 +0x74b80), -03 (u744 +0x74b80 +0xf31d8, 746/151). Lane src = u744 + win03.
