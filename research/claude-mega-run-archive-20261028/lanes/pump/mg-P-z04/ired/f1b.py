import sys, os; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
from irutil import denumber, move_lines
import runpy
def edit(b):
    if os.environ.get('PERM'):
        b=runpy.run_path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/ired/f1perm.py')['edit'](b)
    else: b=denumber(b)
    Lm=["  %v56 = getelementptr inbounds i8, ptr %_62, i64 88","  %_18.i = load ptr, ptr %v56, align 8, !alias.scope !8668, !noalias !8672, !nonnull !2, !align !3, !noundef !2"]
    return move_lines(b,Lm,os.environ.get('AFTER',"%decimals.i = load i8"))
