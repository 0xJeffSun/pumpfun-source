#[derive(Accounts)]
pub struct ClaimTokenIncentives<'info>{
    /// CHECK: Destination token-account authority and PDA seed.
    pub user:UncheckedAccount<'info>,
    #[account(init_if_needed,payer=payer,associated_token::mint=mint,associated_token::authority=user,associated_token::token_program=token_program)]
    pub user_ata:InterfaceAccount<'info,TokenAccount>,
    #[account(seeds=[b"global_volume_accumulator"],bump,has_one=mint @ PumpAmmError::InvalidIncentiveMint)]
    pub global_volume_accumulator:Box<Account<'info,GlobalVolumeAccumulator>>,
    #[account(mut,associated_token::mint=mint,associated_token::authority=global_volume_accumulator,associated_token::token_program=token_program)]
    pub global_incentive_token_account:InterfaceAccount<'info,TokenAccount>,
    #[account(mut,seeds=[b"user_volume_accumulator",user.key().as_ref()],bump)]
    pub user_volume_accumulator:Account<'info,UserVolumeAccumulator>,
    pub mint:InterfaceAccount<'info,Mint>,
    pub token_program:Interface<'info,TokenInterface>,
    pub system_program:Program<'info,System>,
    pub associated_token_program:Program<'info,AssociatedToken>,
    /// CHECK: Anchor event authority PDA.
    #[account(seeds=[b"__event_authority"],bump)]
    pub event_authority:UncheckedAccount<'info>,
    pub program:Program<'info,crate::program::PumpAmmRecovered>,
    #[account(mut)]pub payer:Signer<'info>,
}
pub fn claim(ctx:Context<ClaimTokenIncentives>)->Result<()> {
    let timestamp=Clock::get()?.unix_timestamp;
    let g=&ctx.accounts.global_volume_accumulator;
    let u=&mut ctx.accounts.user_volume_accumulator;
    u.user=ctx.accounts.user.key();
    reset(g,u,timestamp);
    // Recovered shared accumulator updater at original 0x6d408.
    let now_index=usize::try_from(timestamp).expect("SVM is 64-bit");
    let start_index=usize::try_from(g.start_time).expect("SVM is 64-bit");
    if now_index>=start_index && g.seconds_in_a_day!=0 {
        let period=usize::try_from(g.seconds_in_a_day).expect("SVM is 64-bit");
        let last=usize::try_from(u.last_update_timestamp).expect("SVM is 64-bit");
        let today=(now_index-start_index)/period;
        if last>=start_index {
            let previous_day=(last-start_index)/period;
            let end=usize::try_from(g.end_time).expect("SVM is 64-bit");
            let end_day=end.checked_sub(start_index).expect("end_time should be bigger than start_time")/period;
            if previous_day<today && previous_day<=end_day && g.sol_volumes[previous_day]>0 && u.current_sol_volume>0 {
                let reward=u64::try_from((u.current_sol_volume as u128)*(g.total_token_supply[previous_day] as u128)/(g.sol_volumes[previous_day] as u128)).map_err(|_|error!(PumpAmmError::Truncation))?;
                u.total_unclaimed_tokens=u.total_unclaimed_tokens.checked_add(reward).expect("Unexpected overflow");
                u.last_update_timestamp=timestamp;
                u.needs_claim=u.total_unclaimed_tokens>0;
                u.current_sol_volume=0;
            }
        }
        if timestamp<=g.end_time {
            // The original updater reads today's bucket even for a zero-volume claim.
            let _=g.sol_volumes[today];
            u.last_update_timestamp=timestamp;
            u.needs_claim=u.total_unclaimed_tokens>0 || u.current_sol_volume>0;
        }
    }
    let amount=u.total_unclaimed_tokens;
    if amount==0 {msg!("No tokens to claim");return Ok(());}
    let bump=[ctx.bumps.global_volume_accumulator];let signer:&[&[u8]]=&[b"global_volume_accumulator",&bump];
    token_interface::transfer_checked(CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(),TransferChecked{from:ctx.accounts.global_incentive_token_account.to_account_info(),mint:ctx.accounts.mint.to_account_info(),to:ctx.accounts.user_ata.to_account_info(),authority:g.to_account_info()},&[signer]),amount,ctx.accounts.mint.decimals)?;
    u.total_unclaimed_tokens=0;u.total_claimed_tokens+=amount;u.has_total_claimed_tokens=true;u.needs_claim=u.current_sol_volume>0;u.last_update_timestamp=timestamp;
    let event=ClaimTokenIncentivesEvent{user:ctx.accounts.user.key(),mint:ctx.accounts.mint.key(),amount,timestamp,total_claimed_tokens:u.total_claimed_tokens,current_sol_volume:u.current_sol_volume};emit!(event.clone());emit_cpi!(event);
    Ok(())
}
#[event]
#[derive(Clone)]
pub struct SyncUserVolumeAccumulatorEvent{pub user:Pubkey,pub total_claimed_tokens_before:u64,pub total_claimed_tokens_after:u64,pub timestamp:i64}
