use anchor_lang::prelude::*;
use crate::MayhemError;
use super::sell_v2::SellV2;
use super::sell::SellEvent;
use super::buy::BuyError;
const WSOL:Pubkey=pubkey!("So11111111111111111111111111111111111111112");

























































































































































































































































































































































































































































































































































pub fn sell_v2_handler(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCap{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let (sol_amount,sol_vault_balance,global_sol_deployed,state_sol_deployed,virtual_sol,real_sol,quote_vault_balance,global_quote_deployed,state_quote_deployed,virtual_quote,real_quote)=if native {
 let vault_balance=a.sol_vault.lamports();let global_deployed=a.global_params.sol_deployed;let state_deployed=a.mayhem_state.field_56;let real_reserve=a.bonding_curve.real_sol_reserves;let virtual_reserve=a.bonding_curve.virtual_sol_reserves;
 (sol,vault_balance,global_deployed,state_deployed,virtual_reserve,real_reserve,vault_balance,global_deployed,state_deployed,virtual_reserve,real_reserve)
 } else {
 let global_deployed=a.global_params.stable_deployed;let vault_balance=a.mayhem_quote_token_vault.amount;let state_deployed=a.mayhem_state.field_56;let real_reserve=a.bonding_curve.real_sol_reserves;let virtual_reserve=a.bonding_curve.virtual_sol_reserves;
 (0,0,0,0,0,0,vault_balance,global_deployed,state_deployed,virtual_reserve,real_reserve)
 }; let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}
#[inline(always)]
fn inline_cpi_info<'info>(info:&AccountInfo<'info>)->AccountInfo<'info>{AccountInfo{key:info.key,lamports:std::rc::Rc::clone(&info.lamports),data:std::rc::Rc::clone(&info.data),owner:info.owner,_unused:info._unused,is_signer:info.is_signer,is_writable:info.is_writable,executable:info.executable}}

