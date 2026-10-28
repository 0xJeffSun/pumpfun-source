"""Greedy single-move search over the phi order of a join block. usage: phisearch.py IR BLOCK TAG"""
import sys, os, json
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools')
import irlib
from concurrent.futures import ProcessPoolExecutor
IR,BLK,TAG=sys.argv[1],sys.argv[2],sys.argv[3]
def ev(args):
    order,lab=args
    pre,h,post=irlib.load(IR)
    h2=irlib.set_phi_order(h,BLK,order)
    return irlib.run(IR,h2,lab)
def key(r): return (r[2],r[1],r[0]) if r else (9999,9999,9999)
if __name__=='__main__':
    pre,h,post=irlib.load(IR)
    cur=irlib.phi_names(h,BLK); best=ev((cur,TAG+'-base')); print('base',best,flush=True)
    seen={tuple(cur)}
    it=0
    while True:
        it+=1; cands=[]
        for i in range(len(cur)):
            for j in range(len(cur)):
                if i==j: continue
                o=cur[:i]+cur[i+1:]; o.insert(j,cur[i])
                if tuple(o) in seen: continue
                seen.add(tuple(o)); cands.append(o)
        with ProcessPoolExecutor(4) as ex:
            res=list(ex.map(ev,[(o,f'{TAG}-{it}-{k}') for k,o in enumerate(cands)]))
        bi=min(range(len(cands)),key=lambda k:key(res[k]))
        print('iter',it,'best',res[bi],'n',len(cands),flush=True)
        if key(res[bi])<key(best):
            best=res[bi]; cur=cands[bi]; print(' order',cur,flush=True)
            json.dump({'order':cur,'score':best},open(f'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/exp/{TAG}.json','w'))
        else: break
    print('final',best,cur)
