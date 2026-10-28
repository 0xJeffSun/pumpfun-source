import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/exps'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
from p1 import perm, n
BASE=[0,1,3,4,5,6,7,8,9,10,11,12,2]   # end2
def mv(i, pos):
    def f(b):
        o=[x for x in BASE if x!=i]; o.insert(pos, i); return perm(b, o)
    return f
EXPS=[('base_end2', lambda b: perm(b, BASE))]
for i in range(13):
    if i==2: continue
    EXPS.append((f'{i}front', mv(i,0)))
    EXPS.append((f'{i}end', mv(i,12)))
    EXPS.append((f'{i}pen', mv(i,11)))
