# mvstart.py IN OUT FUNCSUB ALLOCA AFTER_LINE_SUBSTR [nth] : move lifetime.start of ALLOCA to right after the line containing SUBSTR
import sys,re
t=open(sys.argv[1]).read(); fs=sys.argv[3]; an=sys.argv[4]; sub=sys.argv[5]; nth=int(sys.argv[6]) if len(sys.argv)>6 else 0
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
L=t[s:e].split('\n')
st=[i for i,l in enumerate(L) if 'lifetime.start' in l and an+')' in l][0]; line=L.pop(st)
j=[i for i,l in enumerate(L) if sub in l][nth]; L.insert(j+1,line)
open(sys.argv[2],'w').write(t[:s]+'\n'.join(L)+t[e:])
