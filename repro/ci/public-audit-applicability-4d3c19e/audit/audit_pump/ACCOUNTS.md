# Accounts contexts

The code excerpt in each row is the exact consumed declaration; D1 describes checked macro semantics. Group conclusions identify authorization and dynamic-account assumptions. No UncheckedAccount is presumed to have owner/discriminator checks merely because it has seeds.

## AdminCto

[programs/pump/src/admin_cto.rs:9-81](inputs/programs/pump/src/admin_cto.rs#L9)

Global.admin_set_creator_authority signer; curve PDA/owner, current_creator exact; fixed AMM/FEES program wrappers, external PDAs/ATAs derived. Mint key unchecked but curve/address relations bind it. Current creator writable checked only wallet branch. DistributionCurve raw flags/fee read with missing-tail defaults; shared means owner FEES+nonempty+old==sharing key, no local config decode. Pool considered initialized by AMM owner+nonempty, full validation external.

```rust
struct AdminCto<'info>{
#[account(mut)]
/// CHECK: constrained address or handler validation.
pub admin_set_creator_authority:Signer<'info>,
#[account(has_one=admin_set_creator_authority @ PumpError::NotAuthorized,seeds=[&[103,108,111,98,97,108]],bump)]
/// CHECK: constrained address or handler validation.
pub global:Box<Account<'info,Global>>,
/// CHECK: constrained address or handler validation.
pub mint:UncheckedAccount<'info>,
/// CHECK: constrained address or handler validation.
#[account(constraint=quote_mint.key()==if bonding_curve.quote_mint==Pubkey::default(){anchor_lang::solana_program::pubkey!("So11111111111111111111111111111111111111112")}else{bonding_curve.quote_mint} @ PumpError::MintDoesNotMatchBondingCurve)]
pub quote_mint:Box<InterfaceAccount<'info,anchor_spl::token_interface::Mint>>,
/// CHECK: constrained address or handler validation.
pub quote_token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
/// CHECK: constrained address or handler validation.
pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
/// CHECK: constrained address or handler validation.
pub system_program:Program<'info,System>,
#[account(mut,seeds=[&[98,111,110,100,105,110,103,45,99,117,114,118,101],mint.key().as_ref()],bump)]
/// CHECK: constrained address or handler validation.
pub bonding_curve:Box<Account<'info,DistributionCurve>>,
#[account(constraint=current_creator.key()==bonding_curve.creator @ PumpError::InvalidCreator)]
/// CHECK: constrained address or handler validation.
pub current_creator:UncheckedAccount<'info>,
#[account(mut,seeds=[current_creator.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]
/// CHECK: constrained address or handler validation.
pub current_creator_quote_token_account:UncheckedAccount<'info>,
#[account(mut,seeds=[&[99,114,101,97,116,111,114,45,118,97,117,108,116],current_creator.key().as_ref()],bump)]
/// CHECK: constrained address or handler validation.
pub creator_vault:UncheckedAccount<'info>,
#[account(mut,seeds=[creator_vault.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]
/// CHECK: constrained address or handler validation.
pub creator_vault_quote_token_account:UncheckedAccount<'info>,
#[account(mut)]
/// CHECK: constrained address or handler validation.
pub holder_creator_vault:UncheckedAccount<'info>,
#[account(mut,seeds=[holder_creator_vault.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]
/// CHECK: constrained address or handler validation.
pub holder_creator_vault_quote_token_account:UncheckedAccount<'info>,
/// CHECK: constrained address or handler validation.
pub pump_amm:Program<'info,Amm>,
#[account(seeds=[&[103,108,111,98,97,108,95,99,111,110,102,105,103]],bump,seeds::program=pump_amm.key())]
/// CHECK: constrained address or handler validation.
pub amm_global_config:UncheckedAccount<'info>,
#[account(seeds=[&[112,111,111,108,45,97,117,116,104,111,114,105,116,121],mint.key().as_ref()],bump)]
/// CHECK: constrained address or handler validation.
pub pool_authority:UncheckedAccount<'info>,
#[account(mut,seeds=[&[112,111,111,108],&[0,0],pool_authority.key().as_ref(),mint.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=pump_amm.key())]
/// CHECK: constrained address or handler validation.
pub pool:UncheckedAccount<'info>,
#[account(seeds=[&[95,95,101,118,101,110,116,95,97,117,116,104,111,114,105,116,121]],bump,seeds::program=pump_amm.key())]
/// CHECK: constrained address or handler validation.
pub pump_amm_event_authority:UncheckedAccount<'info>,
#[account(mut,seeds=[&[99,114,101,97,116,111,114,95,118,97,117,108,116],current_creator.key().as_ref()],bump,seeds::program=pump_amm.key())]
/// CHECK: constrained address or handler validation.
pub coin_creator_vault_authority:UncheckedAccount<'info>,
#[account(mut,seeds=[coin_creator_vault_authority.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]
/// CHECK: constrained address or handler validation.
pub coin_creator_vault_ata:UncheckedAccount<'info>,
#[account(mut,seeds=[&[115,104,97,114,105,110,103,45,99,111,110,102,105,103],mint.key().as_ref()],bump,seeds::program=pump_fees.key())]
/// CHECK: constrained address or handler validation.
pub sharing_config:UncheckedAccount<'info>,
/// CHECK: constrained address or handler validation.
pub pump_fees:Program<'info,Fees>,
#[account(seeds=[&[95,95,101,118,101,110,116,95,97,117,116,104,111,114,105,116,121]],bump,seeds::program=pump_fees.key())]
/// CHECK: constrained address or handler validation.
pub pump_fees_event_authority:UncheckedAccount<'info>,
#[account(seeds=[&[95,95,101,118,101,110,116,95,97,117,116,104,111,114,105,116,121]],bump)]
/// CHECK: constrained address or handler validation.
pub event_authority:UncheckedAccount<'info>,
/// CHECK: constrained address or handler validation.
pub program:UncheckedAccount<'info>,
}
```

## BuyV2

[programs/pump/src/buy_v2.rs:9-49](inputs/programs/pump/src/buy_v2.rs#L9)

Canonical Pump curve/base ATA, signer user/base account; quote key equals curve or WSOL for default. Fee/buyback recipients membership. Typed quote program interface restricted; raw quote accounts canonical ATAs except user. check_token checks mint only and ignores owner argument. User quote authority is separately checked; vault/destination authorities rely on canonical ATA construction and SPL. SharingConfig bytes parsed solely for event with default empty on parse failure, owner not checked here.

```rust
struct BuyV2<'info>{
 #[account(seeds=[b"global"],bump)]pub global:Box<Account<'info,Global>>,
 pub base_mint:Box<InterfaceAccount<'info,Mint>>,
 pub quote_mint:Box<InterfaceAccount<'info,Mint>>,
 pub base_token_program:Interface<'info,TokenInterface>,
 pub quote_token_program:Interface<'info,TokenInterface>,
 pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 /// CHECK: handler checks membership.
 #[account(mut)]pub fee_recipient:UncheckedAccount<'info>,
 /// CHECK: quote ATA.
 #[account(mut,seeds=[fee_recipient.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_quote_fee_recipient:UncheckedAccount<'info>,
 /// CHECK: handler checks membership.
 #[account(mut)]pub buyback_fee_recipient:UncheckedAccount<'info>,
 /// CHECK: quote ATA.
 #[account(mut,seeds=[buyback_fee_recipient.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_quote_buyback_fee_recipient:UncheckedAccount<'info>,
 #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump,constraint=quote_mint.key()==if bonding_curve.quote_mint==Pubkey::default(){WSOL}else{bonding_curve.quote_mint} @ PumpError::UnsupportedQuoteMint)]pub bonding_curve:Box<Account<'info,LegacyCurve>>,
 #[account(mut,associated_token::mint=base_mint,associated_token::authority=bonding_curve,associated_token::token_program=base_token_program)]pub associated_base_bonding_curve:Box<InterfaceAccount<'info,TokenAccount>>,
 /// CHECK: quote ATA.
 #[account(mut,seeds=[bonding_curve.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_quote_bonding_curve:UncheckedAccount<'info>,
 #[account(mut)]pub user:Signer<'info>,
 #[account(mut,token::mint=base_mint,token::authority=user,token::token_program=base_token_program)]pub associated_base_user:Box<InterfaceAccount<'info,TokenAccount>>,
 /// CHECK: quote ATA.
 #[account(mut)]pub associated_quote_user:UncheckedAccount<'info>,
 /// CHECK: PDA.
 #[account(mut,seeds=[b"creator-vault",bonding_curve.creator.as_ref()],bump)]pub creator_vault:UncheckedAccount<'info>,
 /// CHECK: quote ATA.
 #[account(mut,seeds=[creator_vault.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_creator_vault:UncheckedAccount<'info>,
 /// CHECK: sharing validation later.
 #[account(seeds=[b"sharing-config",base_mint.key().as_ref()],bump,seeds::program=FEE_PROGRAM)]pub sharing_config:UncheckedAccount<'info>,
 #[account(seeds=[b"global_volume_accumulator"],bump)]pub global_volume_accumulator:Box<Account<'info,crate::GlobalVolumeAccumulator>>,
 /// CHECK: volume state validated when used.
 #[account(init_if_needed,payer=user,space=137,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]pub user_volume_accumulator:Box<Account<'info,crate::UserVolumeAccumulator>>,
 /// CHECK: quote ATA.
 #[account(mut,seeds=[user_volume_accumulator.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_user_volume_accumulator:UncheckedAccount<'info>,
 #[account(seeds=[b"fee_config",crate::ID.as_ref()],bump,seeds::program=FEE_PROGRAM)]pub fee_config:Account<'info,LegacyFeeConfig>,
 pub fee_program:Program<'info,LegacyFeesProgram>,
 pub system_program:Program<'info,System>,
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:AccountInfo<'info>,
 pub program:Program<'info,crate::program::PumpRecovered>,
}
```

## ClaimCashback

[programs/pump/src/cashback.rs:6-11](inputs/programs/pump/src/cashback.rs#L6)

No user signature required: destination user fixes accumulator PDA; Account owner/disc+mut. v2 ATA derives under fixed associated program; quote program unchecked (constructor/dependency validation required), quote mint owner checked nonnative. claim amount is all surplus lamports, not earned-minus-claimed; v2 nonnative raw ATA amount, zero/empty returns success. Recipient decoded authority=user and owner=provided program; CPI mint validation delegated.

```rust
struct ClaimCashback<'info>{
 /// CHECK: recipient is constrained by the accumulator PDA.
 #[account(mut)]pub user:UncheckedAccount<'info>,
 #[account(mut,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]pub user_volume_accumulator:Account<'info,UserVolumeAccumulator>,
 pub system_program:Program<'info,System>,
}
```

## ClaimCashbackV2

[programs/pump/src/cashback.rs:14-28](inputs/programs/pump/src/cashback.rs#L14)

No user signature required: destination user fixes accumulator PDA; Account owner/disc+mut. v2 ATA derives under fixed associated program; quote program unchecked (constructor/dependency validation required), quote mint owner checked nonnative. claim amount is all surplus lamports, not earned-minus-claimed; v2 nonnative raw ATA amount, zero/empty returns success. Recipient decoded authority=user and owner=provided program; CPI mint validation delegated.

```rust
struct ClaimCashbackV2<'info>{
 /// CHECK: recipient is constrained by the accumulator PDA.
 #[account(mut)]pub user:UncheckedAccount<'info>,
 #[account(mut,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]pub user_volume_accumulator:Account<'info,UserVolumeAccumulator>,
 /// CHECK: native path ignores mint data; token branch checks owner and decodes.
 pub quote_mint:UncheckedAccount<'info>,
 /// CHECK: CPI target on token branch only.
 pub quote_token_program:UncheckedAccount<'info>,
 pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 /// CHECK: PDA constrained; token program validates transfer source.
 #[account(mut,seeds=[user_volume_accumulator.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_user_volume_accumulator:UncheckedAccount<'info>,
 /// CHECK: token branch checks token program owner and user authority.
 #[account(mut)]pub associated_quote_user:UncheckedAccount<'info>,
 pub system_program:Program<'info,System>,
}
```

## CollectCreatorFeeV2

[programs/pump/src/collect_v2.rs:5-18](inputs/programs/pump/src/collect_v2.rs#L5)

Permissionless payout to creator key bound into vault PDA; creator/vault ATAs derived; typed quote mint and token interface. Native branch by classic WSOL key; token branch parses vault balance before zero return. No extra remaining inputs.

```rust
struct CollectCreatorFeeV2<'info>{
 /// CHECK: recipient only tied to vault/ATA seeds.
 #[account(mut)]pub creator:UncheckedAccount<'info>,
 /// CHECK: token program validates data only during positive token transfer.
 #[account(mut,seeds=[creator.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub creator_token_account:UncheckedAccount<'info>,
 /// CHECK: address constrained, native transfer defers owner/data checks.
 #[account(mut,seeds=[b"creator-vault",creator.key().as_ref()],bump)]pub creator_vault:UncheckedAccount<'info>,
 /// CHECK: address constrained, token program validates on transfer.
 #[account(mut,seeds=[creator_vault.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub creator_vault_token_account:UncheckedAccount<'info>,
 pub quote_mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 pub quote_token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
 pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 pub system_program:Program<'info,System>,
}
```

## Create

[programs/pump/src/create.rs:9-30](inputs/programs/pump/src/create.rs#L9)

Permissionless signer payer; fresh mint init, canonical mint-authority and curve PDAs and ATA. Global typed PDA, fixed executable Metaplex/Token/ATA/System. Creator nonzero. Name/symbol/URI locally unbounded in legacy; metadata external program governs encoding lengths. New curve166 and six-decimal mint.

```rust
struct Create<'info>{
 #[account(init,payer=user,mint::decimals=6,mint::authority=mint_authority)]
 pub mint:Account<'info,Mint>,
 /// CHECK: canonical program mint authority.
 #[account(seeds=[b"mint-authority"],bump)]
 pub mint_authority:UncheckedAccount<'info>,
 #[account(init,payer=user,space=166,seeds=[b"bonding-curve",mint.key().as_ref()],bump)]
 pub bonding_curve:Account<'info,trade_types::BondingCurve>,
 #[account(init,payer=user,associated_token::mint=mint,associated_token::authority=bonding_curve)]
 pub associated_bonding_curve:Account<'info,TokenAccount>,
 #[account(seeds=[b"global"],bump)]
 pub global:Box<Account<'info,Global>>,
 pub mpl_token_metadata:Program<'info,MetadataProgram>,
 /// CHECK: canonical metadata account, allocated by the metadata program.
 #[account(mut,seeds=[b"metadata",mpl_token_metadata.key().as_ref(),mint.key().as_ref()],bump,seeds::program=mpl_token_metadata.key())]
 pub metadata:UncheckedAccount<'info>,
 #[account(mut)]pub user:Signer<'info>,
 pub system_program:Program<'info,System>,
 pub token_program:Program<'info,Token>,
 pub associated_token_program:Program<'info,AssociatedToken>,
 pub rent:Sysvar<'info,Rent>,
}
```

## CreateV2

[programs/pump/src/create_v2.rs:12-34](inputs/programs/pump/src/create_v2.rs#L12)

User pays fresh Token2022 mint/curve/ATA; global canonical. Mayhem account keys constrained but branch rejected. Remaining quote token program only Token or Token2022, mint owner equals it; quote ATA derived from curve. No remaining = native. Otherwise at least3:mint,ATA,program; whitelist branch uses global reserves; control path at index3 validates PDA,owner,disc and108+40*count bounded size. Missing control entry requires parent index4, full curve decoder/PDA/owner, root.depth0, native quote, incomplete, nonmayhem and next depth<=global/cap5.

```rust
struct CreateV2<'info>{
 #[account(init,payer=user,mint::decimals=6,mint::authority=mint_authority,mint::token_program=token_program,extensions::metadata_pointer::metadata_address=mint)]
 pub mint:InterfaceAccount<'info,Mint>,
 /// CHECK: canonical mint authority.
 #[account(seeds=[b"mint-authority"],bump)]pub mint_authority:UncheckedAccount<'info>,
 #[account(init,payer=user,space=166,seeds=[b"bonding-curve",mint.key().as_ref()],bump)]pub bonding_curve:Account<'info,trade_types::BondingCurve>,
 #[account(init,payer=user,associated_token::mint=mint,associated_token::authority=bonding_curve,associated_token::token_program=token_program)]pub associated_bonding_curve:InterfaceAccount<'info,TokenAccount>,
 #[account(seeds=[b"global"],bump)]pub global:Box<Account<'info,Global>>,
 #[account(mut)]pub user:Signer<'info>,
 pub system_program:Program<'info,System>,
 pub token_program:Program<'info,Token2022>,
 pub associated_token_program:Program<'info,AssociatedToken>,
 /// CHECK: fixed CPI program; Mayhem invocation outside this bounded branch.
 #[account(mut,address=MAYHEM_ID)]pub mayhem_program_id:UncheckedAccount<'info>,
 /// CHECK: canonical Mayhem account, unused for normal creation.
 #[account(seeds=[b"global-params"],bump,seeds::program=MAYHEM_ID)]pub global_params:UncheckedAccount<'info>,
 /// CHECK: canonical Mayhem account, unused for normal creation.
 #[account(mut,seeds=[b"sol-vault"],bump,seeds::program=MAYHEM_ID)]pub sol_vault:UncheckedAccount<'info>,
 /// CHECK: canonical Mayhem account, unused for normal creation.
 #[account(mut,seeds=[b"mayhem-state",mint.key().as_ref()],bump,seeds::program=MAYHEM_ID)]pub mayhem_state:UncheckedAccount<'info>,
 /// CHECK: unused for normal creation.
 #[account(mut)]pub mayhem_token_vault:UncheckedAccount<'info>,
}
```

## MigrateBondingCurveCreator

[programs/pump/src/creator_migration.rs:15-23](inputs/programs/pump/src/creator_migration.rs#L15)

Permissionless; Pump curve/mint PDA and FEES sharing PDA, owner/disc+has_one mint, prior curve.creator==sharing.admin. No signer; authority derives from prior FEES-created config. MigratingCurve copies supported fields into166, requires fee125..133 only if length>=141; holder flag124. Serializer writes166 and creator; short old allocations may fail exit without resizing.

```rust
struct MigrateBondingCurveCreator<'info>{
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump)]pub bonding_curve:Account<'info,MigratingCurve>,
 #[account(seeds=[b"sharing-config",mint.key().as_ref()],bump,seeds::program=FEES,has_one=mint @ PumpError::MintDoesNotMatchBondingCurve,constraint=bonding_curve.creator==sharing_config.admin @ PumpError::BondingCurveAndSharingConfigCreatorMismatch)]pub sharing_config:Account<'info,SharingConfig>,
 /// CHECK: canonical event authority.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: original validates this only through event CPI invocation.
 pub program:UncheckedAccount<'info>,
}
```

## DistributeCreatorFees

[programs/pump/src/distribution.rs:30-39](inputs/programs/pump/src/distribution.rs#L30)

Permissionless distribution; Pump curve and FEES sharing PDAs with typed owners/discriminators; has_one mint; curve.creator==sharing key and Active required. Vault derived from sharing key. v2 payer signs solely for ATA creation. Legacy decoder permits49-byte curve, zero missing creator/quote. SharingConfig vectors and status deserialize but sum/uniqueness not locally validated. Native remaining firstN recipient keys; token firstN owners thenN ATAs; extras ignored.

```rust
struct DistributeCreatorFees<'info>{
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(seeds=[b"bonding-curve",mint.key().as_ref()],bump)]pub bonding_curve:Account<'info,DistributionCurve>,
 #[account(seeds=[b"sharing-config",mint.key().as_ref()],bump,seeds::program=FEES,has_one=mint @ PumpError::MintDoesNotMatchBondingCurve)]pub sharing_config:Account<'info,SharingConfig>,
 #[account(mut,seeds=[b"creator-vault",sharing_config.key().as_ref()],bump)]pub creator_vault:UncheckedAccount<'info>,
 pub system_program:Program<'info,System>,
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 pub program:Program<'info,crate::program::PumpRecovered>,
}
```

## DistributeCreatorFeesV2

[programs/pump/src/distribution.rs:59-75](inputs/programs/pump/src/distribution.rs#L59)

Permissionless distribution; Pump curve and FEES sharing PDAs with typed owners/discriminators; has_one mint; curve.creator==sharing key and Active required. Vault derived from sharing key. v2 payer signs solely for ATA creation. Legacy decoder permits49-byte curve, zero missing creator/quote. SharingConfig vectors and status deserialize but sum/uniqueness not locally validated. Native remaining firstN recipient keys; token firstN owners thenN ATAs; extras ignored.

```rust
struct DistributeCreatorFeesV2<'info>{
 #[account(mut)]pub payer:Signer<'info>,
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(seeds=[b"bonding-curve",mint.key().as_ref()],bump)]pub bonding_curve:Account<'info,DistributionCurve>,
 #[account(seeds=[b"sharing-config",mint.key().as_ref()],bump,seeds::program=FEES,has_one=mint @ PumpError::MintDoesNotMatchBondingCurve)]pub sharing_config:Account<'info,SharingConfig>,
 /// CHECK: Native vault address validated by PDA seeds.
 #[account(mut,seeds=[b"creator-vault",sharing_config.key().as_ref()],bump)]pub creator_vault:UncheckedAccount<'info>,
 pub system_program:Program<'info,System>,
 /// CHECK: Event authority.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 pub program:Program<'info,crate::program::PumpRecovered>,
 /// CHECK: Nonlegacy branch parses token data manually.
 #[account(mut,seeds=[creator_vault.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub creator_vault_quote_token_account:UncheckedAccount<'info>,
 pub quote_mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 pub quote_token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
 pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
}
```

## ExtendAccount

[programs/pump/src/extend.rs:4-11](inputs/programs/pump/src/extend.rs#L4)

Any signer funds extension; target must Pump-owned mutable account, no PDA. Supported discriminator list only; attacker cannot supply arbitrary owner-owned bytes without prior Pump path. Needs first8 exact one of curve/global/user/global-volume; target sizes166/1088/137/600. Already >=size no-op.

```rust
struct ExtendAccount<'info> {
    /// CHECK: this instruction handles raw supported account discriminators.
    #[account(mut,owner=crate::ID)]
    pub account: UncheckedAccount<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

## Initialize

[programs/pump/src/global_init.rs:4-9](inputs/programs/pump/src/global_init.rs#L4)

AdminGlobal/AdminReadonly/UpdateGlobalAuthority require the Pump-owned Global at [global] and its authority signer; mut is explicit. Init is the exception: any payer can create the canonical Global once. New authority is unchecked, not a cosigner. Global serializes one whitelist key, 8 normal recipients, 8 reserved recipients and 8 buyback recipients. Reserved setter consumes first 8 remaining accounts; extras ignored, no uniqueness check. InitUserVolume binds any user key and payer; CloseUserVolume requires that user signer and PDA.

```rust
struct Initialize<'info>{
 #[account(init,payer=user,space=1088,seeds=[b"global"],bump)]
 pub global:Account<'info,Global>,
 #[account(mut)]pub user:Signer<'info>,
 pub system_program:Program<'info,System>,
}
```

## DistributeFeeToHolders

[programs/pump/src/holder_distribution.rs:7-19](inputs/programs/pump/src/holder_distribution.rs#L7)

Global.holder_reward_claim_authority signer exclusively selects amounts/recipients; mint unchecked key derives holder-rewards PDA. Optional source token account typed and checked authority,mint,token-program. All payout state mut. Exactly2 accounts per amount. Native consumes first of each pair, second unused. Token pair owner+canonical ATA; no proof recipients are holders, authorization delegates allocation policy to claim authority.

```rust
struct DistributeFeeToHolders<'info>{
 #[account(seeds=[b"global"],bump,has_one=holder_reward_claim_authority @ PumpError::NotAuthorized)]pub global:Box<Account<'info,Global>>,
 #[account(mut)]pub holder_reward_claim_authority:Signer<'info>,
 /// CHECK: mint key identifies the rewards PDA.
 pub mint:UncheckedAccount<'info>,
 /// CHECK: System transfers enforce the source account ownership.
 #[account(mut,seeds=[b"holder-rewards",mint.key().as_ref()],bump)]pub holder_rewards:UncheckedAccount<'info>,
 #[account(mut)]pub holder_rewards_token_account:Option<Box<InterfaceAccount<'info,TokenAccount>>>,
 pub quote_mint:Box<InterfaceAccount<'info,Mint>>,
 pub quote_token_program:Interface<'info,TokenInterface>,
 pub associated_token_program:Program<'info,AssociatedToken>,
 pub system_program:Program<'info,System>,
}
```

## AdminSetIdlAuthority

[programs/pump/src/idl_authority.rs:4-15](inputs/programs/pump/src/idl_authority.rs#L4)

Global.authority signer; canonical Anchor IDL address, empty-seed Pump signer PDA, System program. IDL ownership handled by branch. System-owned branch uses transfer_with_seed(anchor:idl, Pump owner derivation); Pump-owned branch realloc10240 then discriminator and IdlAccount decode.

```rust
struct AdminSetIdlAuthority<'info> {
    pub authority: Signer<'info>,
    #[account(seeds=[b"global"],bump,has_one=authority @ PumpError::NotAuthorized)]
    pub global: Account<'info,Global>,
    /// CHECK: canonical Anchor IDL account, checked and resized by the handler.
    #[account(mut,address=anchor_lang::idl::IdlAccount::address(&crate::ID))]
    pub idl_account: UncheckedAccount<'info>,
    pub system_program: Program<'info,System>,
    /// CHECK: the program signs its own canonical empty-seed PDA.
    #[account(seeds=[],bump)]
    pub program_signer: UncheckedAccount<'info>,
}
```

## LegacyBuy

[programs/pump/src/legacy_buy.rs:9-33](inputs/programs/pump/src/legacy_buy.rs#L9)

User signer; Pump global/curve PDAs; base vault canonical ATA for curve; user token account mint/authority/program constrained. Fee config FEES owner/discriminator/PDA, fixed executable fee program. Fee recipient membership switches on mayhem flag. Normal path consumes v2 PDA then buyback key; v2 key only, no owner/data requirement because unused. Typed global/user volume supplied even if track=false; accumulator init_if_needed does not set its user field here.

```rust
struct LegacyBuy<'info>{
 #[account(seeds=[b"global"],bump)]pub global:Box<Account<'info,Global>>,
 /// CHECK: handler validates recipient.
 #[account(mut)]pub fee_recipient:UncheckedAccount<'info>,
 pub mint:Box<InterfaceAccount<'info,Mint>>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump,constraint=bonding_curve.quote_mint==Pubkey::default() @ PumpError::UnsupportedQuoteMint)]pub bonding_curve:Box<Account<'info,LegacyCurve>>,
 #[account(mut,associated_token::mint=mint,associated_token::authority=bonding_curve,associated_token::token_program=token_program)]pub associated_bonding_curve:InterfaceAccount<'info,TokenAccount>,
 #[account(mut,token::mint=mint,token::authority=user,token::token_program=token_program)]pub associated_user:InterfaceAccount<'info,TokenAccount>,
 #[account(mut)]pub user:Signer<'info>,
 pub system_program:Program<'info,System>,
 pub token_program:Interface<'info,TokenInterface>,
 /// CHECK: PDA checked.
 #[account(mut,seeds=[b"creator-vault",bonding_curve.creator.as_ref()],bump)]pub creator_vault:UncheckedAccount<'info>,
 /// CHECK: event authority.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:AccountInfo<'info>,
 /// CHECK: self CPI.
 pub program:Program<'info,crate::program::PumpRecovered>,
 #[account(seeds=[b"global_volume_accumulator"],bump)]pub global_volume_accumulator:Box<Account<'info,crate::GlobalVolumeAccumulator>>,
 #[account(init_if_needed,payer=user,space=137,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]pub user_volume_accumulator:Box<Account<'info,crate::UserVolumeAccumulator>>,
 /// CHECK: fee program validates config.
 #[account(seeds=[b"fee_config",crate::ID.as_ref()],bump,seeds::program=FEE_PROGRAM)]
 pub fee_config:Account<'info,LegacyFeeConfig>,
 /// CHECK: canonical dependency.
 pub fee_program:Program<'info,LegacyFeesProgram>,
}
```

## LegacySell

[programs/pump/src/legacy_sell.rs:21-43](inputs/programs/pump/src/legacy_sell.rs#L21)

Same user/base/curve/fee program constraints as legacy buy; quote must default (native). Direct lamport debit from Pump curve; destinations constrained to user, configured fee, creator PDA, buyback list. LegacyCurve decodes via DistributionCurve then pads to166, clears incomplete fee/depth tails, serializes only original length unless resized. Cashback remaining first account PDA+Pump owner+length>=82 but no explicit discriminator/user validation; then v2 and buyback keys.

```rust
struct LegacySell<'info>{
 #[account(seeds=[b"global"],bump)]pub global:Box<Account<'info,Global>>,
 /// CHECK: handler validates recipient.
 #[account(mut)]pub fee_recipient:UncheckedAccount<'info>,
 pub mint:Box<InterfaceAccount<'info,Mint>>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump,constraint=bonding_curve.quote_mint==Pubkey::default() @ PumpError::UnsupportedQuoteMint)]pub bonding_curve:Box<Account<'info,LegacyCurve>>,
 #[account(mut,associated_token::mint=mint,associated_token::authority=bonding_curve,associated_token::token_program=token_program)]pub associated_bonding_curve:InterfaceAccount<'info,TokenAccount>,
 #[account(mut,token::mint=mint,token::authority=user,token::token_program=token_program)]pub associated_user:InterfaceAccount<'info,TokenAccount>,
 #[account(mut)]pub user:Signer<'info>,
 pub system_program:Program<'info,System>,
 /// CHECK: PDA checked.
 #[account(mut,seeds=[b"creator-vault",bonding_curve.creator.as_ref()],bump)]pub creator_vault:UncheckedAccount<'info>,
 pub token_program:Interface<'info,TokenInterface>,
 /// CHECK: event authority.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:AccountInfo<'info>,
 /// CHECK: self CPI.
 pub program:Program<'info,crate::program::PumpRecovered>,
 /// CHECK: fee program validates config.
 #[account(seeds=[b"fee_config",crate::ID.as_ref()],bump,seeds::program=FEE_PROGRAM)]
 pub fee_config:Account<'info,LegacyFeeConfig>,
 /// CHECK: canonical dependency.
 pub fee_program:Program<'info,LegacyFeesProgram>,
}
```

## AdminGlobal

[programs/pump/src/lib.rs:166-171](inputs/programs/pump/src/lib.rs#L166)

AdminGlobal/AdminReadonly/UpdateGlobalAuthority require the Pump-owned Global at [global] and its authority signer; mut is explicit. Init is the exception: any payer can create the canonical Global once. New authority is unchecked, not a cosigner. Global serializes one whitelist key, 8 normal recipients, 8 reserved recipients and 8 buyback recipients. Reserved setter consumes first 8 remaining accounts; extras ignored, no uniqueness check. InitUserVolume binds any user key and payer; CloseUserVolume requires that user signer and PDA.

```rust
struct AdminGlobal<'info> {
    #[account(mut, seeds = [b"global"], bump, has_one = authority @ PumpError::NotAuthorized)]
    pub global: Account<'info, Global>,
    #[account(mut)]
    pub authority: Signer<'info>,
}
```

## AdminReadonly

[programs/pump/src/lib.rs:429-433](inputs/programs/pump/src/lib.rs#L429)

AdminGlobal/AdminReadonly/UpdateGlobalAuthority require the Pump-owned Global at [global] and its authority signer; mut is explicit. Init is the exception: any payer can create the canonical Global once. New authority is unchecked, not a cosigner. Global serializes one whitelist key, 8 normal recipients, 8 reserved recipients and 8 buyback recipients. Reserved setter consumes first 8 remaining accounts; extras ignored, no uniqueness check. InitUserVolume binds any user key and payer; CloseUserVolume requires that user signer and PDA.

```rust
struct AdminReadonly<'info>{
 #[account(mut,seeds=[b"global"],bump,has_one=authority @ PumpError::NotAuthorized)]
 pub global:Account<'info,Global>,
 pub authority:Signer<'info>,
}
```

## UpdateGlobalAuthority

[programs/pump/src/lib.rs:436-442](inputs/programs/pump/src/lib.rs#L436)

AdminGlobal/AdminReadonly/UpdateGlobalAuthority require the Pump-owned Global at [global] and its authority signer; mut is explicit. Init is the exception: any payer can create the canonical Global once. New authority is unchecked, not a cosigner. Global serializes one whitelist key, 8 normal recipients, 8 reserved recipients and 8 buyback recipients. Reserved setter consumes first 8 remaining accounts; extras ignored, no uniqueness check. InitUserVolume binds any user key and payer; CloseUserVolume requires that user signer and PDA.

```rust
struct UpdateGlobalAuthority<'info>{
 #[account(mut,seeds=[b"global"],bump,has_one=authority @ PumpError::NotAuthorized)]
 pub global:Account<'info,Global>,
 pub authority:Signer<'info>,
 /// CHECK: new authority is assigned by the current signer; zero/self are accepted by the original.
 pub new_authority:UncheckedAccount<'info>,
}
```

## InitUserVolume

[programs/pump/src/lib.rs:455-462](inputs/programs/pump/src/lib.rs#L455)

AdminGlobal/AdminReadonly/UpdateGlobalAuthority require the Pump-owned Global at [global] and its authority signer; mut is explicit. Init is the exception: any payer can create the canonical Global once. New authority is unchecked, not a cosigner. Global serializes one whitelist key, 8 normal recipients, 8 reserved recipients and 8 buyback recipients. Reserved setter consumes first 8 remaining accounts; extras ignored, no uniqueness check. InitUserVolume binds any user key and payer; CloseUserVolume requires that user signer and PDA.

```rust
struct InitUserVolume<'info>{
 #[account(mut)] pub payer:Signer<'info>,
 /// CHECK: any user may be funded by the payer.
 pub user:UncheckedAccount<'info>,
 #[account(init_if_needed,payer=payer,space=137,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]
 pub user_volume_accumulator:Account<'info,UserVolumeAccumulator>,
 pub system_program:Program<'info,System>,
}
```

## CloseUserVolume

[programs/pump/src/lib.rs:465-469](inputs/programs/pump/src/lib.rs#L465)

AdminGlobal/AdminReadonly/UpdateGlobalAuthority require the Pump-owned Global at [global] and its authority signer; mut is explicit. Init is the exception: any payer can create the canonical Global once. New authority is unchecked, not a cosigner. Global serializes one whitelist key, 8 normal recipients, 8 reserved recipients and 8 buyback recipients. Reserved setter consumes first 8 remaining accounts; extras ignored, no uniqueness check. InitUserVolume binds any user key and payer; CloseUserVolume requires that user signer and PDA.

```rust
struct CloseUserVolume<'info>{
 #[account(mut)] pub user:Signer<'info>,
 #[account(mut,close=user,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]
 pub user_volume_accumulator:Account<'info,UserVolumeAccumulator>,
}
```

## CollectCreatorFee

[programs/pump/src/lib.rs:479-485](inputs/programs/pump/src/lib.rs#L479)

AdminGlobal/AdminReadonly/UpdateGlobalAuthority require the Pump-owned Global at [global] and its authority signer; mut is explicit. Init is the exception: any payer can create the canonical Global once. New authority is unchecked, not a cosigner. Global serializes one whitelist key, 8 normal recipients, 8 reserved recipients and 8 buyback recipients. Reserved setter consumes first 8 remaining accounts; extras ignored, no uniqueness check. InitUserVolume binds any user key and payer; CloseUserVolume requires that user signer and PDA.

```rust
struct CollectCreatorFee<'info>{
 /// CHECK: payout destination is bound to the vault PDA.
 #[account(mut)]pub creator:UncheckedAccount<'info>,
 /// CHECK: original defers owner/data restrictions to System transfer.
 #[account(mut,seeds=[b"creator-vault",creator.key().as_ref()],bump)]pub creator_vault:UncheckedAccount<'info>,
 pub system_program:Program<'info,System>,
}
```

## Migrate

[programs/pump/src/migrate.rs:6-42](inputs/programs/pump/src/migrate.rs#L6)

User signer pays setup; withdraw_authority merely destination matched Global, not signer. Curve Pump PDA/full legacy view complete flag; base vault ATA; fixed AMM, Token/Token2022/ATA/System targets. Pool under AMM [pool,0,pool-authority,mint,quote]; LP/temporary/vault addresses all constrained. Raw d[48] and8..40 safe after DistributionCurve minimum49. Already-zero reserves returns no-op. Nonmayhem consumes remaining boost/vault after pool creation with validation delegated to AMM. Raw token amount64..72 helper assumes initialized SPL data.

```rust
struct Migrate<'info>{
 #[account(seeds=[b"global"],bump,has_one=withdraw_authority @ PumpError::NotAuthorized)]pub global:Box<Account<'info,Global>>,
 /// CHECK: global relation.
 #[account(mut)]pub withdraw_authority:UncheckedAccount<'info>,
 pub mint:Box<Account<'info,Mint>>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump,constraint=bonding_curve.quote_mint==Pubkey::default() @ PumpError::UnsupportedQuoteMint)]pub bonding_curve:Box<Account<'info,DistributionCurve>>,
 #[account(mut,associated_token::mint=mint,associated_token::authority=bonding_curve)]pub associated_bonding_curve:Box<Account<'info,TokenAccount>>,
 #[account(mut)]pub user:Signer<'info>,
 pub system_program:Program<'info,System>,pub token_program:Program<'info,Token>,pub pump_amm:Program<'info,admin_cto::Amm>,
 /// CHECK: canonical PDA.
 #[account(mut,seeds=[b"pool",&0u16.to_le_bytes(),pool_authority.key().as_ref(),mint.key().as_ref(),wsol_mint.key().as_ref()],bump,seeds::program=pump_amm.key())]pub pool:UncheckedAccount<'info>,
 /// CHECK: canonical PDA.
 #[account(mut,seeds=[b"pool-authority",mint.key().as_ref()],bump)]pub pool_authority:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool_authority.key().as_ref(),token_program.key().as_ref(),mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_authority_mint_account:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool_authority.key().as_ref(),token_program.key().as_ref(),wsol_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_authority_wsol_account:UncheckedAccount<'info>,
 /// CHECK: canonical AMM config.
 #[account(seeds=[b"global_config"],bump,seeds::program=pump_amm.key())]pub amm_global_config:UncheckedAccount<'info>,
 #[account(address=anchor_spl::token::spl_token::native_mint::ID)]pub wsol_mint:Box<Account<'info,Mint>>,
 /// CHECK: canonical LP mint.
 #[account(mut,seeds=[b"pool_lp_mint",pool.key().as_ref()],bump,seeds::program=pump_amm.key())]pub lp_mint:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool_authority.key().as_ref(),token_2022_program.key().as_ref(),lp_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub user_pool_token_account:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool.key().as_ref(),token_program.key().as_ref(),mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_base_token_account:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool.key().as_ref(),token_program.key().as_ref(),wsol_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_quote_token_account:UncheckedAccount<'info>,
 pub token_2022_program:Program<'info,Token2022>,pub associated_token_program:Program<'info,AssociatedToken>,
 /// CHECK: canonical AMM event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=pump_amm.key())]pub pump_amm_event_authority:UncheckedAccount<'info>,
 /// CHECK: canonical event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 pub program:Program<'info,crate::program::PumpRecovered>,
 /// CHECK: constrained sysvar address.
 #[account(address=anchor_lang::solana_program::sysvar::rent::ID)]pub rent:UncheckedAccount<'info>,
}
```

## MigrateV2

[programs/pump/src/migrate_v2.rs:6-47](inputs/programs/pump/src/migrate_v2.rs#L6)

User signer pays setup; withdraw_authority merely destination matched Global, not signer. Curve Pump PDA/full legacy view complete flag; base vault ATA; fixed AMM, Token/Token2022/ATA/System targets. Pool under AMM [pool,0,pool-authority,mint,quote]; LP/temporary/vault addresses all constrained. Raw d[48] and8..40 safe after DistributionCurve minimum49. Already-zero reserves returns no-op. Nonmayhem consumes remaining boost/vault after pool creation with validation delegated to AMM. Raw token amount64..72 helper assumes initialized SPL data.

```rust
struct MigrateV2<'info>{
 #[account(seeds=[b"global"],bump,has_one=withdraw_authority @ PumpError::NotAuthorized)]pub global:Box<Account<'info,Global>>,
 /// CHECK: global relation.
 #[account(mut)]pub withdraw_authority:UncheckedAccount<'info>,
 pub base_mint:Box<InterfaceAccount<'info,Mint>>,
 pub quote_mint:Box<InterfaceAccount<'info,Mint>>,
 #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump,constraint=(if bonding_curve.quote_mint==Pubkey::default(){quote_mint.key()==anchor_spl::token::spl_token::native_mint::ID}else{quote_mint.key()==bonding_curve.quote_mint}) @ PumpError::MintDoesNotMatchBondingCurve)]pub bonding_curve:Box<Account<'info,DistributionCurve>>,
 #[account(mut,associated_token::mint=base_mint,associated_token::authority=bonding_curve,associated_token::token_program=base_token_program)]pub associated_base_bonding_curve:Box<InterfaceAccount<'info,TokenAccount>>,
 /// CHECK: canonical quote ATA.
 #[account(mut,seeds=[bonding_curve.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_quote_bonding_curve:UncheckedAccount<'info>,
 #[account(mut)]pub user:Signer<'info>,
 pub system_program:Program<'info,System>,pub pump_amm:Program<'info,admin_cto::Amm>,
 /// CHECK: canonical PDA.
 #[account(mut,seeds=[b"pool",&0u16.to_le_bytes(),pool_authority.key().as_ref(),base_mint.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=pump_amm.key())]pub pool:UncheckedAccount<'info>,
 /// CHECK: canonical PDA.
 #[account(mut,seeds=[b"pool-authority",base_mint.key().as_ref()],bump)]pub pool_authority:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool_authority.key().as_ref(),base_token_program.key().as_ref(),base_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_authority_mint_account:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool_authority.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_authority_quote_account:UncheckedAccount<'info>,
 /// CHECK: canonical AMM config.
 #[account(seeds=[b"global_config"],bump,seeds::program=pump_amm.key())]pub amm_global_config:UncheckedAccount<'info>,

 /// CHECK: canonical LP base_mint.
 #[account(mut,seeds=[b"pool_lp_mint",pool.key().as_ref()],bump,seeds::program=pump_amm.key())]pub lp_mint:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool_authority.key().as_ref(),token_2022_program.key().as_ref(),lp_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub user_pool_token_account:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool.key().as_ref(),base_token_program.key().as_ref(),base_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_base_token_account:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_quote_token_account:UncheckedAccount<'info>,
 pub base_token_program:Interface<'info,TokenInterface>,pub quote_token_program:Interface<'info,TokenInterface>,
 pub token_2022_program:Program<'info,Token2022>,pub associated_token_program:Program<'info,AssociatedToken>,
 /// CHECK: canonical AMM event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=pump_amm.key())]pub pump_amm_event_authority:UncheckedAccount<'info>,
 /// CHECK: constrained sysvar address.
 #[account(address=anchor_lang::solana_program::sysvar::rent::ID)]pub rent:UncheckedAccount<'info>,
 /// CHECK: canonical event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:UncheckedAccount<'info>,
 /// CHECK: forwarded event CPI program account.
 pub program:UncheckedAccount<'info>,
}
```

## GetMinimumDistributableFee

[programs/pump/src/minimum.rs:4-10](inputs/programs/pump/src/minimum.rs#L4)

Readonly Pump curve and FEES sharing PDAs; has_one mint; creator equals sharing key, vault fixed. No signer necessary. At leastN ordered recipients; exact key, nonexecutable, positive share; extra remaining ignored. Active status not checked.

```rust
struct GetMinimumDistributableFee<'info>{
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(seeds=[b"bonding-curve",mint.key().as_ref()],bump)]pub bonding_curve:Account<'info,DistributionCurve>,
 #[account(seeds=[b"sharing-config",mint.key().as_ref()],bump,seeds::program=FEES,has_one=mint @ PumpError::MintDoesNotMatchBondingCurve)]pub sharing_config:Account<'info,SharingConfig>,
 /// CHECK: only seeds and available lamports are used by this readonly query.
 #[account(seeds=[b"creator-vault",sharing_config.key().as_ref()],bump)]pub creator_vault:UncheckedAccount<'info>,
}
```

## MultiHopCurve

[programs/pump/src/multi_hop_curve.rs:14-27](inputs/programs/pump/src/multi_hop_curve.rs#L14)

Requires AMM [global_config] PDA Signer derived under fixed AMM, user signer and source_authority signer. This is a CPI capability, not a public keypair endpoint. Dynamic CurveHop owner/PDA/quote relation and mut; exact ordinary Tokenkeg owner/sizes enforced for supported routes. Five accounts per hop, flags count exact and bits<4. One-hop only flag3; two-hop exactly10 accounts with distinct root/nested, buy[1,2],sell[2,1]. two-curve validates both ATAs, stored mint/authority and rent. Source/destination only mint/owner/size: no destination-owner=user requirement.

```rust
pub struct MultiHopCurve<'info>{
 #[account(seeds=[b"global"],bump)]pub global:Box<Account<'info,Global>>,
 #[account(seeds=[b"fee_config",crate::ID.as_ref()],bump=fee_config.to_account_info().try_borrow_data()?[8],seeds::program=FEES)]pub fee_config:Box<Account<'info,LegacyFeeConfig>>,
 #[account(seeds=[b"global_config"],bump,seeds::program=AMM)]pub pump_amm_global_config:Signer<'info>,
 #[account(mut)]pub user:Signer<'info>,
 pub source_authority:Signer<'info>,
 #[account(mut)]pub source:Box<InterfaceAccount<'info,TokenAccount>>,
 #[account(mut)]pub destination:Box<InterfaceAccount<'info,TokenAccount>>,
 /// CHECK: Native recipient membership and its canonical WSOL ATA are checked.
 #[account(mut)]pub buyback_fee_recipient:UncheckedAccount<'info>,
 pub token_program:Program<'info,Token>,
 pub token_2022_program:Program<'info,Token2022>,
 pub system_program:Program<'info,System>,
}
```

## CurveHop

[programs/pump/src/multi_hop_curve.rs:29-38](inputs/programs/pump/src/multi_hop_curve.rs#L29)

Requires AMM [global_config] PDA Signer derived under fixed AMM, user signer and source_authority signer. This is a CPI capability, not a public keypair endpoint. Dynamic CurveHop owner/PDA/quote relation and mut; exact ordinary Tokenkeg owner/sizes enforced for supported routes. Five accounts per hop, flags count exact and bits<4. One-hop only flag3; two-hop exactly10 accounts with distinct root/nested, buy[1,2],sell[2,1]. two-curve validates both ATAs, stored mint/authority and rent. Source/destination only mint/owner/size: no destination-owner=user requirement.

```rust
pub struct CurveHop<'info>{
 pub base_mint:Box<InterfaceAccount<'info,Mint>>,
 pub quote_mint:Box<InterfaceAccount<'info,Mint>>,
 #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump,
 constraint=bonding_curve.quote_mint==quote_mint.key() || (bonding_curve.quote_mint==Pubkey::default() && quote_mint.key()==WSOL) @ PumpError::MintDoesNotMatchBondingCurve)]
 pub bonding_curve:Box<Account<'info,BondingCurve>>,
 #[account(mut)]pub base_vault:Box<InterfaceAccount<'info,TokenAccount>>,
 /// CHECK: Address and native quote branch checked before transfer.
 #[account(mut)]pub quote_vault:UncheckedAccount<'info>,
}
```

## InitializeQuoteControl

[programs/pump/src/quote_control/initialize_quote_control.rs:6-20](inputs/programs/pump/src/quote_control/initialize_quote_control.rs#L6)

Initialize is permissionless but sets both roles to zero. Global authority alone rotates admin; global OR admin rotates reserves admin and lists/removes; reserves updates also admit reserves_admin. All state canonical Pump PDAs and typed ownership/discriminator. Vector starts capacity 50, hard maximum 256 new entries. space =108+40*n checked. Entry operations find first matching key; listing forbids default and both native mint IDs and duplicates.

```rust
struct InitializeQuoteControl<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + QuoteControl::INIT_SPACE,
        seeds = [QUOTE_CONTROL_SEED],
        bump,
    )]
    pub quote_control: Account<'info, QuoteControl>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}
