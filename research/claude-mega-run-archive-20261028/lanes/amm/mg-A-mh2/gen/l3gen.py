# l3gen.py VARIANT : lane file = gen/mh_best_l20.rs with mint2/output_mint source variants (line-neutral replacements)
import sys
L='/Users/shawwalters/amm100-run/lanes/mg-A-mh2'
t=open(L+'/gen/mh_best_l20.rs').read()
v=sys.argv[1]
def rep(a,b,n=1):
    global t
    assert t.count(a)==n,(a,t.count(a)); t=t.replace(a,b)
if v=='a':   # mint = output_mints[end-1] again after curve_run
    rep('            mint = output_mint;','            mint = output_mints[end.saturating_sub(1)];')
elif v=='c': # no output_mint local
    rep('            let output_mint = output_mints[end.saturating_sub(1)];','')
    rep('                    &output_mint,','                    &output_mints[end.saturating_sub(1)],')
    rep('            mint = output_mint;','            mint = output_mints[end.saturating_sub(1)];')
elif v=='d': # output_mint by reference
    rep('            let output_mint = output_mints[end.saturating_sub(1)];','            let output_mint = &output_mints[end.saturating_sub(1)];')
    rep('                    &output_mint,','                    output_mint,')
    rep('            mint = output_mint;','            mint = *output_mint;')
elif v=='e': # loop-2 mint declared mutable without init then assigned
    rep('    let mut mint = ctx.accounts.user_in_token_account.mint;','    let mut mint: Pubkey = ctx.accounts.user_in_token_account.mint.key();')
else: raise SystemExit('?')
open(L+'/src/programs/pump-amm/src/instructions/swap/multi_hop_swap.rs','w').write(t); print('ok',v)
