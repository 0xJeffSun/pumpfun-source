use anchor_lang::prelude::*;
use anchor_spl::token_interface::{self, Mint, TokenAccount, TokenInterface, TransferChecked};
use crate::{Global, PumpError};
use crate::trade_types::{BondingCurve, FeeConfig, Fees, TradeEvent};
const FEE_PROGRAM: Pubkey = anchor_lang::solana_program::pubkey!("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ");
const WSOL: Pubkey = anchor_lang::solana_program::pubkey!("So11111111111111111111111111111111111111112");
#[event_cpi]
#[derive(Accounts)]
pub struct SellV3<'info> {
    #[account(seeds=[b"global"],bump)]
    pub global: Box<Account<'info, Global>>,
    pub base_mint: Box<InterfaceAccount<'info, Mint>>,
    /// CHECK: recovered SOL/USDC quote checks validate this account.
    pub quote_mint: UncheckedAccount<'info>,
    pub base_token_program: Interface<'info, TokenInterface>,
    pub quote_token_program: Interface<'info, TokenInterface>,
    #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump)]
    pub bonding_curve: Box<Account<'info, BondingCurve>>,
    #[account(mut,associated_token::mint=base_mint,associated_token::authority=bonding_curve,associated_token::token_program=base_token_program)]
    pub associated_base_bonding_curve: InterfaceAccount<'info, TokenAccount>,
    /// CHECK: token-quote checks validate owner, mint and relevant authority/address.
    #[account(mut)]
    pub associated_quote_bonding_curve: UncheckedAccount<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut,token::mint=base_mint,token::authority=user,token::token_program=base_token_program)]
    pub associated_base_user: InterfaceAccount<'info, TokenAccount>,
    /// CHECK: token-quote checks validate owner, mint and relevant authority/address.
    #[account(mut)]
    pub associated_quote_user: UncheckedAccount<'info>,
    /// CHECK: v3 rejects cashback; tested paths do not update volume accumulation.
    #[account(mut,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]
    pub user_volume_accumulator: UncheckedAccount<'info>,
    /// CHECK: cross-program FeeConfig owner, address and serialization checked.
    #[account(owner=FEE_PROGRAM @ anchor_lang::error::ErrorCode::AccountOwnedByWrongProgram,seeds=[b"fee_config",crate::ID.as_ref()],bump,seeds::program=FEE_PROGRAM)]
    pub fee_config: UncheckedAccount<'info>,
    /// CHECK: membership in global buyback recipients is checked in handler.
    #[account(mut)]
    pub buyback_fee_recipient: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}
