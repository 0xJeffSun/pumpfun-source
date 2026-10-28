# fnx.py IN.ll FUNCSUB OUT.txt : extract one function body
import sys,re
t=open(sys.argv[1]).read(); fs=sys.argv[2]
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
open(sys.argv[3],'w').write(t[s:e]); print(len(t[s:e].split('\n')),'lines')
