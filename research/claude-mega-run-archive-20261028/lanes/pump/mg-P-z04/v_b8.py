import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b6, v_b3
V1B, V1S = v_b6.BV['V1']; sub=v_b3.sub
FUND=" let funding=Rent::get()?.minimum_balance(qsize__X(ctx)?);\n"
assert FUND in V1B
RQ="required_quote_account_len(&a.quote_mint.to_account_info().try_borrow_data()?)"
BV={}
BV['X1']=sub(V1B,[(FUND,f" let rent=Rent::get()?;\n let size=if a.quote_token_program.key()==anchor_spl::token::ID{{Ok(165)}}else{{\n {RQ}.ok_or_else(||error!(PumpError::UnsupportedQuoteMint))}};\n let funding=rent.minimum_balance(size?);\n")])
BV['X2']=sub(V1B,[(FUND,f" let rent=Rent::get()?;\n let size:Result<usize>=if a.quote_token_program.key()==anchor_spl::token::ID{{Ok(165)}}else{{\n {RQ}.ok_or_else(||error!(PumpError::UnsupportedQuoteMint))}};\n let funding=rent.minimum_balance(size?);\n")])
BV['X3']=sub(V1B,[(FUND,f" let rent=Rent::get()?;\n let size=if a.quote_token_program.key()==anchor_spl::token::ID{{Ok(165)}}else{{\n match {RQ} {{Some(len)=>Ok(len),None=>err!(PumpError::UnsupportedQuoteMint)}}}};\n let funding=rent.minimum_balance(size?);\n")])
BV['X4']=sub(V1B,[(FUND,f" let rent=Rent::get()?;\n let size=if a.quote_token_program.key()==anchor_spl::token::ID{{165}}else{{\n {RQ}.ok_or_else(||error!(PumpError::UnsupportedQuoteMint))?}};\n let funding=rent.minimum_balance(size);\n")])
BV['X5']=sub(V1B,[(FUND,f" let size=if a.quote_token_program.key()==anchor_spl::token::ID{{Ok(165)}}else{{\n {RQ}.ok_or_else(||error!(PumpError::UnsupportedQuoteMint))}};\n let funding=Rent::get()?.minimum_balance(size?);\n")])
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB8'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,b in BV.items(): s+=b.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
