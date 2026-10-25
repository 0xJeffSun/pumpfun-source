use crate::*;
use anchor_spl::{associated_token::AssociatedToken, token_interface::{TokenInterface, TransferChecked}};

#[account]
#[derive(Debug)]
pub struct GlobalVolumeAccumulator {
    pub start_time:i64,
    pub end_time:i64,
    pub seconds_in_a_day:i64,
    pub mint:Pubkey,
    pub total_token_supply:[u64;30],
    pub sol_volumes:[u64;30],
}
#[event_cpi]
#[derive(Accounts)]
pub struct SyncUserVolumeAccumulator<'info>{
    /// CHECK: PDA seed only, no signature required.
    pub user:UncheckedAccount<'info>,
    #[account(seeds=[b"global_volume_accumulator"],bump)]
    pub global_volume_accumulator:Box<Account<'info,GlobalVolumeAccumulator>>,
    #[account(mut,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]
    pub user_volume_accumulator:Account<'info,UserVolumeAccumulator>,
}
fn reset(g:&GlobalVolumeAccumulator,u:&mut UserVolumeAccumulator,now:i64){
    if now<g.start_time && u.last_update_timestamp<g.start_time {
        u.total_claimed_tokens=0;
        u.has_total_claimed_tokens=false;
    }
}
pub fn sync(ctx:Context<SyncUserVolumeAccumulator>)->Result<()> {
    let timestamp=Clock::get()?.unix_timestamp;
    let before=ctx.accounts.user_volume_accumulator.total_claimed_tokens;
    reset(&ctx.accounts.global_volume_accumulator,&mut ctx.accounts.user_volume_accumulator,timestamp);
    let after=ctx.accounts.user_volume_accumulator.total_claimed_tokens;
    if before!=after {
        let event=SyncUserVolumeAccumulatorEvent{user:ctx.accounts.user.key(),total_claimed_tokens_before:before,total_claimed_tokens_after:after,timestamp};
        emit!(event.clone());emit_cpi!(event);
    }
    Ok(())
}
