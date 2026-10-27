use anchor_lang::prelude::*;
pub const PUMP_ID: Pubkey = pubkey!("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");









#[account]
pub struct GlobalParams {
    pub field_0: u32, // serialized 8; original object 232
    pub field_1: u32, // serialized 12; original object 236
    pub field_2: u64, // serialized 16; original object 96
    pub field_3: u64, // serialized 24; original object 104
    pub field_4: u64, // serialized 32; original object 112
    pub field_5: u64, // serialized 40; original object 120
    pub paused: bool, // serialized 48; original object 245
    pub admin: Pubkey, // serialized 49; original object 0
    pub trader: Pubkey, // serialized 81; original object 32
    pub sol_deployed: i128, // serialized 113; original object 64
    pub field_9: u64, // serialized 129; original object 128
    pub field_6: u8, // serialized 137; original object 244
    pub field_138: u64, // serialized 138; original object 136
    pub field_7: u64, // serialized 146; original object 144
    pub field_8: u64, // serialized 154; original object 152
    pub version: u32, // serialized 162; original object 240
    pub field_10: u64, // serialized 166; original object 160
    pub max_sol_per_sweep: u64, // serialized 174; original object 168
    pub field_11: u64, // serialized 182; original object 176
    pub field_12: u64, // serialized 190; original object 184
    pub field_13: u64, // serialized 198; original object 192
    pub stable_deployed: i128, // serialized 206; original object 80
    pub field_14: u64, // serialized 222; original object 200
    pub field_15: u64, // serialized 230; original object 208
    pub field_238: u64, // serialized 238; original object 216
    pub max_stable_per_sweep: u64, // serialized 246; original object 224
}

/// Serialized offsets are recovered from 0x685f0 and 0x68ce0.
/// Neutral field names avoid claiming unavailable historical semantics.













#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum MayhemStatus { Variant0, Variant1, Ended }

/// A separate namespace suppresses the automatic Mayhem Owner implementation.
/// The codec at 0x6dc00 writes 82 bytes including this account discriminator.
pub use crate::BondingCurve;









































impl GlobalParams {
    pub fn validate_native_withdraw(&mut self)->Result<()> { let current_time = Clock::get()?.unix_timestamp; let last = self.field_138 as i64; let interval = self.field_8 as i64;
        if last != 0 && interval != 0 {
        let next =    last + interval;


                                   require!(current_time >= next, crate::MayhemError::WithdrawRateLimit);
        }
        self.field_138 = current_time as u64;
        Ok(())
    }





    pub fn validate_quote_withdraw(&mut self)->Result<()> { let current_time = Clock::get()?.unix_timestamp; let last = self.field_238 as i64; let interval = self.field_15 as i64;
        if last != 0 && interval != 0 {
        let next =    last + interval;


                                   require!(current_time >= next, crate::MayhemError::WithdrawRateLimit);
        }
        self.field_238 = current_time as u64;
        Ok(())
    }
}

















































































impl GlobalParams {
    pub fn stop_trading(&mut self)->Result<()> {

                                   require_eq!(self.paused, false, crate::MayhemError::TradingPaused);
        self.paused = true;
        Ok(())
    }
    pub fn resume_trading(&mut self)->Result<()> {

                                   require_eq!(self.paused, true, crate::MayhemError::TradingPaused);
        self.paused = false;
        Ok(())
    }
}




pub fn record_amm_buy(global_params:&mut GlobalParams,state:&mut MayhemState,quote:u64,tokens:u64,quote_mint:&Pubkey)->Result<()> {
    if *quote_mint==Pubkey::default() || *quote_mint==anchor_spl::token::spl_token::native_mint::ID {
        global_params.sol_deployed=global_params.sol_deployed.checked_add(quote as i128).ok_or(crate::MayhemError::MathOverflow)?;
    } else { global_params.stable_deployed=global_params.stable_deployed.checked_add(quote as i128).ok_or(crate::MayhemError::MathOverflow)?; }
    state.field_56=state.field_56.checked_add(quote as i128).ok_or(crate::MayhemError::MathOverflow)?;
    state.field_72=state.field_72.checked_sub(tokens as i128).ok_or(crate::MayhemError::MathOverflow)?;
    let native=*quote_mint==Pubkey::default() || *quote_mint==anchor_spl::token::spl_token::native_mint::ID;
    let global_deployed=if native {global_params.sol_deployed}else{global_params.stable_deployed};
    let overall_limit=if native {global_params.field_4}else{global_params.field_12};
    let coin_limit=if native {global_params.field_5}else{global_params.field_13};


    if global_deployed>0 {
        require_gt!(overall_limit,global_deployed as u64,crate::MayhemError::OverallRiskExceeded);
    }




    if state.field_56>0 {
        require_gt!(coin_limit,state.field_56 as u64,crate::MayhemError::CoinRiskExceeded);
    }
    Ok(())
}
























































fn retained_basis_points(retained_bps:u16)->u16 {










          let retained = 10000u16 - retained_bps;
    retained
}







