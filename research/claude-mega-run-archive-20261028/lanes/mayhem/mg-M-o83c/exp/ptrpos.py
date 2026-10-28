import sys, json
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools')
import irlib
from concurrent.futures import ProcessPoolExecutor
IR='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/ir/g01i.ll'
FULL={'qvb':'quote_vault_balance','sqd':'state_quote_deployed','gsd':'global_sol_deployed','vq':'virtual_quote','rq':'real_quote',
 'gqd':'global_quote_deployed','sa':'sol_amount','svb':'sol_vault_balance','ssd':'state_sol_deployed','vs':'virtual_sol','rs':'real_sol'}
def ev(args):
    order,lab=args
    pre,h,post=irlib.load(IR)
    full=[o if o.startswith('_') else FULL[o]+'.sroa.0.0' for o in order]
    return order,irlib.run(IR,irlib.set_phi_order(h,'bb66',full),lab)
if __name__=='__main__':
    base=sys.argv[1].split(',')   # without ptrs
    cands=[]
    n=len(base)
    for i in range(n+1):
        for j in range(n+2):
            o=base[:i]+['_257']+base[i:]
            o=o[:j]+['_255']+o[j:]
            cands.append(o)
    with ProcessPoolExecutor(4) as ex:
        for o,r in ex.map(ev,[(o,f'pp-{k}') for k,o in enumerate(cands)]):
            print(r,','.join(o),flush=True)
