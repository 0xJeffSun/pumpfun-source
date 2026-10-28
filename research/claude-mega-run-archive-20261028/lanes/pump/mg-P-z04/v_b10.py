import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b6, v_b9
V1B, V1S = v_b6.BV['V1']; OLD=v_b9.OLD; CPI=v_b9.CPI
PRE=" let bump=ctx.bumps.pool_authority;let init=move||{let key=a.base_mint.key();"
BV={}
BV['Y8']=V1B.replace(OLD,PRE+"let signer_seeds=&[&[b\"pool-authority\",key.as_ref(),&[bump]][..]];"+CPI+"};init()?;")
BV['Y9']=V1B.replace(OLD,PRE+"let inner:[&[u8];3]=[b\"pool-authority\",key.as_ref(),&[bump]];let signer_seeds=&[&inner[..]];"+CPI+"};init()?;")
BV['Y10']=V1B.replace(OLD,PRE+"let signer_seeds=&[&[b\"pool-authority\",key.as_ref(),&[bump]]];"+CPI+"};init()?;")
BV['Y12']=V1B.replace(OLD,PRE+"(move|signer_seeds:&[&[&[u8]];1]|"+CPI+")(&[&[b\"pool-authority\",key.as_ref(),&[bump]]])};init()?;")
BV['Y13']=V1B.replace(OLD,PRE+CPI.replace(",signer_seeds))",",&[&[b\"pool-authority\",key.as_ref(),&[bump]]]))")+"};init()?;")
BV['Y14']=V1B.replace(OLD," let bump=ctx.bumps.pool_authority;let init=move||{let key=a.base_mint.key();let signer_seeds:&[&[&[u8]];1]=&[&[b\"pool-authority\",key.as_ref(),&[bump]]];"+CPI+"};init()?;").replace("let init=move||{","let init=||{")
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB10'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,b in BV.items(): s+=b.replace('__X','_'+t)+V1S.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
