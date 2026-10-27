{
use crate::donation::ConfigStatus;
use crate::types::Shareholder;
use crate::instructions::fee_sharing::create_fee_sharing_config::CreateFeeSharingConfigEvent;

  if ctx.accounts.sharing_config.version!=0{return Ok(());}
  let graduated=ctx.accounts.bonding_curve.real_sol_reserves==0
   && ctx.accounts.bonding_curve.virtual_sol_reserves==0
   && ctx.accounts.bonding_curve.real_token_reserves==0
   && ctx.accounts.bonding_curve.virtual_token_reserves==0;
  crate::instructions::fee_sharing::create_fee_sharing_config::validate_creator(&ctx.accounts.mint, &ctx.accounts.payer, &ctx.accounts.global, &ctx.accounts.bonding_curve, &ctx.accounts.pool, graduated)?;
  let state=&mut ctx.accounts.sharing_config;state.bump=ctx.bumps.sharing_config;state.version=2;state.status=ConfigStatus::Active;state.mint=ctx.accounts.mint.key();state.admin=ctx.accounts.bonding_curve.creator;state.admin_revoked=false;state.shareholders=vec![Shareholder{address:ctx.accounts.bonding_curve.creator,share_bps:10000}];state.exit(&crate::ID)?;
  crate::pump::cpi::extend_account(CpiContext::new(
      ctx.accounts.pump_program.to_account_info(),
      crate::pump::cpi::accounts::ExtendAccount {
          account: ctx.accounts.bonding_curve.to_account_info(),
          user: ctx.accounts.payer.to_account_info(),
          system_program: ctx.accounts.system_program.to_account_info(),
          event_authority: ctx.accounts.pump_event_authority.to_account_info(),
          program: ctx.accounts.pump_program.to_account_info(),
      },
  ))?;
  let curve_migration_ctx = CpiContext::new(
      ctx.accounts.pump_program.to_account_info(),
      crate::pump::cpi::accounts::MigrateBondingCurveCreator {
          mint: ctx.accounts.mint.to_account_info(),
          bonding_curve: ctx.accounts.bonding_curve.to_account_info(),
          sharing_config: state.to_account_info(),
          event_authority: ctx.accounts.pump_event_authority.to_account_info(),
          program: ctx.accounts.pump_program.to_account_info(),
      },
  );
  crate::pump::cpi::migrate_bonding_curve_creator(curve_migration_ctx)?;
  if graduated {
   let pool=ctx.accounts.pool.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;
   state.admin=pool.coin_creator;state.shareholders=vec![Shareholder{address:pool.coin_creator,share_bps:10000}];state.exit(&crate::ID)?;
   let program=ctx.accounts.pump_amm_program.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;
   let event=ctx.accounts.pump_amm_event_authority.as_ref().ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?;
   crate::pump_amm::cpi::extend_account(CpiContext::new(
       program.to_account_info(),
       crate::pump_amm::cpi::accounts::ExtendAccount {
           account: pool.to_account_info(),
           user: ctx.accounts.payer.to_account_info(),
           system_program: ctx.accounts.system_program.to_account_info(),
           event_authority: event.to_account_info(),
           program: program.to_account_info(),
       },
   ))?;
   let pool_migration_ctx = CpiContext::new(
       program.to_account_info(),
       crate::pump_amm::cpi::accounts::MigratePoolCoinCreator {
           pool: pool.to_account_info(),
           program: program.to_account_info(),
           sharing_config: state.to_account_info(),
           event_authority: event.to_account_info(),
       },
   );
  crate::pump_amm::cpi::migrate_pool_coin_creator(pool_migration_ctx)?;
  }
  let event=CreateFeeSharingConfigEvent{timestamp:Clock::get()?.unix_timestamp,mint:ctx.accounts.mint.key(),bonding_curve:ctx.accounts.bonding_curve.key(),pool:ctx.accounts.pool.as_ref().map(|x|x.key()),sharing_config:state.key(),admin:state.admin,initial_shareholders:state.shareholders.clone(),status:state.status.clone()};emit!(event);emit_cpi!(event);Ok(())
 
}
