import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b1, v_b3
P1=v_b3.BV['P1'][0]; sub=v_b3.sub
CT="ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>"
RQ="required_quote_account_len(&a.quote_mint.to_account_info().try_borrow_data()?)"
HC=f"fn qsize__X<'info>({CT})->Result<usize>{{\n let a=&ctx.accounts;if a.quote_token_program.key()==anchor_spl::token::ID{{return Ok(165)}}\n"
SC={}
SC['V1']=HC+f" {RQ}.ok_or_else(||error!(PumpError::UnsupportedQuoteMint))\n}}\n"
SC['V2']=HC+f" match {RQ} {{Some(len)=>Ok(len),None=>err!(PumpError::UnsupportedQuoteMint)}}\n}}\n"
SC['V3']=HC+f" let Some(len)={RQ} else {{return err!(PumpError::UnsupportedQuoteMint)}};\n Ok(len)\n}}\n"
B=sub(P1,[("qsize__X(a)?","qsize__X(ctx)?")])
BV={}
BV['V1']=(B,SC['V1'])
BV['V2']=(B,SC['V2'])
BV['V3']=(B,SC['V3'])
# V4: also user binding style unchanged, bump read before seeds? keep. V4 = V1 with helper taking (ctx) but `#[inline]`
BV['V4']=(B,SC['V1'].replace("fn qsize__X","#[inline]\nfn qsize__X"))
# V5: V1 but size helper reads via ctx.accounts directly (no let a)
BV['V5']=(B,(f"fn qsize__X<'info>({CT})->Result<usize>{{\n if ctx.accounts.quote_token_program.key()==anchor_spl::token::ID{{return Ok(165)}}\n"
 " required_quote_account_len(&ctx.accounts.quote_mint.to_account_info().try_borrow_data()?).ok_or_else(||error!(PumpError::UnsupportedQuoteMint))\n}\n"))
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB6'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,(b,sz) in BV.items(): s+=b.replace('__X','_'+t)+sz.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
