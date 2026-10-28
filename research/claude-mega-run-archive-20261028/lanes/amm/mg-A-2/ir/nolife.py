# nolife.py IN.ll FUNCSUB ALLOCA OUT.ll : drop lifetime markers of ALLOCA in FUNC
import sys,re
t=open(sys.argv[1]).read(); fs=sys.argv[2]; an=sys.argv[3]
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
f='\n'.join(l for l in t[s:e].split('\n') if not ('llvm.lifetime' in l and re.search(re.escape(an)+r'[),]',l)))
open(sys.argv[4],'w').write(t[:s]+f+t[e:])
