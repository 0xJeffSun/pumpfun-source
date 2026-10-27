// Extension source proposal; coordinate padding is evidence-backed, not historical text.

































{

    let info = &ctx.accounts.fee_config;


    require_keys_eq!(*info.owner, ID, FeeError::InvalidFeeConfigAccount);


    let data = info.try_borrow_data()?;



    require_gte!(data.len(), 9usize, FeeError::InvalidFeeConfigAccount);




    require!(data[..8] == [143,52,146,187,219,123,76,155], FeeError::InvalidFeeConfigAccount);

    let bump = [data[8]];
    let config_program = ctx.accounts.config_program_id.key();



    let expected = Pubkey::create_program_address(
        &[b"fee_config", config_program.as_ref(), &bump], ctx.program_id)

        .map_err(|_| error!(FeeError::InvalidFeeConfigAccount))?;
    require_keys_eq!(expected, info.key(), FeeError::InvalidFeeConfigAccount);
        let current_size = data.len();
        drop(data);
        if current_size == 4097 { msg!("Fee config account already has the correct size"); return Ok(()); } if current_size > 4097 { msg!("Fee config account already has more than {} bytes: {}", 4097usize, current_size); return Ok(()); }
        let rent = Rent::get()?;
        let amount = rent.minimum_balance(4097) - rent.minimum_balance(current_size);
        anchor_lang::system_program::transfer(CpiContext::new(
            ctx.accounts.system_program.to_account_info(), anchor_lang::system_program::Transfer {
                from: ctx.accounts.user.to_account_info(), to: info.clone(),
            }), amount)?;
        info.realloc(4097, true)?;
        let event = ExtendFeeConfigEvent { fee_config: info.key(), user: ctx.accounts.user.key(),
            current_size: current_size as u64, new_size: 4097, timestamp: Clock::get()?.unix_timestamp };
        emit!(event); emit_cpi!(event); Ok(())
}
