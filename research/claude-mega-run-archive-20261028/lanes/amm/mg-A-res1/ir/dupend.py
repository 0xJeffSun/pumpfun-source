# dupend.py IN.ll FUNCSUB ALLOCA OUT.ll : duplicate the lifetime.end of ALLOCA in FUNC (makes the slot conservative)
import sys,re
t=open(sys.argv[1]).read(); fs=sys.argv[2]; an=sys.argv[3]
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
out=[]
for l in t[s:e].split('\n'):
    out.append(l)
    if 'llvm.lifetime.end' in l and re.search(re.escape(an)+r'[),]',l): out.append(l)
open(sys.argv[4],'w').write(t[:s]+'\n'.join(out)+t[e:])
