//! Bounded Pump curve routes reached by PumpSwap CPI.
use anchor_lang::prelude::*;
use anchor_lang::solana_program::{instruction::{AccountMeta, Instruction}, program::invoke_signed};
use anchor_spl::{token::{self, SyncNative, Token}, token_2022::Token2022,
    token_interface::{self, TransferChecked}};

use crate::{Global, PumpError};
use crate::trade::PostCompleteBuyEvent;
use crate::trade_types::{BondingCurve, CompleteEvent, FeeConfig, FeeTier, Fees, TradeEvent};

const FEE_PROGRAM: Pubkey = anchor_lang::solana_program::pubkey!("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ");
const AMM_PROGRAM: Pubkey = anchor_lang::solana_program::pubkey!("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA");
const WSOL: Pubkey = anchor_lang::solana_program::pubkey!("So11111111111111111111111111111111111111112");
const EVENT_CPI_DISCRIMINATOR: [u8; 8] = [228, 69, 165, 46, 81, 203, 154, 29];

use crate::multi_hop_curve::{MultiHopCurve, CurveRunResult};

fn narrow(value: u128) -> Result<u64> {
    u64::try_from(value).map_err(|_| error!(PumpError::Truncation))
}

fn add(a: u64, b: u64) -> Result<u64> {
    a.checked_add(b).ok_or_else(|| error!(PumpError::Overflow))
}

fn sub(a: u64, b: u64) -> Result<u64> {
    a.checked_sub(b).ok_or_else(|| error!(PumpError::Overflow))
}

fn fee(amount: u64, basis_points: u64) -> Result<u64> {
    narrow((amount as u128 * basis_points as u128 + 9_999) / 10_000)
}

fn read_fees(data: &[u8]) -> Result<FeeConfig> {
    use anchor_lang::error::ErrorCode;
    if data.len() < 8 { return Err(error!(ErrorCode::AccountDiscriminatorNotFound)); }
    if data[..8] != [143, 52, 146, 187, 219, 123, 76, 155] {
        return Err(error!(ErrorCode::AccountDiscriminatorMismatch));
    }
    let mut input = &data[8..];
    let decode = (|| -> std::io::Result<FeeConfig> {
        let bump = u8::deserialize(&mut input)?;
        let admin = Pubkey::deserialize(&mut input)?;
        let flat_fees = Fees::deserialize(&mut input)?;
        let fee_tiers = Vec::<FeeTier>::deserialize(&mut input)?;
        let stable_fee_tiers = if data.len() >= 4_073 {
            Vec::<FeeTier>::deserialize(&mut input)?
        } else { vec![] };
        let exotic_flat_fees = if data.len() >= 4_097 {
            Fees::deserialize(&mut input)?
        } else { Fees { lp_fee_bps: 0, protocol_fee_bps: 0, creator_fee_bps: 0 } };
        Ok(FeeConfig { bump, admin, flat_fees, fee_tiers,
                       stable_fee_tiers, exotic_flat_fees })
    })().map_err(|_| error!(ErrorCode::AccountDidNotDeserialize))?;
    require!(data.len() >= 2_512, PumpError::FeeConfigTooShort);
    Ok(decode)
}

fn selected_fees(config: &FeeConfig, cap: u128, native_quote: bool) -> Result<Fees> {
    if !native_quote { return Ok(config.exotic_flat_fees.clone()); }
    require!(!config.fee_tiers.is_empty(), PumpError::FeeTiersEmpty);
    Ok(config.fee_tiers.iter().rev()
        .find(|tier| tier.market_cap_lamports_threshold <= cap)
        .unwrap_or(&config.fee_tiers[0]).fees.clone())
}

fn token_mint(info: &AccountInfo) -> Result<Pubkey> {
    let data = info.try_borrow_data()?;
    require!(data.len() >= 72, PumpError::AccountTypeNotSupported);
    Ok(Pubkey::new_from_array(data[..32].try_into().unwrap()))
}

fn mint_decimals(info: &AccountInfo) -> Result<u8> {
    let data = info.try_borrow_data()?;
    require!(data.len() >= 45, PumpError::AccountTypeNotSupported);
    Ok(data[44])
}

fn token_amount(info: &AccountInfo) -> Result<u64> {
    let data = info.try_borrow_data()?;
    require!(data.len() >= 72, PumpError::AccountTypeNotSupported);
    Ok(u64::from_le_bytes(data[64..72].try_into().unwrap()))
}

fn net_quote(spend: u64, protocol_bps: u64, creator_bps: u64) -> Result<u64> {
    let total_bps = add(protocol_bps, creator_bps)?;
    let mut quote = narrow(spend as u128 * 10_000 / (10_000u128 + total_bps as u128))?;
    if quote > 0 && add(add(quote, fee(quote, protocol_bps)?)?,
                        fee(quote, creator_bps)?)? > spend {
        quote = sub(quote, 1)?;
    }
    Ok(quote)
}

