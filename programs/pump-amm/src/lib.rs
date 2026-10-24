//! Partial PumpSwap reconstruction. Only explicitly implemented handlers exist.
//! This crate is not the historical source or a byte-identical replacement.
use anchor_lang::prelude::*;
mod state;
use state::*;

declare_id!("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA");

#[program]
pub mod pump_amm_recovered {
    use super::*;

    pub fn toggle_mayhem_mode(ctx: Context<AdminGlobal>, enabled: bool) -> Result<()> {
        require_neq!(ctx.accounts.global_config.mayhem_mode_enabled, enabled, PumpAmmError::MayhemModeInDesiredState);
        ctx.accounts.global_config.mayhem_mode_enabled = enabled;
        Ok(())
    }
    pub fn toggle_cashback_enabled(ctx: Context<AdminGlobal>, enabled: bool) -> Result<()> {
        require_neq!(ctx.accounts.global_config.is_cashback_enabled, enabled, PumpAmmError::CashbackNotInDesiredState);
        ctx.accounts.global_config.is_cashback_enabled = enabled;
        Ok(())
    }
    pub fn toggle_boost(ctx: Context<AdminGlobalNoEvent>, enabled: bool) -> Result<()> {
        require_keys_neq!(ctx.accounts.global_config.boost_authority, Pubkey::default(), PumpAmmError::InvalidAdmin);
        ctx.accounts.global_config.boost_enabled = enabled;
        Ok(())
    }

    pub fn update_admin(ctx: Context<UpdateAdmin>) -> Result<()> {
        let admin = ctx.accounts.global_config.admin;
        let new_admin = ctx.accounts.new_admin.key();
        ctx.accounts.global_config.admin = new_admin;
        let event = UpdateAdminEvent { timestamp: Clock::get()?.unix_timestamp, admin, new_admin };
        emit!(event.clone());
        emit_cpi!(event);
        Ok(())
    }

    pub fn disable(ctx: Context<AdminGlobal>, disable_create_pool: bool,
        disable_deposit: bool, disable_withdraw: bool,
        disable_buy: bool, disable_sell: bool) -> Result<()> {
        let flags = &mut ctx.accounts.global_config.disable_flags;
        *flags = (*flags & !1) | u8::from(disable_create_pool);
        *flags = (*flags & !2) | (u8::from(disable_deposit) << 1);
        *flags = (*flags & !4) | (u8::from(disable_withdraw) << 2);
        *flags = (*flags & !8) | (u8::from(disable_buy) << 3);
        *flags = (*flags & !16) | (u8::from(disable_sell) << 4);
        let event = DisableEvent { timestamp: Clock::get()?.unix_timestamp,
            admin: ctx.accounts.admin.key(), disable_create_pool,
            disable_deposit, disable_withdraw, disable_buy, disable_sell };
        emit!(event.clone());
        emit_cpi!(event);
        Ok(())
    }
}

#[event_cpi]
#[derive(Accounts)]
pub struct AdminGlobal<'info> {
    pub admin: Signer<'info>,
    #[account(mut, has_one = admin @ PumpAmmError::InvalidAdmin)]
    pub global_config: Box<Account<'info, GlobalConfig>>,
}

