"""Event-statement variant generator for buy_v2_handler (pump_interface_v2.rs lines 396-397 in c1v).
evvar.py make NAME LETS_ORDER LIT_ORDER  -> roots/NAME (copy of c1v with lines 396/397 replaced)
LETS_ORDER / LIT_ORDER: comma lists of short keys. Keys below."""
import sys, os, shutil, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c'
BASE=L+'/roots/g01'
F='programs/mayhem/src/instructions/pump_interface_v2.rs'
LETS={
 'qvb':'let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};',
 'sqd':'let state_quote_deployed=a.mayhem_state.field_56;',
 'gsd':'let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};',
 'vq':'let virtual_quote=a.bonding_curve.virtual_sol_reserves;',
 'rq':'let real_quote=a.bonding_curve.real_sol_reserves;',
 'gqd':'let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};',
 'sa':'let sol_amount=if native{sol}else{0};',
 'svb':'let sol_vault_balance=if native{quote_vault_balance}else{0};',
 'ssd':'let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};',
 'vs':'let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};',
 'rs':'let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};',
 'qm':'let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};',
}
LIT={
 'side':'side:false','sv':'sol_vault:a.sol_vault.key()','mint':'mint:a.mint.key()','sa':'sol_amount','ta':'token_amount:tokens',
 'svb':'sol_vault_balance','tvb':'token_vault_balance:a.mayhem_base_token_vault.amount','ssd':'state_sol_deployed',
 'stn':'state_token_net:a.mayhem_state.field_72','vs':'virtual_sol','vt':'virtual_tokens:a.bonding_curve.virtual_token_reserves',
 'gsd':'global_sol_deployed','et':'end_timestamp:a.mayhem_state.end_timestamp','ts':'timestamp:Clock::get()?.unix_timestamp',
 'rs':'real_sol','rt':'real_tokens:a.bonding_curve.real_token_reserves','ver':'version:a.global_params.version',
 'rrb':'retained_reserve_bps','qa':'quote_amount:sol','qvb':'quote_vault_balance','sqd':'state_quote_deployed',
 'vq':'virtual_quote','gqd':'global_quote_deployed','rq':'real_quote','qm':'quote_mint',
}
CUR_LETS='qvb,sqd,gsd,vq,rq,gqd,sa,svb,ssd,vs,rs,qm'
CUR_LIT='side,sv,mint,sa,ta,svb,tvb,ssd,stn,vs,vt,gsd,et,ts,rs,rt,ver,rrb,qa,qvb,sqd,vq,gqd,rq,qm'
O79_LIT='side,qvb,sqd,gsd,vq,rq,gqd,sa,svb,ssd,vs,rs,sv,mint,ta,tvb,stn,vt,et,ts,rt,ver,rrb,qa,qm'
def render(lets,lit,overrides=None):
    LL=dict(LETS); LL.update(overrides or {})
    l1=' '+''.join(LL[k] for k in lets.split(','))
    l2=' let event=SellEvent{'+','.join(LIT[k] for k in lit.split(','))+'};'
    return l1,l2
def make(name,lets,lit,overrides=None,base=BASE):
    d=f'{L}/roots/{name}'
    if os.path.exists(d): shutil.rmtree(d)
    subprocess.run(['cp','-c','-R',base,d],check=True)
    p=f'{d}/{F}'; ls=open(p).read().split('\n')
    assert ls[395].startswith(' let quote_vault_balance') and ls[396].startswith(' let event=SellEvent{'),(ls[395][:40],ls[396][:40])
    ls[395],ls[396]=render(lets,lit,overrides)
    open(p,'w').write('\n'.join(ls))
    return d
if __name__=='__main__':
    if sys.argv[1]=='make': print(make(sys.argv[2],sys.argv[3],sys.argv[4]))
    elif sys.argv[1]=='check':
        l1,l2=render(CUR_LETS,CUR_LIT); ls=open(f'{BASE}/{F}').read().split('\n')
        print('lets same', ls[395]==l1, 'lit same', ls[396]==l2)
