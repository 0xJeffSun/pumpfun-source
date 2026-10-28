import sys,random; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-brute-r1/tools')
import t4
H=t4.H; BASEROOT=t4.BASEROOT
V=[('h4-copy',H)]
N=t4.NAMES
O79=['virtual_quote','global_sol_deployed','global_quote_deployed','sol_amount','state_quote_deployed','quote_vault_balance','sol_vault_balance','state_sol_deployed','virtual_sol','real_sol','real_quote']
QF=N[6:]+N[:6]
V+=[('arms-o79order',t4.arms(H,O79)),('arms-rev',t4.arms(H,N[::-1])),('arms-quotefirst',t4.arms(H,QF)),
    ('arms-nat-gd.sd.rr.vr.vb',t4.arms(H,N,('gd','sd','rr','vr','vb'))),('arms-els-vb.gd.sd.rr.vr',t4.arms(H,N,els=('vb','gd','sd','rr','vr')))]
random.seed(1)
for i in range(3):
    o=N[:]; random.shuffle(o); V.append(('arms-rand%d:'%i+','.join(x[:6] for x in o),t4.arms(H,o)))
CAPS=['h4','capfirst','capfirst-sel','capval-first','capfirst-inlinemax','capfirst-gpref','capfirst-match','capfirst-ifelse-assign']
APPEND=[('state.rs',t4.helpers(CAPS)+t4.helpers(['capfirst'],qt='&Pubkey'))]
for c in CAPS: V.append(('cap-'+c,t4.cap(H,c)))
V.append(('cap-capfirst-refpk',t4.cap(H,'capfirst',qt='&Pubkey')))
for k in ['letelse','okor','allmatch','h4-lowmatch','h4-pricematch','h4-vtvs-inside','h4-checks-split']:
    V.append(('price-'+k,t4.price(H,k)))
VARIANTS=[(l,t,None) for l,t in V]
