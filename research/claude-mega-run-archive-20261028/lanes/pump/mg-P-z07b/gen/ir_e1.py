import sys,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07b/tools')
from irfn import load, edit
t=load('ir/us_b.ll')
def f(b):
    for lab in ('bb34.i.i','bb70.i'):
        b=re.sub(r'(br i1 %[\w.]+, label %'+re.escape(lab)+r', label %[\w.]+)(\n)', r'\1, !prof !4659\2', b)
    return b
t=edit(t,'update_schedule',f)
open('ir/us_b_e1.ll','w').write(t)
