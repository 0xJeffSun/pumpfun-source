use anchor_lang::prelude::*;
use crate::donation::ConfigStatus;
use crate::types::Shareholder;
use crate::{FeeError, pump_global};
use crate::sharing::{Pump, Amm, SharingPool};
use crate::donation::{BondingCurve, PUMP, AMM};






























#[account]
pub struct SharingConfig {pub bump:u8,pub version:u8,pub status:ConfigStatus,pub mint:Pubkey,pub admin:Pubkey,pub admin_revoked:bool,pub shareholders:Vec<Shareholder>}















#[derive(Accounts)]
pub struct CreateFeeSharingConfig<'info>{
 /// CHECK: event PDA.
 #[account(seeds=[b"__event_authority"],bump)]pub event_authority:AccountInfo<'info>,
 pub program:Program<'info,crate::program::PumpFeesCandidate>,
 #[account(mut)]pub payer:Signer<'info>,
 #[account(seeds=[b"global"],bump,seeds::program=PUMP)]pub global:Account<'info,pump_global::Global>,
 pub mint:InterfaceAccount<'info,anchor_spl::token_interface::Mint>,
 #[account(init_if_needed,payer=payer,space=1024,seeds=[b"sharing-config",mint.key().as_ref()],bump)]pub sharing_config:Account<'info,SharingConfig>,
 pub system_program:Program<'info,System>,
 #[account(mut,seeds=[b"bonding-curve",mint.key().as_ref()],bump,seeds::program=PUMP)]pub bonding_curve:Account<'info,BondingCurve>,
 pub pump_program:Program<'info,Pump>,
 /// CHECK: external event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=PUMP)]pub pump_event_authority:AccountInfo<'info>,
 /// CHECK: optional pool validated in handler.
 #[account(mut)]pub pool:Option<Account<'info,SharingPool>>,
 pub pump_amm_program:Option<Program<'info,Amm>>,
 /// CHECK: external event PDA.
 #[account(seeds=[b"__event_authority"],bump,seeds::program=AMM)]pub pump_amm_event_authority:Option<AccountInfo<'info>>,
}













































#[event]
pub struct CreateFeeSharingConfigEvent{pub timestamp:i64,pub mint:Pubkey,pub bonding_curve:Pubkey,pub pool:Option<Pubkey>,pub sharing_config:Pubkey,pub admin:Pubkey,pub initial_shareholders:Vec<Shareholder>,pub status:ConfigStatus}












































































































































pub(crate) fn validate_creator<'info>(mint: &InterfaceAccount<'info, anchor_spl::token_interface::Mint>, payer: &Signer<'info>, global: &Account<'info, pump_global::Global>, bonding_curve: &Account<'info, BondingCurve>, pool: &Option<Account<'info, SharingPool>>, graduated:bool) -> Result<()> {
        let admin=payer.key()==global.admin_set_creator_authority;
        if graduated {
            let pool=pool.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;








            require!(pool.base_mint==mint.key(), FeeError::InvalidPool);

            let authority=Pubkey::find_program_address(
                &[b"pool-authority",mint.key().as_ref()],&PUMP,
            ).0;


            require!(pool.creator==authority, FeeError::InvalidPool);

            let expected=Pubkey::create_program_address(
                &[b"pool", &pool.index.to_le_bytes(), pool.creator.as_ref(),
                  pool.base_mint.as_ref(), pool.quote_mint.as_ref(), &[pool.pool_bump]],
                &AMM,
            ).map_err(|_| FeeError::InvalidPool)?;










            require!(pool.key()==expected, FeeError::InvalidPool);




            require!(admin || payer.key()==pool.coin_creator, FeeError::NotAuthorized);



        } else {
            require!(admin || payer.key()==bonding_curve.creator, FeeError::NotAuthorized);
        }
        Ok(())
    }