fn checked_sell_amounts(vt: u64, vs: u64, real: u64, balance: u64, cap: u64, retained_bps: u16) -> core::result::Result<(u64,u64), crate::MayhemError> {
    let retained=retained_basis_points(retained_bps);
    let mut output = u64::try_from((vs as u128 * balance as u128) / (vt as u128 + balance as u128)).map_err(|_| crate::MayhemError::PumpCpiMathOverflow)?;
    if cap != 0 { output = output.min(cap); }
    output = output.min((real as u128 * retained as u128 / 10000) as u64);
    let ratio = (output as u128 * vt as u128).checked_div(vs as u128 - output as u128).ok_or(crate::MayhemError::PumpCpiMathOverflow)?;
    let input = u64::try_from(ratio).map_err(|_| crate::MayhemError::PumpCpiMathOverflow)?;
    Ok((input, output.saturating_sub(1)))
}
























































pub fn sell_amounts(vt: u64, vs: u64, real: u64, balance: u64, cap: u64, retained_bps: u16) -> (u64,u64) {

                          checked_sell_amounts(vt, vs, real, balance, cap, retained_bps).unwrap()
}


















fn initial_quote(base_reserve:u64,quote_reserve:u64,balance:u64)->u64 {
    match (balance as u128*quote_reserve as u128).checked_div(base_reserve as u128+balance as u128) {



        Some(value)=>{
                     u64::try_from(value).unwrap()
        },
        None=>u64::MAX,
    }
}





















pub fn buy_quote(global_params: &GlobalParams, base_reserve: u64, quote_reserve: u64, balance: u64, retained_bps: u64, quote_mint: Pubkey) -> Result<(u64,u64)> {
    let retained=retained_basis_points(retained_bps as u16);
    let quote=initial_quote(base_reserve,quote_reserve,balance);
    let quote = if quote_mint == Pubkey::default() || quote_mint == anchor_spl::token::spl_token::native_mint::ID {
        if global_params.field_2 != 0 { quote.min(global_params.field_2) } else { quote }
    } else {
        if global_params.field_11 != 0 { quote.min(global_params.field_11) } else { quote }
    };
    let quote=quote.min((quote_reserve as u128*retained as u128/10000)as u64);

    let input=(quote as u128*base_reserve as u128)
        .checked_div(quote_reserve as u128+quote as u128)
        .ok_or(crate::MayhemError::PumpSwapCpiMathOverflow)
            .unwrap();
  let input=u64::try_from(input).unwrap();
    Ok((input,quote))
}






































#[account]
pub struct MayhemState {
    pub field_8: u64,             // 8
    pub end_timestamp: i64,        // 16: signed Clock comparison in burn
    pub mint: Pubkey,              // 24
    pub field_56: i128,            // 56: exact width; signedness not proven here
    pub field_72: i128,            // 72: exact width; signedness not proven here
    pub flag_88: bool,             // 88: decoder accepts only 0 or 1
    pub field_89: u64,             // 89
    pub status: MayhemStatus,      // 97: decoder accepts only 0, 1 or 2
    pub burned_amount: u64,        // 98
}




































impl MayhemState {
    pub fn validate_trade(&mut self, global_params: &crate::GlobalParams) -> Result<()> {

        require!(!global_params.paused, crate::MayhemError::TradingPaused);

        let current_time = Clock::get().unwrap().unix_timestamp;
        let last = self.field_89 as i64;
        let interval = (global_params.field_7 as i64);
        if last != 0 && interval != 0 {
               let next_time = last + interval;


            require!(current_time >= next_time, crate::MayhemError::TradeRateLimit);
        }
        self.field_89 = current_time as u64;
        Ok(())
    }
}


impl MayhemState {
    pub fn validate_quote(&mut self, reserves: u64, global_params: &crate::GlobalParams, quote_mint: &Pubkey) -> Result<()> {


        let end_timestamp = self.end_timestamp;
                let current_time = Clock::get().unwrap().unix_timestamp;
        require!(end_timestamp > current_time, crate::MayhemError::MayhemModeEnded);
        if self.status == MayhemStatus::Variant1 { return Ok(()); }

        let threshold = if *quote_mint == Pubkey::default() || *quote_mint == anchor_spl::token::spl_token::native_mint::ID {
            global_params.field_9
        } else { global_params.field_14 };








        require!(reserves >= threshold, crate::MayhemError::SolReservesTooLow);
        self.status = MayhemStatus::Variant1;
        Ok(())
    }
}


pub fn record_sell(global_params:&mut GlobalParams,state:&mut MayhemState,quote:u64,tokens:u64,quote_mint:&Pubkey)->Result<()> {
    if *quote_mint==Pubkey::default() || *quote_mint==anchor_spl::token::spl_token::native_mint::ID {
        global_params.sol_deployed=global_params.sol_deployed.checked_sub(quote as i128).ok_or(crate::MayhemError::MathOverflow)?;
    } else { global_params.stable_deployed=global_params.stable_deployed.checked_sub(quote as i128).ok_or(crate::MayhemError::MathOverflow)?; }
    state.field_56=state.field_56.checked_sub(quote as i128).ok_or(crate::MayhemError::MathOverflow)?;
    state.field_72=state.field_72.checked_add(tokens as i128).ok_or(crate::MayhemError::MathOverflow)?;
    Ok(())
}