fn add(a:u64,b:u64)->Result<u64>{a.checked_add(b).ok_or_else(||error!(PumpError::Overflow))}
fn sub(a:u64,b:u64)->Result<u64>{a.checked_sub(b).ok_or_else(||error!(PumpError::Overflow))}
fn narrow(a:u128)->Result<u64>{u64::try_from(a).map_err(|_|error!(PumpError::Truncation))}
fn fee(a:u64,b:u64)->Result<u64>{narrow((a as u128*b as u128+9999)/10000)}
fn selected(config:&FeeConfig,cap:u128,stable:bool)->Fees{
    let tiers=if stable{&config.stable_fee_tiers}else{&config.fee_tiers};
    if cap<tiers[0].market_cap_lamports_threshold{return tiers[0].fees.clone()}
    tiers.iter().rev().find(|t|t.market_cap_lamports_threshold<=cap).unwrap_or(&tiers[0]).fees.clone()
}
pub fn sell(ctx:Context<SellV3>,amount:u64,min_sol_output:u64)->Result<()> {
    let a=&mut *ctx.accounts;
    let quote_decimals=check_quote(a)?;
    let is_sol=quote_decimals.is_none();
    require!(!a.bonding_curve.is_cashback_coin,PumpError::CashbackCoinNotSupported);
    require!(!a.bonding_curve.complete,PumpError::BondingCurveComplete);
    require!(amount>0,PumpError::SellZeroAmount);
    require!(a.associated_base_user.amount>=amount,PumpError::NotEnoughTokensToSell);
    if is_sol{require!(a.global.buyback_fee_recipients.contains(&a.buyback_fee_recipient.key()),PumpError::BuybackFeeRecipientNotAuthorized);}
    let curve=&a.bonding_curve;
    let quote=narrow(amount as u128*curve.virtual_quote_reserves as u128/(curve.virtual_token_reserves as u128+amount as u128))?;
    let cap=curve.token_total_supply as u128*curve.virtual_quote_reserves as u128/curve.virtual_token_reserves as u128;
    let config_data=a.fee_config.try_borrow_data()?;
    let config=read_config(&config_data)?;
    drop(config_data);
    require!(!(if is_sol{&config.fee_tiers}else{&config.stable_fee_tiers}).is_empty(),PumpError::FeeTiersEmpty);
    let mut fees=selected(&config,cap,!is_sol);
    if curve.creator_fee_bps>0{fees.creator_fee_bps=curve.creator_fee_bps;}
    let creator_bps=if curve.creator==Pubkey::default(){0}else{fees.creator_fee_bps};
    let protocol_fee=fee(quote,fees.protocol_fee_bps)?;
    let creator_fee=fee(quote,creator_bps)?;
    let buyback_bps=if curve.is_mayhem_mode {0}else{a.global.buyback_basis_points};
    let buyback_fee=narrow(protocol_fee as u128*buyback_bps as u128/10000)?;
    let user_output=sub(sub(quote,protocol_fee)?,creator_fee)?;
    require!(user_output>=min_sol_output,PumpError::TooLittleSolReceived);
    let retained=sub(protocol_fee,buyback_fee)?;
    let next_base=add(curve.virtual_token_reserves,amount)?;
    let next_quote=sub(curve.virtual_quote_reserves,quote)?;
    let next_real_base=add(curve.real_token_reserves,amount)?;
    let next_real_quote=sub(curve.real_quote_reserves,quote)?;
    let next_creator=add(curve.creator_fee,creator_fee)?;
    let next_protocol=add(curve.protocol_fees,retained)?;
    token_interface::transfer_checked(CpiContext::new(a.base_token_program.to_account_info(),TransferChecked{
        from:a.associated_base_user.to_account_info(),mint:a.base_mint.to_account_info(),to:a.associated_base_bonding_curve.to_account_info(),authority:a.user.to_account_info()
    }),amount,a.base_mint.decimals)?;
    if let Some(decimals)=quote_decimals {
      let mint_key=a.base_mint.key();let bump=[ctx.bumps.bonding_curve];let seeds:&[&[u8]]=&[b"bonding-curve",mint_key.as_ref(),&bump];
      for (to,amount) in [(a.associated_quote_user.to_account_info(),user_output),(a.buyback_fee_recipient.to_account_info(),buyback_fee)] {
        if amount==0{continue}
        token_interface::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),TransferChecked{from:a.associated_quote_bonding_curve.to_account_info(),mint:a.quote_mint.to_account_info(),to,authority:a.bonding_curve.to_account_info()},&[seeds]),amount,decimals)?;
      }
    }else{
      a.bonding_curve.sub_lamports(add(user_output,buyback_fee)?)?;
      a.user.add_lamports(user_output)?;a.buyback_fee_recipient.add_lamports(buyback_fee)?;
    }
    let curve=&mut a.bonding_curve;
    curve.virtual_token_reserves=next_base;curve.virtual_quote_reserves=next_quote;
    curve.real_token_reserves=next_real_base;curve.real_quote_reserves=next_real_quote;
    curve.creator_fee=next_creator;curve.protocol_fees=next_protocol;
    let event=TradeEvent{
        mint:a.base_mint.key(),sol_amount:if is_sol{quote}else{0},token_amount:amount,is_buy:false,user:a.user.key(),timestamp:Clock::get()?.unix_timestamp,
        virtual_sol_reserves:if is_sol{next_quote}else{0},virtual_token_reserves:next_base,real_sol_reserves:if is_sol{next_real_quote}else{0},real_token_reserves:next_real_base,
        fee_recipient:Pubkey::default(),fee_basis_points:fees.protocol_fee_bps,fee:protocol_fee,creator:curve.creator,creator_fee_basis_points:fees.creator_fee_bps,creator_fee,
        track_volume:false,total_unclaimed_tokens:0,total_claimed_tokens:0,current_sol_volume:0,last_update_timestamp:0,ix_name:"sell".into(),mayhem_mode:curve.is_mayhem_mode,
        cashback_fee_basis_points:0,cashback:0,buyback_fee_basis_points:buyback_bps,buyback_fee,shareholders:vec![],quote_mint:curve.quote_mint,
        quote_amount:quote,virtual_quote_reserves:next_quote,real_quote_reserves:next_real_quote,holder_rewards_bps:if curve.is_holder_reward{fees.creator_fee_bps}else{0},holder_rewards:if curve.is_holder_reward{creator_fee}else{0},creator_fee_unclaimed:next_creator,
        unparsed_trailing_field:0,
    };
    emit!(event.clone());
    emit_cpi!(event);
    Ok(())
}

