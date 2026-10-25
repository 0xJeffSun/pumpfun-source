use anchor_lang::prelude::*;

pub mod trade_types;
pub mod trade;
pub use trade::*;

declare_id!("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");

#[program]
pub mod pump_recovered {
    use super::*;
    pub fn buy_v3(ctx: Context<SellV3>, amount:u64,max_sol_cost:u64,partial_fill:OptionBool)->Result<()>{let _ = partial_fill;trade::buy(ctx,amount,max_sol_cost)}
    pub fn add_quote_mint(ctx:Context<AdminGlobal>,quote_mint:Pubkey)->Result<()>{
     require!(quote_mint!=Pubkey::default() && quote_mint!=anchor_lang::solana_program::pubkey!("So11111111111111111111111111111111111111112"),PumpError::QuoteMintNotEligibleForWhitelist);
     require!(!ctx.accounts.global.whitelisted_quote_mints.contains(&quote_mint),PumpError::QuoteMintAlreadyWhitelisted);
     let slot=ctx.accounts.global.whitelisted_quote_mints.iter_mut().find(|key|**key==Pubkey::default()).ok_or_else(||error!(PumpError::QuoteMintWhitelistFull))?;*slot=quote_mint;Ok(())
    }
    pub fn remove_quote_mint(ctx:Context<AdminGlobal>,quote_mint:Pubkey)->Result<()>{
     require!(quote_mint!=Pubkey::default(),PumpError::QuoteMintNotEligibleForWhitelist);
     let slot=ctx.accounts.global.whitelisted_quote_mints.iter_mut().find(|key|**key==quote_mint).ok_or_else(||error!(PumpError::QuoteMintNotWhitelisted))?;*slot=Pubkey::default();Ok(())
    }
    pub fn update_global_authority(ctx:Context<UpdateGlobalAuthority>)->Result<()>{
     let event=UpdateGlobalAuthorityEvent{global:ctx.accounts.global.key(),authority:ctx.accounts.authority.key(),new_authority:ctx.accounts.new_authority.key(),timestamp:Clock::get()?.unix_timestamp};
     ctx.accounts.global.authority=ctx.accounts.new_authority.key();emit!(event.clone());emit_cpi!(event);Ok(())
    }
    pub fn set_reserved_fee_recipients(ctx:Context<AdminReadonly>,whitelist_pda:Pubkey)->Result<()>{
     require!(ctx.remaining_accounts.len()>=8,PumpError::NotEnoughRemainingAccounts);
     for account in ctx.remaining_accounts.iter().take(8){require!(account.key()!=Pubkey::default(),PumpError::AllFeeRecipientsShouldBeNonZero);require!(!account.executable,anchor_lang::error::ErrorCode::ConstraintExecutable);require!(Rent::get()?.is_exempt(account.lamports(),account.data_len()),anchor_lang::error::ErrorCode::ConstraintRentExempt);}
     let first=ctx.remaining_accounts[0].key();let rest=core::array::from_fn(|i|ctx.remaining_accounts[i+1].key());
     ctx.accounts.global.whitelist_pda=whitelist_pda;ctx.accounts.global.reserved_fee_recipient=first;ctx.accounts.global.reserved_fee_recipients=rest;
     let event=ReservedFeeRecipientsEvent{timestamp:Clock::get()?.unix_timestamp,reserved_fee_recipient:first,reserved_fee_recipients:rest};emit!(event.clone());emit_cpi!(event);Ok(())
    }
    pub fn set_virtual_quote_reserves(ctx:Context<AdminGlobal>,initial_virtual_quote_reserves:u64)->Result<()>{ctx.accounts.global.initial_virtual_quote_reserves=initial_virtual_quote_reserves;Ok(())}
    pub fn update_buyback_config(ctx:Context<AdminGlobal>,buyback_basis_points:Option<u64>)->Result<()>{if let Some(value)=buyback_basis_points{require!(value<=10000,PumpError::BuybackBasisPointsOutOfRange);ctx.accounts.global.buyback_basis_points=value;}Ok(())}
    pub fn update_creator_fee_config(ctx:Context<AdminGlobal>,creator_fee_configurable:bool,max_configurable_creator_fee_bps:u64)->Result<()>{
      ctx.accounts.global.creator_fee_configurable=creator_fee_configurable;ctx.accounts.global.max_configurable_creator_fee_bps=max_configurable_creator_fee_bps;
      let event=UpdateCreatorFeeConfigEvent{timestamp:Clock::get()?.unix_timestamp,authority:ctx.accounts.authority.key(),creator_fee_configurable,max_configurable_creator_fee_bps};emit!(event.clone());emit_cpi!(event);Ok(())
    }
    pub fn update_holder_reward_config(ctx:Context<AdminGlobal>,is_holder_reward_enabled:bool,holder_reward_claim_authority:Pubkey)->Result<()>{ctx.accounts.global.is_holder_reward_enabled=is_holder_reward_enabled;ctx.accounts.global.holder_reward_claim_authority=holder_reward_claim_authority;Ok(())}
    pub fn sell_v3(ctx: Context<SellV3>, amount: u64, min_sol_output: u64) -> Result<()> { trade::sell(ctx, amount, min_sol_output) }
    pub fn toggle_create_v2(ctx: Context<AdminGlobal>, enabled: bool) -> Result<()> {
        require_neq!(ctx.accounts.global.create_v2_enabled, enabled, PumpError::NotAuthorized);
        ctx.accounts.global.create_v2_enabled = enabled;
        Ok(())
    }
    pub fn toggle_mayhem_mode(ctx: Context<AdminGlobal>, enabled: bool) -> Result<()> {
        require_neq!(ctx.accounts.global.mayhem_mode_enabled, enabled, PumpError::NotAuthorized);
        ctx.accounts.global.mayhem_mode_enabled = enabled;
        Ok(())
    }
    pub fn toggle_cashback_enabled(ctx: Context<AdminGlobal>, enabled: bool) -> Result<()> {
        require_neq!(ctx.accounts.global.is_cashback_enabled, enabled, PumpError::NotAuthorized);
        ctx.accounts.global.is_cashback_enabled = enabled;
        Ok(())
    }
    pub fn set_max_curve_depth(ctx: Context<AdminGlobal>, max_curve_depth: u8) -> Result<()> {
        ctx.accounts.global.max_curve_depth = max_curve_depth;
        Ok(())
    }
}

