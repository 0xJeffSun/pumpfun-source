# allocpos.py IN.ll FUNCSUB ALLOCA_NAME POS OUT.ll : move one alloca line of FUNC to index POS among its allocas
import sys,re
t=open(sys.argv[1]).read(); fs=sys.argv[2]; an=sys.argv[3]; pos=int(sys.argv[4])
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
L=t[s:e].split('\n')
idx=[i for i,l in enumerate(L) if ' = alloca ' in l]
mv=[i for i in idx if L[i].strip().startswith(an+' =')][0]
line=L.pop(mv); idx=[i for i,l in enumerate(L) if ' = alloca ' in l]
ins=idx[pos] if pos<len(idx) else idx[-1]+1
L.insert(ins,line)
open(sys.argv[5],'w').write(t[:s]+'\n'.join(L)+t[e:])
