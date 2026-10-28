# r5-z09 PROGRESS (round 5, base L12 = 907/165)

Baseline build of unmodified L12 src: 907 normalized / 165 raw (confirmed).

## Window identities
- 0x13f630 (20184 B) = v2 `buy_exact_quote_in` handler body (buy_v2.rs 767..986). Candidate nearest
  `buy_v2::buy_exact_quote_in_handler` (22424 B) ratio 0.08: structurally different. Original calls helper windows
  0x14910 (z00, buy_v2.rs 55-88; called 5x, interleaved with AccountInfo::clone), 0x160d0 (buy_v2.rs 109/121), 0x94908
  (transfer_fee.rs 31), 0x89258, post_fee_amount, tokens_for_quote x3, legacy fee x4; candidate inlines
  admit_associated_token_account/check_token instead.
- 0x144508 (13976 B) = v2 `sell_v2` handler body (sell_v2.rs 243..379). Candidate `sell_v2::execute` (16856 B) ratio 0.12.
- 0x147ba0 (3672 B) = v3 `trade::buy` handler (trade_v3.rs 801/802/842). Candidate `trade::buy` is an 18.9 KB monolith; the
  original is a thin handler over helpers (see decomposition below).
- 0x1489f8 (7856 B) = v3 `trade::buy_exact_quote` handler (trade_v3.rs 881..1001), same style (helpers 0x7f010, 0x7fde8,
  0x806c8, 0x83088, 0x837a8, 0x801f8 add3, 0x80df8, closures 0x85190/0x84f88/0x85398/0x857a8, ends with 0x855a0?).

## 0x147ba0 original decomposition (handler ABI; r9 = ctx.accounts)
fn buy(ctx, amount, max_sol_cost, partial_fill) -> Result<()>
 1. prepare_bonding_curve(&curve, &system_program(+0x70), &user(+0x40))?   [0x3cd50]
 2. validate_trade(curve.complete, curve.is_cashback_coin, 0)?
 3. real = curve.real_token_reserves; exempt = curve.is_mayhem_mode || user==global.whitelist_pda (memcmp global+0x288)
    excess = (!exempt && amount>real) ? amount-real : 0 ; amount = excess>0 || (partial && amount>=real) ? real : amount
    require!(amount>0, BuyZeroAmount 6020) line 801 ; require_gte!(real, amount, NotEnoughTokensToBuy 6021) line 802
 4. H1 0x7f010 = check_quote(a) -> Result<(Option<u8>,Option<(u64,u64,u64)>)> (same layout as candidate check_quote)
 5. quote = u64::try_from(buy_quote(&curve, amount)?).map_err(closure 0x84d80)?
 6. H2 0x7fde8(a, quote) -> Result<[u64;4]> (exempt => zeros; else data_len(fee_config), buy_fee_market_cap(curve,base_mint),
    tail-calls util/fee.rs 0x89ec8(out,&global,&curve,fee_config,len,cap,quote))
 7. if excess>0: H3 0x82128(real_quote_reserves, global.pool_migration_fee(+0x410), assoc_base_curve.amount, is_sol, amount, quote)
       -> Result<(u64,u64)> = (pool_base_before, pool_quote_before) [lines 494,498,502,506,507]
    H4 0x82af8(a, pool_base_before, pool_quote_before, excess) -> Result<(u64,u64,[u8;0x30])>; post = Some(Post{..0x40 B})
 8. H5 0x80df8(global(+0x420), curve.is_mayhem, &quote_fee, quote, fees.w0, fees.w1, post.as_ref()) -> Result<(u64,u64,u64)>
 9. require_gte!(max_sol_cost, add(c0,c1)?, TooMuchSolRequired 6002) line 842 (double evaluation)
10. H6 0x83c00(a, bumps.bonding_curve, is_sol, amount, quote, fees.w0, fees.w1, post, c0, c1, &quote_fee) -> Result<(u64,u64)>
11. H7 0x859b0(a, bumps.event_authority, amount, quote, &fees, h6.0, c2, "buy", &post, h6.1) -> Result<()>  (events)

## Round-1 results
- b1 (decomposition implemented in src/src/trade_v3.rs lines 392-871, line-neutral; sync_virtual_quote_reserves pub(crate)):
  911/165, gains 0x7890 0x82128 0x84970 0x84b78, no losses -> DELIVERED r5-z09-01.
- 0x147ba0 handler after b1: 3680 B vs 3672, ratio 0.64. Remaining diffs: (a) amount/excess clamp CFG and hoisted user-key copy
  (original copies user key to -0xa8 BEFORE the mayhem test; memcmp only on !mayhem; temp slot shared with H1 out),
  (b) register assignment (orig r9=accounts, r8=amount, r6=partial; ours r8/r6/r9), (c) extra duplicated 6020 error block,
  (d) H3 argument load order (orig: global fee, curve real_quote, then assoc amount).
- Variants vA/vB/vC (tuple-form clamps): vC best ratio 0.677 (3648 B); vA/vB (named `let user`) worse (separate stack slot).
- F1/F2/F3 (`let is_fee_exempt=a.user.key()==global.whitelist_pda` eager + sinking): pending.
- F2/F3 (eager `let is_fee_exempt=a.user.key()==wl`): copy hoisted into -0xa8 (correct slot) but memcmp NOT sunk (unconditional,
  original memcmp only on !mayhem). F3 0.6375, F2 0.617.
- G1/G3 (`{let user=..}` block inside excess expr) == b1 (copy sunk); G2 == vC.
- H1/H2 (`if mayhem{0} else if amount>real && !exempt`) 0.6555, memcmp still before mayhem test.
- vA (named `let user` at fn scope + exempt let) is the only form with copy-before-mayhem AND memcmp-after, but the slot is
  -0x150 (fn-scope lifetime) instead of -0xa8 -> try block-scoped named let (K1/K2/K3).
- Builds take 15-25 min each under load ~90 (shared 6-slot lock).
- K1/K2 (block-scoped named user) == b1/vC (copy sunk); K3 (fn-scope) separate slot, 0.5685.
- M1 (`#[inline(always)] fn v3_fee_exempt(curve,&user,global)` called with `&a.user.key()` temp): copy hoisted into -0xa8,
  mayhem test, memcmp sunk = ORIGINAL SHAPE for that part. 0.6532. Remaining: amount clamp select chain, reg alloc.
- N1/N2/N3 (min()/mut forms of the clamp on top of M1): pending.
- Q2 (`excess!=0 || partial&&amount>=real`) 0.7026; R1-R3: `let exempt=v3_fee_exempt(&curve,&a.user.key(),&global);` as its own
  statement + `amount>real && !exempt` reproduces the original order memcmp -> jle amount,real -> jeq r0 -> sub. R2 (tuple else-if)
  best 0.7232 (3640 B). Remaining: partial path compiled as select (orig = branchy min: `jlt r8,r7,+1; mov r8,r7`, i.e.
  amount.min(real) tail-merged with the excess path's `amount=real`), duplicated zero-check on excess path, global ptr load
  early in orig, register permutation (orig r9=accounts r8=amount r6=partial).
- S1/S2/S3 (partial => amount.min(real); S3 helper arg order global-first): pending.