pub fn buy(ctx:Context<SellV3>,amount:u64,max_sol_cost:u64)->Result<()> {
    let a=&mut *ctx.accounts;
    let quote_decimals=check_quote(a)?;
    let is_sol=quote_decimals.is_none();
    require!(!a.bonding_curve.is_cashback_coin,PumpError::CashbackCoinNotSupported);
    require!(!a.bonding_curve.complete,PumpError::BondingCurveComplete);
    require!(amount>0,PumpError::BuyZeroAmount);
    if is_sol{require!(a.global.buyback_fee_recipients.contains(&a.buyback_fee_recipient.key()),PumpError::BuybackFeeRecipientNotAuthorized);}
    // Bounded hypothesis: only ordinary Tokenkeg, non-Mayhem/non-whitelist.
    // Parser/volume/native interface obligations are recorded in REPORT.md.
    let normal = !a.bonding_curve.is_mayhem_mode
        && a.user.key()!=a.global.whitelist_pda
        && a.base_token_program.key()==anchor_spl::token::ID
        && (is_sol || a.quote_token_program.key()==anchor_spl::token::ID);
    let requested=amount;
    let amount=if normal {amount.min(a.bonding_curve.real_token_reserves)}else{amount};
    if normal {require!(amount>0,PumpError::BuyZeroAmount);}
    let residual_base=if normal {sub(requested,amount)?}else{0};
    let curve=&a.bonding_curve;
    let denominator=(curve.virtual_token_reserves as u128).checked_sub(amount as u128).ok_or_else(||error!(PumpError::Overflow))?;
    let quotient=(amount as u128*curve.virtual_quote_reserves as u128).checked_div(denominator).ok_or_else(||error!(PumpError::DivisionByZero))?;
    let quote=narrow(quotient.checked_add(1).ok_or_else(||error!(PumpError::Overflow))?)?;
    let cap=curve.token_total_supply as u128*curve.virtual_quote_reserves as u128/curve.virtual_token_reserves as u128;
    let config_data=a.fee_config.try_borrow_data()?;
    let config=read_config(&config_data)?;
    drop(config_data);
    require!(!(if is_sol{&config.fee_tiers}else{&config.stable_fee_tiers}).is_empty(),PumpError::FeeTiersEmpty);
    let mut fees=selected(&config,cap,!is_sol);
    if curve.creator_fee_bps>0{fees.creator_fee_bps=curve.creator_fee_bps;}
    let creator_bps=if curve.creator==Pubkey::default(){0}else{fees.creator_fee_bps};
    let protocol_fee=fee(quote,fees.protocol_fee_bps)?;
    let creator_fee=fee(quote,creator_bps)?;
    // Both legs use the pretrade fee selection; neither sees mutated reserves.
    let (pool_base,pool_quote,residual_quote,residual_protocol,residual_creator)=if residual_base>0 {
        let base=sub(a.associated_base_bonding_curve.amount,amount)?;
        let funded=add(curve.real_quote_reserves,quote)?;
        let quote_pool=if is_sol{sub(funded,a.global.pool_migration_fee)?}else{funded};
        require!(base>0,PumpError::BuyZeroAmount);
        require!(quote_pool>0,PumpError::Overflow);
        require!(base>residual_base,PumpError::BuyZeroAmount);
        let denominator=(base-residual_base) as u128;
        let product=residual_base as u128*quote_pool as u128;
        let residual_quote=narrow(product/denominator+u128::from(product%denominator!=0))?;
        (base,quote_pool,residual_quote,fee(residual_quote,fees.protocol_fee_bps)?,fee(residual_quote,creator_bps)?)
    }else{(0,0,0,0,0)};
    let buyback_bps=if curve.is_mayhem_mode {0}else{a.global.buyback_basis_points};
    let buyback_fee=narrow(protocol_fee as u128*buyback_bps as u128/10000)?;
    let residual_buyback=narrow(residual_protocol as u128*buyback_bps as u128/10000)?;
    let first_gross=add(add(quote,protocol_fee)?,creator_fee)?;
    let second_gross=add(add(residual_quote,residual_protocol)?,residual_creator)?;
    let combined_buyback=add(buyback_fee,residual_buyback)?;
    let curve_payment=sub(add(first_gross,second_gross)?,combined_buyback)?;
    let user_output=add(curve_payment,combined_buyback)?;
    require!(user_output<=max_sol_cost,PumpError::TooMuchSolRequired);
    let retained=sub(protocol_fee,buyback_fee)?;
    // Keep the prior path's precomputed updates outside the new normal branch.
    let old_updates=if !normal {Some((sub(curve.virtual_token_reserves,amount)?,add(curve.virtual_quote_reserves,quote)?,sub(curve.real_token_reserves,amount)?,add(curve.real_quote_reserves,quote)?,add(curve.creator_fee,creator_fee)?,add(curve.protocol_fees,retained)?))}else{None};
    if normal {
        // First-leg reserves only, in the original normal-path store order.
        let curve=&mut a.bonding_curve;
        curve.virtual_token_reserves=sub(curve.virtual_token_reserves,amount)?;
        curve.real_token_reserves=sub(curve.real_token_reserves,amount)?;
        curve.virtual_quote_reserves=add(curve.virtual_quote_reserves,quote)?;
        curve.real_quote_reserves=add(curve.real_quote_reserves,quote)?;
    }
    let mint_key=a.base_mint.key();let bump=[ctx.bumps.bonding_curve];
    let seeds:&[&[u8]]=&[b"bonding-curve",mint_key.as_ref(),&bump];
    token_interface::transfer_checked(CpiContext::new_with_signer(a.base_token_program.to_account_info(),TransferChecked{
        from:a.associated_base_bonding_curve.to_account_info(),mint:a.base_mint.to_account_info(),to:a.associated_base_user.to_account_info(),authority:a.bonding_curve.to_account_info()
    },&[seeds]),add(amount,residual_base)?,a.base_mint.decimals)?;
    let first_creator;
    if normal {
        // APPLICATION BOUNDARY: original initializes a zero user-volume key
        // here. The current unchecked context lacks its validated parser/exit
        // contract. This proposal requires an already initialized volume key;
        // it deliberately does not write guessed offsets or accept a stub.
        let curve=&mut a.bonding_curve;
        curve.protocol_fees=add(curve.protocol_fees,retained)?;
        curve.creator_fee=add(curve.creator_fee,creator_fee)?;
        first_creator=curve.creator_fee;
        if residual_base>0 {
            curve.post_complete_base_out=residual_base;
            curve.post_complete_quote_in=residual_quote;
            curve.protocol_fees=add(curve.protocol_fees,sub(residual_protocol,residual_buyback)?)?;
            curve.creator_fee=add(curve.creator_fee,residual_creator)?;
        }
    }else{first_creator=old_updates.as_ref().unwrap().4;}
    if let Some(decimals)=quote_decimals {
      for (to,amount) in [(a.associated_quote_bonding_curve.to_account_info(),curve_payment),(a.buyback_fee_recipient.to_account_info(),combined_buyback)] {
        if amount==0{continue}
        token_interface::transfer_checked(CpiContext::new(a.quote_token_program.to_account_info(),TransferChecked{from:a.associated_quote_user.to_account_info(),mint:a.quote_mint.to_account_info(),to,authority:a.user.to_account_info()}),amount,decimals)?;
      }
    }else if normal {
      // Ordinary native BuyV3: 0x841d8 sums both obligations; 0x979b8
      // calls the System input helper. Native buyback then debits the curve.
      let native_input=add(curve_payment,combined_buyback)?;
      if native_input!=0 {
        anchor_lang::system_program::transfer(CpiContext::new(a.system_program.to_account_info(),anchor_lang::system_program::Transfer{
          from:a.user.to_account_info(),to:a.bonding_curve.to_account_info()
        }),native_input)?;
      }
      // Clone destination before the zero gate, as at 0x84730.
      let native_recipient=a.buyback_fee_recipient.to_account_info();
      if combined_buyback!=0 {
        let native_curve=a.bonding_curve.to_account_info();
        // Natural ProgramError mapping is a framework premise; see REPORT.md.
        let remaining=native_curve.lamports().checked_sub(combined_buyback)
          .ok_or(anchor_lang::solana_program::program_error::ProgramError::ArithmeticOverflow)?;
        { **native_curve.try_borrow_mut_lamports()?=remaining; }
        // Read only after the source store and release, including for aliases.
        let credited=native_recipient.lamports().checked_add(combined_buyback)
          .ok_or(anchor_lang::solana_program::program_error::ProgramError::ArithmeticOverflow)?;
        { **native_recipient.try_borrow_mut_lamports()?=credited; }
      }
    }else{
      anchor_lang::system_program::transfer(CpiContext::new(a.system_program.to_account_info(),anchor_lang::system_program::Transfer{from:a.user.to_account_info(),to:a.bonding_curve.to_account_info()}),user_output)?;
      a.bonding_curve.sub_lamports(buyback_fee)?;a.buyback_fee_recipient.add_lamports(buyback_fee)?;
    }
    let curve=&mut a.bonding_curve;
    if let Some((base,quote,real_base,real_quote,creator,protocol))=old_updates {
        curve.virtual_token_reserves=base;curve.virtual_quote_reserves=quote;
        curve.real_token_reserves=real_base;curve.real_quote_reserves=real_quote;
        curve.creator_fee=creator;curve.protocol_fees=protocol;
    }
    let next_base=curve.virtual_token_reserves;
    let next_quote=curve.virtual_quote_reserves;
    let next_real_base=curve.real_token_reserves;
    let next_real_quote=curve.real_quote_reserves;
    let event=TradeEvent{
        mint:a.base_mint.key(),sol_amount:if is_sol{quote}else{0},token_amount:amount,is_buy:true,user:a.user.key(),timestamp:Clock::get()?.unix_timestamp,
        virtual_sol_reserves:if is_sol{next_quote}else{0},virtual_token_reserves:next_base,real_sol_reserves:if is_sol{next_real_quote}else{0},real_token_reserves:next_real_base,
        fee_recipient:Pubkey::default(),fee_basis_points:fees.protocol_fee_bps,fee:protocol_fee,creator:curve.creator,creator_fee_basis_points:fees.creator_fee_bps,creator_fee,
        track_volume:false,total_unclaimed_tokens:0,total_claimed_tokens:0,current_sol_volume:0,last_update_timestamp:0,ix_name:"buy".into(),mayhem_mode:curve.is_mayhem_mode,
        cashback_fee_basis_points:0,cashback:0,buyback_fee_basis_points:buyback_bps,buyback_fee,shareholders:vec![],quote_mint:curve.quote_mint,
        quote_amount:quote,virtual_quote_reserves:next_quote,real_quote_reserves:next_real_quote,holder_rewards_bps:if curve.is_holder_reward{fees.creator_fee_bps}else{0},holder_rewards:if curve.is_holder_reward{creator_fee}else{0},creator_fee_unclaimed:first_creator,
        unparsed_trailing_field:0,
    };
    let timestamp=event.timestamp;
    emit!(event.clone());emit_cpi!(event);
    if next_real_base==0 {
        a.bonding_curve.complete=true;
        let completion=crate::trade_types::CompleteEvent{user:a.user.key(),mint:a.base_mint.key(),bonding_curve:a.bonding_curve.key(),timestamp,quote_mint:a.bonding_curve.quote_mint};
        emit!(completion.clone());emit_cpi!(completion);
        if residual_base>0 {
            // Preserve the late event-constructor checks after CompleteEvent CPI.
            let pool_quote_after=add(pool_quote,residual_quote)?;
            let pool_base_after=pool_base.checked_sub(residual_base).ok_or_else(||error!(PumpError::BuyZeroAmount))?;
            let post=PostCompleteBuyEvent{user:a.user.key(),mint:a.base_mint.key(),bonding_curve:a.bonding_curve.key(),quote_mint:a.bonding_curve.quote_mint,timestamp,
                base_out:residual_base,quote_in:residual_quote,fee_basis_points:fees.protocol_fee_bps,fee:residual_protocol,
                creator_fee_basis_points:fees.creator_fee_bps,creator_fee:residual_creator,buyback_fee:residual_buyback,
                pool_base_reserves_before:pool_base,pool_quote_reserves_before:pool_quote,pool_base_reserves_after:pool_base_after,pool_quote_reserves_after:pool_quote_after};
            emit!(post.clone());emit_cpi!(post);
        }
    }
    Ok(())
}

