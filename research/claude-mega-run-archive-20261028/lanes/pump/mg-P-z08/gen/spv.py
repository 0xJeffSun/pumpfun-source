#!/usr/bin/env python3
"""spv.py <src_crate_dir> : append multiplexed set_params variants (pub mod spv) to src/lib.rs (IR-analysis only, never deliver)."""
import sys
p = sys.argv[1] + '/src/lib.rs'; t = open(p).read()
SIG = "(mut ctx:Context<SetParams>,initial_virtual_token_reserves:u64,initial_virtual_sol_reserves:u64,initial_real_token_reserves:u64,token_total_supply:u64,fee_basis_points:u64,withdraw_authority:Pubkey,enable_migrate:bool,pool_migration_fee:u64,creator_fee_basis_points:u64,set_creator_authority:Pubkey,admin_set_creator_authority:Pubkey)->Result<()>"
G = 'ctx.accounts.global.'
STORES = G+'initial_virtual_token_reserves=initial_virtual_token_reserves;'+G+'initial_real_token_reserves=initial_real_token_reserves;'+G+'initial_virtual_sol_reserves=initial_virtual_sol_reserves;'+G+'token_total_supply=token_total_supply;'
FV = "let final_value=(initial_real_token_reserves as u128)*(initial_virtual_sol_reserves as u128)/((initial_virtual_token_reserves-initial_real_token_reserves) as u128);"
EXPR = "(initial_real_token_reserves as u128)*(initial_virtual_sol_reserves as u128)/((initial_virtual_token_reserves-initial_real_token_reserves) as u128)"
FINAL = {
 'h7': 'let final_real_sol_reserves=u64::try_from((initial_real_token_reserves as u128).checked_mul(initial_virtual_sol_reserves as u128).and_then(|v|v.checked_div((initial_virtual_token_reserves-initial_real_token_reserves) as u128)).ok_or_else(||error!(PumpError::Overflow))?).map_err(|_|error!(PumpError::Truncation))?;',
 'h7a': 'let final_real_sol_reserves=u64::try_from((initial_real_token_reserves as u128).checked_mul(initial_virtual_sol_reserves as u128).and_then(move|v|v.checked_div((initial_virtual_token_reserves-initial_real_token_reserves) as u128)).ok_or_else(||error!(PumpError::Overflow))?).map_err(|_|error!(PumpError::Truncation))?;',
 'h7b': 'let denominator=(initial_virtual_token_reserves-initial_real_token_reserves) as u128;let final_real_sol_reserves=u64::try_from((initial_real_token_reserves as u128).checked_mul(initial_virtual_sol_reserves as u128).and_then(|v|v.checked_div(denominator)).ok_or_else(||error!(PumpError::Overflow))?).map_err(|_|error!(PumpError::Truncation))?;',
 'h7c': 'let final_value=(initial_real_token_reserves as u128).checked_mul(initial_virtual_sol_reserves as u128).and_then(|v|v.checked_div((initial_virtual_token_reserves-initial_real_token_reserves) as u128)).ok_or_else(||error!(PumpError::Overflow))?;let final_real_sol_reserves=u64::try_from(final_value).map_err(|_|error!(PumpError::Truncation))?;',
 'h7d': 'let final_real_sol_reserves=u64::try_from((initial_real_token_reserves as u128).checked_mul(initial_virtual_sol_reserves as u128).ok_or_else(||error!(PumpError::Overflow))?/((initial_virtual_token_reserves-initial_real_token_reserves) as u128)).map_err(|_|error!(PumpError::Truncation))?;',
 'h7e': 'let final_real_sol_reserves=u64::try_from((initial_real_token_reserves as u128).checked_mul(initial_virtual_sol_reserves as u128).and_then(|v|v.checked_div((initial_virtual_token_reserves-initial_real_token_reserves) as u128)).ok_or(PumpError::Overflow)?).map_err(|_|error!(PumpError::Truncation))?;',
 'h7f': 'let final_real_sol_reserves:u64=(initial_real_token_reserves as u128).checked_mul(initial_virtual_sol_reserves as u128).and_then(|v|v.checked_div((initial_virtual_token_reserves-initial_real_token_reserves) as u128)).ok_or_else(||error!(PumpError::Overflow))?.try_into().map_err(|_|error!(PumpError::Truncation))?;',
 'h7g': 'let final_real_sol_reserves=u64::try_from((initial_real_token_reserves as u128).checked_mul(initial_virtual_sol_reserves as u128).and_then(move|v|v.checked_div((initial_virtual_token_reserves-initial_real_token_reserves) as u128)).ok_or_else(||error!(PumpError::Truncation))?).map_err(|_|error!(PumpError::Truncation))?;',
}
def body(final):
    return f"""
     let recipients=crate::legacy_sell::fee_recipient::set_fee_recipients(&mut ctx)?;
     require_gt!(token_total_supply,initial_real_token_reserves,PumpError::InitialRealTokenReservesShouldBeLessThanTokenTotalSupply);
     require_gt!(initial_virtual_token_reserves,initial_real_token_reserves,PumpError::InitialVirtualTokenReservesShouldBeGreaterThanInitialRealTokenReserves);
     {STORES}
     require_gte!(1000u64,fee_basis_points,PumpError::FeeBasisPointsGreaterThanMaximum);
     ctx.accounts.global.fee_basis_points=fee_basis_points;
     require_keys_neq!(withdraw_authority,anchor_lang::system_program::ID,PumpError::AllZerosWithdrawAuthority);
     ctx.accounts.global.withdraw_authority=withdraw_authority;ctx.accounts.global.enable_migrate=enable_migrate;
     {final}
     require_gt!(final_real_sol_reserves,pool_migration_fee,PumpError::PoolMigrationFeeShouldBeLessThanFinalRealSolReserves);
     ctx.accounts.global.pool_migration_fee=pool_migration_fee;
     require_gte!(1000u64,creator_fee_basis_points,PumpError::FeeBasisPointsGreaterThanMaximum);
     let g=&mut ctx.accounts.global;g.creator_fee_basis_points=creator_fee_basis_points;g.set_creator_authority=set_creator_authority;g.admin_set_creator_authority=admin_set_creator_authority;
     let event=SetParamsEvent{{initial_virtual_token_reserves,initial_virtual_sol_reserves,initial_real_token_reserves,token_total_supply,fee_basis_points,withdraw_authority,enable_migrate,pool_migration_fee,creator_fee_basis_points,set_creator_authority,admin_set_creator_authority,final_real_sol_reserves,fee_recipients:recipients,timestamp:Clock::get()?.unix_timestamp}};emit!(event);emit_cpi!(event);Ok(())
"""
mod = "\npub mod spv {\n use super::*;\n" + ''.join(f" #[inline(never)]\n pub fn sp_{k}{SIG}{{{body(v)} }}\n" for k, v in FINAL.items()) + "}\n"
open(p, 'w').write(t + mod)
print('appended', len(FINAL))
