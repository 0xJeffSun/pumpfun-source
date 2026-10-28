import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b6, v_b3, re
V1B, V1S = v_b6.BV['V1']; sub=v_b3.sub
i=V1B.index(" let bump=ctx.bumps.pool_authority;let init=move |signer_seeds:&[&[&[u8]];1]|"); j=V1B.index("init(&[&[b\"pool-authority\",a.base_mint.key().as_ref(),&[bump]]])?;")
OLD=V1B[i:j+len("init(&[&[b\"pool-authority\",a.base_mint.key().as_ref(),&[bump]]])?;")]
CPI=V1B[V1B.index("pump_amm::cpi::init_boost(CpiContext::new_with_signer("):V1B.index(",signer_seeds));init(")]+",signer_seeds))"
BV={}
BV['Y1']=V1B.replace(OLD," let bump=ctx.bumps.pool_authority;let init=move||{let key=a.base_mint.key();let signer_seeds:&[&[&[u8]];1]=&[&[b\"pool-authority\",key.as_ref(),&[bump]]];"+CPI+"};init()?;")
#BV['Y3']=V1B.replace(OLD," let init=move|bump:u8|{let key=a.base_mint.key();let signer_seeds:&[&[&[u8]];1]=&[&[b\"pool-authority\",key.as_ref(),&[bump]]];"+CPI+"};init(ctx.bumps.pool_authority)?;")
BV['Y4']=V1B.replace(OLD," let bump=ctx.bumps.pool_authority;let key=a.base_mint.key();let init=move|signer_seeds:&[&[&[u8]];1]|"+CPI+";init(&[&[b\"pool-authority\",key.as_ref(),&[bump]]])?;")
BV['Y5']=V1B.replace(OLD," let bump=ctx.bumps.pool_authority;let init=move||{let signer_seeds:&[&[&[u8]];1]=&[&[b\"pool-authority\",&a.base_mint.key().to_bytes(),&[bump]]];"+CPI+"};init()?;")
BV['Y6']=V1B.replace(OLD," let bump=ctx.bumps.pool_authority;"+CPI.replace(",signer_seeds))",",&[&[b\"pool-authority\",a.base_mint.key().as_ref(),&[bump]]]))")+"?;")
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB9'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,b in BV.items(): s+=b.replace('__X','_'+t)+V1S.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
