#!/usr/bin/env python3
"""h_mux.py <src_dir> <variants.py>: append holder execute variants (execute_<k>) to creator/distribute_fee_to_holders.rs
and dispatch from lib.rs by amounts.len() == 1000+i. variants.py: VARIANTS = {k: body_text} (full fn text, 'pub fn execute_{S}')."""
import sys, runpy
src, vf = sys.argv[1], sys.argv[2]
V = runpy.run_path(vf)['VARIANTS']
p = f'{src}/src/creator/distribute_fee_to_holders.rs'; t = open(p).read().rstrip('\n')
for k, body in V.items():
    t += '\n' + body.replace('{S}', k).rstrip('\n')
open(p, 'w').write(t + '\n')
lp = f'{src}/src/lib.rs'; lt = open(lp).read()
old = '->Result<()>{holder_distribution::execute(ctx,amounts)}'
assert lt.count(old) == 1
arms = ''.join(f'{1000+i}=>holder_distribution::execute_{k}(ctx,amounts),' for i, k in enumerate(V))
lt = lt.replace(old, '->Result<()>{match amounts.len(){' + arms + '_=>holder_distribution::execute(ctx,amounts)}}')
open(lp, 'w').write(lt)
print('variants', list(V))
