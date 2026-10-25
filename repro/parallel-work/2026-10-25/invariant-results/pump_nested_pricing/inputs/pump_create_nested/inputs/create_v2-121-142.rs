fn nested_sol_reserves(g:&Global,r:&crate::trade_types::BondingCurve)->Result<u64>{
 let sub=|a:u64,b:u64|a.checked_sub(b).ok_or_else(||error!(PumpError::Overflow));
 let add=|a:u64,b:u64|a.checked_add(b).ok_or_else(||error!(PumpError::Overflow));
 let narrow=|v:u128|u64::try_from(v).map_err(|_|error!(PumpError::Truncation));
 let remainder=sub(g.initial_virtual_token_reserves,g.initial_real_token_reserves)?;
 require!(remainder>0,PumpError::Overflow);
 let target=narrow(g.initial_virtual_sol_reserves as u128*g.initial_real_token_reserves as u128/remainder as u128)?;
 let denominator=r.virtual_quote_reserves as u128+target as u128;
 require!(denominator>0,PumpError::Overflow);
 let out=narrow(r.virtual_token_reserves as u128*target as u128/denominator)?;
 let base=if out>r.real_token_reserves{
  let rem=sub(r.virtual_token_reserves,r.real_token_reserves)?;require!(rem>0,PumpError::Overflow);
  let quote=add(narrow(r.virtual_quote_reserves as u128*r.real_token_reserves as u128/rem as u128)?,1)?;
  let poolq=sub(add(r.real_quote_reserves,quote)?,g.pool_migration_fee)?;
  let poolb=sub(r.token_total_supply,g.initial_real_token_reserves)?;
  let remaining=sub(sub(target,quote)?,1)?;
  add(r.real_token_reserves,narrow(poolb as u128*remaining as u128/(poolq as u128+remaining as u128))?)?
 }else{out};
 require!(g.initial_real_token_reserves>0,PumpError::Overflow);
 let reserves=narrow(base as u128*remainder as u128/g.initial_real_token_reserves as u128)?;
 require!(reserves>0,PumpError::QuoteReservesOutOfRange);Ok(reserves)
}