#[error_code]
pub enum PumpAmmError {
    FeeBasisPointsExceedsMaximum = 0,
    ZeroBaseAmount = 1,
    ZeroQuoteAmount = 2,
    TooLittlePoolTokenLiquidity = 3,
    ExceededSlippage = 4,
    InvalidAdmin = 5,
    UnsupportedBaseMint = 6,
    UnsupportedQuoteMint = 7,
    InvalidBaseMint = 8,
    InvalidQuoteMint = 9,
    InvalidLpMint = 10,
    AllProtocolFeeRecipientsShouldBeNonZero = 11,
    UnsortedNotUniqueProtocolFeeRecipients = 12,
    InvalidProtocolFeeRecipient = 13,
    InvalidPoolBaseTokenAccount = 14,
    InvalidPoolQuoteTokenAccount = 15,
    BuyMoreBaseAmountThanPoolReserves = 16,
    DisabledCreatePool = 17,
    DisabledDeposit = 18,
    DisabledWithdraw = 19,
    DisabledBuy = 20,
    DisabledSell = 21,
    SameMint = 22,
    Overflow = 23,
    Truncation = 24,
    DivisionByZero = 25,
    NewSizeLessThanCurrentSize = 26,
    AccountTypeNotSupported = 27,
    OnlyCanonicalPumpPoolsCanHaveCoinCreator = 28,
    InvalidAdminSetCoinCreatorAuthority = 29,
    StartTimeInThePast = 30,
    EndTimeInThePast = 31,
    EndTimeBeforeStartTime = 32,
    TimeRangeTooLarge = 33,
    EndTimeBeforeCurrentDay = 34,
    SupplyUpdateForFinishedRange = 35,
    DayIndexAfterEndIndex = 36,
    DayInActiveRange = 37,
    InvalidIncentiveMint = 38,
    #[msg("buy: Not enough quote tokens to cover for fees.")]
    BuyNotEnoughQuoteTokensToCoverFees = 39,
    #[msg("buy: slippage - would buy less tokens than expected min_base_amount_out")]
    BuySlippageBelowMinBaseAmountOut = 40,
    MayhemModeDisabled = 41,
    OnlyPumpPoolsMayhemMode = 42,
    MayhemModeInDesiredState = 43,
    NotEnoughRemainingAccounts = 44,
    InvalidSharingConfigBaseMint = 45,
    InvalidSharingConfigCoinCreator = 46,
    #[msg("coin creator has been migrated to sharing config")]
    CoinCreatorMigratedToSharingConfig = 47,
    #[msg("creator_vault has been migrated to sharing config, use pump:distribute_creator_fees instead")]
    CreatorVaultMigratedToSharingConfig = 48,
    #[msg("Cashback is disabled")]
    CashbackNotEnabled = 49,
    OnlyPumpPoolsCashback = 50,
    CashbackNotInDesiredState = 51,
    TokensInVaultLessThanCashbackEarned = 52,
    #[msg("Buyback fee recipient not authorized")]
    BuybackFeeRecipientNotAuthorized = 53,
    AllBuybackFeeRecipientsShouldBeNonZero = 54,
    NotUniqueBuybackFeeRecipients = 55,
    #[msg("buyback_basis_points must be <= 10_000")]
    BuybackBasisPointsOutOfRange = 56,
    #[msg("buyback fee recipients require exactly 8 remaining accounts (or none)")]
    WrongBuybackFeeRecipientsCount = 57,
    BuybackFeeRecipientMissing = 58,
    #[msg("Cashback trade is missing the required remaining accounts")]
    MissingCashbackAccounts = 59,
    #[msg("Cashback user_volume_accumulator account is invalid")]
    InvalidCashbackAccumulator = 60,
    #[msg("Cashback user_volume_accumulator ATA is missing or invalid")]
    InvalidCashbackAccumulatorAta = 61,
    #[msg("pool_v2 remaining account is missing or invalid")]
    InvalidPoolV2 = 62,
    #[msg("BOOST: sell output exceeds the real quote vault. effective = real + virtual is pricing-only; payout is capped at real_vault, so quote min(out, real_vault)")]
    InsufficientRealQuoteReserves = 63,
    #[msg("BOOST: deposit/withdraw don't apply to boost pools")]
    BoostPoolLiquidityUnsupported = 64,
    #[msg("BOOST: pool cannot be boosted (no virtual reserves)")]
    PoolCannotBoost = 65,
    #[msg("BOOST: boost is disabled")]
    BoostDisabled = 66,
    #[msg("BOOST: lp_supply must never drop below the circulating LP mint supply")]
    SeedLockViolation = 67,
    #[msg("Configurable creator fee is disabled")]
    CreatorFeeNotConfigurable = 68,
    #[msg("Creator fee basis points must be between 1 and the configured maximum")]
    CreatorFeeBpsOutOfRange = 69,
    #[msg("Creator fee is not editable for this pool")]
    CreatorFeeNotEditable = 70,
    #[msg("Cashback coins cannot have a creator fee")]
    CreatorFeeNotAllowedForCashbackCoin = 71,
    #[msg("Sharing config is not active")]
    SharingConfigNotActive = 72,
    #[msg("Not authorized")]
    NotAuthorized = 73,
    #[msg("The coin creator of a holder-reward pool cannot be changed")]
    HolderRewardCreatorImmutable = 74,
    #[msg("CTO is not allowed on a mayhem-mode pool")]
    CtoNotAllowedForMayhemPool = 75,
    #[msg("A holder-reward pool's coin creator must be the holder-rewards PDA")]
    InvalidHolderRewardCoinCreator = 76,
    #[msg("Creator fee is not configurable on a SOL or USDC quote; the fee schedule applies")]
    CreatorFeeNotConfigurableForQuote = 77,
    #[msg("Only canonical pump pools are supported by this instruction")]
    OnlyPumpPools = 78,
    #[msg("v2 trades do not support cashback coins; use the v1 instructions")]
    CashbackCoinNotSupported = 79,
    #[msg("v2 trades do not support mayhem-mode pools; use the v1 instructions")]
    MayhemPoolNotSupported = 80,
    #[msg("creator_fees must be swept before the coin creator changes")]
    CreatorFeesNotSwept = 81,
    #[msg("The fee config tier table is empty")]
    FeeTiersEmpty = 82,
    #[msg("The fee config account is shorter than its initialize size")]
    FeeConfigTooShort = 83,
    #[msg("multi-hop: a hop's input mint is neither side of its pool or curve, or the route does not end in user_out_token_account's mint")]
    MultiHopDiscontinuousPath = 84,
    #[msg("multi-hop: the balances around the bonding-curve hops do not match the amounts pump reported")]
    MultiHopCurveRunMismatch = 85,
    #[msg("multi-hop: every hop must trade in the same direction, all buys or all sells")]
    MultiHopMixedDirection = 86,
    #[msg("A transfer's source is its destination and the signer does not own it")]
    SelfTransferNotAllowed = 87,
}

#[event_cpi]
#[derive(Accounts)]
pub struct UpdateAdmin<'info> {
    pub admin: Signer<'info>,
    #[account(mut, has_one = admin @ PumpAmmError::InvalidAdmin)]
    pub global_config: Box<Account<'info, GlobalConfig>>,
    /// CHECK: Only this account's public key is stored as the new admin.
    pub new_admin: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct AdminGlobalNoEvent<'info> {
    pub admin: Signer<'info>,
    #[account(mut, has_one = admin @ PumpAmmError::InvalidAdmin)]
    pub global_config: Box<Account<'info, GlobalConfig>>,
}
