# line-based editing helpers (line-neutral)
import os,shutil
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07'
class F:
    def __init__(s,root,rel): s.p=f'{root}/src/{rel}'; s.l=open(s.p).read().split('\n'); s.n=len(s.l)
    def put(s,line,text):  # place text lines starting at 1-based line, over blank lines only
        for i,t in enumerate(text.split('\n')):
            j=line-1+i
            assert s.l[j].strip()=='' , (s.p,j+1,s.l[j][:80])
            s.l[j]=t
    def rep(s,line,text,expect=None):  # replace lines (count must match)
        ts=text.split('\n')
        for i,t in enumerate(ts):
            j=line-1+i
            if expect: assert expect in s.l[line-1], (s.p,line,s.l[line-1][:80])
            s.l[j]=t
    def sub(s,old,new,count=1):
        t='\n'.join(s.l); assert t.count(old)==count,(s.p,old[:80],t.count(old)); t=t.replace(old,new)
        s.l=t.split('\n')
    def blank(s,a,b):
        for j in range(a-1,b): s.l[j]=''
    def save(s):
        assert len(s.l)==s.n,(s.p,len(s.l),s.n); open(s.p,'w').write('\n'.join(s.l))
def clone(name,base=L+'/src'):
    d=f'{L}/v/{name}'
    if os.path.exists(d): shutil.rmtree(d)
    os.makedirs(d); shutil.copytree(base,d+'/src'); return d+'/src'
