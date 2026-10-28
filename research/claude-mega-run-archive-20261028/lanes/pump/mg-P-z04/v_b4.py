import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b1, v_b3
P1=v_b3.BV['P1'][0]; S1=v_b1.SV['B1']
sub=v_b3.sub
QM_IB="quote_mint:a.quote_mint.to_account_info(),"
FUND=" let funding=Rent::get()?.minimum_balance(qsize__X(a)?);\n"
LETELSE_END=" };\n let initial_balance="
S5="fn qsize__X<'info>(quote_mint:&InterfaceAccount<'info,Mint>,quote_token_program:&Interface<'info,TokenInterface>)->Result<usize>{\n if quote_token_program.key()==anchor_spl::token::ID{return Ok(165)}\n required_quote_account_len(&quote_mint.to_account_info().try_borrow_data()?).ok_or_else(||error!(PumpError::UnsupportedQuoteMint))\n}\n"
BV={}
BV['R1']=(sub(P1,[(LETELSE_END," };\n let quote_mint=&a.quote_mint;\n let initial_balance="),(QM_IB,"quote_mint:quote_mint.to_account_info(),")]),S1)
BV['R2']=(sub(P1,[(FUND," let quote_mint:&InterfaceAccount<'info,Mint>=&a.quote_mint;\n"+FUND),(QM_IB,"quote_mint:quote_mint.to_account_info(),")]),S1)
BV['R3']=(sub(P1,[(FUND,FUND+" let quote_mint:&InterfaceAccount<'info,Mint>=&a.quote_mint;\n"),(QM_IB,"quote_mint:quote_mint.to_account_info(),")]),S1)
BV['R4']=(sub(P1,[(LETELSE_END," };\n let quote_mint:&InterfaceAccount<'info,Mint>=&a.quote_mint;\n let initial_balance="),(QM_IB,"quote_mint:quote_mint.to_account_info(),")]),S1)
BV['R5']=(sub(P1,[("qsize__X(a)?","qsize__X(&a.quote_mint,&a.quote_token_program)?")]),S5)
BV['R6']=(sub(P1,[(FUND," let quote_mint:&InterfaceAccount<'info,Mint>=&a.quote_mint;\n"+FUND.replace("qsize__X(a)?","qsize__X(quote_mint,&a.quote_token_program)?")),(QM_IB,"quote_mint:quote_mint.to_account_info(),")]),S5)
BV['R7']=(sub(P1,[(FUND,FUND.replace("qsize__X(a)?","qsize__X(&a.quote_mint,&a.quote_token_program)?")+" let quote_mint:&InterfaceAccount<'info,Mint>=&a.quote_mint;\n"),(QM_IB,"quote_mint:quote_mint.to_account_info(),")]),S5)
BV['R8']=(P1,S1.replace("fn qsize__X","#[inline(never)]\nfn qsize__X"))
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB4'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,(b,sz) in BV.items(): s+=b.replace('__X','_'+t)+sz.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