struct PostCompleteTrade {
    base_out: u64,
    quote_in: u64,
    protocol_fee: u64,
    creator_fee: u64,
    buyback_fee: u64,
    pool_base_before: u64,
    pool_quote_before: u64,
}

fn emit_buyback_touch<'info>(ctx: &Context<'_, '_, '_, 'info, MultiHopCurve<'info>>,
                             curve: &AccountInfo<'info>) -> Result<()> {
    let event_authority = &ctx.accounts.event_authority;
    let program = &ctx.accounts.program;
    let bump = [ctx.bumps.event_authority];
    let ix = Instruction { program_id: crate::ID,
        accounts: vec![AccountMeta::new_readonly(event_authority.key(), true),
                       AccountMeta::new(curve.key(), false),
                       AccountMeta::new(ctx.accounts.buyback_fee_recipient.key(), false)],
        data: EVENT_CPI_DISCRIMINATOR.to_vec() };
    invoke_signed(&ix,
        &[event_authority.to_account_info(), curve.clone(),
          ctx.accounts.buyback_fee_recipient.to_account_info(), program.to_account_info()],
        &[&[b"__event_authority", &bump]])?;
    Ok(())
}

struct CurveStage<'info> {
    base_mint: AccountInfo<'info>,
    quote_mint: AccountInfo<'info>,
    curve_info: AccountInfo<'info>,
    base_vault: AccountInfo<'info>,
    quote_vault: AccountInfo<'info>,
    curve: BondingCurve,
    native_quote: bool,
}

struct StageTrade {
    quote: u64,
    base: u64,
    protocol_fee: u64,
    creator_fee: u64,
    buyback_fee: u64,
    amount_out: u64,
    protocol_bps: u64,
    creator_bps: u64,
}

fn load_stage<'info>(group: &[AccountInfo<'info>]) -> Result<CurveStage<'info>> {
    let base_mint = group[0].clone();
    let quote_mint = group[1].clone();
    let curve_info = group[2].clone();
    let base_vault = group[3].clone();
    let quote_vault = group[4].clone();
    require!(curve_info.owner == &crate::ID,
             anchor_lang::error::ErrorCode::AccountOwnedByWrongProgram);
    let data = curve_info.try_borrow_data()?;
    let mut raw = data.to_vec();
    let old_layout = raw.len() == 165;
    if old_layout { raw.push(0); }
    let mut curve = BondingCurve::try_deserialize(&mut &raw[..])?;
    if old_layout { curve.initial_virtual_quote_reserves = 0; }
    drop(data);
    let expected = Pubkey::find_program_address(
        &[b"bonding-curve", base_mint.key().as_ref()], &crate::ID).0;
    require_keys_eq!(curve_info.key(), expected,
                     anchor_lang::error::ErrorCode::ConstraintSeeds);
    let native_quote = curve.quote_mint == Pubkey::default();
    require_keys_eq!(quote_mint.key(),
                     if native_quote { WSOL } else { curve.quote_mint },
                     PumpError::UnsupportedQuoteMint);
    if !native_quote {
        require!(quote_mint.owner == &anchor_spl::token::ID ||
                 quote_mint.owner == &anchor_spl::token_2022::ID,
                 PumpError::InvalidQuoteTokenProgram);
        let expected = anchor_spl::associated_token::get_associated_token_address_with_program_id(
            &curve_info.key(), &quote_mint.key(), quote_mint.owner);
        require_keys_eq!(quote_vault.key(), expected,
                         anchor_lang::error::ErrorCode::ConstraintSeeds);
    }
    require!(!curve.is_mayhem_mode, PumpError::MultiHopMayhemCurveNotSupported);
    require!(!curve.complete, PumpError::BondingCurveComplete);
    Ok(CurveStage { base_mint, quote_mint, curve_info, base_vault, quote_vault,
                    curve, native_quote })
}

