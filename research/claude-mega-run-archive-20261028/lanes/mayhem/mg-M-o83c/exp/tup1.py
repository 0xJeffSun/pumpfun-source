import sys, subprocess, os, shutil
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools'); import evvar
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c'
lit=evvar.O79_LIT.replace('vt,et','et,vt')
SOLT='let (sol_amount,sol_vault_balance,state_sol_deployed,virtual_sol,global_sol_deployed,real_sol)=if native{(sol,a.sol_vault.lamports(),a.mayhem_state.field_56,a.bonding_curve.virtual_sol_reserves,a.global_params.sol_deployed,a.bonding_curve.real_sol_reserves)}else{(0,0,0,0,0,0)};'
QT='let (quote_vault_balance,state_quote_deployed,virtual_quote,global_quote_deployed,real_quote)=if native{(sol_vault_balance,state_sol_deployed,virtual_sol,global_sol_deployed,real_sol)}else{(a.mayhem_quote_token_vault.amount,a.mayhem_state.field_56,a.bonding_curve.virtual_sol_reserves,a.global_params.stable_deployed,a.bonding_curve.real_sol_reserves)};'
QM='let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};'
def mk(name,l1):
    d=evvar.make(name,evvar.CUR_LETS,lit)
    p=f'{d}/{evvar.F}'; ls=open(p).read().split('\n'); ls[395]=' '+l1; open(p,'w').write('\n'.join(ls))
    return d
V={'t01':SOLT+QT+QM}
for n,l1 in V.items():
    d=mk(n,l1)
    r=subprocess.run(['bash',L+'/tools/qbi.sh',n,d],capture_output=True,text=True).stdout.strip()
    print(n,r,flush=True)
