import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
import v_r1
from v_m2 import V as CV
from v_ata1 import V as AV
def hdr_sub(txt, pairs):
    h, sep, rest = txt.partition('{\n')
    for o,n in pairs:
        assert o in h, o; h=h.replace(o,n,1)
    return h+sep+rest
MB=("mint:&InterfaceAccount<'info,Mint>","mint:&Box<InterfaceAccount<'info,Mint>>")
TPI=("token_program:&AccountInfo<'info>","token_program:&Interface<'info,TokenInterface>")
V={}
V['H1']=hdr_sub(CV['C1'],[MB])
V['H3']=hdr_sub(CV['C1'],[MB,TPI]).replace("let token_program=token_program.clone();","let token_program=token_program.to_account_info();",1)
V['H5']=hdr_sub(CV['C2'],[MB])
V['H6']=hdr_sub(CV['C3'],[MB])
V['H7']=hdr_sub(CV['C6'],[MB])
V['H2']=hdr_sub(AV['A4'],[MB])
CALL_OLD="create_token_account_v2(a,bump,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;"
CALLC="create_token_account_v2__X(&ctx,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;"
CALLA="create_token_account_v2__X(a,bump,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;"
if __name__=='__main__':
    d=v_r1.variant('M6'); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    arms=''.join(f"{101+i}=>{{{(CALLA if t=='H2' else CALLC).replace('__X','_'+t)}}}" for i,t in enumerate(V))
    assert s.count(CALL_OLD)==1
    s=s.replace(CALL_OLD,f"match ctx.remaining_accounts.len() {{{arms}_=>{{{CALL_OLD}}}}}",1)
    for t,txt in V.items(): s+=txt.replace('__X','_'+t)+'\n'
    open(p,'w').write(s); print(d,list(V))
