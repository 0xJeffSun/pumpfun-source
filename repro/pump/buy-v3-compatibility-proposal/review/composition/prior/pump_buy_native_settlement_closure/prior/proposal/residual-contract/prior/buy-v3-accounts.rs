pub struct SellV3<'info> {
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