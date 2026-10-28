# r5-z06 progress (base L12 907/165)
Windows: 0x68bd8 0x6a1e0 0x6a8a8 0x6cd78 0x6fef8 0x722d0 0x72810 0x746a8 0x75308
Tools: var/ variants via gen_*.py, bs.sh <src> <name> (build+score into res/<name>), deliver.sh NN RES "summary".

## 0x722d0 = update_buyback_config  -> MATCHED (r5-z06-01, 908)
- orig file set_reserved_fee_recipients.rs:121. Variants: ubcA (match + from_fn) / ubcB (require + from_fn, ?;Ok) /
  ubcC / ubcF (literal + require) / ubcH: all same code, frame order wrong (keys shallower than AnchorError).
  ubcD (tail return) = old code shape. ubcG (match + array literal) = MATCH.

## 0x6fef8 = set_reserved_fee_recipients handler (orig set_reserved_fee_recipients.rs:40 require_gte len>=8 6027, :60 require_keys_neq 6028)
- Original shape: require_gte!; recipients Vec<Pubkey> = ra[..8] keys (bump-alloc 0x100); first + [Pubkey;7] rest (memcpy 0xe0);
  Rent::get()? ONCE; loop over ra[..8] fully unrolled x8: keys_neq default (with_pubkeys), executable ->
  Error::from(ErrorCode::ConstraintExecutable).with_account_name(format!("reserved_fee_recipients[{}]",i)) (inline, 2 String clones),
  rent.is_exempt(lamports(), try_data_len()?) -> with_owned_name(Error::from(ConstraintRentExempt), &format!) where format is the
  OUT-OF-LINE alloc::fmt::format (orig 0xd300, unmatched); writes whitelist_pda, first, rest to global; Clock; event built from
  global fields; emit!(event) + emit_cpi!(event) with ONE event object.
- srf1 (Vec + [..8] + data_len + emit!(clone)): 8664B. srf5 (try_data_len()? + emit!(event) no clone): 9000B vs 9176.
- Remaining srf5 diff: first key stored via Option<Pubkey>-like split (2/1/4/8/8/8/1 byte loads) -> testing srf8-11
  (first().copied().unwrap(), iter.next(), swapped order, split_first); format! not out-of-lined in rent path.

## 0x6a8a8 = add_quote_control_mint (update_quote_control_mints.rs:71)
- orig lazy overflow error: `.ok_or_else(|| error!(Overflow))?` (candidate had eager `.ok_or(error!)`) -> aq1.
- orig computes required.saturating_sub(lamports) BEFORE the branch -> aq2 (lamports_diff pattern).

## 0x6a1e0 control_entry / 0x68bd8 validate_new_mint (state.rs) — same code, block layout differs
- control_entry: orig places 146-error tail right after 145-error tail; stack slots of error results rotated.
- validate_new_mint: orig success return directly after loop; 82 (full) error at end. Testing qs_ce1..6 (line-146 forms,
  len check forms, contains() forms any/find).

## 0x6cd78 (sell.rs:23/33/81/85/102/107/114) — candidate lacks this helper
- Helper(remaining_accounts, len, user, ...): len==0 -> MissingCashbackAccounts(23); find_program_address(user_volume_accumulator)
  key check (33); data_is_empty -> create (Rent, allocate, assign, transfer/invoke_signed); owner check (81); try_borrow_data;
  Account::<UserVolumeAccumulator>::try_from_unchecked + exit_with_expected_owner; transfer_native; InvalidBondingCurveV2(6074).
  NOT attempted yet (requires writing the function and rerouting legacy sell).

## 0x72810 = sweep_fees::execute (sweep_fees.rs:123,145) — structure differs (orig calls 0x3cd50 first, 0x14910 twice,
  native_payments::transfer, transfer_to_owned). NOT attempted.
## 0x746a8 = admin_update_token_incentives (incentives::execute, 3296 vs 3168), calls update_schedule 0x7c720 (unmatched, not mine).
## 0x75308 = claim_token_incentives handler (calls 0x7bfd8 unmatched, transfer_checked, emit, emit_cpi); candidate claim 5624B.

## 0x746a8 = admin_update_token_incentives -> MATCHED (r5-z06-02, 909)
- ai1 (mint key bound before Clock::get, &mint to update_schedule, event uses mint): 3152B ratio .94; ai2 same; ai3 (emit!(event)) same;
  ai5 (bind result then ?) same; ai4 (ai1 + explicit `return Ok(());` after msg!) = MATCH.

## Round-2 status (2026-10-28)
- control_entry 0x6a1e0: qs_c5b (145 = `let header = data.get(..108).ok_or_else(|| error!(..))?;`, 146 =
  `require!(header[..8] == *QuoteControl::DISCRIMINATOR, ..)`) leaves only 3 diff lines in the 158 tail (r6 reload before jeq,
  r1/r2 load order). ce1..ce8, c5a/c5c/c5d other forms: worse. Testing qs_e1..e4 (let-else / match / require+slice for 158, return Ok).
- validate_new_mint 0x68bd8: all contains()/require variants so far leave layout unchanged (180 diff lines) or worse (any with &==).
- add_quote_control_mint 0x6a8a8: aq1 (ok_or_else) / aq2 (+saturating_sub): 5848B vs 6328; remaining: AccountInfo::clone
  out-of-line x2 + 2 memcpy in candidate vs inlined Rc increments in orig. Testing aq3 (return Ok), aq4 (to_account_info), aq5.
