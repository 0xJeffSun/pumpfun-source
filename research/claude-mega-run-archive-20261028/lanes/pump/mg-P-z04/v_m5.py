import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1
from v_m2 import V as CV, CALL_C, CTXT
from v_ata1 import V as AV, CALL_T
WRAP_C=f"#[inline(never)]\nfn create_token_account_v2__X<'info>({CTXT},account:&UncheckedAccount<'info>,wallet:&UncheckedAccount<'info>,mint:&Box<InterfaceAccount<'info,Mint>>,native:bool,token_program:&Interface<'info,TokenInterface>)->Result<()>{{\n"
HDRC=CV['C1'].split('\n',2)[0]+'\n'+CV['C1'].split('\n',2)[1]+'\n'
def wrap(txt, pre_tp=" let a=&ctx.accounts;let token_program=token_program.to_account_info();"):
    body=txt.split('\n',2)[2]
    body=body.replace(" let a=&ctx.accounts;let token_program=token_program.clone();", pre_tp,1)
    head,sep,inner=body.partition('#[inline(always)]')
    head=head.replace('account.clone(),wallet.clone()','account.to_account_info(),wallet.to_account_info()')
    return WRAP_C+head+sep+inner
V={}
V['G1']=wrap(CV['C1'])
V['G2']=wrap(CV['C2'])
V['G3']=wrap(CV['C1']," let token_program=token_program.to_account_info();let a=&ctx.accounts;")
V['G4']=wrap(CV['C3'])
V['G5']=wrap(CV['C6'])
# G6: same params but mint deref'd to &InterfaceAccount inside inner calls explicitly
V['G6']=wrap(CV['C1']).replace("cta_signed__X(a,&a.bonding_curve,account,wallet,mint,","cta_signed__X(a,&a.bonding_curve,account,wallet,&**mint,")
CALL_OLD="create_token_account_v2(a,bump,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;"
CALL="create_token_account_v2__X(&ctx,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;"
if __name__=='__main__':
    d=v_r1.variant('M5'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{101+i}=>{{{CALL.replace('__X','_'+t)}}}" for i,t in enumerate(V))
    assert s.count(CALL_OLD)==1
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,txt in V.items(): s+=txt.replace('__X','_'+t)+'\n'
    open(p,'w').write(s); print(d,list(V))
