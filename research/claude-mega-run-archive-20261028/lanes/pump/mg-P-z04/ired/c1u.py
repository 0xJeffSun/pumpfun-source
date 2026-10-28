import sys,os,re; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
from irutil import denumber
GROUPS=[(101,103),(223,225),(440,479),(854,893)]
def edit(b):
    lines=b.split('\n')
    lines[0]=lines[0].replace('ptr readonly %mint.88.val','ptr readonly %mintp')
    out=[]; gi=0
    for i,l in enumerate(lines, start=1):
        for k,(s,e) in enumerate(GROUPS):
            if i==s:
                out.append(f'  %mi{k}.p = getelementptr inbounds i8, ptr %mintp, i64 88')
                out.append(f'  %mi{k} = load ptr, ptr %mi{k}.p, align 8, !nonnull !2, !align !3, !noundef !2')
            if s<=i<=e: l=l.replace('%mint.88.val',f'%mi{k}')
        out.append(l)
    nb='\n'.join(out)
    assert '%mint.88.val' not in nb
    return nb