fn calculate_stage(stage: &mut CurveStage<'_>, amount: u64, buy: bool, flag: u8,
                   config: &FeeConfig, buyback_bps: u64) -> Result<StageTrade> {
    require!(amount > 0, PumpError::SellZeroAmount);
    let curve = &mut stage.curve;
    let cap = curve.token_total_supply as u128 * curve.virtual_quote_reserves as u128
        / curve.virtual_token_reserves as u128;
    let mut rates = selected_fees(config, cap, stage.native_quote)?;
    if curve.creator_fee_bps > 0 { rates.creator_fee_bps = curve.creator_fee_bps; }
    if flag == 1 { rates.creator_fee_bps = 0; }
    if flag == 2 { rates.protocol_fee_bps = 0; }
    let creator_bps = if curve.creator == Pubkey::default() { 0 }
                      else { rates.creator_fee_bps };
    let (quote, base, protocol_fee, creator_fee, amount_out) = if buy {
        let total_bps = add(rates.protocol_fee_bps, creator_bps)?;
        let mut q = narrow(amount as u128 * 10_000 / (10_000u128 + total_bps as u128))?;
        require_gt!(q, 0, PumpError::BuyNotEnoughSolToCoverFees);
        if add(add(q, fee(q, rates.protocol_fee_bps)?)?, fee(q, creator_bps)?)? > amount {
            q = sub(q, 1)?;
        }
        require_gt!(q, 0, PumpError::BuySlippageBelowMinTokensOut);
        let effective = q - 1;
        let out = narrow(curve.virtual_token_reserves as u128 * effective as u128
            / (curve.virtual_quote_reserves as u128 + effective as u128))?;
        require_gt!(out, 0, PumpError::BuyZeroAmount);
        require!(out <= curve.real_token_reserves, PumpError::NotEnoughTokensToBuy);
        (q, out, fee(q, rates.protocol_fee_bps)?, fee(q, creator_bps)?, out)
    } else {
        let q = narrow(amount as u128 * curve.virtual_quote_reserves as u128
            / (curve.virtual_token_reserves as u128 + amount as u128))?;
        require_gt!(q, 0, PumpError::SellZeroAmount);
        let pf = fee(q, rates.protocol_fee_bps)?;
        let cf = fee(q, creator_bps)?;
        let out = sub(sub(q, pf)?, cf)?;
        require_gt!(out, 0, PumpError::SellZeroAmount);
        (q, amount, pf, cf, out)
    };
    let buyback_fee = narrow(protocol_fee as u128 * buyback_bps as u128 / 10_000)?;
    curve.virtual_token_reserves = if buy { sub(curve.virtual_token_reserves, base)? }
                                   else { add(curve.virtual_token_reserves, base)? };
    curve.virtual_quote_reserves = if buy { add(curve.virtual_quote_reserves, quote)? }
                                   else { sub(curve.virtual_quote_reserves, quote)? };
    curve.real_token_reserves = if buy { sub(curve.real_token_reserves, base)? }
                                else { add(curve.real_token_reserves, base)? };
    curve.real_quote_reserves = if buy { add(curve.real_quote_reserves, quote)? }
                                else { sub(curve.real_quote_reserves, quote)? };
    curve.creator_fee = add(curve.creator_fee, creator_fee)?;
    curve.protocol_fees = add(curve.protocol_fees, sub(protocol_fee, buyback_fee)?)?;
    Ok(StageTrade { quote, base, protocol_fee, creator_fee, buyback_fee, amount_out,
                    protocol_bps: rates.protocol_fee_bps, creator_bps: rates.creator_fee_bps })
}

fn save_stage(stage: &CurveStage<'_>) -> Result<()> {
    if stage.curve_info.data_len() < 166 { stage.curve_info.realloc(166, false)?; }
    let mut data = stage.curve_info.try_borrow_mut_data()?;
    stage.curve.try_serialize(&mut &mut data[..])?;
    Ok(())
}

fn stage_event(stage: &CurveStage<'_>, trade: &StageTrade, buy: bool,
               user: Pubkey, timestamp: i64, buyback_bps: u64) -> TradeEvent {
    let curve = &stage.curve;
    TradeEvent {
        mint: stage.base_mint.key(),
        sol_amount: if stage.native_quote { trade.quote } else { 0 },
        token_amount: trade.base, is_buy: buy, user, timestamp,
        virtual_sol_reserves: if stage.native_quote { curve.virtual_quote_reserves } else { 0 },
        virtual_token_reserves: curve.virtual_token_reserves,
        real_sol_reserves: if stage.native_quote { curve.real_quote_reserves } else { 0 },
        real_token_reserves: curve.real_token_reserves,
        fee_recipient: Pubkey::default(), fee_basis_points: trade.protocol_bps,
        fee: trade.protocol_fee, creator: curve.creator,
        creator_fee_basis_points: trade.creator_bps, creator_fee: trade.creator_fee,
        track_volume: false, total_unclaimed_tokens: 0, total_claimed_tokens: 0,
        current_sol_volume: 0, last_update_timestamp: 0,
        ix_name: "multi_hop_swap".into(), mayhem_mode: curve.is_mayhem_mode,
        cashback_fee_basis_points: 0, cashback: 0,
        buyback_fee_basis_points: buyback_bps, buyback_fee: trade.buyback_fee,
        shareholders: vec![], quote_mint: curve.quote_mint, quote_amount: trade.quote,
        virtual_quote_reserves: curve.virtual_quote_reserves,
        real_quote_reserves: curve.real_quote_reserves, holder_rewards_bps: 0,
        holder_rewards: 0, creator_fee_unclaimed: curve.creator_fee,
        unparsed_trailing_field: 0,
    }
}

