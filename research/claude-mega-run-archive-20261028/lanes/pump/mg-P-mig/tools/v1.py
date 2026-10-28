#!/usr/bin/env python3
"""V1: v1-style execute for migrate_v2 (sites 243/249/309/313/326/335)."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-mig/tools')
from gen import make_variant

HEAD = [
 (236, "pub fn execute<'info>(ctx:Context<'_, '_, '_, 'info,MigrateV2<'info>>)->Result<()>{"),
 (None, " let a=&ctx.accounts;"),
 (None, " crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.user)?;"),
 (None, " let (expected_event_authority,_)=Pubkey::find_program_address(&[b\"__event_authority\"],&pump_amm::ID);"),
 (243, " require_keys_eq!(a.pump_amm_event_authority.key(),expected_event_authority,anchor_lang::error::ErrorCode::ConstraintSeeds);"),
 (249, " require!(a.bonding_curve.complete,PumpError::BondingCurveNotComplete);"),
 (None, " if a.bonding_curve.real_quote_reserves==0&&a.bonding_curve.virtual_quote_reserves==0&&a.bonding_curve.real_token_reserves==0&&a.bonding_curve.virtual_token_reserves==0{msg!(\"Bonding curve already migrated\");return Ok(());}"),
 (None, " let native=a.bonding_curve.quote_mint==Pubkey::default();"),
 (None, " let fee=a.global.pool_migration_fee;"),
 (None, " if native{a.bonding_curve.sub_lamports(fee)?;a.pool_authority.add_lamports(fee)?;}else{crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,fee)?;}"),
 (None, " let bump=ctx.bumps.pool_authority;"),
 (None, " create_token_account_v2(a,bump,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;"),
 (None, " create_token_account_v2(a,bump,&a.pool_quote_token_account,&a.pool,&a.quote_mint,native,&a.quote_token_program)?;"),
 (None, " create_token_account_v2(a,bump,&a.pool_authority_mint_account,&a.pool_authority,&a.base_mint,native,&a.base_token_program)?;"),
 (None, " let quote_account_created=a.pool_authority_quote_account.owner==&anchor_lang::system_program::ID;"),
 (None, " create_token_account_v2(a,bump,&a.pool_authority_quote_account,&a.pool_authority,&a.quote_mint,native,&a.quote_token_program)?;"),
 (None, " transfer_base_to_pool_authority(a,ctx.bumps.bonding_curve)?;"),
 (None, " let base=pool_authority_mint_token_account(a)?.amount;"),
]
QUOTE = [
 (308, " let quote=a.bonding_curve.real_quote_reserves.checked_add(a.bonding_curve.post_complete_quote_in)"),
 (309, "  .ok_or_else(||error!(PumpError::Overflow))?;"),
 (313, " let quote=if native{quote.checked_sub(fee).ok_or_else(||error!(PumpError::Overflow))?}else{quote};"),
 (None, " let quote_before=quote_amount(&a.pool_authority_quote_account)?;"),
 (None, " fund_quote_token_account_v2(&ctx,quote,native)?;"),
 (326, " let quote=quote_amount(&a.pool_authority_quote_account)?.checked_sub(quote_before).ok_or_else(||error!(PumpError::Overflow))?;"),
]
TAIL = [
 (None, " create_pool(&ctx,base,quote)?;"),
 (None, " init_pump_amm_boost_v2(&ctx)?;"),
 (None, " close_pool_authority_account(a,bump,&a.pool_authority_mint_account,&a.base_token_program)?;"),
 (None, " if quote_account_created{"),
 (None, "  if crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())?.is_some(){"),
 (335, "   require!(a.quote_mint.to_account_info().is_writable,PumpError::QuoteMintNotWritable);"),
 (None, "   harvest_withheld_tokens_to_mint(&a.quote_token_program.to_account_info(),&a.quote_mint.to_account_info(),&a.pool_authority_quote_account)?;"),
 (None, "  }"),
 (None, "  close_pool_authority_account(a,bump,&a.pool_authority_quote_account,&a.quote_token_program)?;"),
 (None, " }"),
 (None, " burn_lp_tokens(&ctx,bump)?;"),
 (None, " close_lp_account(a,bump,&a.user_pool_token_account)?;"),
 (None, " refund_pool_authority(a,bump,&a.withdraw_authority,a.pool_authority.lamports())?;"),
 (None, " {let c=&mut ctx.accounts.bonding_curve;c.real_quote_reserves=0;c.real_token_reserves=0;c.virtual_quote_reserves=0;c.virtual_token_reserves=0;}"),
 (None, " let a=&ctx.accounts;"),
 (None, " let event=CompletePumpAmmMigrationEvent{user:a.user.key(),mint:a.base_mint.key(),mint_amount:base,sol_amount:quote,pool_migration_fee:fee,bonding_curve:a.bonding_curve.key(),timestamp:Clock::get()?.unix_timestamp,pool:a.pool.key(),quote_mint:a.bonding_curve.quote_mint};"),
 (None, " emit!(event);emit_cpi!(event);"),
 (None, " Ok(())"),
 (None, "}"),
]
EXEC = HEAD + QUOTE + TAIL

if __name__ == '__main__':
    name = sys.argv[1] if len(sys.argv) > 1 else 'V1'
    print(make_variant(name, EXEC))
