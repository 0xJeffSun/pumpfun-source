pub struct PumpProgram;
impl Id for PumpProgram {
    fn id() -> Pubkey {
        PUMP
    }
}

#[derive(Accounts)]
pub struct AmmHop<'info> {
    pub base_mint: Box<InterfaceAccount<'info, Mint>>,
    pub quote_mint: Box<InterfaceAccount<'info, Mint>>,
    #[account(mut,
        has_one = base_mint @ PumpAmmError::InvalidBaseMint,
        has_one = quote_mint @ PumpAmmError::InvalidQuoteMint,
        has_one = pool_base_token_account @ PumpAmmError::InvalidPoolBaseTokenAccount,
        has_one = pool_quote_token_account @ PumpAmmError::InvalidPoolQuoteTokenAccount,
    )]
    pub pool: Box<Account<'info, Pool>>,
    #[account(mut)]
    pub pool_base_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(mut)]
    pub pool_quote_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
}

/// Fee endpoints carried together through an AMM leg.
#[derive(Clone, Copy)]
pub struct HopFeeGates {
    pub protocol: bool,
    pub creator: bool,
    pub lp: bool,
}

#[derive(Accounts)]
pub struct MultiHop<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_in_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(mut)]
    pub user_out_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(seeds=[b"global_config"],bump)]
    pub global_config: Box<Account<'info, GlobalConfig>>,
    #[account(seeds=[b"fee_config",crate::ID.as_ref()],bump=fee_config.bump,seeds::program=FEE_OWNER)]
    pub fee_config: Box<Account<'info, TradeFeeConfig>>,
    #[account(init_if_needed,payer=user,space=137,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]
    pub user_volume_accumulator: Box<Account<'info, UserVolumeAccumulator>>,
    /// CHECK: Validated at a protocol-fee endpoint or by the captured Pump CPI.
    #[account(mut)]
    pub buyback_fee_recipient: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
    pub token_2022_program: Program<'info, Token2022>,
    pub system_program: Program<'info, System>,
    /// CHECK: Self-event PDA.
    #[account(seeds=[b"__event_authority"],bump)]
    pub event_authority: AccountInfo<'info>,
    pub program: Program<'info, PumpAmmProgram>,
    pub pump_program: Program<'info, PumpProgram>,
    /// CHECK: Forwarded unchanged to Pump, which validates its context.
    pub pump_global: UncheckedAccount<'info>,
    /// CHECK: Forwarded unchanged to Pump, which validates its context.
    pub pump_fee_config: UncheckedAccount<'info>,
    /// CHECK: Forwarded unchanged to Pump, which validates its context.
    pub pump_event_authority: UncheckedAccount<'info>,
}

pub struct HopFeeContext<'a, 'info> {
    pub pool: &'a Box<Account<'info, Pool>>,
    pub global_config: &'a Account<'info, GlobalConfig>,
    pub accounts: &'a MultiHop<'info>,
    pub fee_config_len: &'a usize,
    pub base_supply: &'a u64,
    pub base_reserve: &'a u64,
    pub quote_reserve: &'a u64,
    pub gates: &'a HopFeeGates,
}
