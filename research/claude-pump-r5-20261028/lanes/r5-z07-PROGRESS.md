# r5-z07 PROGRESS (base L12 = 907/165)

Tools in lane dir: mk.py (variant maker), vb.sh NAME SLOT WIN.. (build+score into v/NAME), callers.py (orig call graph),
rod.py (read original .rodata), restruct.py (trade_v3.rs: frees lines 392-793 at module level by moving the buy header
to 794-800, so helpers can sit on their original lines).

## Window identification (original call graph)
- 0x76a28 claim_cashback body (caller __global::claim_cashback 0x12ecc8, matched). claim_token_incentives.rs:252
- 0x77940 claim_cashback_v2 body (caller 0x12f150). claim_token_incentives.rs:305-342
- 0x7b250 sync_user_volume_accumulator handler body (caller 0x12ff88). msg "No changes in accumulator for user={}"
- 0x7bfd8 volume_accumulator::update (caller 0x75308 claim_token_incentives body). line 103
- 0x7c720 update_schedule (caller 0x746a8 admin_update_token_incentives). sites 297/309/337/338 belong to a supply-update
  part (SupplyUpdateForFinishedRange 297, DayIndexAfterEndIndex 309+337, DayInActiveRange 338); 359/369/371/373/394 main part
- trade_v3 helper family (candidate has monolithic v3 handlers; original decomposes into helpers):
  0x7e490 (172/188, callers multi-hop 0x5b3b0 + 0x7f010), 0x7f010 (v3 preparation; callers handlers 0x147ba0/0x1489f8/0x14a8a8),
  0x81aa0 (442/446 Overflow; callers 0x5b3b0, 0x859b0), 0x82128 (494-507; callers 0x57e40, 0x147ba0, 0x1489f8),
  0x82af8 (518 NotEnoughTokensToBuy, 526 Truncation; post-complete buy quote: ceil_div(post_base*pool_quote, pool_base-post_base)
  then fees helper 0x7fde8; caller 0x147ba0), 0x83088 (post-complete exact-quote preparation; calls 0x806c8, sub3, 0x834c8;
  callers 0x57e40, 0x1489f8), 0x834c8 exact_input_tokens(quote_in, token_reserves, quote_reserves) line 591
  (checked_sub(1).ok_or(Overflow)? ; constant_product::output ; u64::try_from map_err Truncation), 0x837a8 (calls 0x834c8 and
  0x80df8 x3; caller 0x1489f8), 0x83c00 (691, closures 721/767 = 0x84970/0x84b78; callers 0x147ba0/0x1489f8), 0x859b0 (callers
  0x147ba0/0x1489f8; calls 0x81aa0)

