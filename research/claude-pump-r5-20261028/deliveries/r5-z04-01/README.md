# r5-z04-01 (base L12 907/165 -> 908/165)

Gain: 0x4e208 (2336 B) — original migrate_v2 helper called once from migrate_v2::execute (0x49888 @0x4a6a8) with
(ret, &MigrateV2, ctx.bumps.bonding_curve).

Binary evidence (original 0x4e208): loads associated_base_bonding_curve.amount ([a+0x28]->+0x68); builds signer seeds
["bonding-curve"(13), base_mint key, bump]; `jeq amount,0 -> return Ok`; clones base_token_program [a+0x98], abbc, pama [a+0x60],
bonding_curve, base_mint; calls anchor_spl::token_2022::transfer_checked (0x17fcc8) with decimals = base_mint.decimals.

Change (programs/pump/src/migrate_v2.rs, line-neutral: helper text appended on the existing `fn amount` line, call replaces
the hand-written TransferChecked `call(&tok,..vec![12]..)` statement on the same line):
```
#[inline(never)]fn transfer_base_to_pool_authority<'info>(a:&MigrateV2<'info>,bump:u8)->Result<()>{
  transfer_from_curve(a,&a.associated_base_bonding_curve,&a.base_mint,&a.bonding_curve,a.associated_base_bonding_curve.amount,
    &[&[b"bonding-curve",a.base_mint.key().as_ref(),&[bump]]])}
#[inline(always)]fn transfer_from_curve<'info>(a,from:&InterfaceAccount<TokenAccount>,mint:&InterfaceAccount<Mint>,
  authority:&Account<BondingCurve>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{
  if amount==0{return Ok(())} let decimals=mint.decimals;
  token_2022::transfer_checked(CpiContext::new_with_signer(a.base_token_program.to_account_info(),
    TransferChecked{from,to:a.pool_authority_mint_account,authority,mint},signer_seeds),amount,decimals)}
```
Behaviour: identical CPI (TransferChecked, same accounts/signer/amount/decimals, skipped when amount==0) — now via the
anchor_spl helper exactly as the original.
Score: normalized 908, raw 165, gains [0x4e208], losses [], raw_losses [], runtime_valid true, no stack warnings.