```

## UpdateQuoteControlMints

[programs/pump/src/quote_control/update_quote_control_mints.rs:9-24](inputs/programs/pump/src/quote_control/update_quote_control_mints.rs#L9)

Initialize is permissionless but sets both roles to zero. Global authority alone rotates admin; global OR admin rotates reserves admin and lists/removes; reserves updates also admit reserves_admin. All state canonical Pump PDAs and typed ownership/discriminator. Vector starts capacity 50, hard maximum 256 new entries. space =108+40*n checked. Entry operations find first matching key; listing forbids default and both native mint IDs and duplicates.

```rust
struct UpdateQuoteControlMints<'info> {
    #[account(
        mut,
        constraint = authority.key() == global.authority
            || quote_control.is_admin(&authority.key()) @ PumpError::NotAuthorized
    )]
    pub authority: Signer<'info>,

    #[account(seeds = [b"global"], bump)]
    pub global: Account<'info, Global>,

    #[account(mut, seeds = [QUOTE_CONTROL_SEED], bump)]
    pub quote_control: Account<'info, QuoteControl>,

    pub system_program: Program<'info, System>,
}
```

## SetQuoteControlMintReserves

[programs/pump/src/quote_control/update_quote_control_mints.rs:125-138](inputs/programs/pump/src/quote_control/update_quote_control_mints.rs#L125)

Initialize is permissionless but sets both roles to zero. Global authority alone rotates admin; global OR admin rotates reserves admin and lists/removes; reserves updates also admit reserves_admin. All state canonical Pump PDAs and typed ownership/discriminator. Vector starts capacity 50, hard maximum 256 new entries. space =108+40*n checked. Entry operations find first matching key; listing forbids default and both native mint IDs and duplicates.

```rust
struct SetQuoteControlMintReserves<'info> {
    #[account(
        constraint = authority.key() == global.authority
            || quote_control.is_admin(&authority.key())
            || quote_control.is_reserves_admin(&authority.key()) @ PumpError::NotAuthorized
    )]
    pub authority: Signer<'info>,

    #[account(seeds = [b"global"], bump)]
    pub global: Account<'info, Global>,

    #[account(mut, seeds = [QUOTE_CONTROL_SEED], bump)]
    pub quote_control: Account<'info, QuoteControl>,
}
```

## SetQuoteControlAdmin

[programs/pump/src/quote_control/update_quote_control_mints.rs:162-170](inputs/programs/pump/src/quote_control/update_quote_control_mints.rs#L162)

Initialize is permissionless but sets both roles to zero. Global authority alone rotates admin; global OR admin rotates reserves admin and lists/removes; reserves updates also admit reserves_admin. All state canonical Pump PDAs and typed ownership/discriminator. Vector starts capacity 50, hard maximum 256 new entries. space =108+40*n checked. Entry operations find first matching key; listing forbids default and both native mint IDs and duplicates.

```rust
struct SetQuoteControlAdmin<'info> {
    #[account(seeds = [b"global"], bump, has_one = authority @ PumpError::NotAuthorized)]
    pub global: Account<'info, Global>,

    pub authority: Signer<'info>,

    #[account(mut, seeds = [QUOTE_CONTROL_SEED], bump)]
    pub quote_control: Account<'info, QuoteControl>,
}
```

## SetQuoteControlReservesAdmin

[programs/pump/src/quote_control/update_quote_control_mints.rs:200-212](inputs/programs/pump/src/quote_control/update_quote_control_mints.rs#L200)

Initialize is permissionless but sets both roles to zero. Global authority alone rotates admin; global OR admin rotates reserves admin and lists/removes; reserves updates also admit reserves_admin. All state canonical Pump PDAs and typed ownership/discriminator. Vector starts capacity 50, hard maximum 256 new entries. space =108+40*n checked. Entry operations find first matching key; listing forbids default and both native mint IDs and duplicates.

```rust
struct SetQuoteControlReservesAdmin<'info> {
    #[account(
        constraint = authority.key() == global.authority
            || quote_control.is_admin(&authority.key()) @ PumpError::NotAuthorized
    )]
    pub authority: Signer<'info>,

    #[account(seeds = [b"global"], bump)]
    pub global: Account<'info, Global>,

    #[account(mut, seeds = [QUOTE_CONTROL_SEED], bump)]
    pub quote_control: Account<'info, QuoteControl>,
}
```

## SetCreator

[programs/pump/src/set_creator.rs:21-27](inputs/programs/pump/src/set_creator.rs#L21)

Set requires Global.set_creator_authority signer; sync permissionless. Both canonical metadata PDA under fixed Metaplex and typed metadata owner; curve Pump PDA. Only acts if current creator default. Metadata parser requires key4 and decodes standard prefix incl creators/booleans/edition option; discards embedded mint and update authority, relies PDA. Some(empty) not guarded before cs[0] (F4). SetterCurve pads166 then full166 write.

```rust
struct SetCreator<'info>{
 pub set_creator_authority:Signer<'info>,
 #[account(seeds=[b"global"],bump,has_one=set_creator_authority @ PumpError::NotAuthorized)]pub global:Box<Account<'info,Global>>,
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(seeds=[b"metadata",METAPLEX.as_ref(),mint.key().as_ref()],bump,seeds::program=METAPLEX)]pub metadata:Account<'info,CreatorMetadata>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump)]pub bonding_curve:Account<'info,SetterCurve>,
}
```

## SetMetaplexCreator

[programs/pump/src/set_creator.rs:29-33](inputs/programs/pump/src/set_creator.rs#L29)

Set requires Global.set_creator_authority signer; sync permissionless. Both canonical metadata PDA under fixed Metaplex and typed metadata owner; curve Pump PDA. Only acts if current creator default. Metadata parser requires key4 and decodes standard prefix incl creators/booleans/edition option; discards embedded mint and update authority, relies PDA. Some(empty) not guarded before cs[0] (F4). SetterCurve pads166 then full166 write.

```rust
struct SetMetaplexCreator<'info>{
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(seeds=[b"metadata",METAPLEX.as_ref(),mint.key().as_ref()],bump,seeds::program=METAPLEX)]pub metadata:Account<'info,CreatorMetadata>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump)]pub bonding_curve:Account<'info,SetterCurve>,
}
```

## SetParams

[programs/pump/src/set_params.rs:5-8](inputs/programs/pump/src/set_params.rs#L5)

Only Global.authority signer, canonical mutable Global; remaining recipients are not authorities. At least 8 recipients; first 8 nonzero, rent exempt and strictly ascending; additional accounts ignored. No executable exclusion in this setter.

```rust
struct SetParams<'info>{
 #[account(mut,seeds=[b"global"],bump,has_one=authority @ PumpError::NotAuthorized)]pub global:Account<'info,Global>,
 #[account(mut)]pub authority:Signer<'info>,
}
```

## SweepFees

[programs/pump/src/sweep.rs:22-37](inputs/programs/pump/src/sweep.rs#L22)

Payer signer only; Pump curve PDA tied to base mint, quote relation. Recipient creator vault derived from current creator OR authorized normal/reserved protocol recipient; raw mutable destinations. SweepCurve validates discriminator/min49 and present bools then pads to>=166, zeroes incomplete field ranges. fee buckets125/133; keys49/83. Classic binary search assumes sorted normal7 list (set_params sorts all8).

```rust
struct SweepFees<'info>{
 #[account(mut)]pub payer:Signer<'info>,
 #[account(seeds=[b"global"],bump)]pub global:Account<'info,Global>,
 pub base_mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 pub quote_mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 pub quote_token_program:Interface<'info,anchor_spl::token_interface::TokenInterface>,
 pub associated_token_program:Program<'info,anchor_spl::associated_token::AssociatedToken>,
 pub system_program:Program<'info,System>,
 #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump,constraint=(if bonding_curve.field_key(83)==Pubkey::default(){anchor_spl::token::spl_token::native_mint::ID}else{bonding_curve.field_key(83)})==quote_mint.key() @ PumpError::MintDoesNotMatchBondingCurve)]pub bonding_curve:Account<'info,SweepCurve>,
 /// CHECK: checked as token data only in the positive token branch.
 #[account(mut,seeds=[bonding_curve.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_quote_bonding_curve:UncheckedAccount<'info>,
 /// CHECK: handler verifies fee recipient or creator vault.
 #[account(mut)]pub recipient:UncheckedAccount<'info>,
 /// CHECK: address checked; token branch creates or parses.
 #[account(mut,seeds=[recipient.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_quote_recipient:UncheckedAccount<'info>,
}
```

## SellV3

[programs/pump/src/trade.rs:9-41](inputs/programs/pump/src/trade.rs#L9)

SellV3 has user signer, full Pump curve PDA, constrained base vault/user. Fee config owner FEES and PDA; quote path restricted to SOL/default or exact USDC. USDC user authority and buyback token owner membership checked, vault/buyback canonical ATAs. No dynamic remaining accounts consumed. read_config checks discriminator and2512 minimum; stable/exotic fields decoded only at4073/4097. Exact-buy instead fully deserializes FeeConfig then checks length. selected requires callers nonempty tiers; assumes sorted schedule.

```rust
struct SellV3<'info> {
    #[account(seeds=[b"global"],bump)]
    pub global: Box<Account<'info, Global>>,
    pub base_mint: Box<InterfaceAccount<'info, Mint>>,
    /// CHECK: recovered SOL/USDC quote checks validate this account.
    pub quote_mint: UncheckedAccount<'info>,
    pub base_token_program: Interface<'info, TokenInterface>,
    pub quote_token_program: Interface<'info, TokenInterface>,
    #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump)]
    pub bonding_curve: Box<Account<'info, BondingCurve>>,
    #[account(mut,associated_token::mint=base_mint,associated_token::authority=bonding_curve,associated_token::token_program=base_token_program)]
    pub associated_base_bonding_curve: InterfaceAccount<'info, TokenAccount>,
    /// CHECK: token-quote checks validate owner, mint and relevant authority/address.
    #[account(mut)]
    pub associated_quote_bonding_curve: UncheckedAccount<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut,token::mint=base_mint,token::authority=user,token::token_program=base_token_program)]
    pub associated_base_user: InterfaceAccount<'info, TokenAccount>,
    /// CHECK: token-quote checks validate owner, mint and relevant authority/address.
    #[account(mut)]
    pub associated_quote_user: UncheckedAccount<'info>,
    /// CHECK: v3 rejects cashback; tested paths do not update volume accumulation.
    #[account(mut,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]
    pub user_volume_accumulator: UncheckedAccount<'info>,
    /// CHECK: cross-program FeeConfig owner, address and serialization checked.
    #[account(owner=FEE_PROGRAM @ anchor_lang::error::ErrorCode::AccountOwnedByWrongProgram,seeds=[b"fee_config",crate::ID.as_ref()],bump,seeds::program=FEE_PROGRAM)]
    pub fee_config: UncheckedAccount<'info>,
    /// CHECK: membership in global buyback recipients is checked in handler.
    #[account(mut)]
    pub buyback_fee_recipient: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}
```

## SyncUserVolumeAccumulator

[programs/pump/src/volume_sync.rs:13-20](inputs/programs/pump/src/volume_sync.rs#L13)

Permissionless user key fixes accumulator PDA; both Pump typed accounts canonical, user accumulator mutable. GlobalVolume state has30 supply/volume entries; sync reads start_time only. Stored user field not compared; PDA binds key.

```rust
struct SyncUserVolumeAccumulator<'info> {
    /// CHECK: used to derive the user accumulator and name the event.
    pub user: UncheckedAccount<'info>,
    #[account(seeds=[b"global_volume_accumulator"],bump)]
    pub global_volume_accumulator: Account<'info,GlobalVolumeAccumulator>,
    #[account(mut,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]
    pub user_volume_accumulator: Account<'info,UserVolumeAccumulator>,
}
```
