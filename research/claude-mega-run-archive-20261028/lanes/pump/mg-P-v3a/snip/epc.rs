#[inline(never)]
pub fn estimate_post_complete(creator:&Pubkey,pool_base_before:u64,pool_quote_before:u64,protocol_fee_bps:u64,creator_fee_bps:u64,budget:u64,exact_budget:bool)->Result<Option<PostComplete>>{
    let creator_bps=if *creator==Pubkey::default(){0}else{creator_fee_bps};
    let total_bps=protocol_fee_bps.checked_add(creator_bps).ok_or(PumpError::Overflow)?;
    let net=if total_bps==0{budget}else if budget==0{0}else{(budget as u128*10_000/(10_000+total_bps as u128)) as u64};
    if net<2{return Ok(None);}
    let (mut quote_in,protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps)=net_quote_for_budget(creator,protocol_fee_bps,creator_fee_bps,budget)?;
    if exact_budget{quote_in=sub3(budget,protocol_fee,creator_fee)?;}
    let base_out=exact_input_tokens(quote_in,pool_base_before,pool_quote_before)?;
    if base_out==0{return Ok(None);}
    Ok(Some(PostComplete{fees:TradeFees{protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps},base_out,quote_in,pool_base_before,pool_quote_before}))
}