pub fn buy_exact_quote(ctx:Context<SellV3>,spendable_quote_in:u64,min_tokens_out:u64,partial_fill:bool)->Result<()> {
    let a=&mut *ctx.accounts;
    let quote_decimals=check_quote(a)?;
    let is_sol=quote_decimals.is_none();
    require!(!a.bonding_curve.is_cashback_coin,PumpError::CashbackCoinNotSupported);
    require!(!a.bonding_curve.complete,PumpError::BondingCurveComplete);
    require!(min_tokens_out>0,PumpError::BuyZeroAmount);
    require!(spendable_quote_in>0,PumpError::BuyNotEnoughSolToCoverFees);
    if is_sol{require!(a.global.buyback_fee_recipients.contains(&a.buyback_fee_recipient.key()),PumpError::BuybackFeeRecipientNotAuthorized);}
    let curve=&a.bonding_curve;
    let cap=(curve.token_total_supply as u128*curve.virtual_quote_reserves as u128).checked_div(curve.virtual_token_reserves as u128).ok_or(error!(PumpError::DivisionByZero))?;
    let config_data=a.fee_config.try_borrow_data()?;
    if config_data.len()<8{return Err(error!(anchor_lang::error::ErrorCode::AccountDiscriminatorNotFound));}
    require!(config_data[..8]==[143,52,146,187,219,123,76,155],anchor_lang::error::ErrorCode::AccountDiscriminatorMismatch);
    let config=FeeConfig::deserialize(&mut &config_data[8..]).map_err(|_|error!(anchor_lang::error::ErrorCode::AccountDidNotDeserialize))?;
    require!(config_data.len()>=2512,PumpError::FeeConfigTooShort);
    drop(config_data);
    require!(!(if is_sol{&config.fee_tiers}else{&config.stable_fee_tiers}).is_empty(),PumpError::FeeTiersEmpty);
    let mut fees=selected(&config,cap,!is_sol);
    if curve.creator_fee_bps>0{fees.creator_fee_bps=curve.creator_fee_bps;}
    let creator_bps=if curve.creator==Pubkey::default(){0}else{fees.creator_fee_bps};
    let _=fee(spendable_quote_in,fees.protocol_fee_bps)?;
    let _=fee(spendable_quote_in,creator_bps)?;
    let quote_budget=net_quote(spendable_quote_in,fees.protocol_fee_bps,creator_bps)?;
    require!(spendable_quote_in as u128*10000/(10000u128+fees.protocol_fee_bps as u128+creator_bps as u128)>0,PumpError::BuyNotEnoughSolToCoverFees);
    let effective=quote_budget.saturating_sub(1);
    let computed_amount=narrow(curve.virtual_token_reserves as u128*effective as u128/(curve.virtual_quote_reserves as u128+effective as u128))?;
    let amount=computed_amount.min(curve.real_token_reserves);
    let exceeds=computed_amount>curve.real_token_reserves;
    require!(!exceeds || !curve.is_mayhem_mode || partial_fill,PumpError::NotEnoughTokensToBuy);
    let crossing=exceeds && !curve.is_mayhem_mode;
    let quote=if exceeds{narrow(curve.real_token_reserves as u128*curve.virtual_quote_reserves as u128/(curve.virtual_token_reserves as u128-curve.real_token_reserves as u128))?.checked_add(1).ok_or(error!(PumpError::Overflow))?}else{quote_budget};
    let fee_quote=if exceeds{quote}else{narrow(spendable_quote_in as u128*10000/(10000u128+fees.protocol_fee_bps as u128+creator_bps as u128))?};
    let protocol_fee=fee(fee_quote,fees.protocol_fee_bps)?;
    let creator_fee=fee(fee_quote,creator_bps)?;
    let buyback_bps=if curve.is_mayhem_mode {0}else{a.global.buyback_basis_points};
    let buyback_fee=narrow(protocol_fee as u128*buyback_bps as u128/10000)?;
    let first_cost=add(add(quote,protocol_fee)?,creator_fee)?;
    let pool_base_before=if crossing{sub(a.associated_base_bonding_curve.amount,amount)?}else{0};
    let pool_quote_before=if crossing{add(sub(add(curve.real_quote_reserves,quote)?,if is_sol{a.global.pool_migration_fee}else{0})?,curve.post_complete_quote_in)?}else{0};
    let post_quote=if crossing{net_quote(sub(spendable_quote_in,first_cost)?,fees.protocol_fee_bps,creator_bps)?}else{0};
    let post_base=if post_quote>0{narrow(pool_base_before as u128*(post_quote-1) as u128/(pool_quote_before as u128+(post_quote-1) as u128))?}else{0};
    let post_fee_quote=if crossing{narrow(sub(spendable_quote_in,first_cost)? as u128*10000/(10000u128+fees.protocol_fee_bps as u128+creator_bps as u128))?}else{0};
    let post_protocol=fee(post_fee_quote,fees.protocol_fee_bps)?;let post_creator=fee(post_fee_quote,creator_bps)?;
    let post_buyback=narrow(post_protocol as u128*buyback_bps as u128/10000)?;
    let transfer_base=add(amount,post_base)?;
    require!((exceeds && curve.is_mayhem_mode && partial_fill) || transfer_base>=min_tokens_out,PumpError::BuySlippageBelowMinTokensOut);
    let user_output=add(first_cost,add(add(post_quote,post_protocol)?,post_creator)?)?;

    let retained=sub(protocol_fee,buyback_fee)?;
    let next_base=sub(curve.virtual_token_reserves,amount)?;
    let next_quote=add(curve.virtual_quote_reserves,quote)?;
    let next_real_base=sub(curve.real_token_reserves,amount)?;
    let next_real_quote=add(curve.real_quote_reserves,quote)?;
    let next_creator=add(add(curve.creator_fee,creator_fee)?,post_creator)?;
    let next_protocol=add(add(curve.protocol_fees,retained)?,sub(post_protocol,post_buyback)?)?;
    let mint_key=a.base_mint.key();let bump=[ctx.bumps.bonding_curve];
    let seeds:&[&[u8]]=&[b"bonding-curve",mint_key.as_ref(),&bump];
    token_interface::transfer_checked(CpiContext::new_with_signer(a.base_token_program.to_account_info(),TransferChecked{
        from:a.associated_base_bonding_curve.to_account_info(),mint:a.base_mint.to_account_info(),to:a.associated_base_user.to_account_info(),authority:a.bonding_curve.to_account_info()
    },&[seeds]),transfer_base,a.base_mint.decimals)?;
    if let Some(decimals)=quote_decimals {
      for (to,amount) in [(a.associated_quote_bonding_curve.to_account_info(),sub(user_output,add(buyback_fee,post_buyback)?)?),(a.buyback_fee_recipient.to_account_info(),add(buyback_fee,post_buyback)?)] {
        if amount==0{continue}
        token_interface::transfer_checked(CpiContext::new(a.quote_token_program.to_account_info(),TransferChecked{from:a.associated_quote_user.to_account_info(),mint:a.quote_mint.to_account_info(),to,authority:a.user.to_account_info()}),amount,decimals)?;
      }
    }else{
      anchor_lang::system_program::transfer(CpiContext::new(a.system_program.to_account_info(),anchor_lang::system_program::Transfer{from:a.user.to_account_info(),to:a.bonding_curve.to_account_info()}),user_output)?;
      a.bonding_curve.sub_lamports(add(buyback_fee,post_buyback)?)?;a.buyback_fee_recipient.add_lamports(add(buyback_fee,post_buyback)?)?;
    }
    let curve=&mut a.bonding_curve;
    curve.virtual_token_reserves=next_base;curve.virtual_quote_reserves=next_quote;
    curve.real_token_reserves=next_real_base;curve.real_quote_reserves=next_real_quote;
    curve.creator_fee=next_creator;curve.protocol_fees=next_protocol;
    curve.post_complete_base_out=add(curve.post_complete_base_out,post_base)?;curve.post_complete_quote_in=add(curve.post_complete_quote_in,post_quote)?;
    let event=TradeEvent{
        mint:a.base_mint.key(),sol_amount:if is_sol{quote}else{0},token_amount:amount,is_buy:true,user:a.user.key(),timestamp:Clock::get()?.unix_timestamp,
        virtual_sol_reserves:if is_sol{next_quote}else{0},virtual_token_reserves:next_base,real_sol_reserves:if is_sol{next_real_quote}else{0},real_token_reserves:next_real_base,
        fee_recipient:Pubkey::default(),fee_basis_points:fees.protocol_fee_bps,fee:protocol_fee,creator:curve.creator,creator_fee_basis_points:fees.creator_fee_bps,creator_fee,
        track_volume:false,total_unclaimed_tokens:0,total_claimed_tokens:0,current_sol_volume:0,last_update_timestamp:0,ix_name:"buy_exact_quote_in".into(),mayhem_mode:curve.is_mayhem_mode,
        cashback_fee_basis_points:0,cashback:0,buyback_fee_basis_points:buyback_bps,buyback_fee,shareholders:vec![],quote_mint:curve.quote_mint,
        quote_amount:quote,virtual_quote_reserves:next_quote,real_quote_reserves:next_real_quote,holder_rewards_bps:if curve.is_holder_reward{fees.creator_fee_bps}else{0},holder_rewards:if curve.is_holder_reward{creator_fee}else{0},creator_fee_unclaimed:next_creator,
        unparsed_trailing_field:0,
    };
    let completion=if next_real_base==0 {
        a.bonding_curve.complete=true;
        Some(crate::trade_types::CompleteEvent{user:a.user.key(),mint:a.base_mint.key(),bonding_curve:a.bonding_curve.key(),timestamp:Clock::get()?.unix_timestamp,quote_mint:a.bonding_curve.quote_mint})
    }else{None};
    let post_event=if crossing && post_quote>0{Some(PostCompleteBuyEvent{user:a.user.key(),mint:a.base_mint.key(),bonding_curve:a.bonding_curve.key(),quote_mint:a.bonding_curve.quote_mint,timestamp:Clock::get()?.unix_timestamp,base_out:post_base,quote_in:post_quote,fee_basis_points:fees.protocol_fee_bps,fee:post_protocol,creator_fee_basis_points:fees.creator_fee_bps,creator_fee:post_creator,buyback_fee:post_buyback,pool_base_reserves_before:pool_base_before,pool_quote_reserves_before:pool_quote_before,pool_base_reserves_after:sub(pool_base_before,post_base)?,pool_quote_reserves_after:add(pool_quote_before,post_quote)?})}else{None};
    emit!(event.clone());emit_cpi!(event);
    if let Some(completion)=completion {emit!(completion.clone());emit_cpi!(completion);}
    if let Some(post_event)=post_event{emit!(post_event.clone());emit_cpi!(post_event);}
    Ok(())
}

