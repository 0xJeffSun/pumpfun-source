import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b6, v_b9
V1B, V1S = v_b6.BV['V1']; OLD=v_b9.OLD; CPI=v_b9.CPI
SEEDS="&[&[b\"pool-authority\",a.base_mint.key().as_ref(),&[bump]]]"
FN=("fn cpi_init_boost__X<'info>(a:&MigrateV2<'info>,boost:&AccountInfo<'info>,vault:&AccountInfo<'info>,signer_seeds:&[&[&[u8]];1])->Result<()>{\n "
    +CPI+"\n}\n")
BV={}
BV['Y15']=(V1B.replace(OLD," let bump=ctx.bumps.pool_authority;let init=move||(move|signer_seeds:&[&[&[u8]];1]|"+CPI+")("+SEEDS+");init()?;"),'')
BV['Y16']=(V1B.replace(OLD," let bump=ctx.bumps.pool_authority;let init=move||cpi_init_boost__X(a,boost,vault,"+SEEDS+");init()?;"),FN)
BV['Y17']=(V1B.replace(OLD," let bump=ctx.bumps.pool_authority;let init=move||cpi_init_boost__X(a,boost,vault,"+SEEDS+");init()?;"),"#[inline(always)]\n"+FN)
BV['Y18']=(V1B.replace(OLD," let bump=ctx.bumps.pool_authority;let init=move||{let r=cpi_init_boost__X(a,boost,vault,"+SEEDS+");r};init()?;"),FN)
BV['Y19']=(V1B.replace(OLD," let bump=ctx.bumps.pool_authority;let init=move||{cpi_init_boost__X(a,boost,vault,"+SEEDS+")};init()?;"),"#[inline]\n"+FN)
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB12'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,(b,f) in BV.items(): s+=b.replace('__X','_'+t)+V1S.replace('__X','_'+t)+f.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