#[event_cpi]
#[derive(Accounts)]
pub struct AdminGlobal<'info> {
    #[account(mut, seeds = [b"global"], bump, has_one = authority @ PumpError::NotAuthorized)]
    pub global: Account<'info, Global>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[account]
pub struct Global {
    pub initialized: bool,
    pub authority: Pubkey,
    pub fee_recipient: Pubkey,
    pub initial_virtual_token_reserves: u64,
    pub initial_virtual_sol_reserves: u64,
    pub initial_real_token_reserves: u64,
    pub token_total_supply: u64,
    pub fee_basis_points: u64,
    pub withdraw_authority: Pubkey,
    pub enable_migrate: bool,
    pub pool_migration_fee: u64,
    pub creator_fee_basis_points: u64,
    pub fee_recipients: [Pubkey; 7],
    pub set_creator_authority: Pubkey,
    pub admin_set_creator_authority: Pubkey,
    pub create_v2_enabled: bool,
    pub whitelist_pda: Pubkey,
    pub reserved_fee_recipient: Pubkey,
    pub mayhem_mode_enabled: bool,
    pub reserved_fee_recipients: [Pubkey; 7],
    pub is_cashback_enabled: bool,
    pub buyback_fee_recipients: [Pubkey; 8],
    pub buyback_basis_points: u64,
    pub initial_virtual_quote_reserves: u64,
    pub whitelisted_quote_mints: [Pubkey; 1],
    pub creator_fee_configurable: bool,
    pub max_configurable_creator_fee_bps: u64,
    pub holder_reward_claim_authority: Pubkey,
    pub is_holder_reward_enabled: bool,
    pub max_curve_depth: u8,
}