## Experiments
- a1 (seconds==0 before conversion) 0x7bfd8 order fixed; c1 swap reset cond: worse; c2 (reset fn + time_index lost #[inline]
  by accident) 0.6805 1904B; d0 (#[inline] reset + #[inline] time_index) 0.628 -> the gain in c2 came from time_index/reset
  without #[inline]; c3/c5 store-order variants no help.
- s1/s2 (AMM-form sync with msg!) 0.817; s5 (s2 + `if before==after {msg} else {emit}`) 0.948: remaining = event key copied
  twice (event + clone) vs once in original.
- e1: exact_input_tokens + route line-911 handler path -> loses 0x85190 (closure at 911 is original). g1 private fn: zero
  check dropped (0.95). g2 pub fn: GAIN 0x834c8 -> DELIVERED r5-z07-01 (908/165).
- s4 (no clone, != form) ?, s6 (no clone + `if before==after {msg} else {emit}`): GAIN 0x7b250. h1 = lane src + s6:
  909/165 -> DELIVERED r5-z07-02 (cumulative).
- 0x7bfd8: f1 (=c2 line-neutral) 0.6805; f2 (ONLY `#[inline]` removed from time_index) 0.6805 -> the attribute on
  time_index is what fixes the reset part (no losses elsewhere). k1 accrue w/o #[inline]: same. k2/k3 end-section moved to a
  helper `add_volume(global,user,current_day,now,volume)`: user-volume overflow panic becomes inline (`jne r5,1` + call) as in
  the original, but the end-section block is still laid out right after `previous<start` (original: after the accrue path);
  r8/r9 (Ok tag 2 / seconds) swapped vs original. k4 (end_time check inside helper), k5 (early return) pending.
- 0x76a28 claim_cashback: original = Clock::get first, Rent::get, min=rent.minimum_balance(info.data_len()),
  lamports().saturating_sub(min), `if amount==0 {msg!("No cashback to claim"); return Ok}` , sub_lamports, add_lamports, then
  total_cashback_claimed checked_add (line 252, error constructed twice + drop_in_place<Error> => eager `ok_or(error!(..))`),
  event with the early timestamp. Variants cb1 (eager ok_or), cb2 (ok_or_else), cb3 (cb1 + clone) pending.
- 0x76a28: cb2 (ok_or_else) 0.47; cb1 (eager ok_or(error!)) 0.714 4320B; cb3 (cb1+clone) 0.67; cb4 (= cb1 but
  `let min=rent.minimum_balance(a.uva.to_account_info().data_len()); let amount=a.uva.get_lamports().saturating_sub(min)`, i.e.
  only one AccountInfo clone) 0.766 3888B (orig 3864). Remaining: register choice (r8/r9 swapped), original re-loads
  [accounts+0x10] (uva info ptr) for every lamports/borrow call -> cb6/cb7 (ctx.accounts.* instead of a.*), cb8 (`&mut ctx.accounts`).
- 0x77940 claim_cashback_v2: original = Clock::get first; native = quote_mint==So111..; if !native require!(quote_token_program
  == Tokenkeg || == Token-2022, InvalidQuoteTokenProgram 6064) at line 305 (missing in candidate); msg!("No cashback to claim")
  on amount==0; data_is_empty() on the associated account. cv1/cv2 pending.
- cb6/cb8 do not compile; cb7 (ctx.accounts.* everywhere) == cb4 (0.766) -> the reload of [accounts+0x10] is not about the
  borrow form. cv1/cv2 (claim_v2: Clock first + line-305 InvalidQuoteTokenProgram require + msg + get_lamports form):
  0.247 7632B vs orig 8832B -> original v2 has ~1200 B more logic (data_is_empty path, extra checks); needs a full re-derive.
- 0x7bfd8: k6 (current_day closure) 0.616 worse; k7 (checked_sub map) 0.677 = k2.

## STATUS at end of round 1 (best delivery: deliveries/r5-z07-02, 909/165)
- MATCHED: 0x834c8 (exact_input_tokens), 0x7b250 (sync_user_volume_accumulator).
- 0x7bfd8 update (best 0.6805 with `#[inline]` removed from time_index + seconds==0 check first; or 0.677 with add_volume
  helper that makes the user-volume panic inline like the original). Remaining: end-section (end_time>=now part) is placed right
  after `previous<start` instead of after the accrue path; Ok-tag/seconds registers r8/r9 swapped; accrue-path store of
  last_update hoisted. Next: combine `#[inline]`-less time_index with add_volume (k2 already has it: 0.677), try accrue fn
  returning bool / placing end-section call inside accrue's else, or `update` as a method.
- 0x76a28 claim_cashback: best cb4 0.766 (3888 vs 3864 B): source in lanes/r5-z07/v/cb4 (claim_token_incentives.rs lines
  152/251-254). Remaining: register allocation (r8 keeps accounts ptr in original, [r8+0x10] reloaded per call), stack frame
  0x2b0 vs candidate, byte order of the [r2+0x28..0x2a] flag copies.
- 0x77940 claim_cashback_v2: 0.247 (cv1); original adds Clock-first, line 305 token-program require, msg; ~1200 B unexplained.
- 0x7c720 update_schedule (0.297): original sites 297 (SupplyUpdateForFinishedRange), 309/337 (DayIndexAfterEndIndex), 338
  (DayInActiveRange) are in a separate supply helper ABOVE update_schedule (lines ~290-340) inlined into it; main part 359/369/
  371/373/394 (373 = TimeRangeTooLarge on one line: `require_gte!(seconds.checked_mul(30).expect("Unexpected overflow")-1,
  end-start,..)` AMM style). Before-start supply path does NOT run the 297 check (ts<start tested first). Two
  "current_timestamp should be bigger than start_time" expects, 3 end_day calls. Not attempted (needs file re-layout).
- trade_v3 family (0x7e490 0x7f010 0x81aa0 0x82128 0x82af8 0x83088 0x837a8 0x83c00 0x859b0): original decomposes v3 handlers
  into helpers; candidate handlers are monolithic. Now possible to place helpers on original lines (module-level pad 392-793 in
  trade_v3.rs). 0x82af8 = post-complete buy quote: require_gt!(pool_base>post_base, NotEnoughTokensToBuy) at 518,
  ceil_div(post_base*pool_quote, pool_base-post_base) (checked_ceil_div 0x88908), narrow Truncation at 526, then fee helper
  0x7fde8(accounts, quote) (4-word result) -> result {fees(4w), post_base, post_quote, pool_base, pool_quote}. 0x83088 =
  post-complete exact-quote prep: total_bps = A + (quote_mint==default ? B : 0) checked (Overflow, no site); net =
  C*10000/(10000+total) (u128), <2 -> None; fees via 0x806c8(mint,A,B,C); if D!=0 net=sub3(C,f1,f2); tokens =
  exact_input_tokens(net, r3, r4); tokens==0 -> None; Some{fees(4w), tokens, net, r3, r4}. These need the fee helpers
  0x7fde8/0x806c8/0x80df8 (libinst lane) with the same ABI; call immediates are masked so any same-ABI callee works.

## ROUND 2 (this session) - working src = deliveries/r5-z07-02 src + z09-01 trade_v3 decomposition (merged line-wise,
## exact_input_tokens kept at 588) + z00-03 buy_v2/create_v2/sell_v2 (for check_token_account). m0 = 913 (z09 gains incl.)
Generators in gen/*.py (gen/lines.py = line-neutral editing helpers; each gen/bN.py makes v/bN/src). Multiplex trick: test
several bodies of one window in ONE build by adding copies called under dummy conditions (experiment only, never delivered).
- 0x7e490 IDENTIFIED: pub fn validate_buyback_fee_recipient_account(global,&AccountInfo recipient,is_native:bool,quote_mint,
  quote_token_program) at trade_v3.rs 172 (owner==program, AccountTypeNotSupported), 180 (mint, MintDoesNotMatchBondingCurve),
  188 (recipient key == ATA(owner,mint,program) ConstraintSeeds; require_keys_eq! double-evaluates the ATA). Native branch =
  global.validate_buyback_fee_recipient(*recipient.key). Callers: multi-hop (is_native=false) and check_quote 0x7f010.
  b1 first version 0.826 (3008 vs 2944 B): remaining = deserialize slice slot (use named slice) + extra owner copy before validate.
- 0x7f010 IDENTIFIED = v3 check_quote(a)->Result<(bool is_native, Option<fee>)>: is_native=curve.quote_mint==default;
  quote_mint/program keys copied; if !native {admit_associated_token_account(assoc_quote_bonding_curve,&curve_info_clone,mint
  (by value copy),program (by value copy),&mint_info_clone,&program_info_clone,false,user,system_program) [ORIGINAL PARAM ORDER
  differs from candidate admit]; check_token_account(assoc_quote_user,user,mint copy,program copy)}; 0x7e490(global,buyback,
  is_native,&mint,&program); fee = if native None else get_transfer_fee(&quote_mint.to_account_info())? (0x94908).
  b1 (refs, candidate admit order) 0.515.
- 0x81aa0 IDENTIFIED: PostCompleteBuyEvent builder (post:&PostComplete,user,mint,bonding_curve,quote_mint,timestamp,buyback_fee)
  -> Result<PostCompleteBuyEvent>; 442 = pool_base_before.checked_sub(base_out), 446 = pool_quote_before.checked_add(quote_in)
  (Overflow, inline error). Callers multi-hop + 0x859b0. b2 (by-value keys, checks inside the literal) 0.692 same length 1672.
- 0x859b0 = v3 buy event emitter: Clock first; TradeEvent emit!+emit_cpi! (no clone); THEN if real_token_reserves==0
  {complete=true; CompleteEvent emit!/emit_cpi!}; THEN post event via 0x81aa0 + emit!/emit_cpi!.
- 0x83c00 = z09's v3_execute_buy signature confirmed (a,bump,is_sol | amount,quote,pf,cf,post,pool_quote,total_buyback,qfee).
  Seeds layout orig: key -0x40, outer slice -0x58, bump -0x70, inner -0x110; args [a+0x30],[a+0x48] loaded BEFORE seeds.
- 0x83088/0x837a8 need libinst's 0x806c8/0x80df8 + exact-quote handler decomposition (z09's 0x1489f8); not attempted yet.
- 0x76a28: b1 cA form `let timestamp=Clock::get()?.unix_timestamp;let min=Rent::get()?.minimum_balance(uva.to_account_info()
  .data_len());let amount=uva.get_lamports().saturating_sub(min);` = 0.8666 (best; named rent = 0.755). Remaining: original
  keeps accounts ptr in r8 and reloads [a+0x10] after calls (ours caches the info ptr).
- 0x82af8: z09 form 0.910 best; and_then (B) 0.716; nested helper (C) 0.79.
- 0x7bfd8: u1 (accrue inlined into update + map_err?) 0.39: the map_err closure is OUTLINED when written directly in the
  #[inline(never)] fn (original has it inline => the original keeps an inlined accrue helper).