fn read_config(data:&[u8])->Result<FeeConfig>{
 use anchor_lang::error::ErrorCode;
 if data.len()<8{return Err(error!(ErrorCode::AccountDiscriminatorNotFound))}
 if data[..8]!=[143,52,146,187,219,123,76,155]{return Err(error!(ErrorCode::AccountDiscriminatorMismatch))}
 let mut input=&data[8..];
 let decode=(||->std::io::Result<FeeConfig>{
  let bump=u8::deserialize(&mut input)?;let admin=Pubkey::deserialize(&mut input)?;
  let flat_fees=Fees::deserialize(&mut input)?;let fee_tiers=Vec::<crate::trade_types::FeeTier>::deserialize(&mut input)?;
  let stable_fee_tiers=if data.len()>=4073{Vec::<crate::trade_types::FeeTier>::deserialize(&mut input)?}else{vec![]};
  let exotic_flat_fees=if data.len()>=4097{Fees::deserialize(&mut input)?}else{Fees{lp_fee_bps:0,protocol_fee_bps:0,creator_fee_bps:0}};
  Ok(FeeConfig{bump,admin,flat_fees,fee_tiers,stable_fee_tiers,exotic_flat_fees})
 })().map_err(|_|error!(ErrorCode::AccountDidNotDeserialize))?;
 require!(data.len()>=2512,PumpError::FeeConfigTooShort);Ok(decode)
}

