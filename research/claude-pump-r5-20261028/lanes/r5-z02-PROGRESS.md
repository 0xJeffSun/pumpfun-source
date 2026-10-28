# r5-z02 PROGRESS (round 5, base L12 = 907/165)

Windows: 0x2fa60 0x311f8 0x32840 0x33c50 0x34558 0x38fc0 0x3a7b8 0x3b8d8

## Identification (original -> candidate)
- 0x3a7b8 = set_metaplex_creator body = set_creator::sync (no Source sites)
- 0x38fc0 = set_creator body = set_creator::set (no Source sites)
- 0x3b8d8 = extend_account body = extend::execute (extend_account.rs:84 require len>=8, :107 unknown discriminator)
- 0x311f8 = get_distribution_amounts (creator/distribute_creator_fees.rs 103,116 via inlined validate helper; 143,148,158,165)
- 0x32840 = distribute_creator_fees handler body (distribute_creator_fees.rs 241,249) ; called from __global 0x131128
- 0x33c50 = native distribution loop helper (distribute_creator_fees.rs 325,343), called by v1 execute and v2 execute (0x2d920)
- 0x34558 = distribute_fee_to_holders body (distribute_fee_to_holders.rs 82,120,122,157,164)
- 0x2fa60 = v2 helper (distribute_creator_fee_v2.rs 340,346), called by execute_v2 0x2d920
- NOTE: base puts the v1 distribution code in programs/pump/src/distribution.rs (33-char path); original file is
  programs/pump/src/creator/distribute_creator_fees.rs (52 chars) -> 0x311f8/0x32840/0x33c50 can never match until the
  module is moved (#[path="creator/distribute_creator_fees.rs"] pub mod distribution).

## Log
- b00 baseline: 907/165 confirmed.
- b01 sync: emit!(e) instead of emit!(e.clone()) -> 0x3a7b8 ratio 0.625 -> 0.9976, same length (3552). Residual: 1 insn
  scheduling in emit_cpi! invoke error path (ldxdw r3,[r10-0x58] before vs after result loads).
- b02 set: same no-clone -> 0x38fc0 0.48 -> 0.60.
- s1 set: hoist mint/bonding_curve keys after the already-set check + `match &creators {Some=>..,None=>..}` -> 0.9986 same
  length; residual identical emit_cpi error-path scheduling in Some branch only (None branch matches).
  s2 (None arm first) 0.85.
- y1 (tail Ok in branches) == s1 binary; y3 (let timestamp) / y4 (return Ok inside if) 0.976 (worse).
- z1/z2: sync/set with ctx.accounts.* instead of `let a=&mut ctx.accounts` -> unchanged (residual stays);
  set Some-branch emit_cpi!(e.clone()) 0.95 worse; sync `creators.as_ref()` 0.957 worse.
- e1 extend: rewrite (account=&ctx.accounts.account, require!(data_len>=8)@84, if-chain, err!@107, saturating_sub delta,
  event with keys before Clock, emit!(event) no clone) -> 0.23 -> 0.31 (4424B vs 5240). Our literal-array compares
  (`&[u8]==[u8;8]` -> raw_eq) become a switch; original keeps a memcmp chain (reload [r2] per compare, mov size before cmp)
  => use slice==slice consts (memcmp kept until ExpandMemCmp) -> extend_v2 (in c1).
- c1 (gen/dcf_v1.rs = new creator/distribute_creator_fees.rs via #[path], lines placed with gen/place.py; extend_v2):
  0x311f8 0.57 -> 0.9931 (same len; residual reserve.saturating_add(minimum) operand order -> minimum.saturating_add(reserve)),
  0x32840 0.29 -> 0.9847 (5128 vs 5136; residual: system_program passed as [r7+0x1f0] (ArgPromotion) vs &Program -> make
  distribute_native `pub`), 0x33c50 0.17 -> 0.79 (same cause). No losses (file move safe).
  Original v1 structure: validate helper (lines 103/116) inlined into get_distribution_amounts loop; mul+add overflow share
  ONE ok_or_else site (158); execute: msg!("Insufficient fees ... {} lamports ...") + return Ok(event) w/o emit when
  available<minimum; else distribute_native(&sharing_config,&creator_vault.to_account_info(),&system_program,remaining,
  &transfers,bump) + emit!(event)+emit_cpi!(event)+Ok(event).
  extend_v2 (slice consts) 0.28: memcmp chain now reloads like original, but sizes are stored per-arm (stdw imm) instead
  of phi+store after borrow drop, and AccountInfo::clone calls not inlined for the transfer CpiContext.
- c2 (dcf_v2: pub distribute_native + minimum.saturating_add(reserve)) => 910/165, gains 0x311f8 0x32840 0x33c50, no losses.
- b03 = clean src (set/sync no-clone + dcf_v2 only) => 910/165 => DELIVERED deliveries/r5-z02-01.
- extend_v3 (u64 size block then `as usize`): 0.284 (4168B). Remaining extend issues: (1) transfer CpiContext clones are
  calls to AccountInfo::clone (original inlines all 3 Rc++), (2) line-107 error uses out-of-line ToString::to_string (original
  inlines String+Display), i.e. our callsites look COLD (BFI <2% => inline threshold 45) - the original has fewer/likelier
  branches before them; (3) size phi/store placement. Not solved.
- holders 0x34558: h1 (anchor_spl::associated_token::create, token_2022::transfer_checked/close_account, migrate::transfer_native,
  chunks(2), require_keys_eq! @122) 0.168 -> 0.279 (14072 vs 14512). Original computes amounts.len().saturating_mul(2)
  (jsgt -1 select), clones `source.to_account_info()` BEFORE `if amount != 0 {transfer_checked}` -> h2 (c3).
- c3 h2 (saturating_mul(2), clone `from` before `if amount!=0`) 0.498 (14352B); c4 h3 (seeds bump as temporary inside
  the seeds array literal) 0.507; c5 h4 (index accounts[0]/[1] inside branches; token branch after the source Option
  check @120) 0.527 (14376B). c7 h5 = h4 + `remaining_accounts.chunks(2).zip(amounts.iter())` (zip order) pending.
- extend_v4 (c6): size computed by an inlined `fn get_account_size(&AccountInfo)->Result<usize>` (require@84 .. err!@107);
  evidence: original joins the line-84 error, try_borrow error and success into one Result (jne r2,2) before `current==new`.
- c6 extend_v4 (Result helper get_account_size): 0.28 -> 0.52 (5272B vs 5240), opcode-ratio 0.88; call sequence now identical
  to original (clones inlined, Display inlined). Residual: saturating_sub select is computed BEFORE the `jle new,cur` branch
  in the original, ours branches `jgt new,cur` first and computes the select in the transfer block (+ follow-on reg/stack
  differences), and a `jne r2,r1` vs `jeq;ja` after realloc. c8 = extend_v5 (`if new_min > cur_min` with delta precomputed).
- c7 holders h5 (zip order chunks(2).zip(amounts.iter())) 0.5346 (14320B), opcode-ratio 0.675. Residual: original indexes
  the pair with a negated remaining-length counter (neg64; add 2; jeq r2,1 bounds), keeps accounts ptr+0x5a; maybe
  `remaining_accounts[2*i]`/`[2*i+1]` indexing or a different iterator. Files: gen/h5.rs (best), gen/h*.tmpl.
- c8 extend_v5 (`if new_min > cur_min`, delta precomputed) == c6 (same IR). Select still sunk into the transfer block.

## STATUS (end of round 5, r5-z02)
Delivered: deliveries/r5-z02-01 (910/165; gains 0x311f8 0x32840 0x33c50; no losses). Lane src = that delivery's src.
| window  | status | best | remaining diff / next step |
|---------|--------|------|-----------------------------|
| 0x311f8 | MATCHED (r5-z02-01) | 1.0 | - |
| 0x32840 | MATCHED (r5-z02-01) | 1.0 | - |
| 0x33c50 | MATCHED (r5-z02-01) | 1.0 | - |
| 0x3a7b8 | remaining | 0.9976 same len (in src) | 1 insn: emit_cpi! invoke error path loads `ldxdw r3,[r10-0x58]` (authority_info.data) before the From<ProgramError> result loads; ours after. Tried: tail Ok, return Ok, let-else(cancelled), let timestamp, ctx.accounts direct, creators.as_ref(), emit_cpi!(e.clone()). Same residual in set() Some arm (SetMetaplexCreatorEvent) while the None arm (SetCreatorEvent) matches -> look for what differs for the 5-field event (helper fn shared by set/sync?). |
| 0x38fc0 | remaining | 0.9986 same len (in src) | identical residual in the Some(creators) arm. |
| 0x3b8d8 | remaining | 0.52 (extend_v4.rs/extend_v5.rs, lines 84/107 placed) | saturating_sub select must stay before `jle new,cur` (ours sunk into transfer block); after realloc `jne` vs `jeq;ja`. Call sequence already identical. |
| 0x34558 | remaining | 0.5346 (gen/h5.rs) | pair indexing/IV form in loop (neg64 counter, ptr+0x5a), reg/stack shifts; close_account block placement. |
| 0x2fa60 | remaining | 0.13 | original = separate v2 token-distribution loop fn (distribute_creator_fee_v2.rs 340/346/378), 13 args: (&Account<SharingConfig>, &creator_vault clone, &creator_vault_quote_token_account clone, + 11 stack args incl. bump, decimals, quote_mint info, &Interface token program, ...), called once by execute_v2 0x2d920 (call at 0x2e3b0). Base inlines this loop into execute_v2. Needs extraction + v2 file layout (execute_v2 lines 205/213, get_token_distribution_amounts 101-168). |
