import sys, os; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
from irutil import denumber
P=os.environ['PERM']  # e.g. "acq" letters: a=aqbc(48) q=quote_mint(24) c=curve(32)
D={'a':["  %v1 = getelementptr inbounds i8, ptr %ctx.8.val, i64 48","  %_40 = load ptr, ptr %v1, align 8, !nonnull !2, !align !3, !noundef !2"],
   'q':["  %v2 = getelementptr inbounds i8, ptr %ctx.8.val, i64 24","  %_62 = load ptr, ptr %v2, align 8, !nonnull !2, !align !3, !noundef !2"],
   'c':["  %v3 = getelementptr inbounds i8, ptr %ctx.8.val, i64 32","  %_63 = load ptr, ptr %v3, align 8, !nonnull !2, !align !3, !noundef !2"]}
def edit(b):
    b=denumber(b)
    blk='\n'.join(D['a']+D['q']+D['c'])+'\n'
    assert blk in b
    return b.replace(blk,'\n'.join(sum((D[x] for x in P),[]))+'\n')
