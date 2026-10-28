# mg-P-z04-01 (base L20 978/165 -> 979/165, +0x4eb28)

Window 0x4eb28 (6088 B) = migrate_v2 quote funding helper, called once from migrate_v2::execute (orig 0x49888 @0x4a970,
args ret, accounts, ctx.bumps.bonding_curve, quote, native).

Change (programs/pump/src/migrate_v2.rs only, line-neutral):
- execute line 315: the inline native/non-native funding block becomes `fund_quote_token_account_v2(&ctx,quote,native)?;`
- appended at file end (no Source sites): private `#[inline(never)] fn fund_quote_token_account_v2(ctx:&Context<MigrateV2>, amount, native)`
  (ArgumentPromotion turns ctx into (accounts, bonding_curve bump) = the original ABI):
  - native: `a.bonding_curve.sub_lamports(amount)?; a.pool_authority_quote_account.add_lamports(amount)?;` then
    `invoke(&Instruction{program_id: anchor_spl::token::ID, accounts: [paqa w, rent ro, bonding_curve w], data: TokenInstruction::SyncNative.pack()}, &[paqa, rent, bonding_curve])?`
  - else: `#[inline(always)] tq(a, &a.quote_mint, &a.associated_quote_bonding_curve, &a.bonding_curve, amount, &[&[b"bonding-curve", base_mint key, &[bump]]])?`
    with `if amount==0 {return Ok(())}; let decimals=mint.decimals; let mint_info:&AccountInfo=mint.as_ref();` then
    `anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(quote_token_program, TransferChecked{from, to: paqa, authority: curve, mint: mint_info.clone()}, seeds), amount, decimals)`.

Binary evidence: whole window byte-identical (normalized) to the original. Behaviour equals the original by construction; vs L20:
SyncNative now uses program id spl_token::ID (native quote implies the spl_token quote program) and marks the bonding curve
writable like the original; the token transfer goes through anchor_spl transfer_checked (same TransferChecked instruction, metas and
program as L20's hand-built one). Two decisive knobs (found with llc on the crate IR): (1) inner-helper argument order
(mint, from, authority) = original load order quote_mint, aqbc, curve; (2) binding `mint.as_ref()` right after reading decimals
(loads the mint AccountInfo pointer at that point, which fixes register allocation for the whole function).
