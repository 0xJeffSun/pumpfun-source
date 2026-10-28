import sys,subprocess
L='/Users/shawwalters/amm100-run/lanes/mg-A-4'
G=L+'/gen/'
def rd(n): return open(G+n).read().rstrip('\n')
HEAD='''//! Partial reconstruction from captured AMM execution and static control flow.
//! Ordinary signed offline fixtures cover AMM legs and genuine captured Pump CPIs;
//! this is not the historical source or a claim of whole-program equivalence.
use anchor_lang::{
    accounts::{
        account::Account,
        interface_account::InterfaceAccount,
        program::Program,
        signer::Signer,
        unchecked_account::UncheckedAccount,
    },
    prelude::{
        AccountInfo, Context, CpiContext, Id, Key, Pubkey, Rent, Result,
        SolanaSysvar, System, ToAccountInfo,
    },
    AccountDeserialize, Accounts, AccountsExit,
    emit, emit_cpi, err, error, require, require_eq, require_gt, require_gte,
    require_keys_eq, require_keys_neq,
};
use anchor_spl::{
    token::Token,
    token_2022::Token2022,
    token_interface::{Mint, TokenAccount},
};
use crate::{
    instructions::swap::trade_v2::{self, BuyResult, TradeEventContext},
    state::{GlobalConfig, Pool, UserVolumeAccumulator},
    trade::{FEE_OWNER, PUMP, PumpAmmProgram, TradeFeeConfig},
    utils::transfer_fee,
    PumpAmmError,
};
use std::collections::BTreeSet;
//PAD
'''
T=HEAD+rd('part_structs.rs').split('\n',1)[0]+' //@36\n'+rd('part_structs.rs').split('\n',1)[1]+'''

fn token_amount(a: &AccountInfo) -> Result<u64> {
    let data = a.try_borrow_data()?;
    let account = TokenAccount::try_deserialize(&mut &data[..])?;
    Ok(account.amount)
}

/// Where the tokens entering the next hop currently are.
pub enum HopSource<'info> {
    /// The user's input token account.
    User,
    /// A vault of the previous AMM hop's pool (`true`: its base vault).
    Pool(Box<AmmHop<'info>>, bool),
    /// Already delivered into the next hop's vault by a curve run.
    Curve,
}
//PAD
'''+rd('part_fees.rs').split('\n',1)[0]+' //@194\n'+rd('part_fees.rs').split('\n',1)[1]+'''
//PAD
/// Classify a hop by its pool account owner: PumpSwap pools are AMM hops, //@230
/// Pump bonding curves are curve hops.
fn is_curve_hop(accounts: &[AccountInfo]) -> Result<bool> {
    let owner = accounts[2].owner;
    if *owner == crate::ID {
        Ok(false)
    } else if *owner == PUMP {
        Ok(true)
    } else {
        err!(PumpAmmError::AccountTypeNotSupported) //@239
    }
}
/// Output mint of a hop entered with `mint`.
fn next_mint(hop: &[AccountInfo], mint: Pubkey) -> Result<Pubkey> { //@243
    let base_mint = hop[0].key();
    let quote_mint = hop[1].key();
    if mint == quote_mint {
        Ok(base_mint)
    } else if mint == base_mint {
        Ok(quote_mint)
    } else {
        err!(PumpAmmError::MultiHopDiscontinuousPath) //@251
    }
}

//PAD
/// Route `amount_in` of the user's input token through every hop in
/// `remaining_accounts` and require at least `min_amount_out` of the output token.
pub fn execute<'info>(
    ctx: Context<'_, '_, 'info, 'info, MultiHop<'info>>,
    amount_in: u64,
    min_amount_out: u64,
) -> Result<()> {
    require_gt!(amount_in, 0, PumpAmmError::ZeroQuoteAmount); //@273
    require_gt!(min_amount_out, 0, PumpAmmError::ZeroBaseAmount); //@274
    let remaining = ctx.remaining_accounts;
    //PAD
    require!(!remaining.is_empty() && remaining.len() % 5 == 0, PumpAmmError::NotEnoughRemainingAccounts); //@278
    let hop_count = remaining.len() / 5;
    let mut output_mints = Vec::with_capacity(hop_count);
    let mut mint = ctx.accounts.user_in_token_account.mint;
    let mut direction = None;
    for hop in remaining.chunks_exact(5) {
        let buy = mint == hop[1].key();
        mint = next_mint(hop, mint)?;
        match direction {
            None => direction = Some(buy),
            //PAD
            Some(direction) => require!(direction == buy, PumpAmmError::MultiHopMixedDirection), //@295
        }
        output_mints.push(mint);
    }
    //PAD
    require_keys_eq!( //@300
        mint,
        ctx.accounts.user_out_token_account.mint,
        PumpAmmError::MultiHopDiscontinuousPath
    );
    //PAD
    let buy = direction.ok_or_else(|| error!(PumpAmmError::NotEnoughRemainingAccounts))?; //@307
    let mut mint = ctx.accounts.user_in_token_account.mint;
    let mut amount = amount_in;
    let mut source = HopSource::User;
    let mut i = 0;
    while i < hop_count {
        let start = i.saturating_mul(5);
        let hop = &remaining[start..start.saturating_add(5)];
        if is_curve_hop(hop)? {
            let mut end = i + 1;
            while end < hop_count
                && is_curve_hop(&remaining[end.saturating_mul(5)..end.saturating_mul(5).saturating_add(5)])?
            {
                end = end.saturating_add(1);
            }
            let hops = &remaining[start..end.saturating_mul(5)];
            let flags: Vec<u8> = (i..end)
                .map(|j| {
                    let protocol = if buy { j == 0 } else { j + 1 == hop_count };
                    let creator = if buy { j + 1 == hop_count } else { j == 0 };
                    (protocol as u8) | ((creator as u8) << 1)
                })
                .collect();
            let output_mint = output_mints[end.saturating_sub(1)];
            let destination = if end == hop_count {
                ctx.accounts.user_out_token_account.to_account_info()
            } else {
                vault_for_mint(
                    &remaining[end.saturating_mul(5)..end.saturating_mul(5).saturating_add(5)],
                    &output_mint,
                )?
            };
            amount = curve_run(&ctx, hops, flags, amount, &source, destination, buy)?;
            mint = output_mint;
            source = HopSource::Curve;
            i = end;
        } else {
            let mut accounts = hop;
            let mut hop = AmmHop::try_accounts(
                &crate::ID,
                &mut accounts,
                &[],
                &mut AmmHopBumps {},
                &mut BTreeSet::new(),
            )?;
            let last = i + 1 == hop_count;
            let gates = HopFeeGates {
                protocol: if buy { i == 0 } else { last },
                creator: if buy { last } else { i == 0 },
                lp: if buy { last } else { i == 0 },
            };
            let (output, output_is_base) =
                amm_hop(&ctx, &mut hop, &mint, amount, &source, last, min_amount_out, gates)?;
            amount = output;
            hop.exit(&crate::ID)?;
            source = HopSource::Pool(Box::new(hop), output_is_base);
            mint = output_mints[i];
            i += 1;
        }
    }
    //PAD
    require_gte!(amount, min_amount_out, PumpAmmError::ExceededSlippage); //@389
    if ctx.accounts.user_volume_accumulator.user == Pubkey::default() {
        ctx.accounts.user_volume_accumulator.user = ctx.accounts.user.key();
    }
    Ok(())
}
//PAD
'''+rd('part_programfor.rs').split('\n',1)[0]+' //@403\n'+rd('part_programfor.rs').split('\n',1)[1]+'''
#[inline(never)] //@417
fn amm_hop<'info>(
    ctx: &Context<'_, '_, 'info, 'info, MultiHop<'info>>,
    hop: &mut AmmHop<'info>,
    input_mint: &Pubkey,
    amount: u64,
    source: &HopSource<'info>,
    last: bool,
    minimum: u64,
    gates: HopFeeGates,
) -> Result<(u64, bool)> {
    let a = &ctx.accounts;
    let buy = *input_mint == hop.quote_mint.key();
    if buy {
        //PAD
        require!( //@469
            a.global_config.disable_flags & 8 == 0,
            PumpAmmError::DisabledBuy
        );
    } else {
        require!( //@474
            a.global_config.disable_flags & 16 == 0,
            PumpAmmError::DisabledSell
        );
    }
    trade_v2::validate_multi_hop_pool(&hop.pool, gates.creator)?;
    crate::instructions::swap::prepare_pool(&hop.pool, a.system_program.as_ref(), a.user.as_ref())?;
    let base_program = program_for(a, &hop.base_mint)?;
    let quote_program = program_for(a, &hop.quote_mint)?;
    if gates.protocol {
        trade_v2::validate_buyback_token_account(
            &a.global_config,
            a.buyback_fee_recipient.as_ref(),
            &hop.quote_mint.key(),
            &quote_program.key(),
        )?;
    }
    let (input_program, input_mint, input_vault) = if buy {
        (&quote_program, &hop.quote_mint, &hop.pool_quote_token_account)
    } else {
        (&base_program, &hop.base_mint, &hop.pool_base_token_account)
    };
    let (user_input_account, user_input_balance) = match source {
        HopSource::User => (
            a.user_in_token_account.key(),
            a.user_in_token_account.amount,
        ),
        _ => (Pubkey::default(), 0),
    };
    let (user_output_account, user_output_balance) = if last {
        (
            a.user_out_token_account.key(),
            token_amount(&a.user_out_token_account.to_account_info())?,
        )
    } else {
        (Pubkey::default(), 0)
    };
    match source {
        HopSource::User => crate::utils::token::transfer_checked(
            input_program,
            input_mint,
            &a.user_in_token_account,
            input_vault,
            &a.user.to_account_info(),
            amount,
            &[],
        )?,
        HopSource::Pool(previous, base) => {
            let vault = if *base {
                &previous.pool_base_token_account
            } else {
                &previous.pool_quote_token_account
            };
            if vault.key() != input_vault.key() {
                crate::utils::token::transfer_from_pool(
                    input_program,
                    input_mint,
                    vault,
                    input_vault,
                    amount,
                    &previous.pool,
                )?;
            }
        }
        HopSource::Curve => {}
    }
    hop.pool_base_token_account.reload()?;
    hop.pool_quote_token_account.reload()?;
    let quote_fee = transfer_fee::from_mint(&hop.quote_mint.to_account_info())?;
    let (base_reserve, raw_quote_reserve, received) = if buy {
        let received = transfer_fee::amount_after_fee(&quote_fee, amount)?;
        let quote = hop.pool_quote_token_account.amount;
        //PAD
        let quote = quote.checked_sub(received).ok_or_else(|| error!(PumpAmmError::Overflow))?; //@579
        (hop.pool_base_token_account.amount, quote, received)
    } else {
        let base = hop.pool_base_token_account.amount;
        //PAD
        let base = base.checked_sub(amount).ok_or_else(|| error!(PumpAmmError::Overflow))?; //@586
        (base, hop.pool_quote_token_account.amount, amount)
    };
    let (real_quote_reserves, quote_reserve) =
        trade_v2::quote_reserves(&hop.pool, raw_quote_reserve)?;
    let old_virtual = hop.pool.virtual_quote_reserves;
    let base_supply = hop.base_mint.supply;
    let fee_config_len = a.fee_config.to_account_info().data_len();
    let context = HopFeeContext {
        pool: &hop.pool,
        global_config: &a.global_config,
        accounts: a,
        fee_config_len: &fee_config_len,
        base_supply: &base_supply,
        base_reserve: &base_reserve,
        quote_reserve: &quote_reserve,
        gates: &gates,
    };
    if buy {
        let fees = apply_hop_fees(context, received)?;
        let (_, fees) = trade_v2::estimate_buy_quote(&hop.pool, &fees, received)?;
        //PAD
        let curve_quote = received //@633
            .checked_sub(fees.lp_fee)
            .and_then(|v| v.checked_sub(fees.protocol_fee))
            .and_then(|v| v.checked_sub(fees.creator_fee)).ok_or_else(|| error!(PumpAmmError::Overflow))?; //@636
        let base_amount =
            crate::curve::constant_product::base_for_quote(curve_quote, base_reserve, quote_reserve)?;
        //PAD
        require_gt!(base_amount, 0, PumpAmmError::ZeroBaseAmount); //@642
        require_gte!(base_reserve, base_amount, PumpAmmError::TooLittlePoolTokenLiquidity); //@643
        if last {
            crate::utils::token::transfer_from_pool(
                &base_program,
                &hop.base_mint,
                &hop.pool_base_token_account,
                &a.user_out_token_account,
                base_amount,
                &hop.pool,
            )?;
        }
        let buyback_fee = accrue_hop_fees(
            &a.global_config,
            a.buyback_fee_recipient.as_ref(),
            hop,
            &quote_program,
            fees.protocol_fee,
            fees.creator_fee,
            gates,
        )?;
        //PAD
        let quote_transfer_fee = amount.checked_sub(received).ok_or_else(|| error!(PumpAmmError::Overflow))?; //@671
        let buyback_received = transfer_fee::amount_after_fee(&quote_fee, buyback_fee)?;
        let event = trade_v2::create_buy_event(
            TradeEventContext {
                pool: &hop.pool,
                global_config: &a.global_config,
                user_volume_accumulator: &a.user_volume_accumulator,
                base_supply,
                user: a.user.key(),
                user_base_token_account: user_output_account,
                user_quote_token_account: user_input_account,
            },
            &BuyResult {
                fees: fees.clone(),
                base_amount_out: base_amount,
                quote_amount_in: curve_quote,
                user_quote_amount_in: received,
                buyback_fee,
                pool_quote_amount_in: amount,
                quote_transfer_fee,
            },
            amount,
            if last { minimum } else { 0 },
            amount,
            curve_quote,
            user_output_balance,
            user_input_balance,
            base_reserve,
            raw_quote_reserve,
            old_virtual,
            buyback_received,
            "multi_hop_swap",
        )?;
        emit!(event);
        emit_cpi!(event);
        Ok((base_amount, true))
    } else {
        let quote = crate::curve::constant_product::quote_for_sell(amount, base_reserve, quote_reserve)?;
        let fees = apply_hop_fees(context, quote)?;
        let (quote_without_lp_fee, total_quote) =
            trade_v2::calculate_sell_quote(quote, &fees, real_quote_reserves)?;
        //PAD
        require_gt!(total_quote, 0, PumpAmmError::ZeroQuoteAmount); //@712
        let quote_received = transfer_fee::amount_after_fee(&quote_fee, total_quote)?;
        //PAD
        let quote_transfer_fee = total_quote.checked_sub(quote_received).ok_or_else(|| error!(PumpAmmError::Overflow))?; //@718
        if last { crate::utils::token::transfer_from_pool(&quote_program, &hop.quote_mint, &hop.pool_quote_token_account, &a.user_out_token_account, total_quote, &hop.pool)?; }
        let buyback_fee = accrue_hop_fees(&a.global_config, a.buyback_fee_recipient.as_ref(), hop, &quote_program, fees.protocol_fee, fees.creator_fee, gates)?;
        let buyback_received = transfer_fee::amount_after_fee(&quote_fee, buyback_fee)?;
        let event = trade_v2::create_sell_event(
            TradeEventContext { pool: &hop.pool, global_config: &a.global_config, user_volume_accumulator: &a.user_volume_accumulator,
                base_supply, user: a.user.key(), user_base_token_account: user_input_account, user_quote_token_account: user_output_account },
            amount, if last { minimum } else { 0 }, user_input_balance, user_output_balance, base_reserve, raw_quote_reserve,
            quote, &fees, quote_without_lp_fee, total_quote, old_virtual, buyback_received, quote_transfer_fee,
        )?;
        emit!(event);
        emit_cpi!(event);
        Ok((quote_received, false))
    }
}
//PAD
'''+rd('part_vault_accrue.rs').split('\n',1)[0]+' //@766\n'+rd('part_vault_accrue.rs').split('\n',1)[1]+'''
//PAD
#[inline(never)] //@803
fn curve_run<'info>(
    ctx: &Context<'_, '_, 'info, 'info, MultiHop<'info>>,
    hops: &[AccountInfo<'info>],
    flags: Vec<u8>,
    amount: u64,
    source: &HopSource<'info>,
    destination: AccountInfo<'info>,
    buy: bool,
) -> Result<u64> {
    let a = &ctx.accounts;
    let config_seeds: &[&[u8]] = &[b"global_config", &[ctx.bumps.global_config]];
    let input_native = buy && hops[..5][1].key() == anchor_spl::token::spl_token::native_mint::ID;
    let output_native = !buy
        && hops[hops.len().saturating_sub(5)..][1].key()
            == anchor_spl::token::spl_token::native_mint::ID;
    let (source, authority, pool) = match source {
        HopSource::User => (
            a.user_in_token_account.to_account_info(),
            a.user.to_account_info(),
            None,
        ),
        HopSource::Pool(hop, base) => (
            if *base {
                hop.pool_base_token_account.to_account_info()
            } else {
                hop.pool_quote_token_account.to_account_info()
            },
            hop.pool.to_account_info(),
            Some(&hop.pool),
        ),
        //PAD
        HopSource::Curve => return err!(PumpAmmError::AccountTypeNotSupported), //@838
    };
    let same_account = source.key() == destination.key();
    let source_before = token_amount(&source)?;
    let destination_before = if same_account {
        source_before
    } else {
        token_amount(&destination)?
    };
    let cpi_accounts = crate::pump::cpi::accounts::MultiHopCurveSwap {
        global: a.pump_global.to_account_info(),
        fee_config: a.pump_fee_config.to_account_info(),
        pump_amm_global_config: a.global_config.to_account_info(),
        user: a.user.to_account_info(),
        source_authority: authority.clone(),
        source: source.clone(),
        destination: destination.clone(),
        buyback_fee_recipient: a.buyback_fee_recipient.to_account_info(),
        token_program: a.token_program.to_account_info(),
        token_2022_program: a.token_2022_program.to_account_info(),
        system_program: a.system_program.to_account_info(),
        event_authority: a.pump_event_authority.to_account_info(),
        program: a.pump_program.to_account_info(),
    };
    let result = match pool {
        None => crate::pump::cpi::multi_hop_curve_swap(
            CpiContext::new_with_signer(a.pump_program.to_account_info(), cpi_accounts, &[config_seeds])
                .with_remaining_accounts(hops.to_vec()),
            amount,
            flags,
        )?
        .get(),
        Some(pool) => crate::pump::cpi::multi_hop_curve_swap(
            CpiContext::new_with_signer(
                a.pump_program.to_account_info(),
                cpi_accounts,
                &[
                    config_seeds,
                    &[
                        b"pool",
                        &pool.index.to_le_bytes(),
                        pool.creator.as_ref(),
                        pool.base_mint.as_ref(),
                        pool.quote_mint.as_ref(),
                        &[pool.pool_bump],
                    ],
                ],
            )
            .with_remaining_accounts(hops.to_vec()),
            amount,
            flags,
        )?
        .get(),
    };
    let amount_out = result.amount_out;
    let buyback = result.buyback_fee;
    let source_buyback = if a.buyback_fee_recipient.key() == source.key() { buyback } else { 0 };
    let destination_buyback = if a.buyback_fee_recipient.key() == destination.key() { buyback } else { 0 };
    if !input_native {
        let expected = source_before
            .checked_sub(amount)
            .and_then(|v| v.checked_add(if same_account { amount_out } else { 0 }))
            .and_then(|v| v.checked_add(source_buyback))
            //PAD
            .ok_or_else(|| error!(PumpAmmError::Overflow))?; //@928
        require_eq!(token_amount(&source)?, expected, PumpAmmError::MultiHopCurveRunMismatch); //@929
    }
    //PAD
    if !output_native && !same_account {
        require_eq!( //@936
            token_amount(&destination)?,
            destination_before
                .checked_add(amount_out)
                .and_then(|v| v.checked_add(destination_buyback))
                .ok_or_else(|| error!(PumpAmmError::Overflow))?, //@941
            PumpAmmError::MultiHopCurveRunMismatch
        );
    }
    Ok(amount_out)
}
'''
open(G+'mh_v1.tpl','w').write(T)
r=subprocess.run(['python3','-B',L+'/tools/padb.py',G+'mh_v1.tpl',G+'mh_v1.rs'],capture_output=True,text=True);print(r.stdout,r.stderr)