const USDC:Pubkey=anchor_lang::solana_program::pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
fn check_quote(a:&SellV3)->Result<Option<u8>>{
 if a.quote_mint.key()==WSOL||a.quote_mint.key()==Pubkey::default(){
  require!(a.bonding_curve.quote_mint==WSOL||a.bonding_curve.quote_mint==Pubkey::default(),PumpError::ReconstructionBranchUnsupported);return Ok(None)
 }
 require!(a.quote_mint.key()==USDC && a.bonding_curve.quote_mint==USDC,PumpError::ReconstructionBranchUnsupported);
 require!(a.quote_mint.owner==&a.quote_token_program.key(),anchor_lang::error::ErrorCode::AccountOwnedByWrongProgram);
 let mint=Mint::try_deserialize(&mut &a.quote_mint.try_borrow_data()?[..])?;
 for (role,info) in [(0,a.associated_quote_bonding_curve.to_account_info()),(1,a.associated_quote_user.to_account_info()),(2,a.buyback_fee_recipient.to_account_info())]{
  require!(info.owner==&a.quote_token_program.key(),PumpError::AccountTypeNotSupported);
  let token=TokenAccount::try_deserialize(&mut &info.try_borrow_data()?[..])?;
  require_keys_eq!(token.mint,USDC,PumpError::MintDoesNotMatchBondingCurve);
  if role==1{require_keys_eq!(token.owner,a.user.key(),PumpError::AccountTypeNotSupported)}
  if role==2{require!(a.global.buyback_fee_recipients.contains(&token.owner),PumpError::BuybackFeeRecipientNotAuthorized)}
  if role!=1 {
   let authority=if role==0{a.bonding_curve.key()}else{token.owner};
   let expected=anchor_spl::associated_token::get_associated_token_address_with_program_id(&authority,&USDC,&a.quote_token_program.key());
   require_keys_eq!(info.key(),expected,anchor_lang::error::ErrorCode::ConstraintSeeds);
  }
 }
 Ok(Some(mint.decimals))
}

fn net_quote(spend:u64,pb:u64,cb:u64)->Result<u64>{let total=add(pb,cb)?;let mut quote=narrow(spend as u128*10000/(10000u128+total as u128))?;if quote>0 && add(add(quote,fee(quote,pb)?)?,fee(quote,cb)?)?>spend{quote-=1;}Ok(quote)}
#[event]
#[derive(Clone)]pub struct PostCompleteBuyEvent{pub user:Pubkey,pub mint:Pubkey,pub bonding_curve:Pubkey,pub quote_mint:Pubkey,pub timestamp:i64,pub base_out:u64,pub quote_in:u64,pub fee_basis_points:u64,pub fee:u64,pub creator_fee_basis_points:u64,pub creator_fee:u64,pub buyback_fee:u64,pub pool_base_reserves_before:u64,pub pool_quote_reserves_before:u64,pub pool_base_reserves_after:u64,pub pool_quote_reserves_after:u64}
