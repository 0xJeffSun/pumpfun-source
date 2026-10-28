import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b1
B=v_b1.B
OLD_TAIL=" let after_balance=a.pool_authority.lamports();\n refund_pool_authority(a,bump,&a.user.to_account_info(),after_balance.saturating_sub(initial_balance))?;\n crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,initial_balance.saturating_sub(after_balance))\n}"
assert OLD_TAIL in B, 'tail'
K1_TAIL=" let after_balance=a.pool_authority.lamports();let user=a.user.to_account_info();\n refund_pool_authority(a,bump,&user,after_balance.saturating_sub(initial_balance))?;\n crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,initial_balance.saturating_sub(after_balance))?;\n Ok(())\n}"
K2_TAIL=K1_TAIL.replace("initial_balance.saturating_sub(after_balance))?;\n Ok(())\n}","initial_balance.saturating_sub(after_balance))\n}")
BV={}
BV['K1']=(B.replace(OLD_TAIL,K1_TAIL), v_b1.SV['B1'])
BV['K2']=(B.replace(OLD_TAIL,K2_TAIL), v_b1.SV['B1'])
BV['K3']=(B.replace(OLD_TAIL,K1_TAIL), v_b1.SV['B2'])
BV['K4']=(B.replace(OLD_TAIL,K1_TAIL), v_b1.SV['B3'])
BV['K5']=(B.replace(OLD_TAIL,K1_TAIL), v_b1.SV['B5'])
BV['K6']=(B.replace(OLD_TAIL,K1_TAIL), v_b1.SV['B1'].replace("fn qsize__X","#[inline(always)]\nfn qsize__X"))
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB2'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,(b,sz) in BV.items(): s+=b.replace('__X','_'+t)+sz.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
