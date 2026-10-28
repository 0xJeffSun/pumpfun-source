import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b6, v_b9, v_b10
V1B, V1S = v_b6.BV['V1']
Y1=v_b9.BV['Y1']
REF=" refund_pool_authority(a,bump,&user,after_balance.saturating_sub(initial_balance))?;\n"
assert REF in Y1
TR=" crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,initial_balance.saturating_sub(after_balance))?;\n"
assert TR in Y1
BV={k:v_b10.BV[k] for k in ('Y9','Y12','Y13','Y14')}
BV['Z1']=Y1.replace(REF," if let Err(e)=refund_pool_authority(a,bump,&user,after_balance.saturating_sub(initial_balance)){return Err(e);}\n")
BV['Z3']=Y1.replace(REF," match refund_pool_authority(a,bump,&user,after_balance.saturating_sub(initial_balance)){Ok(())=>{},Err(e)=>return Err(e)}\n")
BV['Z4']=Y1.replace(REF," let refunded=refund_pool_authority(a,bump,&user,after_balance.saturating_sub(initial_balance));refunded?;\n")
BV['Z5']=Y1.replace(REF," let refund=after_balance.saturating_sub(initial_balance);let shortfall=initial_balance.saturating_sub(after_balance);\n refund_pool_authority(a,bump,&user,refund)?;\n").replace(TR," crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,shortfall)?;\n")
BV['Z6']=Y1.replace("init()?;","let r=init();r?;")
BV['Z7']=Y1.replace("init()?;","if let Err(e)=init(){return Err(e);}")
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB11'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,b in BV.items(): s+=b.replace('__X','_'+t)+V1S.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
