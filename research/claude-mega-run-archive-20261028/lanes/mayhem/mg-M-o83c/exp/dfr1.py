import sys, subprocess
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools'); import evvar, tupgen
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c'
lit=evvar.O79_LIT.replace('vt,et','et,vt')
N={'sa':'sol_amount','svb':'sol_vault_balance','ssd':'state_sol_deployed','vs':'virtual_sol','gsd':'global_sol_deployed','rs':'real_sol',
   'qvb':'quote_vault_balance','sqd':'state_quote_deployed','vq':'virtual_quote','gqd':'global_quote_deployed','rq':'real_quote'}
NAT={'sa':'sol','svb':'a.sol_vault.lamports()','ssd':'a.mayhem_state.field_56','vs':'a.bonding_curve.virtual_sol_reserves','gsd':'a.global_params.sol_deployed','rs':'a.bonding_curve.real_sol_reserves',
     'qvb':'sol_vault_balance','sqd':'state_sol_deployed','vq':'virtual_sol','gqd':'global_sol_deployed','rq':'real_sol'}
NON={'sa':'0','svb':'0','ssd':'0','vs':'0','gsd':'0','rs':'0','qvb':'a.mayhem_quote_token_vault.amount','sqd':'a.mayhem_state.field_56',
     'vq':'a.bonding_curve.virtual_sol_reserves','gqd':'a.global_params.stable_deployed','rq':'a.bonding_curve.real_sol_reserves'}
def line(decl,nat,non,style='sep'):
    d=decl.split(',')
    if style=='sep': D=''.join(f'let {N[k]};' for k in d)
    else: D='let ('+','.join(N[k] for k in d)+');'
    A=''.join(f'{N[k]}={NAT[k]};' for k in nat.split(','))
    B=''.join(f'{N[k]}={NON[k]};' for k in non.split(','))
    return D+'if native{'+A+'}else{'+B+'}'+tupgen.QM
def mk(name,l1):
    d=evvar.make(name,evvar.CUR_LETS,lit)
    p=f'{d}/{evvar.F}'; ls=open(p).read().split('\n'); ls[395]=' '+l1; open(p,'w').write('\n'.join(ls))
    return d
if __name__=='__main__':
    for arg in sys.argv[1:]:
        n,decl,nat,non,style=arg.split('|')
        d=mk(n,line(decl,nat,non,style))
        r=subprocess.run(['bash',L+'/tools/qbi.sh',n,d],capture_output=True,text=True).stdout.strip().replace('\n',' | ')
        print(n,'::',r.replace('.sroa.0.0',''),flush=True)
