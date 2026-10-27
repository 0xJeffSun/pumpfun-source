use anchor_lang::prelude::*;
use crate::{PumpError,trade_types::BondingCurve};

#[no_mangle]
#[inline(never)]
pub fn pump_trial_000(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_001(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_002(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_003(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_004(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_005(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_006(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_007(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_008(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_009(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_010(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_011(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_012(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_013(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_014(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_015(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_016(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_017(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_018(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_019(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_020(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_021(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_022(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_023(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_024(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_025(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_026(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_027(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_028(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_029(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_030(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_031(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_032(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_033(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_034(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_035(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let threshold=if *quote==Pubkey::default(){10_000_000}else{1_000_000}; if rqr<threshold || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_036(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_037(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_038(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_039(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_040(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_041(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_042(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_043(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_044(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_045(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_046(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_047(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_048(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_049(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_050(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_051(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_052(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_053(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_054(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_055(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_056(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_057(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_058(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_059(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_060(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_061(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_062(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_063(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_064(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_065(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_066(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_067(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_068(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_069(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_070(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_071(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_072(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_073(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_074(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_075(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_076(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_077(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_078(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_079(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_080(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_081(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_082(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_083(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
let computed=u64::try_from(computed)?; bc.virtual_quote_reserves=computed.min(if *quote==Pubkey::default(){2_000_000_000_000}else{160_000_000_000});
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_084(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_085(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_086(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_087(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_088(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_089(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_090(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_091(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_092(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_093(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_094(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_095(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
bc.virtual_quote_reserves=if *quote==Pubkey::default(){u64::try_from(computed)?.min(2_000_000_000_000)}else{u64::try_from(computed)?.min(160_000_000_000)};
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_096(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_097(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_098(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_099(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_100(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_101(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_102(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_103(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_104(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_105(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_106(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let rqr=bc.real_quote_reserves; let vtr=bc.virtual_token_reserves;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_trial_107(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{
if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(initial).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_sub(vault).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if (rqr<10_000_000 && *quote==Pubkey::default()) || (rqr<1_000_000 && *quote!=Pubkey::default()) || denominator<1_000_000_000_000{return Ok(())}
let computed=(rqr as u128).checked_mul(denominator as u128 + vtr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}
