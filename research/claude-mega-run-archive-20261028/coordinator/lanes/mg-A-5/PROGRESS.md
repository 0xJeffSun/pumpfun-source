# mg-A-5 progress
## 02:52 REBASED onto union-752 (WA/lanes/mg-union/u752/src); 0x49b50 is in that base (WON, banked). nb.sh now measures vs matched-union-752n.
## 0x4c750 best partial = gen/best_cb_partial.rs (cb_v16, uses `create` not create_idempotent per mg-A-int runtime finding): exact 9024 B, IR -189, build 752/150 no losses (not a win). Residual = global callee-saved reg permutation (r6/r7/r8/r9) from prologue; IR block moves don't help -> RA coloring. Build with: gen/asm.sh exec_m1c.rs cb_v16.rs (part_head/part_vp match u752).
 (AMM sell area: 0x49b50 sell handler 9184 B, 0x4c750 sell cashback helper 9024 B)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-5. src = u744 union base (ported 02:20) + my sell.rs + lib.rs l13/l214.
(src733 = old 733-based tree.) Tools: $L/tools (dis.py fixed, nb.sh build+measure vs matched-union-744n, sz.sh sizes+diff counts,
emitir.sh crate IR (slot-locked), llc.sh, odiff.py OBJ ADDR SYM = diff orig vs .o fn, irfn.py). Generator: $L/gen/asm.sh EXEC CB
(part_head.rs + exec_*.rs + cb_*.rs + part_vp.rs -> mk.py aligns '//@N' markers with blank lines at '//PAD').
## Status (02:20)
- sell handler rewritten from orig asm (gen/exec_p3.rs): 9176 B vs orig 9184, normalized diff ~240 lines (was 11992 B / ~1000).
- cashback = sell-r1 v8 (10 params): 9056 vs 9024, diff ~200.
- Build: 744/150 raw, no losses (no gain yet).
## 02:42 WIN 01: +0x49b50 -> 745/785 raw 150, no losses. wins/mg-A-5-01.patch (+json). Source = gen/win01_exec.rs + gen/win01_cb.rs
  (snapshot of tree: $L/win01-src). Last step: `match fees.creator_fee { 1.. => { if is_cashback {..} else {..} } 0 => {} }`
  (avoids the if-condition temp that gave validate/transfer/cashback errors a private drop node -> merged error block).
