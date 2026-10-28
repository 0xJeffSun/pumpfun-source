import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_b6, v_b3
V1B, V1S = v_b6.BV['V1']; sub=v_b3.sub
TAIL=" let after_balance=a.pool_authority.lamports();let user=a.user.to_account_info();\n refund_pool_authority(a,bump,&user,after_balance.saturating_sub(initial_balance))?;\n crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,initial_balance.saturating_sub(after_balance))?;\n Ok(())\n}"
assert TAIL in V1B
SETTLE_BODY=" let after_balance=a.pool_authority.lamports();let user=a.user.to_account_info();\n refund_pool_authority(a,bump,&user,after_balance.saturating_sub(initial_balance))?;\n crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,initial_balance.saturating_sub(after_balance))?;\n Ok(())\n}\n"
SETTLE_A="fn settle__X<'info>(a:&MigrateV2<'info>,bump:u8,initial_balance:u64)->Result<()>{\n"+SETTLE_BODY
CT="ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>"
SETTLE_C=f"fn settle__X<'info>({CT},bump:u8,initial_balance:u64)->Result<()>{{\n let a=&ctx.accounts;\n"+SETTLE_BODY
BV={}
BV['W1']=(sub(V1B,[(TAIL," settle__X(a,bump,initial_balance)\n}")]), V1S+SETTLE_A)
BV['W2']=(sub(V1B,[(TAIL," settle__X(a,bump,initial_balance)\n}")]), V1S+"#[inline(always)]\n"+SETTLE_A)
BV['W3']=(sub(V1B,[(TAIL," settle__X(ctx,bump,initial_balance)\n}")]), V1S+SETTLE_C)
BV['W4']=(sub(V1B,[(TAIL," settle__X(a,bump,initial_balance)?;\n Ok(())\n}")]), V1S+SETTLE_A)
BV['W5']=(sub(V1B,[(TAIL," settle__X(ctx,bump,initial_balance)?;\n Ok(())\n}")]), V1S+SETTLE_C)
BV['W6']=(sub(V1B,[(TAIL," settle__X(a,bump,initial_balance)\n}")]), V1S+"#[inline]\n"+SETTLE_A)
CALL_OLD="init_pump_amm_boost_v2(&ctx)?;"
if __name__=='__main__':
    d=v_r1.variant('MB7'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{301+i}=>{{init_pump_amm_boost_v2_{t}(&ctx)?;}}" for i,t in enumerate(BV))
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,(b,sz) in BV.items(): s+=b.replace('__X','_'+t)+sz.replace('__X','_'+t)
    open(p,'w').write(s); print(d,list(BV))
