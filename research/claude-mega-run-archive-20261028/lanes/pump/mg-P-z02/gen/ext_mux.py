#!/usr/bin/env python3
"""ext_mux.py <src_dir> <variants.py>: append multiplexed extend::execute variants to src/extend_account.rs and
route lib.rs extend_account dispatcher by remaining_accounts.len() (1..N). Each variant gets its own copy of
get_account_size (suffix) so single-caller inlining stays the same. variants.py defines VARIANTS = {suffix: body}
where body uses {S} for the suffix (helper names)."""
import sys, re, runpy
src, vf = sys.argv[1], sys.argv[2]
V = runpy.run_path(vf)['VARIANTS']
p = f'{src}/src/extend_account.rs'; t = open(p).read()
m = re.search(r'fn get_account_size\(account: &AccountInfo\) -> Result<usize> \{.*?\n\}\n', t, re.S)
gas = m.group(0)
gas_compact = '\n'.join(l for l in gas.split('\n') if 'layout-pad' not in l)
out = [t.rstrip('\n')]
for k, body in V.items():
    out.append(gas_compact.replace('fn get_account_size(', f'fn get_account_size_{k}('))
    out.append(body.replace('{S}', k))
open(p, 'w').write('\n'.join(out) + '\n')
lp = f'{src}/src/lib.rs'; lt = open(lp).read()
old = 'pub fn extend_account(ctx:Context<ExtendAccount>)->Result<()>{extend::execute(ctx)}'
assert old in lt
arms = ''.join(f'{i+1}=>extend::execute_{k}(ctx),' for i, k in enumerate(V))
lt = lt.replace(old, 'pub fn extend_account(ctx:Context<ExtendAccount>)->Result<()>{match ctx.remaining_accounts.len(){' + arms + '_=>extend::execute(ctx)}}')
open(lp, 'w').write(lt)
print('variants', list(V))