## 0x4c750 cashback partial (gen/best_cb_partial.rs = cb_v11): now EXACT original length 1075 instr, IR diff -188 (40 reg-only,
  13 jump-only, ~10 structural). KEY: signer seeds must be `let bump=[bump]; let seeds:&[&[u8]]=&[b"user_volume_accumulator",user_key.as_ref(),&bump]; let signer_seeds=&[seeds];`
  passed as `signer_seeds` (not `&[signer_seeds]`) to invoke_signed. (v8's inline &[&[..]] gave wrong frame.)
  Remaining structural: error-stub ORDER (orig 464,502,467,502 vs cand 464,467,502,502 -> is_writable@467 stub placed after
  create/transfer in orig); disc-check branch polarity @390 (jeq+ja vs jne); ATA-expected block @528 placement. These are cold-block
  layout; register r6/r7/r8/r9 permutation (40 hunks) propagates from them.
## Old next: 0x4c750 cashback helper (cb_v9 = v8 body with typed params): 9056 B vs 9024, diff ~200.
## Findings
- execute must be external: `pub use instructions::swap::sell as legacy_sell;` (lib.rs line 13, same line) + Context<'_,'_,'info,'info,..>.
- orig handler shape: 4 reserve loads up front (pool_base, user_quote, user_base, pool_quote), pool.effective_quote_reserves(),
  quote_for_sell, select_and_apply, whitelist -> AppliedFees::default(), 167 closure, require_gte!(pool.available_quote_reserves(q)?, ..)@171
  (macro re-evaluates -> 2 calls), 179/183 closures, from_mint(&quote_mint.to_account_info()) + amount_after_fee, require_gte@189,
  196 closure (quote_transfer_fee), transfer_checked(&user), transfer_from_pool x2, split_buyback, creator: if !cashback_coin
  {validate_pool_v2(..,0); transfer creator vault; idx=1} else {cashback(10 args); idx=3; flag}, get_buyback_accounts,
  if buyback_fee>0 {create_ata_if_empty; transfer_from_pool_to_raw}, event with is_cashback flag, buyback_fee=amount_after_fee(&quote_fee,..)?,
  can_boost(), emit!(event); emit_cpi!(event) (no clone).
- llc on emitted IR reproduces nbuild bytes exactly (only call normalization differs).
## 02:27 best = gen/best_exec.rs (=exec_f1) + gen/best_cb.rs (=cb_v9): build 744/150 no losses; sell 9168 B (orig 9184), diff -28/+26
- e1/e2: event literal field order matters: orig order = declared order but holder_rewards_bps/holder_rewards moved before
  buyback_fee_basis_points (selects come out reverse of literal order within a run): -240 -> -72.
- f1: `let is_cashback = fees.creator_fee > 0 && ctx.accounts.pool.is_cashback_coin;` up front + `if creator_fee>0 { if is_cashback {cashback; idx=3} else {validate; transfer; idx=1} }`
  fixes branch polarity and flag materialization (-72 -> -55).
- cb_v9: cashback params user:&Signer, quote_token_program:&Interface, system_program/associated_token_program:&Program
  -> LLVM ArgPromotion loads them at the call site, giving orig arg order (-50 -> -23 at IR level).
- IR experiments (ir/): un-merging the 3 error paths (validate_pool_v2, creator transfer, cashback) that SimplifyCFG merges
  into one phi block gives orig stubs; with that + arg order the sell diff was -3/+3 (only the cashback Ok-edge copy placement).
- dead ends: tuple-if for (index, flag) (worse), cold attribute on cashback (block moves to end), named locals for
  pqta/quote_mint/key before cashback call (worse), named base_mint key local in either branch (worse).
## Remaining diffs in sell (as of p3, superseded)
- reserve load order; whitelist select register assignment; cashback branch layout (orig: non-cashback fallthrough;
  marking cashback call cold moves block to end = wrong); event: orig computes holder selects + quote_transfer_fee sub before
  amount_after_fee/can_boost, cand after.

## 02:54 STOP point
- WON 0x49b50 (sell handler). Banked by mg-A-int into union-752 AND union-753 (runtime-verified, 0 mismatches). wins/mg-A-5-01.{patch,json} (patch uses a/ b/ rel paths, applies -p1 to u744; uses associated_token::create).
- 0x4c750 cashback: best partial gen/best_cb_partial.rs (=cb_v16): exact 9024 B, IR -189, builds 752/150 no losses on u752 (NOT a win). Residual = global callee-saved register coloring (orig saves remaining_accounts ptr in r6 at entry, cand in r7), propagating r6/r7/r8/r9 swaps; IR error-block moves (mvblk.py) don't reduce it.
- Reusable tools added: tools/odiff.py (orig vs -function-sections .o), tools/irtry.sh (asm+emitir+llc+diff, no build slot), tools/emitraw.sh / emitpass.sh (diagnostic IR), tools/mvblk.py, tools/hclass.py (classify reg/stack/jump/structural hunks), tools/unmerge.py / sinklt.py (IR error-block split — were the key to the 0x49b50 win diagnosis).
- NEXT IDEA for 0x4c750: find the source change that makes RA keep the remaining_accounts slice ptr in r6 (not r7) at entry — try perturbing the first few bindings' live ranges (e.g. bind `let user_key = user.key()` before vs after the two `remaining.get(..)` calls, or take `ata`/`info` by index differently) and watch the entry `mov64 rN, r1` in tools/odiff.py.
