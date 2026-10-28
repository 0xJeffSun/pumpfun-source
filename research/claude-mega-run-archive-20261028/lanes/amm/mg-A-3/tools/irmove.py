# irmove.py IN.ll FUNCSUB OUT.ll BLOCK:BEFORE[,BLOCK:BEFORE...] : move block BLOCK (label) to just before block BEFORE inside function
import sys,re
lines=open(sys.argv[1]).read().split('\n')
s=next(i for i,l in enumerate(lines) if l.startswith('define ') and sys.argv[2] in l)
e=next(i for i in range(s,len(lines)) if lines[i]=='}')
body=lines[s+1:e]
def blocks(b):
    res=[];cur=None
    for l in b:
        m=re.match(r'^("[^"]+"|[\w.$-]+):',l)
        if m: cur=[m.group(1),[l]];res.append(cur)
        elif cur is None: res.append(['__entry__',[l]]);cur=res[-1]
        else: cur[1].append(l)
    return res
bl=blocks(body)
for mv in sys.argv[4].split(','):
    a,b=mv.split(':')
    def find(n):
        ex=[k for k,x in enumerate(bl) if x[0]==n]
        if ex: return ex[0]
        sub=[k for k,x in enumerate(bl) if x[0].strip('"').endswith(n)]
        assert len(sub)==1,(n,len(sub)); return sub[0]
    i=find(a); blk=bl.pop(i)
    j=find(b) if b!='END' else len(bl); bl.insert(j,blk)
nb=[l for x in bl for l in x[1]]
ren=lambda l: re.sub(r'^(\d+):',r'v\1:',re.sub(r'%(\d+)\b',r'%v\1',l))
nb=[ren(l) for l in nb]; lines[s]=ren(lines[s])
out=lines[:s+1]+nb+lines[e:]
open(sys.argv[3],'w').write('\n'.join(out)); print('ok',len(bl),'blocks',' '.join(x[0][-12:] for x in bl[:30]))
