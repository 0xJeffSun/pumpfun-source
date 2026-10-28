import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
from irutil import denumber, move_lines
def edit(b):
    b=denumber(b)
    L=["  %v3 = getelementptr inbounds i8, ptr %ctx.8.val, i64 32","  %_63 = load ptr, ptr %v3, align 8, !nonnull !2, !align !3, !noundef !2"]
    return move_lines(b,L,"bb10:")
