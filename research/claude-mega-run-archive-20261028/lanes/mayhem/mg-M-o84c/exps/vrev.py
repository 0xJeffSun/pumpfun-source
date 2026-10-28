import re
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c'
BASEROOT=L+'/roots/c4'
HDR=open(L+'/tools/handler_c4.txt').read()
QVB="let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};"
SQD="let state_quote_deployed=a.mayhem_state.field_56;"
GSD="let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};"
VQ="let virtual_quote=a.bonding_curve.virtual_sol_reserves;"
GQD="let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};"
RQ="let real_quote=a.bonding_curve.real_sol_reserves;"
SA="let sol_amount=if native{sol}else{0};"
SVB="let sol_vault_balance=if native{quote_vault_balance}else{0};"
SSD="let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};"
VS="let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};"
RS="let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};"
ORDER=[QVB,SQD,GSD,VQ,GQD,RQ,SA,SVB,SSD,VS,RS]
OLD=" "+"".join(ORDER)
assert HDR.count(OLD)==1
SVBr="let sol_vault_balance=if native{a.sol_vault.lamports()}else{0};"
QVBr="let quote_vault_balance=if native{sol_vault_balance}else{a.mayhem_quote_token_vault.amount};"
QM=" let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};\n"
assert HDR.count(QM)==1
def lets(seq): return HDR.replace(OLD," "+"".join(seq))
V=[('base', HDR)]
V.append(('rev_last', lets([SQD,GSD,VQ,GQD,RQ,SA,SVBr,SSD,VS,RS,QVBr])))
V.append(('rev_svb0_qvb_last', lets([SVBr,SQD,GSD,VQ,GQD,RQ,SA,SSD,VS,RS,QVBr])))
V.append(('rev_svb0_qvb1', lets([SVBr,QVBr,SQD,GSD,VQ,GQD,RQ,SA,SSD,VS,RS])))
V.append(('rev_inplace', lets([SQD,GSD,VQ,GQD,RQ,SA,SVBr,QVBr,SSD,VS,RS])))
for k in range(1,11):
    seq=[SVBr]+[x for x in [SQD,GSD,VQ,GQD,RQ,SA,SSD,VS,RS]]
    seq.insert(k,QVBr)
    V.append((f'rev_svb0_qvb@{k}', lets(seq)))
# quote_mint let placement
h=HDR.replace(QM,"\n"); V.append(('qm_before_lets', h.replace(OLD, " let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};"+OLD.strip() if False else OLD).replace(" "+QVB, " let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};"+QVB,1)))
# block-let event
m=re.search(r' let event=SellEvent\{(.*?)\};\n',HDR); lit=m.group(0)
blk=HDR.replace(OLD,"").replace(QM,"").replace(lit," let event={"+OLD.strip()+QM.strip()+"SellEvent{"+m.group(1)+"}};\n")
V.append(('block_let', blk))
VARIANTS=[(l,t,None) for l,t in V]