- set_reserved_fee_recipients 0x6fef8: srf5/srf8 9000B vs 9176 (first-key Option<Pubkey> split + out-of-line fmt::format remain).
  testing srf12 (return Ok). srf9/10/11 pending.
- claim 0x75308: cl1/cl2 (emit_cpi! instead of manual CPI) 5608B ratio .33; orig calls update 0x7bfd8 (unmatched, other lane).
- control_entry: qs_e1 (let-else 158), qs_e2 (match 158), qs_e3 (return Ok), qs_f1-f3 (find predicate forms) all stay at the
  same 3-line residual: orig reloads r6 (spilled ret ptr, [r10-0x150]) in the 158 name-format block BEFORE `jeq r0,0`, and loads
  r2 before r1 in the 158 tail; candidate reloads r6 in the tail. qs_e4 (require!+slice) / qs_f4 (starts_with) worse (f4 also loses 0x11b758).
  Testing qs_g1 (pub fn), qs_g2 (#[inline(never)]), qs_g3 (validate_new_mint by-value Pubkey).
- set_reserved_fee_recipients: srf8/9/11/13/14/15 (first(), iter().next(), split_first, into_iter().next(), unwrap_or_default)
  all produce the same 9000B body; the original's 2/1/4/8/8/8/1 split of the first key is NOT from these. srf12 (return Ok) same.
- add_quote_control_mint: aq3 (return Ok) 5736B, aq4 (to_account_info) 5848, aq5 5672. Candidate calls AccountInfo::clone out
  of line twice + 2 memcpy (CpiContext moved); orig inlines all three clones and builds CpiContext in place — unresolved.
- claim 0x75308: cl1/cl2/cl3 (emit_cpi! macro instead of manual CPI, return Ok) ratio .33->.40; needs update() 0x7bfd8 shape.
- qs_g1 (pub fn control_entry), qs_g2 (#[inline(never)]), qs_g3 (validate_new_mint(mint: Pubkey) by value), qs_h1
  (validate_new_mint explicit return Ok), qs_h2 (let len before require_gt!): no change (ce=6 lines, vn=180 lines).

## FINAL (round 1): best delivery deliveries/r5-z06-02 = 909/165 (+0x722d0, +0x746a8). lane src = var/ai4.
Next-round leads: control_entry = take var/qs_c5b state.rs (stack slots now exact; 3-line spill-placement residual) and keep
probing the 158 path; set_reserved_fee_recipients = start from var/srf12 (module file + try_data_len + single event);
add_quote_control_mint = var/aq1 (ok_or_else) + find why AccountInfo clones are out-of-line.

## Round 3 (2026-10-28 ~00:40-, base L12, lane src = deliveries/r5-z06-02/src)
Tooling: IR via lanes/r5-z10/tools/irbuild.py (IRWRAP_EXTRA) -> ir/aq2.ll (post-opt IR of var/aq2), inline remarks in ir/aq2rem,
 llx/run.sh <ll> <tag> <orig> <sym> (llc + sacmp, ~5 s), llx/mkv.py (IR edit of one fn), llx/grid.py (branch-weight grid).
- control_entry 0x6a1e0: qs_k1..k8 (for-loop early return, find().map, find_map, match, let+Ok, while-let, Pubkey::try_from
  compare) -> k2/k3/k6 same 6 diff lines; k1/k4/k7 68, k5 48, k8 80. Residual is greedy-RA spill placement only.
- add_quote_control_mint 0x6a8a8: inline remarks PROVE the two out-of-line AccountInfo::clone calls (system_program, authority)
  are COLD-callsite rejections (cost 60 > threshold 45; BFI of the transfer block ~1.3% < 2%), info.clone() inlined (cost 20).
  The original inlines all three => in the original the clones were not evaluated at that cold callsite. Testing aq_h1..h4: CPI
  in a private helper fn pay_rent(..) so the clones are inlined in the helper (hot) before the helper is inlined.
  b2 a1 (bind lamports + required>lamports), a2 (let cpi_context), a3 (to: quote_control.to_account_info()), a4 (!= 0): no gain.
- set_reserved_fee_recipients 0x6fef8: original first-key pieces (i56 at key[0..7) = h+b+w, i64 x3, i8) are SROA slices of an
  Option<Pubkey>-shaped 33-byte alloca (key at +1). b2 s1..s4 (first().copied() kept as Option until after the loop, cloned()
  +unwrap_or_default, get(0) + if let, ok_or()?) -> body unchanged (9000 B) except s4 (7680 B, worse).
- validate_new_mint 0x68bd8: llc experiments on IR: the only structural difference is MachineBlockPlacement putting the shared
  return block (bb33) at the END instead of right after the loop exit. Splitting the Ok return out (IR edit) -> 0.96; making
  all error edges cold (1:2000) puts bb33 after the loop (but changes RA). => original has hotter loop-exit->ret edge relative
  to the error tails into ret. Branch-weight grid running (llx/grid.py).
- claim 0x75308: original clone order = global_volume_accumulator(authority, [r9+0x300]) first, token_program ([r9+0x520])
  second, then from/mint/to => testing cl_c4..c6 (accounts=&mut *ctx.accounts before Clock::get, CpiContext inline,
  authority bound first / inline seeds).
