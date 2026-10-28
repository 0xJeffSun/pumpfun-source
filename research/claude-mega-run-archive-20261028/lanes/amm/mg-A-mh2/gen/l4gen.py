# l4gen.py VARIANT : lane file = gen/mh_best_l20.rs + replacements for output_mint / loop-2 mint marker experiments
import sys
L='/Users/shawwalters/amm100-run/lanes/mg-A-mh2'
t=open(L+'/gen/mh_best_l20.rs').read()
def rep(a,b,n=1):
    global t
    assert t.count(a)==n,(a,t.count(a)); t=t.replace(a,b)
V=sys.argv[1]
for v in V.split('+'):
    if v=='k1': rep('            mint = output_mint;','            mint = output_mint.key();')
    elif v=='c1': rep('            mint = output_mint;','            mint = output_mint.clone();')
    elif v=='k2': rep('            mint = output_mints[i];','            mint = output_mints[i].key();')
    elif v=='k3': rep('amm_hop(&ctx, &mut hop, &mint, amount','amm_hop(&ctx, &mut hop, &mint.key(), amount')
    elif v=='k4': rep('            let output_mint = output_mints[end.saturating_sub(1)];','            let output_mint = output_mints[end.saturating_sub(1)].key();')
    elif v=='k5': rep('                    &output_mint,','                    &output_mint.key(),')
    elif v=='cf': rep('            mint = output_mint;','            mint.clone_from(&output_mint);')
    else: raise SystemExit('?'+v)
open(L+'/src/programs/pump-amm/src/instructions/swap/multi_hop_swap.rs','w').write(t); print('ok',V)
