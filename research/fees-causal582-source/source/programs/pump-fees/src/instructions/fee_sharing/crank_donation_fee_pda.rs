{
use anchor_lang::solana_program::instruction::AccountMeta;
        if ctx.accounts.fee_program_global.disable_flags & 8 != 0 { msg!("CrankDonationFeePda is currently disabled"); return Err(FeeError::FeatureDeactivated.into()); }
        let config=ctx.accounts.donation_fee_pda.config_id;
        let base=ctx.accounts.donation_fee_pda.base_mint;
        let creator=ctx.accounts.donation_fee_pda.creator;
        let mint=ctx.accounts.quote_mint.key();
        if mint==anchor_spl::token::spl_token::native_mint::ID {
            let donation=ctx.accounts.donation_fee_pda.to_account_info();
            let minimum=Rent::get()?.minimum_balance(218);
            let balance=donation.lamports();let excess=balance.saturating_sub(minimum);
            if balance>minimum {
                let ata=ctx.accounts.donation_fee_pda_ata.to_account_info();donation.sub_lamports(excess)?;
                ata.add_lamports(excess)?;

                let ix=anchor_lang::solana_program::instruction::Instruction {program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(ctx.accounts.donation_fee_pda_ata.key(),false),AccountMeta::new_readonly(ctx.accounts.rent.key(),false),AccountMeta::new(donation.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()};
                let infos = [{ let i: &AccountInfo<'_> = ctx.accounts.donation_fee_pda_ata.as_ref(); AccountInfo { key: i.key, lamports: i.lamports.clone(), data: i.data.clone(), owner: i.owner, rent_epoch: i.rent_epoch, is_signer: i.is_signer, is_writable: i.is_writable, executable: i.executable } },{ let i: &AccountInfo<'_> = ctx.accounts.rent.as_ref(); AccountInfo { key: i.key, lamports: i.lamports.clone(), data: i.data.clone(), owner: i.owner, rent_epoch: i.rent_epoch, is_signer: i.is_signer, is_writable: i.is_writable, executable: i.executable } },{ let i = &donation; AccountInfo { key: i.key, lamports: i.lamports.clone(), data: i.data.clone(), owner: i.owner, rent_epoch: i.rent_epoch, is_signer: i.is_signer, is_writable: i.is_writable, executable: i.executable } }]; let invoke_result: Result<()> = try { anchor_lang::solana_program::program::invoke(&ix,&infos)?; }; let [a,b,c] = infos; drop(a); drop(b); drop(c); invoke_result?;
                { #[inline(always)] fn reload_native<'info>(account: &mut Account<'info, anchor_spl::token::TokenAccount>) -> Result<()> { let owner: Account<'info, anchor_spl::token::TokenAccount> = account.clone(); let info: &AccountInfo<'info> = owner.as_ref(); let mut data: &[u8] = &info.try_borrow_data()?; account.set_inner(anchor_spl::token::TokenAccount::try_deserialize(&mut data)?); Ok(()) } reload_native(&mut ctx.accounts.donation_fee_pda_ata)?; }
            }
            if ctx.accounts.donation_fee_pda_ata.amount==0{msg!("Nothing to donate");return Ok(());}
        }
        let amount=ctx.accounts.donation_fee_pda_ata.amount;if amount==0{msg!("Nothing to donate");return Ok(());}
        let relay_args=crate::relay_cpi::DonatePubkeyConfigIdWithPayerV1Args {amount,config_id:config,tip_bps:0,message:format!("{},{}",base,creator),credited_to:ID};
        let bump=[ctx.accounts.donation_fee_pda.bump];let seeds:&[&[u8]]=&[b"donation-fee-pda",base.as_ref(),config.as_ref(),&bump];
        let relay_accounts=crate::relay_cpi::DonatePubkeyConfigIdWithPayerV1 {
            program:ctx.accounts.donation_relay_program.to_account_info(),epoch_tracker:ctx.accounts.epoch_tracker.to_account_info(),debouncer:ctx.accounts.debouncer.to_account_info(),debouncer_token_account:ctx.accounts.debouncer_ata.to_account_info(),mint:ctx.accounts.quote_mint.to_account_info(),from_token_account:ctx.accounts.donation_fee_pda_ata.to_account_info(),from:ctx.accounts.donation_fee_pda.to_account_info(),payer:ctx.accounts.payer.to_account_info(),mint_whitelist:ctx.accounts.mint_whitelist.to_account_info(),associated_token_program:ctx.accounts.associated_token_program.to_account_info(),token_program:ctx.accounts.token_program.to_account_info(),system_program:ctx.accounts.system_program.to_account_info(),event_authority:ctx.accounts.donation_relay_event_authority.to_account_info()
        };
        relay_accounts.invoke_signed(relay_args,seeds)?;
        let state=&mut ctx.accounts.donation_fee_pda;state.total_donated=state.total_donated.checked_add(amount).ok_or(FeeError::ShareCalculationOverflow)?;state.last_crank_ts=Clock::get()?.unix_timestamp;
        let event=DonationFeePdaCranked {timestamp:state.last_crank_ts,signer:ctx.accounts.payer.key(),donation_fee_pda:state.key(),config_id:config,base_mint:base,quote_mint:mint,creator:state.creator,amount};emit!(event);emit_cpi!(event);Ok(())
    }



