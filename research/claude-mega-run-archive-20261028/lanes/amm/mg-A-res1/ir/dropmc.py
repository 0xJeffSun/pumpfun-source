# dropmc.py IN.ll FUNCSUB OUT.ll PAT [PAT...] : delete memcpy lines in FUNC whose text contains any PAT
import sys,re
t=open(sys.argv[1]).read(); fs=sys.argv[2]; pats=sys.argv[4:]
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
n=0; out=[]
for l in t[s:e].split('\n'):
    if 'llvm.memcpy' in l and any(p in l for p in pats): n+=1; continue
    out.append(l)
open(sys.argv[3],'w').write(t[:s]+'\n'.join(out)+t[e:]); print('dropped',n)
