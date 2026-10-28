# irsub.py IN.ll OUT.ll FUNC_SUB OLD_FILE NEW_FILE : replace exact text (OLD) inside function FUNC_SUB with NEW
import sys,re
t=open(sys.argv[1]).read()
m=re.search(r'\ndefine [^\n]*'+re.escape(sys.argv[3])+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
f=t[s:e]; old=open(sys.argv[4]).read(); new=open(sys.argv[5]).read()
assert f.count(old)==1, f.count(old)
open(sys.argv[2],'w').write(t[:s]+f.replace(old,new)+t[e:])
