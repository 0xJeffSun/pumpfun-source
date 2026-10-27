use anchor_lang::prelude::*;use crate::{PumpError,trade_types::BondingCurve};
#[no_mangle]
#[inline(never)]
pub fn pump_return_trial_000(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{



if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_return_trial_001(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{



if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=match (denominator as u128 + vtr as u128).checked_mul(rqr as u128){Some(value)=>value,None=>return Err(anchor_lang::error::Error::from(PumpError::Overflow))};let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_return_trial_002(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{



if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=if let Some(value)=(denominator as u128 + vtr as u128).checked_mul(rqr as u128){value}else{return Err(anchor_lang::error::Error::from(PumpError::Overflow));};let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_return_trial_003(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{



if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let Some(numerator)=(denominator as u128 + vtr as u128).checked_mul(rqr as u128) else{return Err(anchor_lang::error::Error::from(PumpError::Overflow));};let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_return_trial_004(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{



if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let product=(denominator as u128 + vtr as u128).checked_mul(rqr as u128);if product.is_none(){return Err(anchor_lang::error::Error::from(PumpError::Overflow))}let numerator=product.unwrap();let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_return_trial_005(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{



if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow).map_err(anchor_lang::error::Error::from)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_return_trial_006(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{



if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow.into()).and_then(|n|Ok::<u128,anchor_lang::error::Error>(n))?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_return_trial_007(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{



if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=match (denominator as u128 + vtr as u128).checked_mul(rqr as u128){None=>Err(anchor_lang::error::Error::from(PumpError::Overflow)),Some(value)=>Ok(value)}?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_return_trial_008(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{



if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow);let numerator=numerator?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}
