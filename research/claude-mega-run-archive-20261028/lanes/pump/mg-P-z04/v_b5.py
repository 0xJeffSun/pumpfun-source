import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b1, v_b3
P1=v_b3.BV['P1'][0]; SV=v_b1.SV
def attr(s, a): return s.replace("fn qsize__X", a+"fn qsize__X",1)
BV={}
BV['T1']=(P1, attr(SV['B1'],"pub "))
BV['T2']=(P1, attr(SV['B2'],"#[inline(always)]\n"))
BV['T3']=(P1, attr(SV['B3'],"#[inline(always)]\n"))
BV['T5']=(P1, attr(SV['B1'],"#[inline]\n"))
BV['T6']=(P1, attr(SV['B1'],"#[inline]\npub "))
BV['T8']=(P1, attr(SV['B7'],"#[inline(always)]\n"))
BV['T9']=(P1, attr(SV['B2'],"pub "))
BV['T10']=(P1, attr(SV['B3'],"pub "))
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB5'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,(b,sz) in BV.items(): s+=b.replace('__X','_'+t)+sz.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
