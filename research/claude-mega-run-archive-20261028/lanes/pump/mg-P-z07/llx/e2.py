import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/tools')
from irfn import *
t=load(sys.argv[1]); mode=sys.argv[3]
def f(b):
    b=b.replace('  store i8 %3, ptr %_0, align 8\n','  %isn8 = zext i1 %2 to i8\n  store i8 %isn8, ptr %_0, align 8\n',1)
    import re
    if 'p5' in mode: b=re.sub(r'(%fee\.sroa\.6\.sroa\.5\.0 = phi ptr \[[^\]]*\], )\[ undef,',r'\1[ null,',b)
    if 'p6' in mode: b=re.sub(r'(%fee\.sroa\.6\.sroa\.6\.0 = phi i64 \[[^\]]*\], )\[ undef,',r'\1[ 0,',b)
    if 'p0' in mode: b=re.sub(r'(%fee\.sroa\.6\.sroa\.0\.0 = phi i64 \[[^\]]*\], )\[ undef,',r'\1[ 0,',b)
    return b
open(sys.argv[2],'w').write(edit(t,'11check_quote17h',f))
