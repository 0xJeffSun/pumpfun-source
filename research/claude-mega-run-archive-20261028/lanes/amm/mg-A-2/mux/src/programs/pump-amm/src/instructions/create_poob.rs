use anchor_lang::{
    accounts::{
        account::Account,
        interface::Interface,
        interface_account::InterfaceAccount,
        program::Program,
        signer::Signer,
    },
    prelude::{borsh, AccountInfo, Clock, Context, Key, Pubkey, Rent, Result, SolanaSysvar, System, ToAccountInfo},
    Accounts, AnchorDeserialize, AnchorSerialize, Discriminator, emit, emit_cpi, error, event, event_cpi, require, require_eq, require_gt, require_keys_neq,
};
use anchor_spl::{
    associated_token::AssociatedToken,
    token_2022::Token2022,
    token_interface::{Mint, TokenAccount, TokenInterface},
};
use crate::{state::{GlobalConfig, Pool}, PumpAmmError}; use super::create_pool::{CreatePool, CreatePoolEvent};
use crate::utils::math::U128;

































































































































#[inline(never)]
pub fn execute(
    ctx: Context<CreatePool>,
    index: u16,
    base_in: u64,
    quote_in: u64,
    coin_creator: Pubkey,
    mayhem: bool,
    cashback: bool,
    creator_fee: u64,
    can_edit: bool,
    holder: bool,
) -> Result<()> {
    let a = &mut *ctx.accounts;
    let canonical = a.creator.key() == crate::utils::pool_authority(&a.base_mint.key());

    if mayhem {
    //
    //
    //
    //
    //
    //
        require_eq!(a.global_config.mayhem_mode_enabled, true, PumpAmmError::MayhemModeDisabled);
    //
    //
    //
    //
    //
        require_eq!(canonical, true, PumpAmmError::OnlyPumpPoolsMayhemMode);
        a.pool.is_mayhem_mode = true;
    }
    //
    //
    if cashback {
        require_eq!(a.global_config.is_cashback_enabled, true, PumpAmmError::CashbackNotEnabled);
    //
    //
    //
    //
    //
        require_eq!(canonical, true, PumpAmmError::OnlyPumpPoolsCashback);
        a.pool.is_cashback_coin = true;
    }

    require!(a.global_config.disable_flags & 1 == 0, PumpAmmError::DisabledCreatePool);

    //
    //
    //
    require_gt!(base_in, 0, PumpAmmError::ZeroBaseAmount);
    require_gt!(quote_in, 0, PumpAmmError::ZeroQuoteAmount);

    require!(crate::utils::token::supported_mint(a.base_mint.as_ref().as_ref(), false), PumpAmmError::UnsupportedBaseMint);
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    let allow_extensions = match canonical { true => true, false => false };
    require!(crate::utils::token::supported_mint(a.quote_mint.as_ref().as_ref(), allow_extensions), PumpAmmError::UnsupportedQuoteMint);

    require_keys_neq!(a.base_mint.key(), a.quote_mint.key(), PumpAmmError::SameMint);

    crate::utils::token::transfer_checked(
        a.base_token_program.as_ref(),
        &a.base_mint,
        &a.user_base_token_account,
        &a.pool_base_token_account,
        a.creator.as_ref(),
        base_in,
        &[],
    )?;
    crate::utils::token::transfer_checked(
        a.quote_token_program.as_ref(),
        &a.quote_mint,
        &a.user_quote_token_account,
        &a.pool_quote_token_account,
        a.creator.as_ref(),
        quote_in,
        &[],
    )?;

    a.pool_base_token_account.reload()?;
    a.pool_quote_token_account.reload()?;
    let pb = a.pool_base_token_account.amount;
    let pq = a.pool_quote_token_account.amount;

    let liquidity = initial_liquidity(pb, pq)?;
    let bump = [ctx.bumps.pool];
    let creator = a.creator.key();
    let base_decimals = a.base_mint.decimals;
    let base = a.base_mint.key();
    let quote_decimals = a.quote_mint.decimals;
    let quote = a.quote_mint.key();
    let pool_base_token_account = a.pool_base_token_account.key();
    let pool_quote_token_account = a.pool_quote_token_account.key();
    a.pool.pool_bump = bump[0];
    a.pool.index = index;
    a.pool.creator = creator;
    a.pool.base_mint = base;
    a.pool.quote_mint = quote;
    a.pool.lp_mint = a.lp_mint.key();
    a.pool.pool_base_token_account = pool_base_token_account;
    a.pool.pool_quote_token_account = pool_quote_token_account;
    a.pool.lp_supply = liquidity;
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    if canonical {
        a.pool.coin_creator = coin_creator;
        a.pool.creator_fee_bps = creator_fee;
        a.pool.can_edit_creator_fee = can_edit;
    } else {
        require!(creator_fee == 0 && !can_edit, PumpAmmError::OnlyCanonicalPumpPoolsCanHaveCoinCreator);
    }
    a.pool.is_holder_reward = canonical && holder;
    //
    //
    //
    //
    //
    //
    //
    //
    let output = liquidity.checked_sub(100).ok_or_else(|| error!(PumpAmmError::TooLittlePoolTokenLiquidity))?;
    crate::utils::token::mint_to_pool(
        &a.token_2022_program,
        &a.lp_mint,
        &a.user_pool_token_account,
        output,
        &a.pool,
    )?;

    let event = CreatePoolEvent {
        timestamp: Clock::get()?.unix_timestamp,
        index,
        creator,
        base_mint: base,
        quote_mint: quote,
        base_mint_decimals: base_decimals,
        quote_mint_decimals: quote_decimals,
        base_amount_in: base_in,
        quote_amount_in: quote_in,
        pool_base_amount: pb,
        pool_quote_amount: pq,
        minimum_liquidity: 100,
        initial_liquidity: liquidity,
        lp_token_amount_out: output,
        pool_bump: bump[0],
        pool: a.pool.key(),
        lp_mint: a.lp_mint.key(),
        user_base_token_account: a.user_base_token_account.key(),
        user_quote_token_account: a.user_quote_token_account.key(),
        coin_creator,
        is_mayhem_mode: mayhem,
        creator_fee_bps: a.pool.creator_fee_bps,
        can_edit_creator_fee: a.pool.can_edit_creator_fee,
        is_holder_reward: a.pool.is_holder_reward,
    };
    emit!(event);
    emit_cpi!(event);
    Ok(())
}

fn initial_liquidity(base: u64, quote: u64) -> Result<u64> {
    let product = (base as u128) * (quote as u128);
    //
    //
    //
    //
    //
    //
    //
    u64::try_from(U128::from(product).integer_sqrt()).map_err(|_| error!(PumpAmmError::Truncation))
}





























