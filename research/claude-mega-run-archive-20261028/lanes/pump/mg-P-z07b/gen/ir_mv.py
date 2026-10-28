import sys,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07b/tools')
from irfn import load, edit
src,dst,fn=sys.argv[1],sys.argv[2],sys.argv[3]
labs=sys.argv[4:]
t=load(src)
def blocks(b):
    # split function body into header + blocks (label, text)
    i=b.index('{\n')+2; head=b[:i]; body=b[i:-2]  # strip final '}\n'
    parts=re.split(r'\n(?=[\w."$\-]+:)', body)
    return head, parts
def f(b):
    head, parts = blocks(b)
    moved=[]
    for lab in labs:
        idx=[k for k,p in enumerate(parts) if p.startswith(lab+':')]
        assert len(idx)==1,(lab,idx)
        moved.append(parts.pop(idx[0]))
    parts=parts+moved
    return head+'\n'.join(parts)+'\n}\n'
t=edit(t,fn,f)
open(dst,'w').write(t)
