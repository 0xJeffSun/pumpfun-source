use crate::*;
use crate::creator_reassignment::*;













































/// Sets the pool coin creator once.
///
/// The first Metaplex metadata creator wins; tokens without metadata
/// creators fall back to the creator recorded in the Pump bonding curve.
//
//
pub fn set(ctx: Context<SetCoinCreator>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let base_mint = pool.base_mint;
    //
    //
    //
    //
    //
    //
    require_keys_eq!(pool.creator, crate::utils::pool_authority(&base_mint), PumpAmmError::OnlyCanonicalPumpPoolsCanHaveCoinCreator);
    if pool.coin_creator != Pubkey::default() {
        msg!("Pool has coin_creator already set");
        return Ok(());
    }
    let pool_key = pool.key();
    match &ctx.accounts.metadata.creators {
        Some(creators) => {
        let coin_creator = creators[0].address;
        pool.coin_creator = coin_creator;
        let event = SetMetaplexCoinCreatorEvent {
            timestamp: Clock::get()?.unix_timestamp,
            base_mint,
            pool: pool_key,
            metadata: ctx.accounts.metadata.key(),
            coin_creator,
        };
        emit!(event);
        emit_cpi!(event);
    }
        None => {
        let coin_creator = ctx.accounts.bonding_curve.creator;
        pool.coin_creator = coin_creator;
        let event = SetBondingCurveCoinCreatorEvent {
            timestamp: Clock::get()?.unix_timestamp,
            base_mint,
            pool: pool_key,
            bonding_curve: ctx.accounts.bonding_curve.key(),
            coin_creator,
        };
        emit!(event);
        emit_cpi!(event);
    }
    }
    Ok(())
}
