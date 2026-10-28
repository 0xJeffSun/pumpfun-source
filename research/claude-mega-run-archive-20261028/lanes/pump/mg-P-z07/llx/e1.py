import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/tools')
from irfn import *
t=load(sys.argv[1])
def f(b):
    return b.replace('  store i8 %3, ptr %_0, align 8\n','  %isn8 = zext i1 %2 to i8\n  store i8 %isn8, ptr %_0, align 8\n',1)
open(sys.argv[2],'w').write(edit(t,'11check_quote17h',f))