fn execute_two_curve<'info>(
    ctx: Context<'_, '_, '_, 'info, MultiHopCurve<'info>>,
    amount_in: u64,
    hop_fees: Vec<u8>,
) -> Result<CurveRunResult> {
    require!(hop_fees.len() == 2, PumpError::MultiHopHopFeesMismatch);
    let mut first = load_stage(&ctx.remaining_accounts[..5])?;
    let source_mint = token_mint(&ctx.accounts.source.to_account_info())?;
    let buy = source_mint == WSOL;
    if buy {
        require!(hop_fees == [1, 2], PumpError::MultiHopHopFeesMismatch);
        require!(first.native_quote, PumpError::MultiHopDiscontinuousPath);
    } else {
        require!(hop_fees == [2, 1], PumpError::MultiHopHopFeesMismatch);
        require_keys_eq!(source_mint, first.base_mint.key(),
                         PumpError::MultiHopDiscontinuousPath);
        require!(!first.native_quote, PumpError::MultiHopDiscontinuousPath);
    }
    let fee_info = ctx.accounts.fee_config.to_account_info();
    let fee_data = fee_info.try_borrow_data()?;
    let config = read_fees(&fee_data)?;
    drop(fee_data);
    let buyback_bps = ctx.accounts.global.buyback_basis_points;
    let timestamp = Clock::get()?.unix_timestamp;
    let user = ctx.accounts.user.key();
    if buy {
        let first_trade = calculate_stage(&mut first, amount_in, true, 1,
                                          &config, buyback_bps)?;
        anchor_lang::system_program::transfer(CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: ctx.accounts.user.to_account_info(), to: first.curve_info.clone(),
            }), amount_in)?;
        save_stage(&first)?;
        if first_trade.buyback_fee > 0 {
            first.curve_info.sub_lamports(first_trade.buyback_fee)?;
            ctx.accounts.buyback_fee_recipient.add_lamports(first_trade.buyback_fee)?;
            emit_buyback_touch(&ctx, &first.curve_info)?;
            token::sync_native(CpiContext::new(ctx.accounts.token_program.to_account_info(),
                SyncNative { account: ctx.accounts.buyback_fee_recipient.to_account_info() }))?;
        }
        let first_event = stage_event(&first, &first_trade, true, user, timestamp, buyback_bps);
        emit!(first_event.clone());
        emit_cpi!(first_event);
        let mut second = load_stage(&ctx.remaining_accounts[5..10])?;
        require!(!second.native_quote, PumpError::MultiHopDiscontinuousPath);
        require_keys_eq!(second.curve.quote_mint, first.base_mint.key(),
                         PumpError::MultiHopDiscontinuousPath);
        require_keys_eq!(token_mint(&ctx.accounts.destination.to_account_info())?,
                         second.base_mint.key(), PumpError::MintDoesNotMatchBondingCurve);
        let first_key = first.base_mint.key();
        let first_bump = [Pubkey::find_program_address(
            &[b"bonding-curve", first_key.as_ref()], &crate::ID).1];
        let first_seeds: &[&[u8]] = &[b"bonding-curve", first_key.as_ref(), &first_bump];
        token_interface::transfer_checked(CpiContext::new_with_signer(
            ctx.accounts.token_2022_program.to_account_info(), TransferChecked {
                from: first.base_vault.clone(), mint: first.base_mint.clone(),
                to: second.quote_vault.clone(), authority: first.curve_info.clone(),
            }, &[first_seeds]), first_trade.amount_out, mint_decimals(&first.base_mint)?)?;
        let second_trade = calculate_stage(&mut second, first_trade.amount_out, true, 2,
                                           &config, buyback_bps)?;
        save_stage(&second)?;
        let second_key = second.base_mint.key();
        let second_bump = [Pubkey::find_program_address(
            &[b"bonding-curve", second_key.as_ref()], &crate::ID).1];
        let second_seeds: &[&[u8]] = &[b"bonding-curve", second_key.as_ref(), &second_bump];
        token_interface::transfer_checked(CpiContext::new_with_signer(
            ctx.accounts.token_2022_program.to_account_info(), TransferChecked {
                from: second.base_vault.clone(), mint: second.base_mint.clone(),
                to: ctx.accounts.destination.to_account_info(), authority: second.curve_info.clone(),
            }, &[second_seeds]), second_trade.amount_out, mint_decimals(&second.base_mint)?)?;
        let second_event = stage_event(&second, &second_trade, true, user, timestamp, buyback_bps);
        emit!(second_event.clone());
        emit_cpi!(second_event);
        Ok(CurveRunResult { amount_out: second_trade.amount_out,
                            buyback_fee: add(first_trade.buyback_fee, second_trade.buyback_fee)? })
    } else {
        let first_trade = calculate_stage(&mut first, amount_in, false, 2,
                                          &config, buyback_bps)?;
        token_interface::transfer_checked(CpiContext::new(
            ctx.accounts.token_2022_program.to_account_info(), TransferChecked {
                from: ctx.accounts.source.to_account_info(), mint: first.base_mint.clone(),
                to: first.base_vault.clone(),
                authority: ctx.accounts.source_authority.to_account_info(),
            }), first_trade.base, mint_decimals(&first.base_mint)?)?;
        save_stage(&first)?;
        let first_event = stage_event(&first, &first_trade, false, user, timestamp, buyback_bps);
        emit!(first_event.clone());
        emit_cpi!(first_event);
        let mut second = load_stage(&ctx.remaining_accounts[5..10])?;
        require!(second.native_quote, PumpError::MultiHopDiscontinuousPath);
        require_keys_eq!(first.curve.quote_mint, second.base_mint.key(),
                         PumpError::MultiHopDiscontinuousPath);
        require_keys_eq!(token_mint(&ctx.accounts.destination.to_account_info())?,
                         WSOL, PumpError::MintDoesNotMatchBondingCurve);
        let second_trade = calculate_stage(&mut second, first_trade.amount_out, false, 1,
                                           &config, buyback_bps)?;
        let first_key = first.base_mint.key();
        let first_bump = [Pubkey::find_program_address(
            &[b"bonding-curve", first_key.as_ref()], &crate::ID).1];
        let first_seeds: &[&[u8]] = &[b"bonding-curve", first_key.as_ref(), &first_bump];
        token_interface::transfer_checked(CpiContext::new_with_signer(
            ctx.accounts.token_2022_program.to_account_info(), TransferChecked {
                from: first.quote_vault.clone(), mint: first.quote_mint.clone(),
                to: second.base_vault.clone(), authority: first.curve_info.clone(),
            }, &[first_seeds]), first_trade.amount_out, mint_decimals(&first.quote_mint)?)?;
        save_stage(&second)?;
        if second_trade.buyback_fee > 0 {
            second.curve_info.sub_lamports(second_trade.buyback_fee)?;
            ctx.accounts.buyback_fee_recipient.add_lamports(second_trade.buyback_fee)?;
            emit_buyback_touch(&ctx, &second.curve_info)?;
            token::sync_native(CpiContext::new(ctx.accounts.token_program.to_account_info(),
                SyncNative { account: ctx.accounts.buyback_fee_recipient.to_account_info() }))?;
        }
        second.curve_info.sub_lamports(second_trade.amount_out)?;
        ctx.accounts.user.add_lamports(second_trade.amount_out)?;
        let second_event = stage_event(&second, &second_trade, false, user, timestamp, buyback_bps);
        emit!(second_event.clone());
        emit_cpi!(second_event);
        Ok(CurveRunResult { amount_out: second_trade.amount_out,
                            buyback_fee: add(first_trade.buyback_fee, second_trade.buyback_fee)? })
    }
}

