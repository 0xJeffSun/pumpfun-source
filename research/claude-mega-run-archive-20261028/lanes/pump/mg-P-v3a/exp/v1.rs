
// ===== multiplex experiment v1 (never deliver) =====
#[inline(never)]
pub fn epc_b(creator:&Pubkey,pool_base_before:u64,pool_quote_before:u64,protocol_fee_bps:u64,creator_fee_bps:u64,budget:u64,exact_budget:bool)->Result<Option<PostComplete>>{
    let creator_bps=if *creator==Pubkey::default(){0}else{creator_fee_bps};
    let total_bps=protocol_fee_bps.checked_add(creator_bps).ok_or(PumpError::Overflow)?;
    let net=if total_bps==0{budget}else if budget==0{0}else{(budget as u128*10_000/(10_000+total_bps as u128)) as u64};
    if net<2{return Ok(None);}
    let (net0,protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps)=net_quote_for_budget(creator,protocol_fee_bps,creator_fee_bps,budget)?;
    let fees=TradeFees{protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps};
    let quote_in=if exact_budget{sub3(budget,fees.protocol_fee,fees.creator_fee)?}else{net0};
    let base_out=exact_input_tokens(quote_in,pool_base_before,pool_quote_before)?;
    if base_out==0{return Ok(None);}
    Ok(Some(PostComplete{fees,base_out,quote_in,pool_base_before,pool_quote_before}))
}
#[inline(never)]
pub fn epc_c(creator:&Pubkey,pool_base_before:u64,pool_quote_before:u64,protocol_fee_bps:u64,creator_fee_bps:u64,budget:u64,exact_budget:bool)->Result<Option<PostComplete>>{
    let creator_bps=if *creator==Pubkey::default(){0}else{creator_fee_bps};
    let total_bps=protocol_fee_bps.checked_add(creator_bps).ok_or(PumpError::Overflow)?;
    let net=if total_bps==0{budget}else if budget==0{0}else{(budget as u128*10_000/(10_000+total_bps as u128)) as u64};
    if net<2{return Ok(None);}
    let r=net_quote_for_budget(creator,protocol_fee_bps,creator_fee_bps,budget)?;
    let quote_in=if exact_budget{sub3(budget,r.1,r.2)?}else{r.0};
    let base_out=exact_input_tokens(quote_in,pool_base_before,pool_quote_before)?;
    if base_out==0{return Ok(None);}
    Ok(Some(PostComplete{fees:TradeFees{protocol_fee:r.1,creator_fee:r.2,protocol_fee_bps:r.3,creator_fee_bps:r.4},base_out,quote_in,pool_base_before,pool_quote_before}))
}
#[inline(never)]
pub fn epc_d(creator:&Pubkey,pool_base_before:u64,pool_quote_before:u64,protocol_fee_bps:u64,creator_fee_bps:u64,budget:u64,exact_budget:bool)->Result<Option<PostComplete>>{
    let creator_bps=if *creator==Pubkey::default(){0}else{creator_fee_bps};
    let total_bps=protocol_fee_bps.checked_add(creator_bps).ok_or(PumpError::Overflow)?;
    let net=if total_bps==0{budget}else if budget==0{0}else{(budget as u128*10_000/(10_000+total_bps as u128)) as u64};
    if net<2{return Ok(None);}
    let (net0,protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps)=net_quote_for_budget(creator,protocol_fee_bps,creator_fee_bps,budget)?;
    let quote_in=if exact_budget{sub3(budget,protocol_fee,creator_fee)?}else{net0};
    let base_out=exact_input_tokens(quote_in,pool_base_before,pool_quote_before)?;
    Ok(if base_out==0{None}else{Some(PostComplete{fees:TradeFees{protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps},base_out,quote_in,pool_base_before,pool_quote_before})})
}
#[inline(never)]
pub fn epc_e(creator:&Pubkey,pool_base_before:u64,pool_quote_before:u64,protocol_fee_bps:u64,creator_fee_bps:u64,budget:u64,exact_budget:bool)->Result<Option<PostComplete>>{
    let creator_bps=if *creator==Pubkey::default(){0}else{creator_fee_bps};
    let total_bps=protocol_fee_bps.checked_add(creator_bps).ok_or(PumpError::Overflow)?;
    let net=if total_bps==0{budget}else if budget==0{0}else{(budget as u128*10_000/(10_000+total_bps as u128)) as u64};
    if net<2{return Ok(None);}
    let (net0,protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps)=net_quote_for_budget(creator,protocol_fee_bps,creator_fee_bps,budget)?;
    let quote_in=if exact_budget{sub3(budget,protocol_fee,creator_fee)?}else{net0};
    let base_out=exact_input_tokens(quote_in,pool_base_before,pool_quote_before)?;
    if base_out==0{return Ok(None);}
    Ok(Some(PostComplete{fees:TradeFees{protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps},base_out,quote_in,pool_base_before,pool_quote_before}))
}
#[inline(never)]
pub fn fit_b(buyback_bps:u64,is_mayhem:bool,quote_fee:&Option<(u64,u64,u64)>,quote:u64,protocol_fee:u64,creator_fee:u64,post:&mut PostComplete,budget:u64)->Result<(Option<PostComplete>,(u64,u64,u64))>{
    loop{
        let costs=v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,Some(post))?;
        let total=add(costs.0,costs.1)?;
        if total<=budget{return Ok((Some(*post),costs));}
        let quote_in=post.quote_in.saturating_sub(total-budget);
        if quote_in<=1{return Ok((None,v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,None)?));}
        post.quote_in=quote_in;
        post.base_out=exact_input_tokens(post.quote_in,post.pool_base_before,post.pool_quote_before)?;
        if post.base_out==0{return Ok((None,v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,None)?));}
    }
}
#[inline(never)]
pub fn fit_c(buyback_bps:u64,is_mayhem:bool,quote_fee:&Option<(u64,u64,u64)>,quote:u64,protocol_fee:u64,creator_fee:u64,post:&mut PostComplete,budget:u64)->Result<(Option<PostComplete>,(u64,u64,u64))>{
    loop{
        let costs=v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,Some(post))?;
        let total=add(costs.0,costs.1)?;
        if total<=budget{return Ok((Some(*post),costs));}
        match post.quote_in.checked_sub(total-budget).filter(|q|*q>1){
            Some(q)=>post.quote_in=q,
            None=>return Ok((None,v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,None)?)),
        }
        post.base_out=exact_input_tokens(post.quote_in,post.pool_base_before,post.pool_quote_before)?;
        if post.base_out==0{return Ok((None,v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,None)?));}
    }
}
#[inline(never)]
pub fn fit_d(buyback_bps:u64,is_mayhem:bool,quote_fee:&Option<(u64,u64,u64)>,quote:u64,protocol_fee:u64,creator_fee:u64,post:&mut PostComplete,budget:u64)->Result<(Option<PostComplete>,(u64,u64,u64))>{
    loop{
        let costs=v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,Some(post))?;
        let total=add(costs.0,costs.1)?;
        if total<=budget{return Ok((Some(*post),costs));}
        let quote_in=post.quote_in.checked_sub(total-budget).unwrap_or(0);
        if quote_in>1{
            post.quote_in=quote_in;
            post.base_out=exact_input_tokens(post.quote_in,post.pool_base_before,post.pool_quote_before)?;
            if post.base_out>0{continue;}
        }
        return Ok((None,v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,None)?));
    }
}
#[inline(never)]
pub fn fit_e(buyback_bps:u64,is_mayhem:bool,quote_fee:&Option<(u64,u64,u64)>,quote:u64,protocol_fee:u64,creator_fee:u64,post:&mut PostComplete,budget:u64)->Result<(Option<PostComplete>,(u64,u64,u64))>{
    loop{
        let costs=v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,Some(post))?;
        let total=add(costs.0,costs.1)?;
        if total<=budget{return Ok((Some(*post),costs));}
        let excess=total-budget;
        if post.quote_in<excess || post.quote_in-excess<=1{return Ok((None,v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,None)?));}
        post.quote_in-=excess;
        post.base_out=exact_input_tokens(post.quote_in,post.pool_base_before,post.pool_quote_before)?;
        if post.base_out==0{return Ok((None,v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,None)?));}
    }
}