// variant 0: h4lit
pub fn o84hv_0(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV0{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 1: sw1:sol_vault/mint
pub fn o84hv_1(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV1{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,mint:a.mint.key(),sol_vault:a.sol_vault.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 2: sw2:mint/sol_amount
pub fn o84hv_2(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV2{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),sol_amount,mint:a.mint.key(),token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 3: sw3:sol_amount/token_amount
pub fn o84hv_3(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV3{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),token_amount:tokens,sol_amount,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 4: sw4:token_amount/sol_vault_balance
pub fn o84hv_4(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV4{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,sol_vault_balance,token_amount:tokens,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 5: sw5:sol_vault_balance/token_vault_balance
pub fn o84hv_5(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV5{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,token_vault_balance:a.mayhem_base_token_vault.amount,sol_vault_balance,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 6: sw6:token_vault_balance/state_sol_deployed
pub fn o84hv_6(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV6{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,state_sol_deployed,token_vault_balance:a.mayhem_base_token_vault.amount,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 7: sw7:state_sol_deployed/state_token_net
pub fn o84hv_7(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV7{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_token_net:a.mayhem_state.field_72,state_sol_deployed,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 8: sw8:state_token_net/end_timestamp
pub fn o84hv_8(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV8{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,end_timestamp:a.mayhem_state.end_timestamp,state_token_net:a.mayhem_state.field_72,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 9: sw9:end_timestamp/virtual_sol
pub fn o84hv_9(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV9{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,virtual_sol,end_timestamp:a.mayhem_state.end_timestamp,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 10: sw10:virtual_sol/virtual_tokens
pub fn o84hv_10(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV10{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_tokens:a.bonding_curve.virtual_token_reserves,virtual_sol,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 11: sw11:virtual_tokens/timestamp
pub fn o84hv_11(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV11{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,timestamp:Clock::get()?.unix_timestamp,virtual_tokens:a.bonding_curve.virtual_token_reserves,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 12: sw12:timestamp/global_sol_deployed
pub fn o84hv_12(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV12{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,global_sol_deployed,timestamp:Clock::get()?.unix_timestamp,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 13: sw13:global_sol_deployed/real_sol
pub fn o84hv_13(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV13{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,real_sol,global_sol_deployed,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 14: sw14:real_sol/real_tokens
pub fn o84hv_14(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV14{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_tokens:a.bonding_curve.real_token_reserves,real_sol,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 15: sw15:real_tokens/version
pub fn o84hv_15(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV15{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,version:a.global_params.version,real_tokens:a.bonding_curve.real_token_reserves,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 16: sw16:version/retained_reserve_bps
pub fn o84hv_16(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV16{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,retained_reserve_bps,version:a.global_params.version,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 17: sw17:retained_reserve_bps/quote_amount
pub fn o84hv_17(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV17{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,quote_amount:sol,retained_reserve_bps,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 18: sw18:quote_amount/quote_vault_balance
pub fn o84hv_18(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV18{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_vault_balance,quote_amount:sol,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 19: sw19:quote_vault_balance/state_quote_deployed
pub fn o84hv_19(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV19{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,state_quote_deployed,quote_vault_balance,virtual_quote,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 20: sw20:state_quote_deployed/virtual_quote
pub fn o84hv_20(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV20{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,virtual_quote,state_quote_deployed,global_quote_deployed,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 21: sw21:virtual_quote/global_quote_deployed
pub fn o84hv_21(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV21{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,global_quote_deployed,virtual_quote,real_quote,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 22: sw22:global_quote_deployed/real_quote
pub fn o84hv_22(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV22{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,real_quote,global_quote_deployed,quote_mint};
 emit!(event);emit_cpi!(event);Ok(())
}


// variant 23: sw23:real_quote/quote_mint
pub fn o84hv_23(ctx:Context<SellV2>,reference:u128,tolerance_bps:u16,retained_reserve_bps:u16)->Result<()> {
 let a=&mut *ctx.accounts;
 a.mayhem_state.validate_trade(&a.global_params)?;





 a.mayhem_state.validate_quote(a.bonding_curve.real_sol_reserves,&a.global_params,&a.quote_mint.key())?;




 let c=&a.bonding_curve;

 let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;

 let quote_mint=a.quote_mint.key();let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,crate::state::QuoteCapV23{global_params:&a.global_params,quote_mint},a.mayhem_base_token_vault.amount,retained_reserve_bps);
 let native=quote_mint==WSOL;
 let before_sol=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let before_tokens=a.mayhem_base_token_vault.amount;

 
 crate::pump_v2::cpi::sell_v2(CpiContext::new_with_signer(a.pump_program.key(),crate::pump_v2::cpi::accounts::SellV2{global:inline_cpi_info(a.global.as_ref()),mint:inline_cpi_info(a.mint.as_ref().as_ref()),quote_mint:inline_cpi_info(a.quote_mint.as_ref()),token_program:inline_cpi_info(a.token_program.as_ref()),quote_token_program:inline_cpi_info(a.quote_token_program.as_ref()),associated_token_program:inline_cpi_info(a.associated_token_program.as_ref()),fee_recipient:inline_cpi_info(a.fee_recipient.as_ref()),fee_recipient_ata:inline_cpi_info(a.fee_recipient_ata.as_ref()),buyback_recipient:inline_cpi_info(a.buyback_recipient.as_ref()),buyback_recipient_ata:inline_cpi_info(a.buyback_recipient_ata.as_ref()),bonding_curve:inline_cpi_info(a.bonding_curve.as_ref().as_ref()),associated_bonding_curve:inline_cpi_info(a.associated_base_bonding_curve.as_ref().as_ref()),associated_quote_bonding_curve:inline_cpi_info(a.associated_quote_bonding_curve.as_ref()),user:inline_cpi_info(a.sol_vault.as_ref()),associated_user:inline_cpi_info(a.mayhem_base_token_vault.as_ref().as_ref()),associated_quote_user:inline_cpi_info(a.mayhem_quote_token_vault.as_ref().as_ref()),creator_vault:inline_cpi_info(a.creator_vault.as_ref()),associated_creator_vault:inline_cpi_info(a.associated_creator_vault.as_ref()),sharing_config:inline_cpi_info(a.sharing_config.as_ref()),user_volume_accumulator:inline_cpi_info(a.user_volume_accumulator.as_ref()),associated_user_volume_accumulator:inline_cpi_info(a.associated_user_volume_accumulator.as_ref()),fee_config:inline_cpi_info(a.fee_config.as_ref()),fee_program:inline_cpi_info(a.fee_program.as_ref()),system_program:inline_cpi_info(a.system_program.as_ref()),event_authority:inline_cpi_info(a.pump_event_authority.as_ref()),program:inline_cpi_info(a.pump_program.as_ref())},&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]),input,minimum).map_err(|_|error!(BuyError::PumpCpiFailed))?;
 



 a.mayhem_base_token_vault.reload()?;a.bonding_curve.reload()?;if !native{a.mayhem_quote_token_vault.reload()?;}
 let after_quote=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};










    let sol=            after_quote-before_sol;
    let tokens=          before_tokens-a.mayhem_base_token_vault.amount;
 crate::state::record_sell(&mut a.global_params,&mut a.mayhem_state,sol,tokens,&a.quote_mint.key())?;
 let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};let state_quote_deployed=a.mayhem_state.field_56;let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let sol_amount=if native{sol}else{0};let sol_vault_balance=if native{quote_vault_balance}else{0};let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let event=SellEvent{side:true,sol_vault:a.sol_vault.key(),mint:a.mint.key(),sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,state_sol_deployed,state_token_net:a.mayhem_state.field_72,end_timestamp:a.mayhem_state.end_timestamp,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,global_sol_deployed,real_sol,real_tokens:a.bonding_curve.real_token_reserves,version:a.global_params.version,retained_reserve_bps,quote_amount:sol,quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,quote_mint,real_quote};
 emit!(event);emit_cpi!(event);Ok(())
}

