import os,sys
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
from irutil import denumber
def edit(b):
    b=denumber(b)
    A="  %_72.val = load ptr, ptr %v9, align 8\n"
    assert A in b; b=b.replace(A,"",1)
    B="bb2.i:                                            ; preds = %bb31\n"
    assert B in b
    b=b.replace(B,B+"  %qm.gep = getelementptr i8, ptr %_72, i64 24\n  %_72.val = load ptr, ptr %qm.gep, align 8, !nonnull !2, !align !3, !noundef !2\n",1)
    if os.environ.get('HOIST2'):
        L=b.split('\n'); i=next(k for k,l in enumerate(L) if l.startswith('  %_24.i = load ptr, ptr %v9'))
        x=L.pop(i); t=next(k for k,l in enumerate(L) if l.startswith(os.environ['HOIST2']))
        L.insert(t+1,x); b='\n'.join(L)
    return b
