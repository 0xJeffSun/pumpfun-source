use anchor_lang::prelude::*;
use crate::GlobalParams;






#[derive(Accounts)]
pub struct InitializeGlobalParams<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(init, payer = admin, space = 254, seeds = [b"global-params"], bump)]
    pub global_params: Account<'info, GlobalParams>,
    pub system_program: Program<'info,System>,
}

