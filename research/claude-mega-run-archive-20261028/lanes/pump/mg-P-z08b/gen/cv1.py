REQ = "require_keys_neq!(creator,Pubkey::default(),PumpError::CreatorShouldNotBeZero);\n"
INIT = "{let a=&mut *ctx.accounts;let curve:&mut trade_types::BondingCurve=&mut a.bonding_curve;let g=&a.global;let quote_mint=Pubkey::default();let virtual_quote_reserves=if quote_mint==Pubkey::default(){g.initial_virtual_sol_reserves}else{g.initial_virtual_quote_reserves};curve.virtual_quote_reserves=virtual_quote_reserves;curve.initial_virtual_quote_reserves=virtual_quote_reserves;curve.virtual_token_reserves=g.initial_virtual_token_reserves;curve.real_token_reserves=g.initial_real_token_reserves;curve.real_quote_reserves=0;curve.token_total_supply=g.token_total_supply;curve.creator=creator;curve.quote_mint=quote_mint;curve.post_complete_base_out=0;curve.creator_fee_bps=0;curve.post_complete_quote_in=0;curve.depth=0;curve.is_mayhem_mode=false;curve.is_cashback_coin=false;curve.can_edit_creator_fee=false;curve.is_holder_reward=false;}"
CLONES = "let name_c=name.clone();let symbol_c=symbol.clone();let uri_c=uri.clone();"
def META(seed, nm=('name_c', 'symbol_c', 'uri_c')):
    return ("anchor_spl::metadata::create_metadata_accounts_v3(CpiContext::new_with_signer(a.mpl_token_metadata.to_account_info(),anchor_spl::metadata::CreateMetadataAccountsV3{"
            "metadata:a.metadata.to_account_info(),mint:a.mint.to_account_info(),mint_authority:a.mint_authority.to_account_info(),payer:a.user.to_account_info(),update_authority:a.mint_authority.to_account_info(),system_program:a.system_program.to_account_info(),rent:a.rent.to_account_info(),"
            f"}},{seed}),anchor_spl::metadata::mpl_token_metadata::types::DataV2{{name:{nm[0]},symbol:{nm[1]},uri:{nm[2]},seller_fee_basis_points:0,creators:Some(vec![anchor_spl::metadata::mpl_token_metadata::types::Creator{{address:creator,verified:false,share:100}}]),collection:None,uses:None}},false,true,None,)?;\n")
def MINT(seed): return f"anchor_spl::token::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),anchor_spl::token::MintTo{{mint:a.mint.to_account_info(),to:a.associated_bonding_curve.to_account_info(),authority:a.mint_authority.to_account_info()}},{seed}),a.global.token_total_supply)?;\n"
def SETA(seed): return f"anchor_spl::token::set_authority(CpiContext::new_with_signer(a.token_program.to_account_info(),anchor_spl::token::SetAuthority{{current_authority:a.mint_authority.to_account_info(),account_or_mint:a.mint.to_account_info()}},{seed}),anchor_spl::token::spl_token::instruction::AuthorityType::MintTokens,None)?;\n"
EV_G = "let event=CreateEvent{name,symbol,uri,mint:a.mint.key(),bonding_curve:a.bonding_curve.key(),user:a.user.key(),creator,timestamp:Clock::get()?.unix_timestamp,virtual_token_reserves:a.global.initial_virtual_token_reserves,virtual_sol_reserves:a.global.initial_virtual_sol_reserves,real_token_reserves:a.global.initial_real_token_reserves,token_total_supply:a.global.token_total_supply,token_program:a.token_program.key(),is_mayhem_mode:false,is_cashback_enabled:false,quote_mint:Pubkey::default(),virtual_quote_reserves:a.global.initial_virtual_sol_reserves,creator_fee_bps:0,is_holder_reward:false,depth:0};\n"
def EV_C(curve='let bonding_curve=&a.bonding_curve;', qm=False):
    s = curve + "let virtual_token_reserves=bonding_curve.virtual_token_reserves;let virtual_sol_reserves=bonding_curve.virtual_quote_reserves;let real_token_reserves=bonding_curve.real_token_reserves;let token_total_supply=bonding_curve.token_total_supply;let is_holder_reward=bonding_curve.is_holder_reward;let depth=bonding_curve.depth;"
    if qm: s += "let quote_mint=bonding_curve.quote_mint;"
    s += ("let event=CreateEvent{name,symbol,uri,mint:a.mint.key(),bonding_curve:a.bonding_curve.key(),user:a.user.key(),creator,timestamp:Clock::get()?.unix_timestamp,virtual_token_reserves,virtual_sol_reserves,real_token_reserves,token_total_supply,token_program:a.token_program.key(),is_mayhem_mode:false,is_cashback_enabled:false,quote_mint:"
          + ("quote_mint" if qm else "Pubkey::default()") + ",virtual_quote_reserves:virtual_sol_reserves,creator_fee_bps:0,is_holder_reward,depth};\n")
    return s
EMIT = "emit!(event);emit_cpi!(event);Ok(())"
SL = 'let bump=[ctx.bumps.mint_authority];let seeds:&[&[u8]]=&[b"mint-authority",&bump];'
SI = '&[&[b"mint-authority",&[bump]]]'
VARIANTS = {
 'v0': REQ + INIT + "let a=&ctx.accounts;" + CLONES + SL + META('&[seeds]') + MINT('&[seeds]') + SETA('&[seeds]') + EV_G + EMIT,
 'v1': REQ + INIT + "let a=&ctx.accounts;" + CLONES + "let bump=ctx.bumps.mint_authority;" + META(SI) + MINT(SI) + SETA(SI) + EV_G + EMIT,
 'v2': REQ + INIT + "let a=&ctx.accounts;" + CLONES + "let bump=ctx.bumps.mint_authority;" + META(SI) + MINT(SI) + SETA(SI) + EV_C() + EMIT,
 'v3': REQ + INIT + "let a=&ctx.accounts;" + "let bump=ctx.bumps.mint_authority;" + CLONES + META(SI) + MINT(SI) + SETA(SI) + EV_C() + EMIT,
 'v4': REQ + INIT + "let a=&ctx.accounts;" + CLONES + "let bump=ctx.bumps.mint_authority;" + META(SI) + MINT(SI) + SETA(SI) + EV_C(qm=True) + EMIT,
 'v5': REQ + INIT + "let a=&ctx.accounts;" + CLONES + "let bump=ctx.bumps.mint_authority;" + META(SI) + MINT(SI) + SETA(SI) + EV_C(curve='let bonding_curve:&trade_types::BondingCurve=&a.bonding_curve;') + EMIT,
 'v6': REQ + INIT + "let a=&ctx.accounts;" + "let bump=ctx.bumps.mint_authority;" + META(SI, ('name.clone()', 'symbol.clone()', 'uri.clone()')) + MINT(SI) + SETA(SI) + EV_C() + EMIT,
 'v7': REQ + INIT + "let a=&ctx.accounts;" + CLONES + META('&[&[b"mint-authority",&[ctx.bumps.mint_authority]]]') + MINT('&[&[b"mint-authority",&[ctx.bumps.mint_authority]]]') + SETA('&[&[b"mint-authority",&[ctx.bumps.mint_authority]]]') + EV_C() + EMIT,
}
