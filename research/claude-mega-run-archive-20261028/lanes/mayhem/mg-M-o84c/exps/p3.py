import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/exps'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
from p1 import perm, n
# seed: end2 (quote_vault_balance -> last). try moving a 2nd phi to various spots.
SEED=[0,1,3,4,5,6,7,8,9,10,11,12,2]
def mv2(i, pos):
    def f(b):
        o=[x for x in SEED if x!=i]; o.insert(pos, i); return perm(b,o)
    return f
EXPS=[('seed', lambda b: perm(b, SEED))]
for i in [0,1,8,9,10,11,12]:
    for pos in range(13):
        EXPS.append((f'{i}@{pos}', mv2(i,pos)))
