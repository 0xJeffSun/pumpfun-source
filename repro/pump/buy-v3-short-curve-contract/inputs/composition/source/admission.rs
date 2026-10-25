// PARTIAL: inherited domain fences are proposal limits, not original errors.
// No fence is removed to pretend that missing dependencies are closed.
// BuyV3-only application helpers. No historical Rust/module identity is claimed.
fn buy_add(a:u64,b:u64)->Result<u64>{a.checked_add(b).ok_or_else(||PumpError::Overflow.into())}
fn buy_sub(a:u64,b:u64)->Result<u64>{a.checked_sub(b).ok_or_else(||PumpError::Overflow.into())}
fn buy_narrow(a:u128)->Result<u64>{u64::try_from(a).map_err(|_|PumpError::Truncation.into())}
fn buy_domain(a:&BuyV3<'_>)->Result<()> {
    // These fences expose unsupported reconstruction modes, not original policy.
    // Keep typed Mint/TokenAccount readers; do not use unchecked raw offsets.
    let legacy=anchor_spl::token::ID;
    if a.bonding_curve.is_mayhem_mode || a.user.key()==a.global.whitelist_pda
        || a.base_token_program.key()!=legacy || a.base_mint.to_account_info().owner!=&legacy
        || a.base_mint.to_account_info().data_len()!=82
        || a.associated_base_bonding_curve.to_account_info().data_len()!=165
        || a.associated_base_user.to_account_info().owner!=&legacy
        || a.associated_base_user.to_account_info().data_len()!=165
        || a.quote_mint.to_account_info().owner!=&legacy
        || a.quote_mint.to_account_info().data_len()!=82
        || a.bonding_curve.to_account_info().data_len()<166
        || a.global.buyback_basis_points>10000 {
        return Err(crate::ReconstructionError::ReconstructionBranchUnsupported.into());
    }
    if a.bonding_curve.quote_mint!=Pubkey::default() {
        // Existing ordinary token vault domain only. Creation/extensions and
        // non-Tokenkeg programs must not silently fall into this implementation.
        if a.quote_token_program.key()!=legacy
            || a.associated_quote_bonding_curve.to_account_info().owner!=&legacy
            || a.associated_quote_bonding_curve.to_account_info().data_len()!=165
            || a.associated_quote_user.to_account_info().data_len()!=165
            || a.buyback_fee_recipient.to_account_info().data_len()!=165 {
            return Err(crate::ReconstructionError::ReconstructionBranchUnsupported.into());
        }
    }
    Ok(())
}
fn buy_prepare_curve<'info>(a:&BuyV3<'info>)->Result<()> {
    // 0x147c08 -> 0x3cd50 -> 0x3d250, before mode/amount checks.
    // This domain has len>=166, hence the subsequent growth branch is skipped.
    let curve_info=a.bonding_curve.to_account_info();
    let size=curve_info.data_len().max(166);
    let reserved=if a.bonding_curve.quote_mint==Pubkey::default() {
        let fees=buy_add(a.bonding_curve.creator_fee,a.bonding_curve.protocol_fees)?;
        buy_add(a.bonding_curve.real_quote_reserves,fees)?
    } else { 0 };
    let minimum=Rent::get()?.minimum_balance(size);
    let available=curve_info.lamports().saturating_sub(reserved);
    if minimum>available {
        anchor_lang::system_program::transfer(CpiContext::new(
            a.system_program.to_account_info(),anchor_lang::system_program::Transfer {
                from:a.user.to_account_info(),to:curve_info,
            }),minimum-available)?;
    }
    Ok(())
}
fn buy_membership(global:&Global,key:Pubkey)->Result<()> {
    if key==Pubkey::default() {
        return Err(anchor_lang::error::Error::from(PumpError::BuybackFeeRecipientMissing)
            .with_pubkeys((key,Pubkey::default())));
    }
    if !global.buyback_fee_recipients.contains(&key) {
        return Err(PumpError::BuybackFeeRecipientNotAuthorized.into());
    }
    Ok(())
}
fn buy_token<'info>(info:&AccountInfo<'info>,mint:Pubkey,program:Pubkey,authority:Option<Pubkey>)->Result<TokenAccount> {
    if info.owner!=&program {
        return Err(anchor_lang::error::Error::from(PumpError::AccountTypeNotSupported)
            .with_pubkeys((*info.owner,program)));
    }
    let data=info.try_borrow_data()?;
    let token=TokenAccount::try_deserialize(&mut &data[..])?;
    if token.mint!=mint {
        return Err(anchor_lang::error::Error::from(PumpError::MintDoesNotMatchBondingCurve)
            .with_pubkeys((token.mint,mint)));
    }
    if let Some(expected)=authority {
        if token.owner!=expected {
            return Err(anchor_lang::error::Error::from(PumpError::AccountTypeNotSupported)
                .with_pubkeys((token.owner,expected)));
        }
    }
    Ok(token)
}
fn check_quote_buy(a:&BuyV3<'_>)->Result<Option<u8>> {
    // Native flag is stored-quote==zero, not supplied-quote==WSOL.
    // Typed quote mint + asymmetric relation already ran in context admission.
    if a.bonding_curve.quote_mint==Pubkey::default() {
        buy_membership(&a.global,a.buyback_fee_recipient.key())?;
        return Ok(None);
    }
    let mint=a.quote_mint.key();let program=a.quote_token_program.key();
    // Existing-vault helper checks its mint; ATA identity was checked earlier.
    // It does not impose another decoded token-authority equality here.
    buy_token(&a.associated_quote_bonding_curve.to_account_info(),mint,program,None)?;
    buy_token(&a.associated_quote_user.to_account_info(),mint,program,Some(a.user.key()))?;
    let recipient_info=a.buyback_fee_recipient.to_account_info();
    let recipient=buy_token(&recipient_info,mint,program,None)?;
    buy_membership(&a.global,recipient.owner)?;
    let expected=anchor_spl::associated_token::get_associated_token_address_with_program_id(
        &recipient.owner,&mint,&program);
    if recipient_info.key()!=expected {
        return Err(anchor_lang::error::Error::from(anchor_lang::error::ErrorCode::ConstraintSeeds)
            .with_pubkeys((recipient_info.key(),expected)));
    }
    Ok(Some(a.quote_mint.decimals))
}

// Equivalent source expansion of locked anchor-attribute-event 0.31.2 emit_cpi.
// Pass the reborrowed field rather than reborrowing ctx.accounts behind `a`.
fn buy_emit_cpi<'info,E:anchor_lang::Event>(authority:&AccountInfo<'info>,bump:u8,event:&E)->Result<()> {
    let data:Vec<u8>=anchor_lang::event::EVENT_IX_TAG_LE.iter().copied()
        .chain(event.data().into_iter()).collect();
    let ix=anchor_lang::solana_program::instruction::Instruction::new_with_bytes(
        crate::ID,&data,vec![anchor_lang::solana_program::instruction::AccountMeta::new_readonly(*authority.key,true)]);
    anchor_lang::solana_program::program::invoke_signed(
        &ix,&[authority.clone()],&[&[b"__event_authority",&[bump]]])
        .map_err(anchor_lang::error::Error::from)
}
