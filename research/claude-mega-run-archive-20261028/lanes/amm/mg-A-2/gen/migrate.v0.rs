use crate::*;
use crate::creator_reassignment::*;









































/// Replaces the pool coin creator with the sharing config PDA.
///
//
//
//
#[inline(always)]
pub fn migrate(ctx: Context<MigratePoolCoinCreator>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    require!(!pool.is_holder_reward, PumpAmmError::HolderRewardCreatorImmutable);

    // Fees accrued for the previous coin creator have to be swept first,
    // otherwise they would become claimable by the sharing config.
    //
    //
    //
    require!(pool.creator_fees == 0, PumpAmmError::CreatorFeesNotSwept);

    let old_coin_creator = pool.coin_creator;
    pool.coin_creator = ctx.accounts.sharing_config.key();
    let event = MigratePoolCoinCreatorEvent {
        timestamp: Clock::get()?.unix_timestamp,
        base_mint: pool.base_mint,
        pool: pool.key(),
        sharing_config: ctx.accounts.sharing_config.key(),
        old_coin_creator,
        new_coin_creator: ctx.accounts.sharing_config.key(),
    };
    emit!(event);
    emit_cpi!(event);
    Ok(())
}
