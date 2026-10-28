import sys,glob,os
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-brute-r1/tools')
import irx,evo
for p in sys.argv[1:]:
    try:
        c=evo.code_of(p); sc=irx.score(c); ev=evo.order(c)[1]
        e=' '.join(x for x in ev if '+' not in x)
        print(sc[3],sc[0],sc[2],p.split('/')[-3],e,flush=True)
    except Exception as ex: print('ERR',p.split('/')[-3],repr(ex)[:60])
