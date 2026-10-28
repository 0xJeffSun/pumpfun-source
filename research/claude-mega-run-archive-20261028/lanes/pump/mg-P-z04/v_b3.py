import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b1, v_b2
K1=v_b2.BV['K1'][0]; S1=v_b1.SV['B1']
def sub(t, pairs):
    for o,n in pairs:
        assert o in t, o[:60]; t=t.replace(o,n,1)
    return t
RENT=" let rent=Rent::get()?;\n let funding=rent.minimum_balance(qsize__X(a)?);\n"
BUMP_LINE=" let bump=ctx.bumps.pool_authority;let init="
INIT_START=" let bump=ctx.bumps.pool_authority;let init=move |signer_seeds:&[&[&[u8]];1]|pump_amm::cpi::init_boost("
AFTER=" let after_balance=a.pool_authority.lamports();let user=a.user.to_account_info();\n"
BV={}
BV['P1']=(sub(K1,[(RENT," let funding=Rent::get()?.minimum_balance(qsize__X(a)?);\n")]),S1)
BV['P2']=(sub(K1,[(RENT," let rent=Rent::get()?;\n let size=qsize__X(a)?;\n let funding=rent.minimum_balance(size);\n")]),S1)
BV['P3']=(sub(K1,[(BUMP_LINE," let init="),(" let a=&ctx.accounts;\n"," let a=&ctx.accounts;let bump=ctx.bumps.pool_authority;\n")]),S1)
BV['P4']=(sub(K1,[(AFTER," let after_balance=a.pool_authority.lamports();\n"),(" let initial_balance="," let user=a.user.to_account_info();\n let initial_balance=")]),S1)
BV['P5']=(sub(K1,[(AFTER," let user=a.user.to_account_info();let after_balance=a.pool_authority.lamports();\n")]),S1)
BV['P6']=(sub(K1,[(" let a=&ctx.accounts;\n if a.bonding_curve.is_mayhem_mode{return Ok(());}\n"," if ctx.accounts.bonding_curve.is_mayhem_mode{return Ok(());}\n let a=&ctx.accounts;\n")]),S1)
BV['P7']=(sub(K1,[(" let initial_balance=a.pool_authority.lamports();\n let rent=Rent::get()?;\n"," let rent=Rent::get();let initial_balance=a.pool_authority.lamports();\n let rent=rent?;\n")]),S1)
BV['P8']=(sub(K1,[(RENT," let rent=Rent::get()?;\n let funding=rent.minimum_balance(qsize__X(a)?);\n let system_program=a.system_program.as_ref();\n"),("transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,funding)","transfer_native(system_program,&a.user,&a.pool_authority,funding)")]),S1)
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB3'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,(b,sz) in BV.items(): s+=b.replace('__X','_'+t)+sz.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
