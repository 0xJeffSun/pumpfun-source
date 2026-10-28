import sys,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07b/tools')
from irfn import load, edit
src,dst=sys.argv[1],sys.argv[2]
t=load(src)
def f(b):
    b2=b.replace('br i1 %_78.not.i, label %bb2.i34.lr.ph.i, label %bb31.i\n','br i1 %_78.not.i, label %bb2.i34.lr.ph.i, label %bb31.i, !prof !6867\n')
    return b2
t=edit(t,'update_schedule',f)
open(dst,'w').write(t)
