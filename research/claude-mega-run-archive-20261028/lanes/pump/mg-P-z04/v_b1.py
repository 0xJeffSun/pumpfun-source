import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1
B=v_r1.BOOST_FN.replace('fn init_pump_amm_boost_v2<','fn init_pump_amm_boost_v2__X<').replace('quote_token_account_size(a)?','qsize__X(a)?')
S="fn qsize__X<'info>(a:&MigrateV2<'info>)->Result<usize>{\n if a.quote_token_program.key()==anchor_spl::token::ID{return Ok(165)}\n"
RQ="required_quote_account_len(&a.quote_mint.to_account_info().try_borrow_data()?)"
SV={}
SV['B1']=S+f" {RQ}.ok_or_else(||error!(PumpError::UnsupportedQuoteMint))\n}}\n"
SV['B2']=S+f" let Some(len)={RQ} else {{return err!(PumpError::UnsupportedQuoteMint)}};\n Ok(len)\n}}\n"
SV['B3']=S+f" match {RQ} {{Some(len)=>Ok(len),None=>err!(PumpError::UnsupportedQuoteMint)}}\n}}\n"
SV['B4']=S+f" {RQ}.ok_or(error!(PumpError::UnsupportedQuoteMint))\n}}\n"
SV['B5']="fn qsize__X<'info>(a:&MigrateV2<'info>)->Result<usize>{\n if a.quote_token_program.key()!=anchor_spl::token::ID{\n"+f" return {RQ}.ok_or_else(||error!(PumpError::UnsupportedQuoteMint));\n }}\n Ok(165)\n}}\n"
SV['B6']="fn qsize__X<'info>(a:&MigrateV2<'info>)->Result<usize>{\n Ok(if a.quote_token_program.key()==anchor_spl::token::ID{165}else{\n"+f" {RQ}.ok_or_else(||error!(PumpError::UnsupportedQuoteMint))?\n }})\n}}\n"
SV['B7']=S+f" let len={RQ};\n require!(len.is_some(),PumpError::UnsupportedQuoteMint);\n Ok(len.unwrap())\n}}\n"
SV['B8']=S+f" let data=a.quote_mint.to_account_info();let data=data.try_borrow_data()?;\n required_quote_account_len(&data).ok_or_else(||error!(PumpError::UnsupportedQuoteMint))\n}}\n"
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
def add_boost_mux(d, tags=None, base=301):
    p=d+'/src/migrate_v2.rs'; s=open(p).read()
    tags=tags or list(SV)
    arms=''.join(f"{base+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(tags))
    assert s.count(CALL_OLD)==1
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t in tags: s+=B.replace('__X','_'+t)+SV[t].replace('__X','_'+t)
    open(p,'w').write(s)
if __name__=='__main__':
    d=v_r1.variant('MB1'); add_boost_mux(d); print(d)
