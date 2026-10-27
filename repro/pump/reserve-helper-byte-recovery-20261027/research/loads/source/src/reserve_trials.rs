use anchor_lang::prelude::*;use crate::{PumpError,trade_types::BondingCurve};
#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_000(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves;let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_001(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves;let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_002(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves;let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_003(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves as u128;let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_004(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves as u128;let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_005(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves as u128;let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_006(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_007(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_008(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_009(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves as u128;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_010(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves as u128;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_011(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves as u128;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_012(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_013(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_014(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_015(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves as u128;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_016(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves as u128;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_017(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves as u128;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_018(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_019(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_020(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_021(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves as u128;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_022(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves as u128;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_023(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;let vtr=bc.virtual_token_reserves as u128;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_024(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_025(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_026(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_027(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves as u128;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_028(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves as u128;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_029(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves as u128;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_030(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_031(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_032(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_033(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves as u128;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_034(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves as u128;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_035(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves as u128;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_036(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_037(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_038(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_039(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves as u128;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_040(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves as u128;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_041(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let rqr=bc.real_quote_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let vtr=bc.virtual_token_reserves as u128;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_042(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_043(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_044(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_045(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves as u128;let denominator = bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_046(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves as u128;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let denominator=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}

#[no_mangle]
#[inline(never)]
pub fn pump_load_trial_047(bc:&mut BondingCurve,initial:u64,vault:u64,quote:&Pubkey)->Result<()>{


if bc.complete || !bc.is_mayhem_mode{return Ok(())}
let vtr=bc.virtual_token_reserves as u128;let doubled=bc.token_total_supply.checked_mul(2).ok_or(PumpError::Overflow)?;let subtracted=doubled.checked_sub(initial).ok_or(PumpError::Overflow)?;let denominator=subtracted.checked_sub(vault).ok_or(PumpError::Overflow)?;let rqr=bc.real_quote_reserves;
if *quote==Pubkey::default(){if rqr<10_000_000 || denominator<1_000_000_000_000{return Ok(())}}else{if rqr<1_000_000 || denominator<1_000_000_000_000{return Ok(())}}
let numerator=(denominator as u128 + vtr as u128).checked_mul(rqr as u128).ok_or(PumpError::Overflow)?;let computed=numerator.checked_div(denominator as u128).ok_or(PumpError::Overflow)?;
if *quote==Pubkey::default(){let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(2_000_000_000_000);}else{let amount=u64::try_from(computed)?;bc.virtual_quote_reserves=amount.min(160_000_000_000);}
Ok(())
}
