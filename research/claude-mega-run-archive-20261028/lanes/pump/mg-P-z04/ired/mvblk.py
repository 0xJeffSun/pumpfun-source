import os,re
import sys; sys.path.insert(0,"/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools")
from irutil import denumber
def edit(b):
    b=denumber(b)
    L=b.split('\n')
    def lab(i): return re.match(r'^("?[^:"]+"?|"[^"]+"):',L[i])
    def find(prefix): return next(i for i,l in enumerate(L) if l.startswith(prefix) and re.match(r'^\S.*:',l))
    s=find(os.environ['FROM']); e=find(os.environ['UNTIL']) if os.environ.get('UNTIL') else None
    if e is None:
        e=s+1
        while e<len(L) and not re.match(r'^\S.*:',L[e]) and L[e]!='}': e+=1
    chunk=L[s:e]; del L[s:e]
    t=find(os.environ['BEFORE'])
    L[t:t]=chunk
    return '\n'.join(L)
