use anchor_lang::prelude::*;
use crate::{PumpError,trade_types::BondingCurve};

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_000(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_001(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_002(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_003(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_004(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_005(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_006(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_007(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_008(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_009(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_010(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_011(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_012(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_013(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_014(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_015(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_016(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_017(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_018(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_019(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_020(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_021(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_022(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_023(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_024(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_025(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_026(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_027(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let computed=numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_028(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_029(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_030(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_031(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let computed=numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_032(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_033(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_034(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_035(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_036(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_037(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_038(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_039(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_040(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_041(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_042(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_043(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_044(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_045(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_046(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_047(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let computed={let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?};
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_048(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_049(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_050(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_051(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_052(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_053(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_054(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_055(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_056(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_057(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_058(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_059(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_060(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_061(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_062(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_063(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let divisor=denominator as u128;let computed=numerator.checked_div(divisor).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_064(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_065(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_066(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_067(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_068(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_069(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_070(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_071(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or_else(|| PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_072(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_073(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_074(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_075(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;let computed=numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_076(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_077(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_078(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let computed=numerator.checked_div(denominator as u128).ok_or_else(|| anchor_lang::error::Error::from(PumpError::Overflow))?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_error_trial_079(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{

if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves; let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let sum=denominator as u128+vtr as u128;let numerator=sum.checked_mul(rqr as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;let computed=numerator.checked_div(denominator as u128).ok_or::<anchor_lang::error::Error>(PumpError::Overflow.into())?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}
