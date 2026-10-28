import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-brute-r1/tools')
import tx
H=tx.H
N=[['vb','sd','gd','rr','vr'],['vb','gd','sd','vr','rr'],['gd','vb','sd','rr','vr'],['sd','gd','vb','rr','vr'],['vb','rr','vr','gd','sd'],['rr','vr','sd','gd','vb'],['vb','gd','rr','vr','sd'],['gd','sd','vb','vr','rr'],['vr','rr','sd','gd','vb'],['vb','vr','rr','sd','gd']]
E=[['vb','gd','sd','rr','vr','mi'],['gd','vb','sd','vr','rr','mi'],['mi','gd','vb','sd','rr','vr'],['gd','vb','mi','sd','rr','vr'],['vb','gd','mi','rr','vr','sd'],['gd','sd','vb','rr','vr','mi'],['mi','vb','gd','sd','vr','rr'],['gd','vb','sd','mi','vr','rr']]
VARIANTS=[('base-copy',H,None)]
for n in N: VARIANTS.append(('nat-'+'.'.join(n),tx.nat(H,n),None))
for e in E: VARIANTS.append(('els-'+'.'.join(e),tx.els(H,e),None))
# structural: split per-field ifs
OLD=H[H.index(' let (sol_amount,sol_vault_balance'):H.index(' let event=SellEvent')]
S1=''' let vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};
 let global_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};
 let state_deployed=a.mayhem_state.field_56;let real_reserve=a.bonding_curve.real_sol_reserves;let virtual_reserve=a.bonding_curve.virtual_sol_reserves;
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};
 let (sol_amount,sol_vault_balance,global_sol_deployed,state_sol_deployed,virtual_sol,real_sol)=if native{(sol,vault_balance,global_deployed,state_deployed,virtual_reserve,real_reserve)}else{(0,0,0,0,0,0)};
 let (quote_vault_balance,global_quote_deployed,state_quote_deployed,virtual_quote,real_quote)=(vault_balance,global_deployed,state_deployed,virtual_reserve,real_reserve);
'''
VARIANTS.append(('split-ifs',tx.rep(H,OLD,S1),None))
S2=''' let (quote_mint,vault_balance,global_deployed)=if native{(Pubkey::default(),a.sol_vault.lamports(),a.global_params.sol_deployed)}else{(a.quote_mint.key(),a.mayhem_quote_token_vault.amount,a.global_params.stable_deployed)};
 let state_deployed=a.mayhem_state.field_56;let real_reserve=a.bonding_curve.real_sol_reserves;let virtual_reserve=a.bonding_curve.virtual_sol_reserves;
 let (sol_amount,sol_vault_balance,global_sol_deployed,state_sol_deployed,virtual_sol,real_sol)=if native{(sol,vault_balance,global_deployed,state_deployed,virtual_reserve,real_reserve)}else{(0,0,0,0,0,0)};
 let (quote_vault_balance,global_quote_deployed,state_quote_deployed,virtual_quote,real_quote)=(vault_balance,global_deployed,state_deployed,virtual_reserve,real_reserve);
'''
VARIANTS.append(('split-tuple2',tx.rep(H,OLD,S2),None))
# ---- batch 4 combos appended
C=tx.capref(H)
B4=[('capref',C),('capna',tx.capna(H)),('capref+letelse',tx.price_letelse(C)),('capref+mapErr',tx.cpi(C,'mapErr_')),
('capref+evlit',tx.ev_lit(C)),('capref+evphased',tx.ev_phased(C)),('capref+tupcodex+evphased',tx.ev_phased(tx.tup_codex(C))),
('capna+letelse+mapErr',tx.cpi(tx.price_letelse(tx.capna(H)),'mapErr_')),
('capref+letelse+mapErr+evphased',tx.ev_phased(tx.cpi(tx.price_letelse(C),'mapErr_'))),
('capref+letelse+mapErr+tupcodex+evphased',tx.ev_phased(tx.tup_codex(tx.cpi(tx.price_letelse(C),'mapErr_')))),
('capref+tupcodex+evlit',tx.ev_lit(tx.tup_codex(C))),
('capref+letelse+evphased',tx.ev_phased(tx.price_letelse(C)))]
VARIANTS+= [(l,t,None) for l,t in B4]