#[error_code]
pub enum PumpError {
    #[msg("The given account is not authorized to execute this instruction.")]
    NotAuthorized,
    #[msg("The program is already initialized.")]
    AlreadyInitialized,
    #[msg("slippage: Too much SOL required to buy the given amount of tokens.")]
    TooMuchSolRequired,
    #[msg("slippage: Too little SOL received to sell the given amount of tokens.")]
    TooLittleSolReceived,
    #[msg("The mint does not match the bonding curve.")]
    MintDoesNotMatchBondingCurve,
    #[msg("The bonding curve has completed and liquidity migrated to raydium.")]
    BondingCurveComplete,
    #[msg("The bonding curve has not completed.")]
    BondingCurveNotComplete,
    #[msg("The program is not initialized.")]
    NotInitialized,
    #[msg("Withdraw too frequent")]
    WithdrawTooFrequent,
    #[msg("new_size should be > current_size")]
    NewSizeShouldBeGreaterThanCurrentSize,
    #[msg("Account type not supported")]
    AccountTypeNotSupported,
    #[msg("initial_real_token_reserves should be less than token_total_supply")]
    InitialRealTokenReservesShouldBeLessThanTokenTotalSupply,
    #[msg("initial_virtual_token_reserves should be greater than initial_real_token_reserves")]
    InitialVirtualTokenReservesShouldBeGreaterThanInitialRealTokenReserves,
    #[msg("fee_basis_points greater than maximum")]
    FeeBasisPointsGreaterThanMaximum,
    #[msg("Withdraw authority cannot be set to System Program ID")]
    AllZerosWithdrawAuthority,
    #[msg("pool_migration_fee should be less than final_real_sol_reserves")]
    PoolMigrationFeeShouldBeLessThanFinalRealSolReserves,
    #[msg("pool_migration_fee should be greater than creator_fee + MAX_MIGRATE_FEES")]
    PoolMigrationFeeShouldBeGreaterThanCreatorFeePlusMaxMigrateFees,
    #[msg("Migrate instruction is disabled")]
    DisabledWithdraw,
    #[msg("Migrate instruction is disabled")]
    DisabledMigrate,
    #[msg("Invalid creator pubkey")]
    InvalidCreator,
    #[msg("Buy zero amount")]
    BuyZeroAmount,
    #[msg("Not enough tokens to buy")]
    NotEnoughTokensToBuy,
    #[msg("Sell zero amount")]
    SellZeroAmount,
    #[msg("Not enough tokens to sell")]
    NotEnoughTokensToSell,
    #[msg("Overflow")]
    Overflow,
    #[msg("Truncation")]
    Truncation,
    #[msg("Division by zero")]
    DivisionByZero,
    #[msg("Not enough remaining accounts")]
    NotEnoughRemainingAccounts,
    #[msg("All fee recipients should be non-zero")]
    AllFeeRecipientsShouldBeNonZero,
    #[msg("Unsorted or not unique fee recipients")]
    UnsortedNotUniqueFeeRecipients,
    #[msg("Creator should not be zero")]
    CreatorShouldNotBeZero,
    StartTimeInThePast,
    EndTimeInThePast,
    EndTimeBeforeStartTime,
    TimeRangeTooLarge,
    EndTimeBeforeCurrentDay,
    SupplyUpdateForFinishedRange,
    DayIndexAfterEndIndex,
    DayInActiveRange,
    InvalidIncentiveMint,
    #[msg("Buy: Not enough SOL to cover for rent exemption.")]
    BuyNotEnoughSolToCoverRent,
    #[msg("Buy: Not enough SOL to cover for fees.")]
    BuyNotEnoughSolToCoverFees,
    #[msg("Slippage: Would buy less tokens than expected min_tokens_out")]
    BuySlippageBelowMinTokensOut,
    NameTooLong,
    SymbolTooLong,
    UriTooLong,
    CreateV2Disabled,
    CpitializeMayhemFailed,
    MayhemModeDisabled,
    #[msg("creator has been migrated to sharing config")]
    CreatorMigratedToSharingConfig,
    #[msg("creator_vault has been migrated to sharing config, use pump:distribute_creator_fees instead")]
    UnableToDistributeCreatorVaultMigratedToSharingConfig,
    #[msg("Sharing config is not active")]
    SharingConfigNotActive,
    #[msg("The recipient account is executable, so it cannot receive lamports, remove it from the team first")]
    UnableToDistributeCreatorFeesToExecutableRecipient,
    #[msg("Bonding curve creator does not match sharing config")]
    BondingCurveAndSharingConfigCreatorMismatch,
    #[msg("Remaining accounts do not match shareholders, make sure to pass exactly the same pubkeys in the same order")]
    ShareholdersAndRemainingAccountsMismatch,
    #[msg("Share bps must be greater than 0")]
    InvalidShareBps,
    #[msg("Cashback is not enabled")]
    CashbackNotEnabled,
    #[msg("Buyback fee recipient not authorized")]
    BuybackFeeRecipientNotAuthorized,
    AllBuybackFeeRecipientsShouldBeNonZero,
    NotUniqueBuybackFeeRecipients,
    #[msg("buyback_basis_points must be <= 10_000")]
    BuybackBasisPointsOutOfRange,
    #[msg("buyback fee recipients require exactly 8 remaining accounts (or none)")]
    WrongBuybackFeeRecipientsCount,
    BuybackFeeRecipientMissing,
    #[msg("Unsupported quote mint")]
    UnsupportedQuoteMint,
    #[msg("Create v2: quote token program must be SPL Token or Token-2022")]
    InvalidQuoteTokenProgram,
    #[msg("Create v2: associated quote bonding curve address does not match derivation")]
    InvalidAssociatedQuoteBondingCurve,
    #[msg("Quote mint whitelist is full")]
    QuoteMintWhitelistFull,
    #[msg("Quote mint is already whitelisted")]
    QuoteMintAlreadyWhitelisted,
    #[msg("Quote mint is not in the whitelist")]
    QuoteMintNotWhitelisted,
    #[msg("Quote mint cannot be added or removed via whitelist (default or native SOL mint)")]
    QuoteMintNotEligibleForWhitelist,
    #[msg("Unable to distribute creator fees to uninitialized account")]
    UnableToDistributeCreatorFeesToUninitializedAccount,
    #[msg("Mayhem mode quote mint not allowed")]
    MayhemModeQuoteMintNotAllowed,
    #[msg("Cashback trade is missing the required remaining accounts")]
    MissingCashbackAccounts,
    #[msg("Cashback user_volume_accumulator account is invalid")]
    InvalidCashbackAccumulator,
    #[msg("bonding_curve_v2 remaining account is missing or invalid")]
    InvalidBondingCurveV2,
    #[msg("quote_control remaining account does not match derivation or is uninitialized")]
    InvalidQuoteControl,
    #[msg("Cashback recipient token account is not owned by user")]
    InvalidCashbackRecipient,
    #[msg("Configurable creator fees are disabled")]
    CreatorFeeNotConfigurable,
    #[msg("Creator fee basis points must be between 1 and the configured maximum")]
    CreatorFeeBpsOutOfRange,
    #[msg("Creator fee is not editable for this bonding curve")]
    CreatorFeeNotEditable,
    #[msg("Creator fee cannot be configured for a cashback coin")]
    CreatorFeeNotAllowedForCashbackCoin,
    #[msg("Bonding curve has already migrated")]
    BondingCurveAlreadyMigrated,
    #[msg("Cashback coins can no longer be created")]
    CashbackDeprecated,
    #[msg("The creator of a holder-reward coin cannot be changed")]
    HolderRewardCreatorImmutable,
    #[msg("Holder-reward coins are disabled")]
    HolderRewardDisabled,
    #[msg("Holder-reward amounts and recipient accounts do not match")]
    HolderRewardRecipientsMismatch,
    #[msg("The holder-rewards PDA cannot be left below its rent-exempt minimum")]
    HolderRewardsRentFloor,
    #[msg("A holder-rewards token account is required on a token quote")]
    HolderRewardTokenAccountMissing,
    #[msg("CTO is not allowed on a mayhem-mode coin")]
    CtoNotAllowedForMayhemCoin,
    #[msg("new_creator is required unless converting to holder rewards")]
    CtoNewCreatorRequired,
    #[msg("new_creator must be omitted when converting to holder rewards")]
    CtoNewCreatorNotAllowed,
    #[msg("Creator fee is not configurable on a SOL or whitelisted quote; the fee schedule applies")]
    CreatorFeeNotConfigurableForQuote,
    #[msg("current_creator must be passed writable so the outgoing creator can be paid")]
    CtoCreatorAccountNotWritable,
    #[msg("A frozen sharing-config vault account holds a balance; thaw it before the holder conversion")]
    CtoSharedVaultFrozen,
    #[msg("v3 trades do not support cashback coins; use the v2 instructions")]
    CashbackCoinNotSupported,
    #[msg("creator_fee must be swept before the creator changes or the vault is distributed")]
    CreatorFeesNotSwept,
    #[msg("The fee config tier table is empty")]
    FeeTiersEmpty,
    #[msg("The fee config account is shorter than its initialize size")]
    FeeConfigTooShort,
    #[msg("multi-hop: a hop's input mint is neither side of its bonding curve")]
    MultiHopDiscontinuousPath,
    #[msg("Quote bonding curve remaining account does not match derivation or is uninitialized")]
    InvalidQuoteBondingCurve,
    #[msg("Quote bonding curve is not eligible as a quote: mayhem mode, or the chain's depth-0 root is quoted in a mint no list admits")]
    QuoteBondingCurveNotEligible,
    #[msg("A quote-chain bonding curve has migrated: its pool and vault remaining accounts are required")]
    QuotePoolAccountsRequired,
    #[msg("Quote pool remaining account is not an initialized pump-amm pool")]
    QuotePoolNotFound,
    #[msg("Quote pool or vault remaining accounts do not match derivation or are invalid")]
    InvalidQuotePool,
    #[msg("Derived quote reserves are zero")]
    QuoteReservesOutOfRange,
    #[msg("The new curve's depth (quote coin depth plus one) exceeds Global.max_curve_depth or the program's cap of 5")]
    CurveDepthExceeded,
    #[msg("multi-hop: hop_fees must carry one flag byte per curve hop using only the protocol and creator bits")]
    MultiHopHopFeesMismatch,
    #[msg("A quote-chain coin's curve is complete but not yet migrated; retry once migrate_v2 creates its pool")]
    QuoteCurveAwaitingMigration,
    #[msg("multi-hop: mayhem-mode curves are not routable; use the v2 instructions")]
    MultiHopMayhemCurveNotSupported,
    #[msg("The quote coin is nested: a bonding curve remaining account is required for every coin on its quote chain down to the depth-0 root")]
    QuoteChainAccountsRequired,
    #[msg("Reconstruction branch is not implemented") ]
    ReconstructionBranchUnsupported,
}

