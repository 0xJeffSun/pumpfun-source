# r5-z04 PROGRESS (round 5, base L12 = 907/165)

Windows: 0x4c158 0x4e208 0x4eb28 0x502f0 0x52660 0x55d30 0x567d8 0x57e40

## Identification (original call graph, tools/q.py)
All migrate_v2 windows are helpers called from original migrate_v2::execute 0x49888 (z03's window); our execute inlines them all.
Original MigrateV2 field offsets match ours (0x10 base_mint .. 0xa8 token_2022_program, 0xc0 rent).
- 0x4c158 (8368): create-ATA helper, called 4x: (ret, a, bump=ctx.bumps.pool_authority, dest, [stack] wallet, mint, token_program, flag=(native?)).
  6 or 7 AccountMetas (vec 0xcc = 6*34), invoke (6 infos) / invoke_signed (7 infos, seeds pool-authority). Ours: create_associated_account (7528B, different signature).
- 0x4e208 (2336): base transfer: if abbc.amount==0 Ok; anchor_spl::token_2022::transfer_checked(base_token_program, from abbc, mint base_mint, to pama, authority bonding_curve, seeds [bonding-curve,mint,bump]), decimals base_mint. (ret, a, bump=ctx.bumps.bonding_curve)
- 0x4eb28 (6088): quote funding: (ret, a, bump, amount, native:bool). !native: transfer_checked(quote_token_program, aqbc, quote_mint, paqa, bonding_curve) if amount>0; native: lamports bonding_curve->paqa checked, then invoke spl_token SyncNative-ish ix (program id const spl_token::ID, 3 metas paqa,rent,bonding_curve; TokenInstruction::pack).
- 0x502f0 (8704): pump_amm::cpi::create_pool CpiContext builder (ret, ctx, base_amount, quote_amount).
- 0x52660 (9776): boost section (ret, ctx): rent, boost_enabled, required_quote_account_len, transfer_native, pump_amm::cpi::init_boost, refund_pool_authority; migrate_v2.rs:658/747.
- 0x55d30 (2344): LP burn (ret, a, bump=pool_authority): StateWithExtensions<Account>::unpack(user_pool_token_account.data.borrow())?.base.amount; token_2022::burn(token_2022_program, mint lp_mint, from user_pool_token_account, authority pool_authority, seeds [pool-authority,mint,bump]).
- 0x567d8 (5216) / 0x57e40 (2088): multi_hop_curve_swap.rs pieces (ours: one 41KB multi_hop_curve::execute); 0x57e40 calls buy_quote, 0x89ec8, trade::add3, 0x82128, 0x83088 (several unmatched callees).

## Experiments (ratio = win.py similarity for the helper symbol)
- 0x4e208 MATCHED (A10, delivered r5-z04-01, 908/165). Path: A(seeds inline in CpiContext) 0.12 -> A2 (let seeds before check) 0.19 -> A5/A6 (inline(always) helper, seeds as call arg) 0.24 -> A8/A9 (helper params typed &InterfaceAccount/&Account so Box derefs happen early) 0.66 -> A10 (+ `let decimals=mint.decimals;` right after the amount==0 check) 1.00.
- lane src is now v/A10 (src_L12 = pristine L12 copy).
- 0x55d30 burn (remaining, best 0.5694 B10/B16/B17/B18/B32/B35/B37/B38/B39): helper `#[inline(never)] fn burn_lp_tokens(a,bump){let amount=StateWithExtensions::<Account>::unpack(&a.user_pool_token_account.data.borrow())?.base.amount; burn_with_seeds(a,amount,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[bump]]])}` + inline(always) burn_with_seeds. Seeds layout + unpack slot (-0xe8) now identical. ONLY residual: ours keeps the user_pool_token_account &AccountInfo (load [a+0x80]) in a spill slot (-0x178) across the unpack call, the original re-loads [a+0x80] at the `from` clone (remat / no GVN). Everything after is register/stack cascade from that one extra live value. Tried with no effect: pub, no inline attr, &mut a, separate let data+drop, match instead of ?, block-scoped borrow, account param to helper, closure (refund_pool_authority style, both [..;1] and slice seeds). Worse: seeds as let/before unpack (0.48-0.51), Result<u64> amount helper (0.29), seeds-arg-first (0.29).
  The v1 twin 0x48e10 (lane libinst) has the identical shape with AccountInfo-by-value fields (lp_mint at +0xa0, user_pool at +0xd0) and the same reload ([r2+0xe0]).
- 0x4eb28 quote funding (remaining, best F4 0.4906): native = `a.bonding_curve.sub_lamports(amount)?; a.pool_authority_quote_account.add_lamports(amount)?;` (anchor Lamports trait, matches original order) + Instruction{program_id: spl_token::ID, metas [paqa w, rent ro, bonding_curve w], data TokenInstruction::SyncNative.pack()} + invoke(&ix,&[paqa,rent,curve])?; non-native = inline(always) seeded transfer (typed from:&AccountInfo, mint:&InterfaceAccount, authority:&Account) + `let decimals` after check. Residual: seeds outer/inner slot order (stack coloring shared with native-branch allocas), early-load order (orig bc,aqbc,quote_mint; ours bc,quote_mint,aqbc), block placement around ?-exits.
  NOTE behaviour: our L12 code passed bonding_curve READONLY and program=quote_token_program for the SyncNative ix; original uses spl_token::ID and bonding_curve WRITABLE.
- 0x502f0 create_pool: G2 (inline(never) fn create_pool(ctx:&Context,base,quote) + inline(always) seeded helper) 0.186: private fn => ArgumentPromotion passes accounts ptr instead of ctx (original r2=ctx, [ctx+8]=accounts, [ctx+0x24]=bump). Testing pub (G3/G4).

## Status after round-5 session 1 (2026-10-28)
Delivered: r5-z04-01 = 908/165 (gain 0x4e208). Lane src = v/A10.
Variant generator: v_round*.py (tools/mk.py make(name, edits) on lane src), queue: tools/q TAG WINDOW SYMREGEX, 4 workers tools/worker.sh work{,2,3,4} (tools/super.sh restarts), results logs/RESULTS.txt, diffs logs/TAG.diff.txt, .so in logs/.

| window | status | best | remaining diff / next step |
|---|---|---|---|
| 0x4e208 | MATCHED (A10) | 1.0 | - |
| 0x55d30 burn LP | remaining | 0.5694 (B10 family) | single extra live value: ours keeps [a+0x80] (user_pool_token_account ptr) in a spill slot across the unpack call; original reloads [a+0x80] at the `from` clone. Seeds/unpack layout identical. ~20 source shapes tried (see above). Next: shapes that make the IR have two loads (e.g. from-account obtained via a different path than the unpack, account passed in by caller is impossible: caller passes (a,bump) only). |
| 0x4eb28 quote funding | remaining | 0.5745 (F10/F12) | regs a/ret swapped (orig a=r7, ret=r8; ours a=r8, ret=r7) + cascades; F13 (if !native first) / F15 (early return) pending at session end. |
| 0x502f0 create_pool | remaining | 0.1699 (G8 pub deposit_pool_liquidity(ctx,base,quote) + inline(always) deposit_seeded(ctx,base,quote,seeds)) | body same shape; whole frame 0x18 deeper than original (extra 24-byte object at top of frame) and quote kept in r7. G12/G13 (inner helper takes a:&MigrateV2 / seeds param position) pending. |
| 0x4c158 create ATA | remaining | 0.088 (old create_associated_account) | not attempted: original is (ret,a,bump,dest,[wallet,mint,flag,token_program]) with inline bump-allocator vec of 6/7 AccountMetas, data vec![1] (CreateIdempotent), program_id const ATA id, invoke (6 infos) / invoke_signed (7 infos, pool-authority seeds) - write as method on MigrateV2 with the 4 call sites in execute. |
| 0x52660 init boost | remaining | 0.077 | not attempted: (ret, ctx): if mayhem return; if remaining.len()!=2 {if boost_enabled(cfg) err NotEnoughRemainingAccounts (line 658) else return}; initial=pa.lamports(); rent=Rent::get()?; size = if quote_token_program==token_2022 {required_quote_account_len(&quote_mint.to_account_info().try_borrow_data()?).ok_or(UnsupportedQuoteMint (line 747))} else {165}; transfer_native(sys,&user,&pool_authority,rent.minimum_balance(size)); pump_amm::cpi::init_boost(seeds pool-authority, 14 accts); after=pa.lamports(); refund_pool_authority(a,bump,&user.to_account_info(),after.saturating_sub(initial)); transfer_native(sys,&user,&pa,initial.saturating_sub(after)). Needs source lines 658/747 (append pad lines at file end). |
| 0x567d8 / 0x57e40 multi_hop | remaining | 0.12 / 0.28 | not attempted: ours is one 41 KB multi_hop_curve::execute; original splits into 0x567d8 (handler body, lines 208/214/262), 0x57c38 (closure line 259), 0x57e40 (line 295, calls buy_quote, 0x89ec8, trade::add3, 0x82128, 0x83088), 0x5b3b0 (18.5 KB) - needs a full multi_hop restructure first. |

### Late results (session 1 end)
- F12 (F10 + helper `transfer_checked(..)?;Ok(())`) 0.5745 (= F10); F13 (`if !native` first) 0.5221; F15 (early `return seeded(..)`) 0.4650; F11 (helper ?;Ok only) 0.4441. Best quote = F10.
- G12/G13 (inner create_pool helper takes a:&MigrateV2 + seeds, either param order) 0.0693 (worse than G8 0.1699 which passes ctx into the inline(always) helper).
- Workers stopped (queue/STOP). To resume: rm queue/STOP; tools/super.sh (or start tools/worker.sh per work dir).
- F19 (native branch moved into inline(always) sync_native_quote) 0.3570 - worse. Workers stopped.
