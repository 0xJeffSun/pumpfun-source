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
    /// CHECK: supported SOL quote is checked in handler; token quotes are unfinished.
    pub quote_mint: UncheckedAccount<'info>,
    pub base_token_program: Interface<'info, TokenInterface>,
    pub quote_token_program: Interface<'info, TokenInterface>,
    #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump)]
    pub bonding_curve: Box<Account<'info, BondingCurve>>,
    #[account(mut,associated_token::mint=base_mint,associated_token::authority=bonding_curve,associated_token::token_program=base_token_program)]
    pub associated_base_bonding_curve: InterfaceAccount<'info, TokenAccount>,
    /// CHECK: ignored for recovered SOL branch.
    #[account(mut)]
    pub associated_quote_bonding_curve: UncheckedAccount<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut,token::mint=base_mint,token::authority=user,token::token_program=base_token_program)]
    pub associated_base_user: InterfaceAccount<'info, TokenAccount>,
    /// CHECK: ignored for recovered SOL branch.
    #[account(mut)]
    pub associated_quote_user: UncheckedAccount<'info>,
    /// CHECK: cashback/reward branches remain unsupported.
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
fn selected(config:&FeeConfig,cap:u128)->Fees{
    let tiers=&config.fee_tiers;
    if cap<tiers[0].market_cap_lamports_threshold{return tiers[0].fees.clone()}
    tiers.iter().rev().find(|t|t.market_cap_lamports_threshold<=cap).unwrap_or(&tiers[0]).fees.clone()
}
pub fn sell(ctx:Context<SellV3>,amount:u64,min_sol_output:u64)->Result<()> {
    let a=&mut *ctx.accounts;
    require!(a.quote_mint.key()==WSOL || a.quote_mint.key()==Pubkey::default(),PumpError::ReconstructionBranchUnsupported);
    require!(a.bonding_curve.quote_mint==Pubkey::default() || a.bonding_curve.quote_mint==WSOL,PumpError::ReconstructionBranchUnsupported);
    require!(!a.bonding_curve.is_mayhem_mode && !a.bonding_curve.is_cashback_coin && !a.bonding_curve.is_holder_reward,PumpError::ReconstructionBranchUnsupported);
    require!(!a.bonding_curve.complete,PumpError::BondingCurveComplete);
    require!(amount>0,PumpError::SellZeroAmount);
    require!(a.associated_base_user.amount>=amount,PumpError::NotEnoughTokensToSell);
    require!(a.global.buyback_fee_recipients.contains(&a.buyback_fee_recipient.key()),PumpError::BuybackFeeRecipientNotAuthorized);
    let curve=&a.bonding_curve;
    let quote=narrow(amount as u128*curve.virtual_quote_reserves as u128/(curve.virtual_token_reserves as u128+amount as u128))?;
    let cap=curve.token_total_supply as u128*curve.virtual_quote_reserves as u128/curve.virtual_token_reserves as u128;
    let config_data=a.fee_config.try_borrow_data()?;
    require!(config_data.len()>=8 && config_data[..8]==[143, 52, 146, 187, 219, 123, 76, 155],PumpError::ReconstructionBranchUnsupported);
    let config=FeeConfig::deserialize(&mut &config_data[8..])?;
    drop(config_data);
    require!(!config.fee_tiers.is_empty(),PumpError::FeeTiersEmpty);
    let fees=selected(&config,cap);
    let creator_bps=if curve.creator==Pubkey::default(){0}else{fees.creator_fee_bps};
    let protocol_fee=fee(quote,fees.protocol_fee_bps)?;
    let creator_fee=fee(quote,creator_bps)?;
    let buyback_fee=narrow(protocol_fee as u128*a.global.buyback_basis_points as u128/10000)?;
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
    a.bonding_curve.sub_lamports(add(user_output,buyback_fee)?)?;
    a.user.add_lamports(user_output)?;
    a.buyback_fee_recipient.add_lamports(buyback_fee)?;
    let curve=&mut a.bonding_curve;
    curve.virtual_token_reserves=next_base;curve.virtual_quote_reserves=next_quote;
    curve.real_token_reserves=next_real_base;curve.real_quote_reserves=next_real_quote;
    curve.creator_fee=next_creator;curve.protocol_fees=next_protocol;
    let event=TradeEvent{
        mint:a.base_mint.key(),sol_amount:quote,token_amount:amount,is_buy:false,user:a.user.key(),timestamp:Clock::get()?.unix_timestamp,
        virtual_sol_reserves:next_quote,virtual_token_reserves:next_base,real_sol_reserves:next_real_quote,real_token_reserves:next_real_base,
        fee_recipient:Pubkey::default(),fee_basis_points:fees.protocol_fee_bps,fee:protocol_fee,creator:curve.creator,creator_fee_basis_points:fees.creator_fee_bps,creator_fee,
        track_volume:false,total_unclaimed_tokens:0,total_claimed_tokens:0,current_sol_volume:0,last_update_timestamp:0,ix_name:"sell".into(),mayhem_mode:false,
        cashback_fee_basis_points:0,cashback:0,buyback_fee_basis_points:a.global.buyback_basis_points,buyback_fee,shareholders:vec![],quote_mint:curve.quote_mint,
        quote_amount:quote,virtual_quote_reserves:next_quote,real_quote_reserves:next_real_quote,holder_rewards_bps:0,holder_rewards:0,creator_fee_unclaimed:next_creator,
        unparsed_trailing_field:0,
    };
    emit!(event.clone());
    emit_cpi!(event);
    Ok(())
}
