#[inline(never)]
pub fn fit_post_complete(buyback_bps:u64,is_mayhem:bool,quote_fee:&Option<(u64,u64,u64)>,quote:u64,protocol_fee:u64,creator_fee:u64,post:&mut PostComplete,budget:u64)->Result<(Option<PostComplete>,(u64,u64,u64))>{
    loop{
        let costs=v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,Some(post))?;
        let total=add(costs.0,costs.1)?;
        if total<=budget{return Ok((Some(*post),costs));}
        let excess=total-budget;
        match post.quote_in.checked_sub(excess){
            Some(q) if q>1=>post.quote_in=q,
            _=>return Ok((None,v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,None)?)),
        }
        post.base_out=exact_input_tokens(post.quote_in,post.pool_base_before,post.pool_quote_before)?;
        if post.base_out==0{return Ok((None,v3_buy_costs(buyback_bps,is_mayhem,quote_fee,quote,protocol_fee,creator_fee,None)?));}
    }
}