pub fn execute<'info>(
    ctx: Context<'_, '_, '_, 'info, MultiHopCurve<'info>>,
    amount_in: u64,
    hop_fees: Vec<u8>,
) -> Result<CurveRunResult> {
    if ctx.remaining_accounts.len() == 10 {
        return execute_two_curve(ctx, amount_in, hop_fees);
    }
    require!(ctx.remaining_accounts.len() == 5, PumpError::NotEnoughRemainingAccounts);
    require!(hop_fees.len() == 1, PumpError::MultiHopHopFeesMismatch);
    let base_mint = &ctx.remaining_accounts[0];
    let quote_mint = &ctx.remaining_accounts[1];
    let curve_info = &ctx.remaining_accounts[2];
    let base_vault = &ctx.remaining_accounts[3];
    let quote_vault = &ctx.remaining_accounts[4];
    require!(curve_info.owner == &crate::ID, anchor_lang::error::ErrorCode::AccountOwnedByWrongProgram);
    let raw = curve_info.try_borrow_data()?;
    let mut curve_bytes = raw.to_vec();
    let old_curve_layout = curve_bytes.len() == 165;
    if old_curve_layout { curve_bytes.push(0); }
    let mut curve = BondingCurve::try_deserialize(&mut &curve_bytes[..])?;
    if old_curve_layout { curve.initial_virtual_quote_reserves = 0; }
    drop(raw);
    let expected = Pubkey::find_program_address(&[b"bonding-curve", base_mint.key().as_ref()], &crate::ID).0;
    require_keys_eq!(curve_info.key(), expected, anchor_lang::error::ErrorCode::ConstraintSeeds);
    let native_quote = curve.quote_mint == Pubkey::default();
    let expected_quote_mint = if native_quote { WSOL } else { curve.quote_mint };
    require_keys_eq!(quote_mint.key(), expected_quote_mint, PumpError::UnsupportedQuoteMint);
    require!((native_quote && matches!(hop_fees[0], 1 | 3)) ||
             (!native_quote && hop_fees[0] == 2), PumpError::MultiHopHopFeesMismatch);
    let quote_program = if quote_mint.owner == &ctx.accounts.token_program.key() {
        ctx.accounts.token_program.to_account_info()
    } else {
        require_keys_eq!(*quote_mint.owner, ctx.accounts.token_2022_program.key(),
                         PumpError::InvalidQuoteTokenProgram);
        ctx.accounts.token_2022_program.to_account_info()
    };
    if !native_quote {
        let expected_vault = anchor_spl::associated_token::get_associated_token_address_with_program_id(
            &curve_info.key(), &quote_mint.key(), &quote_program.key());
        require_keys_eq!(quote_vault.key(), expected_vault,
                         anchor_lang::error::ErrorCode::ConstraintSeeds);
    }
    require!(!curve.is_mayhem_mode, PumpError::MultiHopMayhemCurveNotSupported);
    require!(!curve.complete, PumpError::BondingCurveComplete);
    require!(amount_in > 0, PumpError::SellZeroAmount);
    let source_mint = token_mint(&ctx.accounts.source.to_account_info())?;
    let buy = if source_mint == expected_quote_mint { true }
              else if source_mint == base_mint.key() { false }
              else { return Err(error!(PumpError::MultiHopDiscontinuousPath)); };
    let expected_destination = if buy { base_mint.key() } else { expected_quote_mint };
    require_keys_eq!(token_mint(&ctx.accounts.destination.to_account_info())?,
                     expected_destination, PumpError::MintDoesNotMatchBondingCurve);
    let cap = curve.token_total_supply as u128 * curve.virtual_quote_reserves as u128
        / curve.virtual_token_reserves as u128;
    let fee_info = ctx.accounts.fee_config.to_account_info();
    let fee_data = fee_info.try_borrow_data()?;
    let config = read_fees(&fee_data)?;
    drop(fee_data);
    let mut rates = selected_fees(&config, cap, native_quote)?;
    if curve.creator_fee_bps > 0 { rates.creator_fee_bps = curve.creator_fee_bps; }
    if hop_fees[0] == 1 { rates.creator_fee_bps = 0; }
    if hop_fees[0] == 2 { rates.protocol_fee_bps = 0; }
    let creator_bps = if curve.creator == Pubkey::default() { 0 }
                      else { rates.creator_fee_bps };
    let (quote, base_amount, protocol_fee, creator_fee, amount_out, post_complete) = if buy {
        let total_bps = add(rates.protocol_fee_bps, creator_bps)?;
        let mut q = narrow(amount_in as u128 * 10_000 / (10_000u128 + total_bps as u128))?;
        require_gt!(q, 0, PumpError::BuyNotEnoughSolToCoverFees);
        if add(add(q, fee(q, rates.protocol_fee_bps)?)?, fee(q, creator_bps)?)? > amount_in {
            q = sub(q, 1)?;
        }
        require_gt!(q, 0, PumpError::BuySlippageBelowMinTokensOut);
        let effective = q - 1;
        let out = narrow(curve.virtual_token_reserves as u128 * effective as u128
            / (curve.virtual_quote_reserves as u128 + effective as u128))?;
        require_gt!(out, 0, PumpError::BuyZeroAmount);
        if !native_quote && out > curve.real_token_reserves {
            let base = curve.real_token_reserves;
            let denominator = (curve.virtual_token_reserves as u128)
                .checked_sub(base as u128).ok_or_else(|| error!(PumpError::Overflow))?;
            let completion_quote = narrow(base as u128 * curve.virtual_quote_reserves as u128
                / denominator + 1)?;
            let pf = fee(completion_quote, rates.protocol_fee_bps)?;
            let cf = fee(completion_quote, creator_bps)?;
            let remaining = sub(amount_in, add(add(completion_quote, pf)?, cf)?)?;
            let post_quote = net_quote(remaining, rates.protocol_fee_bps, creator_bps)?;
            let post_fee_quote = narrow(remaining as u128 * 10_000
                / (10_000u128 + total_bps as u128))?;
            let post_pf = fee(post_fee_quote, rates.protocol_fee_bps)?;
            let post_cf = fee(post_fee_quote, creator_bps)?;
            let post_buyback = narrow(post_pf as u128
                * ctx.accounts.global.buyback_basis_points as u128 / 10_000)?;
            let pool_base_before = sub(token_amount(base_vault)?, base)?;
            let pool_quote_before = add(add(curve.real_quote_reserves, completion_quote)?,
                                        curve.post_complete_quote_in)?;
            let post_base = if post_quote > 0 {
                let effective = post_quote - 1;
                narrow(pool_base_before as u128 * effective as u128
                    / (pool_quote_before as u128 + effective as u128))?
            } else { 0 };
            let post = PostCompleteTrade {
                base_out: post_base, quote_in: post_quote,
                protocol_fee: post_pf, creator_fee: post_cf,
                buyback_fee: post_buyback,
                pool_base_before, pool_quote_before,
            };
            (completion_quote, base, pf, cf, add(base, post_base)?, Some(post))
        } else {
            (q, out, fee(q, rates.protocol_fee_bps)?, fee(q, creator_bps)?, out, None)
        }
    } else {
        let q = narrow(amount_in as u128 * curve.virtual_quote_reserves as u128
            / (curve.virtual_token_reserves as u128 + amount_in as u128))?;
        require_gt!(q, 0, PumpError::SellZeroAmount);
        let pf = fee(q, rates.protocol_fee_bps)?;
        let cf = fee(q, creator_bps)?;
        (q, amount_in, pf, cf, sub(sub(q, pf)?, cf)?, None)
    };
    if !buy { require_gt!(amount_out, 0, PumpError::SellZeroAmount); }
    let buyback_fee = narrow(protocol_fee as u128 * ctx.accounts.global.buyback_basis_points as u128 / 10_000)?;
    let retained_protocol_fee = sub(protocol_fee, buyback_fee)?;

    if buy {
        if native_quote {
            anchor_lang::system_program::transfer(CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.user.to_account_info(), to: curve_info.clone(),
                }), amount_in)?;
        } else {
            token_interface::transfer_checked(CpiContext::new(
                quote_program.clone(), TransferChecked {
                    from: ctx.accounts.source.to_account_info(), mint: quote_mint.clone(),
                    to: quote_vault.clone(), authority: ctx.accounts.source_authority.to_account_info(),
                }), amount_in, mint_decimals(quote_mint)?)?;
        }
        require!(base_amount <= curve.real_token_reserves, PumpError::NotEnoughTokensToBuy);
    } else {
        token_interface::transfer_checked(CpiContext::new(
            ctx.accounts.token_2022_program.to_account_info(), TransferChecked {
                from: ctx.accounts.source.to_account_info(), mint: base_mint.clone(),
                to: base_vault.clone(), authority: ctx.accounts.source_authority.to_account_info(),
            }), base_amount, mint_decimals(base_mint)?)?;
    }

    let next_virtual_base = if buy { sub(curve.virtual_token_reserves, base_amount)? }
                            else { add(curve.virtual_token_reserves, base_amount)? };
    let next_virtual_quote = if buy { add(curve.virtual_quote_reserves, quote)? }
                             else { sub(curve.virtual_quote_reserves, quote)? };
    let next_real_base = if buy { sub(curve.real_token_reserves, base_amount)? }
                         else { add(curve.real_token_reserves, base_amount)? };
    let next_real_quote = if buy { add(curve.real_quote_reserves, quote)? }
                          else { sub(curve.real_quote_reserves, quote)? };
    let next_creator_fee = add(add(curve.creator_fee, creator_fee)?,
                               post_complete.as_ref().map_or(0, |post| post.creator_fee))?;
    let next_protocol_fee = add(add(curve.protocol_fees, retained_protocol_fee)?,
                                match post_complete.as_ref() {
                                    Some(post) => sub(post.protocol_fee, post.buyback_fee)?,
                                    None => 0,
                                })?;

    if buy {
        let mint_key = base_mint.key();
        let bump = [Pubkey::find_program_address(&[b"bonding-curve", mint_key.as_ref()], &crate::ID).1];
        let seeds: &[&[u8]] = &[b"bonding-curve", mint_key.as_ref(), &bump];
        token_interface::transfer_checked(CpiContext::new_with_signer(
            ctx.accounts.token_2022_program.to_account_info(), TransferChecked {
                from: base_vault.clone(), mint: base_mint.clone(),
                to: ctx.accounts.destination.to_account_info(), authority: curve_info.clone(),
            }, &[seeds]), amount_out, mint_decimals(base_mint)?)?;
        if buyback_fee > 0 {
            curve_info.sub_lamports(buyback_fee)?;
            ctx.accounts.buyback_fee_recipient.add_lamports(buyback_fee)?;
            emit_buyback_touch(&ctx, curve_info)?;
            token::sync_native(CpiContext::new(ctx.accounts.token_program.to_account_info(),
                SyncNative { account: ctx.accounts.buyback_fee_recipient.to_account_info() }))?;
        }
    } else {
        if buyback_fee > 0 {
            curve_info.sub_lamports(buyback_fee)?;
            ctx.accounts.buyback_fee_recipient.add_lamports(buyback_fee)?;
            emit_buyback_touch(&ctx, curve_info)?;
            token::sync_native(CpiContext::new(ctx.accounts.token_program.to_account_info(),
                SyncNative { account: ctx.accounts.buyback_fee_recipient.to_account_info() }))?;
        }
        if native_quote {
            curve_info.sub_lamports(amount_out)?;
            ctx.accounts.user.add_lamports(amount_out)?;
        } else {
            let mint_key = base_mint.key();
            let bump = [Pubkey::find_program_address(&[b"bonding-curve", mint_key.as_ref()], &crate::ID).1];
            let seeds: &[&[u8]] = &[b"bonding-curve", mint_key.as_ref(), &bump];
            token_interface::transfer_checked(CpiContext::new_with_signer(
                quote_program.clone(), TransferChecked {
                    from: quote_vault.clone(), mint: quote_mint.clone(),
                    to: ctx.accounts.destination.to_account_info(), authority: curve_info.clone(),
                }, &[seeds]), amount_out, mint_decimals(quote_mint)?)?;
        }
    }
    curve.virtual_token_reserves = next_virtual_base;
    curve.virtual_quote_reserves = next_virtual_quote;
    curve.real_token_reserves = next_real_base;
    curve.real_quote_reserves = next_real_quote;
    curve.creator_fee = next_creator_fee;
    curve.protocol_fees = next_protocol_fee;
    if next_real_base == 0 && buy { curve.complete = true; }
    if let Some(post) = post_complete.as_ref() {
        curve.post_complete_base_out = add(curve.post_complete_base_out, post.base_out)?;
        curve.post_complete_quote_in = add(curve.post_complete_quote_in, post.quote_in)?;
    }
    {
        if curve_info.data_len() < 166 { curve_info.realloc(166, false)?; }
        let mut raw = curve_info.try_borrow_mut_data()?;
        curve.try_serialize(&mut &mut raw[..])?;
    }
    let event = TradeEvent {
        mint: base_mint.key(), sol_amount: if native_quote { quote } else { 0 }, token_amount: base_amount,
        is_buy: buy, user: ctx.accounts.user.key(), timestamp: Clock::get()?.unix_timestamp,
        virtual_sol_reserves: if native_quote { next_virtual_quote } else { 0 },
        virtual_token_reserves: next_virtual_base,
        real_sol_reserves: if native_quote { next_real_quote } else { 0 },
        real_token_reserves: next_real_base,
        fee_recipient: Pubkey::default(), fee_basis_points: rates.protocol_fee_bps,
        fee: protocol_fee, creator: curve.creator,
        creator_fee_basis_points: rates.creator_fee_bps, creator_fee,
        track_volume: false, total_unclaimed_tokens: 0, total_claimed_tokens: 0,
        current_sol_volume: 0, last_update_timestamp: 0,
        ix_name: "multi_hop_swap".into(), mayhem_mode: curve.is_mayhem_mode,
        cashback_fee_basis_points: 0, cashback: 0,
        buyback_fee_basis_points: ctx.accounts.global.buyback_basis_points,
        buyback_fee, shareholders: vec![], quote_mint: curve.quote_mint,
        quote_amount: quote, virtual_quote_reserves: next_virtual_quote,
        real_quote_reserves: next_real_quote, holder_rewards_bps: 0,
        holder_rewards: 0, creator_fee_unclaimed: next_creator_fee,
        unparsed_trailing_field: 0,
    };
    emit!(event.clone());
    emit_cpi!(event);
    if next_real_base == 0 && buy {
        let completion = CompleteEvent {
            user: ctx.accounts.user.key(), mint: base_mint.key(),
            bonding_curve: curve_info.key(), timestamp: Clock::get()?.unix_timestamp,
            quote_mint: curve.quote_mint,
        };
        emit!(completion.clone());
        emit_cpi!(completion);
    }
    if let Some(post) = post_complete.as_ref() {
        if post.quote_in > 0 {
            let post_event = PostCompleteBuyEvent {
                user: ctx.accounts.user.key(), mint: base_mint.key(),
                bonding_curve: curve_info.key(), quote_mint: curve.quote_mint,
                timestamp: Clock::get()?.unix_timestamp,
                base_out: post.base_out, quote_in: post.quote_in,
                fee_basis_points: rates.protocol_fee_bps, fee: post.protocol_fee,
                creator_fee_basis_points: rates.creator_fee_bps,
                creator_fee: post.creator_fee, buyback_fee: post.buyback_fee,
                pool_base_reserves_before: post.pool_base_before,
                pool_quote_reserves_before: post.pool_quote_before,
                pool_base_reserves_after: sub(post.pool_base_before, post.base_out)?,
                pool_quote_reserves_after: add(post.pool_quote_before, post.quote_in)?,
            };
            emit!(post_event.clone());
            emit_cpi!(post_event);
        }
    }
    Ok(CurveRunResult { amount_out,
                        buyback_fee: add(buyback_fee,
                                         post_complete.as_ref().map_or(0, |post| post.buyback_fee))? })
}
