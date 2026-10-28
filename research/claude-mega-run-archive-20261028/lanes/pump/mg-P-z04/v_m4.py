import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1, v_d1
from v_m2 import V as CV, CALL_C
from v_ata1 import V as AV, CALL_T
from mux import mux
def rawify(txt, params):
    hdr_end=txt.index('{\n')
    h=txt[:hdr_end]; body=txt[hdr_end:]
    pre=''
    for p,ty in params:
        h=h.replace(f"{p}:&{ty}",f"{p}:*const {ty}")
        pre+=f" let {p}:&{ty}=unsafe{{&*{p}}};"
    return h+'{\n'+pre+'\n'+body[2:]
V={}
V['E1']=rawify(CV['C1'],[('mint',"InterfaceAccount<'info,Mint>")])
V['E2']=rawify(CV['C1'],[('account',"AccountInfo<'info>"),('wallet',"AccountInfo<'info>"),('mint',"InterfaceAccount<'info,Mint>"),('token_program',"AccountInfo<'info>")])
V['E3']=rawify(AV['A4'],[('mint',"InterfaceAccount<'info,Mint>")]).replace('create_token_account_v2__X','create_token_account_v2__X')
V['E4']=rawify(CV['C1'],[('account',"AccountInfo<'info>"),('wallet',"AccountInfo<'info>")])
CALLS={'E1':CALL_C,'E2':CALL_C,'E4':CALL_C,'E3':CALL_T}
def callfor(t):
    c=CALLS[t]
    if t=='E2': c=c.replace("&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program","&*a.pool_base_token_account as *const AccountInfo,&*a.pool as *const AccountInfo,&*a.base_mint as *const InterfaceAccount<Mint>,native,&*a.base_token_program as &AccountInfo as *const AccountInfo")
    elif t=='E4': c=c.replace("&a.pool_base_token_account,&a.pool,","&*a.pool_base_token_account as *const AccountInfo,&*a.pool as *const AccountInfo,")
    else: c=c.replace("&a.base_mint,","&*a.base_mint as *const InterfaceAccount<Mint>,")
    return c
if __name__=='__main__':
    d=v_r1.variant('M4')
    p=d+'/src/migrate_v2.rs'; s=open(p).read()
    old=v_r1.ATA_FN.split('\n')[1]  # keep
    arms=''.join(f"{101+i}=>{{{callfor(t).replace('__X','_'+t)}}}" for i,t in enumerate(V))
    s=s.replace(CALL_T.replace('__X',''),f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_T.replace('__X','')}}}}}",1)
    for t,txt in V.items(): s+=txt.replace('__X','_'+t)+'\n'
    open(p,'w').write(s); print(d,list(V))
