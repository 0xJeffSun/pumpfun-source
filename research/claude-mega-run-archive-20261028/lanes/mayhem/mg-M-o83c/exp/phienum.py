"""Enumerate constrained event-join phi orders on an IR (second group fixed sa,rs,gsd,vs,ssd,svb; each first before its second).
usage: phienum.py IR TAG [SEC=comma list]"""
import sys, json, os
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools')
import irlib
from concurrent.futures import ProcessPoolExecutor
IR,TAG=sys.argv[1],sys.argv[2]
SEC=(sys.argv[3] if len(sys.argv)>3 else 'sa,rs,gsd,vs,ssd,svb').split(',')
FULL={'qvb':'quote_vault_balance','sqd':'state_quote_deployed','gsd':'global_sol_deployed','vq':'virtual_quote','rq':'real_quote',
 'gqd':'global_quote_deployed','sa':'sol_amount','svb':'sol_vault_balance','ssd':'state_sol_deployed','vs':'virtual_sol','rs':'real_sol'}
FIRST={'svb':'qvb','ssd':'sqd','vs':'vq','rs':'rq','gsd':'gqd'}
def gen():
    def rec(seq,rem):
        if not rem: yield seq; return
        f=rem[0]; s=[k for k,v in FIRST.items() if v==f][0]; lim=seq.index(s)
        for i in range(lim+1): yield from rec(seq[:i]+[f]+seq[i:],rem[1:])
    yield from rec(SEC[:],list(FIRST.values()))
def ev(args):
    order,lab=args
    pre,h,post=irlib.load(IR)
    names=irlib.phi_names(h,'bb66'); ptrs=[n for n in names if not n.endswith('.sroa.0.0')]
    full=ptrs+[FULL[k]+'.sroa.0.0' for k in order]
    r=irlib.run(IR,irlib.set_phi_order(h,'bb66',full),lab)
    return order,r
if __name__=='__main__':
    orders=list(gen()); print('n',len(orders),flush=True)
    out=open(f'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/exp/{TAG}.jsonl','w')
    best=None
    with ProcessPoolExecutor(4) as ex:
        for k,(o,r) in enumerate(ex.map(ev,[(o,f'{TAG}-{i}') for i,o in enumerate(orders)],chunksize=4)):
            out.write(json.dumps({'o':o,'r':r})+'\n'); out.flush()
            if r and (best is None or (r[2],r[1],r[0])<(best[1][2],best[1][1],best[1][0])):
                best=(o,r); print(k,'best',r,','.join(o),flush=True)
            if r and r[0]==0 and r[1]==0 and r[2]==0: print('EXACT',','.join(o),flush=True)
    print('done',best,flush=True)
