// Dedicated BuyV3 context; SellV3 and every other handler above are unchanged.
#[event_cpi]
#[derive(Accounts)]
pub struct BuyV3<'info> {
    #[account(seeds=[b"global"],bump)]
    pub global: Box<Account<'info, Global>>,
    pub base_mint: Box<InterfaceAccount<'info, Mint>>,
    pub quote_mint: Box<InterfaceAccount<'info, Mint>>,
    pub base_token_program: Interface<'info, TokenInterface>,
    pub quote_token_program: Interface<'info, TokenInterface>,
    #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump,
        constraint = quote_mint.key() == bonding_curve.quote_mint ||
          (bonding_curve.quote_mint == Pubkey::default() && quote_mint.key() == WSOL)
          @ PumpError::MintDoesNotMatchBondingCurve)]
    pub bonding_curve: Box<Account<'info, BondingCurve>>,
    #[account(mut,associated_token::mint=base_mint,associated_token::authority=bonding_curve,associated_token::token_program=base_token_program)]
    pub associated_base_bonding_curve: InterfaceAccount<'info, TokenAccount>,
    /// CHECK: token-quote checks validate owner, mint and relevant authority/address.
    #[account(mut,seeds=[bonding_curve.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],
        bump,seeds::program=anchor_spl::associated_token::ID)]
    pub associated_quote_bonding_curve: UncheckedAccount<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut,token::mint=base_mint)]
    pub associated_base_user: InterfaceAccount<'info, TokenAccount>,
    /// CHECK: token-quote checks validate owner, mint and relevant authority/address.
    #[account(mut)]
    pub associated_quote_user: UncheckedAccount<'info>,
    #[account(init_if_needed,payer=user,space=137,
        seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]
    pub user_volume_accumulator: Box<Account<'info, crate::UserVolumeAccumulator>>,
    // Decodes before init_if_needed constraints; stored bump is not canonicalized.
    #[account(seeds=[b"fee_config",crate::ID.as_ref()],bump=fee_config.decoded.bump,seeds::program=FEE_PROGRAM)]
    pub fee_config: Box<Account<'info, buy_fee::BuyFeeConfig>>,
    /// CHECK: membership in global buyback recipients is checked in handler.
    #[account(mut)]
    pub buyback_fee_recipient: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

mod buy_fee { include!("buy_v3_fee.rs"); }
include!("buy_v3_admission.rs");