#[derive(AnchorSerialize,Clone)]
pub struct OptionBool(pub bool);
impl AnchorDeserialize for OptionBool {
 fn deserialize_reader<R:std::io::Read>(reader:&mut R)->std::io::Result<Self>{
  let mut b=[0u8];match reader.read(&mut b)?{0=>Ok(Self(false)),_=>match b[0]{0=>Ok(Self(false)),1=>Ok(Self(true)),_=>Err(std::io::Error::new(std::io::ErrorKind::InvalidData,"Invalid bool representation"))}}
 }
}

#[event]
#[derive(Clone)]
pub struct UpdateCreatorFeeConfigEvent {pub timestamp:i64,pub authority:Pubkey,pub creator_fee_configurable:bool,pub max_configurable_creator_fee_bps:u64}

#[event_cpi]
#[derive(Accounts)]
pub struct AdminReadonly<'info>{
 #[account(mut,seeds=[b"global"],bump,has_one=authority @ PumpError::NotAuthorized)]
 pub global:Account<'info,Global>,
 pub authority:Signer<'info>,
}
#[event_cpi]
#[derive(Accounts)]
pub struct UpdateGlobalAuthority<'info>{
 #[account(mut,seeds=[b"global"],bump,has_one=authority @ PumpError::NotAuthorized)]
 pub global:Account<'info,Global>,
 pub authority:Signer<'info>,
 /// CHECK: new authority is assigned by the current signer; zero/self are accepted by the original.
 pub new_authority:UncheckedAccount<'info>,
}
#[event]
#[derive(Clone)]
pub struct UpdateGlobalAuthorityEvent{pub global:Pubkey,pub authority:Pubkey,pub new_authority:Pubkey,pub timestamp:i64}
#[event]
#[derive(Clone)]
pub struct ReservedFeeRecipientsEvent{pub timestamp:i64,pub reserved_fee_recipient:Pubkey,pub reserved_fee_recipients:[Pubkey;7]}
