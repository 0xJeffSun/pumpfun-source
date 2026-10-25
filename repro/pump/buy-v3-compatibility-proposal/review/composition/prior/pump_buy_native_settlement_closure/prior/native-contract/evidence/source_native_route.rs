  let buyback=n(pf as u128*a.global.buyback_basis_points as u128/10000)?;
  let output=if sell{sub(sub(quote_amount,pf)?,cf)?}else{base_amount};
  let (vb,vq,rb,rq)=if sell{(add(c.virtual_token_reserves,base_amount)?,sub(c.virtual_quote_reserves,quote_amount)?,add(c.real_token_reserves,base_amount)?,sub(c.real_quote_reserves,quote_amount)?)}else{(sub(c.virtual_token_reserves,base_amount)?,add(c.virtual_quote_reserves,quote_amount)?,sub(c.real_token_reserves,base_amount)?,add(c.real_quote_reserves,quote_amount)?)};
  let creator_total=add(c.creator_fee,cf)?;let protocol_total=add(c.protocol_fees,sub(pf,buyback)?)?;
  if sell{
   two_curve_input(a,previous.as_ref(),h.base_mint.to_account_info(),h.base_vault.to_account_info(),base_amount,h.base_mint.decimals)?;
  }else if native{
   require_keys_eq!(a.source_authority.key(),a.user.key(),PumpError::ReconstructionBranchUnsupported);
   anchor_lang::system_program::transfer(CpiContext::new(a.system_program.to_account_info(),anchor_lang::system_program::Transfer{from:a.user.to_account_info(),to:h.bonding_curve.to_account_info()}),amount)?;
  }else{
   two_curve_input(a,previous.as_ref(),h.quote_mint.to_account_info(),h.quote_vault.to_account_info(),amount,h.quote_mint.decimals)?;
  }
  let c=&mut h.bonding_curve;c.virtual_token_reserves=vb;c.virtual_quote_reserves=vq;c.real_token_reserves=rb;c.real_quote_reserves=rq;
  let mint_key=h.base_mint.key();let bump=[bumps.bonding_curve];let seeds:&[&[u8]]=&[b"bonding-curve",mint_key.as_ref(),&bump];
  if !sell && last{
   token_interface::transfer_checked(CpiContext::new_with_signer(a.token_program.to_account_info(),TransferChecked{from:h.base_vault.to_account_info(),mint:h.base_mint.to_account_info(),to:a.destination.to_account_info(),authority:h.bonding_curve.to_account_info()},&[seeds]),base_amount,h.base_mint.decimals)?;
  }
  h.bonding_curve.creator_fee=creator_total;h.bonding_curve.protocol_fees=protocol_total;
  if native{native_buyback(a,h.bonding_curve.to_account_info(),buyback)?;}
  if sell && native && last{move_lamports(&h.bonding_curve.to_account_info(),&a.user.to_account_info(),output)?;}
  let c=&h.bonding_curve;
