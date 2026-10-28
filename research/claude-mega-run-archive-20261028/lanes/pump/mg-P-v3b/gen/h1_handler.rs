pub fn buy_exact_quote(ctx:Context<SellV3>,spendable_quote_in:u64,min_tokens_out:u64,partial_fill:bool)->Result<()> {
    let a=&mut *ctx.accounts;
    crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.user)?;
    validate_trade(a.bonding_curve.complete as u8,a.bonding_curve.is_cashback_coin as u64,0)?;
@881    require_gt!(min_tokens_out,0,PumpError::BuyZeroAmount);
@882    require_gt!(spendable_quote_in,0,PumpError::BuyNotEnoughSolToCoverFees);
    let (is_sol,quote_fee)=check_quote(a)?;
    let available=crate::transfer_fee_recovered::post_fee_amount(&quote_fee,spendable_quote_in)?;
@891    require_gt!(available,0,PumpError::BuyNotEnoughSolToCoverFees);
    let fees=v3_trade_fees(a,available)?;
    let curve=&a.bonding_curve;
    let (tokens,net,protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps)=if a.global.whitelist_pda==a.user.key(){
@904        let tokens=u64::try_from(crate::constant_product::tokens_for_quote(curve,available)?).map_err(|_|error!(PumpError::Truncation))?;
        (tokens,available,fees.protocol_fee,fees.creator_fee,fees.protocol_fee_bps,fees.creator_fee_bps)
    }else{
        let (net,protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps)=net_quote_for_budget(&curve.creator,fees.protocol_fee_bps,fees.creator_fee_bps,available)?;
@911        let tokens=u64::try_from(crate::constant_product::tokens_for_quote(curve,net)?).map_err(|_|error!(PumpError::Truncation))?;
        (tokens,net,protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps)
    };
    let (amount,quote,fees,post,costs)=if tokens>curve.real_token_reserves{
        let can_cross=!v3_fee_exempt(&a.global,curve,&a.user.key());
@926        require!(can_cross||partial_fill,PumpError::NotEnoughTokensToBuy);
        let amount=curve.real_token_reserves;
@930        let quote=u64::try_from(crate::buy_quote(curve,amount)?).map_err(|_|error!(PumpError::Truncation))?;
        let curve_fees=v3_trade_fees(a,quote)?;
        let costs=v3_buy_costs(a.global.buyback_basis_points,curve.is_mayhem_mode,&quote_fee,quote,curve_fees.protocol_fee,curve_fees.creator_fee,None)?;
@935        require_gte!(spendable_quote_in,add(costs.0,costs.1)?,PumpError::TooMuchSolRequired);
        let first=add3(quote,curve_fees.protocol_fee,curve_fees.creator_fee)?;
        let (post,costs)=if can_cross && available>first{
            let (pool_base,pool_quote)=v3_pool_before(curve.real_quote_reserves,a.global.pool_migration_fee,a.associated_base_bonding_curve.amount,is_sol,amount,quote)?;
            match estimate_post_complete(&curve.creator,pool_base,pool_quote,fees.protocol_fee_bps,fees.creator_fee_bps,available.saturating_sub(first),false)?{
                Some(mut post)=>fit_post_complete(a.global.buyback_basis_points,curve.is_mayhem_mode,&quote_fee,quote,curve_fees.protocol_fee,curve_fees.creator_fee,&mut post,spendable_quote_in)?,
                None=>(None,costs),
            }
        }else{(None,costs)};
        if can_cross{
@970            let base_out=amount.checked_add(match post{Some(p)=>p.base_out,None=>0}).ok_or_else(||error!(PumpError::Overflow))?;
@971            require_gte!(base_out,min_tokens_out,PumpError::BuySlippageBelowMinTokensOut);
        }
        (amount,quote,curve_fees,post,costs)
    }else{
        let (mut tokens,mut net)=(tokens,net);
        let mut costs=v3_buy_costs(a.global.buyback_basis_points,curve.is_mayhem_mode,&quote_fee,net,protocol_fee,creator_fee,None)?;
        let total=add(costs.0,costs.1)?;
        if total>spendable_quote_in{
            net=net.checked_sub(total-spendable_quote_in).ok_or(PumpError::BuyNotEnoughSolToCoverFees)?;
@993            require_gt!(net,0,PumpError::BuySlippageBelowMinTokensOut);
@997            tokens=u64::try_from(crate::constant_product::tokens_for_quote(curve,net)?).map_err(|_|error!(PumpError::Truncation))?;
            costs=v3_buy_costs(a.global.buyback_basis_points,curve.is_mayhem_mode,&quote_fee,net,protocol_fee,creator_fee,None)?;
        }
@1001        require_gte!(tokens,min_tokens_out,PumpError::BuySlippageBelowMinTokensOut);
        (tokens,net,TradeFees{protocol_fee,creator_fee,protocol_fee_bps,creator_fee_bps},None,costs)
    };
    let (buyback,post_buyback)=v3_execute_buy(a,ctx.bumps.bonding_curve,is_sol,amount,quote,fees.protocol_fee,fees.creator_fee,post.as_ref(),costs.0,costs.1,&quote_fee)?;
    v3_emit_buy(a,ctx.bumps.event_authority,amount,quote,&fees,buyback,costs.2,"buy_exact_quote_in",&post,post_buyback)
}
