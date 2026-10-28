import runpy
B = runpy.run_path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08b/gen/cv1.py')
REQ, INIT, CLONES, META, MINT, SETA, EMIT, SL, SI = [B[k] for k in ('REQ', 'INIT', 'CLONES', 'META', 'MINT', 'SETA', 'EMIT', 'SL', 'SI')]
BLD_BODY = ("let virtual_token_reserves=bonding_curve.virtual_token_reserves;let virtual_sol_reserves=bonding_curve.virtual_quote_reserves;let real_token_reserves=bonding_curve.real_token_reserves;let token_total_supply=bonding_curve.token_total_supply;let is_holder_reward=bonding_curve.is_holder_reward;let depth=bonding_curve.depth;let quote_mint=bonding_curve.quote_mint;"
            "Ok(CreateEvent{name,symbol,uri,mint:mint.key(),bonding_curve:bonding_curve.key(),user:user.key(),creator,timestamp:Clock::get()?.unix_timestamp,virtual_token_reserves,virtual_sol_reserves,real_token_reserves,token_total_supply,token_program:token_program.key(),is_mayhem_mode,is_cashback_enabled:false,quote_mint:quote_mint,virtual_quote_reserves:virtual_sol_reserves,creator_fee_bps,is_holder_reward,depth})")
def BLD(attr=''):
    return (f" {attr} fn ev_NAME<'info>(name:String,symbol:String,uri:String,creator:Pubkey,mint:&Account<'info,anchor_spl::token::Mint>,user:&Signer<'info>,bonding_curve:&Account<'info,trade_types::BondingCurve>,token_program:&Program<'info,anchor_spl::token::Token>,is_mayhem_mode:bool,creator_fee_bps:u64)->Result<CreateEvent>{{\n"
            + BLD_BODY + "\n }")
CALL = "let event=ev_NAME(name,symbol,uri,creator,&a.mint,&a.user,&a.bonding_curve,&a.token_program,false,0)?;\n"
PRE = REQ + INIT + "let a=&ctx.accounts;" + CLONES
VARIANTS = {
 'b0': (PRE + SL + META('&[seeds]') + MINT('&[seeds]') + SETA('&[seeds]') + CALL + EMIT, BLD()),
 'b1': (PRE + "let bump=ctx.bumps.mint_authority;" + META(SI) + MINT(SI) + SETA(SI) + CALL + EMIT, BLD()),
 'b2': (PRE + SL + META('&[seeds]') + MINT('&[seeds]') + SETA('&[seeds]') + CALL + EMIT, BLD('#[inline(always)]')),
 'b3': (PRE + "let bump=ctx.bumps.mint_authority;" + META(SI) + MINT(SI) + SETA(SI) + CALL + EMIT, BLD('#[inline(always)]')),
 'b4': (PRE + "let bump=ctx.bumps.mint_authority;" + META('&[&[b"mint-authority",&[ctx.bumps.mint_authority]]]') + MINT('&[&[b"mint-authority",&[ctx.bumps.mint_authority]]]') + SETA('&[&[b"mint-authority",&[ctx.bumps.mint_authority]]]') + CALL + EMIT, BLD()),
 'b5': (PRE + "let bump=[ctx.bumps.mint_authority];" + META('&[&[b"mint-authority",&bump]]') + MINT('&[&[b"mint-authority",&bump]]') + SETA('&[&[b"mint-authority",&bump]]') + CALL + EMIT, BLD()),
}
