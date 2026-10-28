use crate::*;
use anchor_spl::{associated_token::AssociatedToken, token_interface::TokenInterface};
#[derive(Accounts)]
pub struct LegacySell<'info> {
    #[account(mut,has_one=base_mint @ PumpAmmError::InvalidBaseMint,has_one=quote_mint @ PumpAmmError::InvalidQuoteMint,has_one=pool_base_token_account @ PumpAmmError::InvalidPoolBaseTokenAccount,has_one=pool_quote_token_account @ PumpAmmError::InvalidPoolQuoteTokenAccount)]
    pub pool: Box<Account<'info, Pool>>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub global_config: Box<Account<'info, GlobalConfig>>,
    pub base_mint: Box<InterfaceAccount<'info, Mint>>,
    pub quote_mint: Box<InterfaceAccount<'info, Mint>>,
    #[account(mut)]
    pub user_base_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(mut)]
    pub user_quote_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(mut)]
    pub pool_base_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(mut)]
    pub pool_quote_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
    /// CHECK: Authorization checked in handler.
    pub protocol_fee_recipient: AccountInfo<'info>,
    #[account(init_if_needed,payer=user,associated_token::mint=quote_mint,associated_token::authority=protocol_fee_recipient,associated_token::token_program=quote_token_program)]
    pub protocol_fee_recipient_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
    pub base_token_program: Interface<'info, TokenInterface>,
    pub quote_token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    /// CHECK: Self event signer.
    #[account(seeds=[b"__event_authority"],bump)]
    pub event_authority: AccountInfo<'info>,
    pub program: Program<'info, trade::PumpAmmProgram>,
    #[account(init_if_needed,payer=user,associated_token::mint=quote_mint,associated_token::authority=coin_creator_vault_authority,associated_token::token_program=quote_token_program)]
    pub coin_creator_vault_ata: Box<InterfaceAccount<'info, TokenAccount>>,
    /// CHECK: Original PDA constraint.
    #[account(seeds=[b"creator_vault",pool.coin_creator.as_ref()],bump)]
    pub coin_creator_vault_authority: AccountInfo<'info>,
    #[account(seeds=[b"fee_config",crate::ID.as_ref()],bump,seeds::program=fee_program.key())]
    pub fee_config: Account<'info, trade::TradeFeeConfig>,
    pub fee_program: Program<'info, FeesProgram>,
}
pub struct FeesProgram;
impl Id for FeesProgram {
    fn id() -> Pubkey {
        trade::FEE_OWNER
    }
}
